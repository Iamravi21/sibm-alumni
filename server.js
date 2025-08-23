const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const DATA_FILE = path.join(__dirname, 'data', 'alumni.json');

// Ensure data directory exists
fs.ensureDirSync(path.dirname(DATA_FILE));

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeJsonSync(DATA_FILE, []);
}

// Get all alumni
app.get('/api/alumni', async (req, res) => {
  try {
    const alumni = await fs.readJson(DATA_FILE);
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni data' });
  }
});

// Add new alumni
app.post('/api/alumni', async (req, res) => {
  try {
    const alumni = await fs.readJson(DATA_FILE);
    const newAlumni = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    alumni.push(newAlumni);
    await fs.writeJson(DATA_FILE, alumni, { spaces: 2 });
    res.status(201).json(newAlumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add alumni' });
  }
});

// Search alumni by company
app.get('/api/search', async (req, res) => {
  try {
    const { company, city } = req.query;
    const alumni = await fs.readJson(DATA_FILE);
    
    let filtered = alumni;
    
    if (company) {
      filtered = filtered.filter(alum => 
        alum.company.toLowerCase().includes(company.toLowerCase())
      );
    }
    
    if (city) {
      filtered = filtered.filter(alum => 
        alum.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});