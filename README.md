# SIBM Pune Executive MBA Alumni Portal

A beautiful, modern alumni portal for SIBM Pune Executive MBA graduates with Cred-like animations and design.

## Features

- **Alumni Registration**: Easy form to add alumni information
- **Company Search**: Search alumni by company name
- **City Filtering**: Filter results by city
- **Beautiful UI**: Modern glass morphism design with smooth animations
- **Responsive**: Works perfectly on all devices
- **Real-time Search**: Instant search results

## Tech Stack

- **Frontend**: React 18, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express
- **Database**: JSON file storage (easily upgradeable to MongoDB)
- **Styling**: Custom CSS with glass morphism effects

## Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Start the development server:
```bash
# From root directory
npm run dev
```

This will start both the backend server (port 5000) and React frontend (port 3000).

## Usage

1. **Add Alumni**: Click the "Add Alumni" button to register new alumni
2. **Search**: Use the search bar to find alumni by company name
3. **Filter**: Use the city filter to narrow down results
4. **View Details**: Each alumni card shows contact information and current position

## API Endpoints

- `GET /api/alumni` - Get all alumni
- `POST /api/alumni` - Add new alumni
- `GET /api/search?company=<name>&city=<city>` - Search alumni

## Deployment

For production deployment:

1. Build the React app:
```bash
cd client && npm run build
```

2. Start the production server:
```bash
npm start
```

## Future Enhancements

- User authentication
- MongoDB integration
- Email notifications
- Advanced filtering options
- Alumni networking features
- Event management
- Job posting board

## Contributing

Feel free to contribute to this project by submitting pull requests or reporting issues.

## License

MIT License