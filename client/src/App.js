import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Building, MapPin, Mail, Phone, User, GraduationCap } from 'lucide-react';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';

function App() {
  const [alumni, setAlumni] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    city: '',
    graduationYear: '',
    linkedIn: ''
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'alumni'));
      const alumniData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlumni(alumniData);
      setSearchResults(alumniData);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(alumni);
      return;
    }

    setLoading(true);
    try {
      let q = query(collection(db, 'alumni'));
      
      if (searchQuery) {
        q = query(collection(db, 'alumni'), 
          where('company', '>=', searchQuery),
          where('company', '<=', searchQuery + '\uf8ff')
        );
      }
      
      const querySnapshot = await getDocs(q);
      let results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (cityFilter) {
        results = results.filter(alum => 
          alum.city.toLowerCase().includes(cityFilter.toLowerCase())
        );
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  const handleAddAlumni = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'alumni'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setFormData({
        name: '', email: '', phone: '', company: '', position: '', 
        city: '', graduationYear: '', linkedIn: ''
      });
      setShowAddForm(false);
      fetchAlumni();
    } catch (error) {
      console.error('Error adding alumni:', error);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            <GraduationCap className="inline-block mr-4" size={48} />
            SIBM Pune Alumni
          </h1>
          <p className="text-xl text-white/80">Executive MBA Network</p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by company name..."
                className="input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Filter by city..."
                className="input-field"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="btn-primary flex items-center gap-2"
              disabled={loading}
            >
              <Search size={20} />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Alumni
          </button>
        </motion.div>

        {/* Add Alumni Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-effect rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Add Alumni</h2>
                <form onSubmit={handleAddAlumni} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="input-field"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    className="input-field"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="input-field"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Graduation Year"
                    className="input-field"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn Profile"
                    className="input-field"
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
                  />
                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary flex-1">
                      Add Alumni
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowAddForm(false)}
                      className="btn-primary bg-gray-500 flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {searchResults.map((alum, index) => (
            <motion.div
              key={alum.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">{alum.name}</h3>
                  <p className="text-white/70">{alum.position}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-white/80">
                  <Building size={16} className="mr-2" />
                  <span>{alum.company}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <MapPin size={16} className="mr-2" />
                  <span>{alum.city}</span>
                </div>
                {alum.email && (
                  <div className="flex items-center text-white/80">
                    <Mail size={16} className="mr-2" />
                    <span className="truncate">{alum.email}</span>
                  </div>
                )}
                {alum.phone && (
                  <div className="flex items-center text-white/80">
                    <Phone size={16} className="mr-2" />
                    <span>{alum.phone}</span>
                  </div>
                )}
                {alum.graduationYear && (
                  <div className="flex items-center text-white/80">
                    <GraduationCap size={16} className="mr-2" />
                    <span>Class of {alum.graduationYear}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {searchResults.length === 0 && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/70 text-xl">No alumni found. Be the first to add your information!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;