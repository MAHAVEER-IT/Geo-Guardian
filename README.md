# 🛡️ Geo-Guardian Admin Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=for-the-badge&logo=socket.io)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Web-based Admin Panel for Geo-Guardian Danger Zone Management System**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Related Projects](#-related-projects) • [Deployment](#-deployment)

</div>

---

## 📖 Overview

**Geo-Guardian Admin Dashboard** is a powerful web-based control panel for managing danger zones in real-time. Built with React and Leaflet, it provides administrators with an interactive map interface to create, edit, and monitor danger zones, while receiving instant alerts from mobile clients.

### Key Highlights

🗺️ **Interactive Map Interface** - Full-featured OpenStreetMap with drawing tools  
✏️ **Zone Management** - Create, edit, and delete danger zones with polygon drawing  
📡 **Real-time Alerts** - Instant notifications when users enter danger zones  
🔍 **Location Search** - Search and navigate to any location worldwide  
🎨 **Modern UI/UX** - Beautiful glassmorphic design with Tailwind CSS  
⚡ **Lightning Fast** - Built with Vite for optimal performance  
📱 **Responsive Design** - Works seamlessly on desktop and tablets  

---

## 🚀 Features

### Map Management

- **🖊️ Polygon Drawing**
  - Draw custom danger zones using Leaflet Draw
  - Edit existing zone boundaries
  - Delete zones with confirmation
  - Automatic color-coding (red for danger zones)

- **🗺️ Interactive Controls**
  - Zoom in/out controls
  - Pan and navigate
  - Recenter to user location
  - GPS location tracking
  - Custom marker placement

- **🔍 Advanced Search**
  - Search locations by name or coordinates
  - Geocoding integration
  - Instant map recentering
  - Visual search result markers

### Real-time Communication

- **📡 Socket.IO Integration**
  - Live connection to backend server
  - Bi-directional event handling
  - Automatic reconnection
  - Connection status monitoring

- **🚨 Alert System**
  - Instant danger alerts from mobile clients
  - Visual toast notifications
  - Alert details with coordinates
  - Styled severity indicators
  - Audio/visual feedback

### Zone Operations

- **➕ Create Zones**
  - Draw polygons on map
  - Auto-generate unique IDs
  - Save with name and description
  - Instant database persistence
  - Visual confirmation

- **✏️ Edit Zones**
  - Modify zone boundaries
  - Update zone information
  - Real-time preview
  - Undo/redo support

- **🗑️ Delete Zones**
  - Remove zones with confirmation
  - Cascade deletion
  - Visual feedback
  - Database cleanup

### User Interface

- **🎨 Modern Design**
  - Glassmorphic UI elements
  - Gradient backgrounds
  - Smooth animations
  - Hover effects
  - Responsive layout

- **📊 Information Panel**
  - Quick start instructions
  - Zone statistics
  - User guidance
  - Collapsible sidebar

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **Vite** | 5.4.21 | Build tool & dev server |
| **Leaflet** | 1.9.4 | Interactive maps |
| **React Leaflet** | 4.2.1 | React bindings for Leaflet |
| **Leaflet Draw** | 1.0.4 | Drawing tools |
| **Socket.IO Client** | 4.8.3 | Real-time communication |
| **Axios** | 1.13.5 | HTTP client |
| **TailwindCSS** | 3.4.19 | Utility-first CSS |
| **React Hot Toast** | 2.6.0 | Toast notifications |

### Development Tools

- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Vite Plugin React** - Fast refresh support

---

## 🏗️ Architecture

### Project Structure

```
client/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── components/
│       ├── AdminMap.jsx           # Map container & logic
│       ├── DrawingControls.jsx    # Drawing UI controls
│       ├── InstructionsPanel.jsx  # Help & instructions
│       ├── LocationSearchBar.jsx  # Search functionality
│       └── RecenterButton.jsx     # Location controls
├── public/                        # Static assets
├── assets/                        # Images & resources
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies
├── DEPLOYMENT.md                  # Deployment guide
└── README.md                      # This file
```

### Component Hierarchy

```
<App>
├── <Toaster />                  # Global notifications
├── <Header />                   # App title & branding
└── <AdminMap>
    ├── <MapContainer>
    │   ├── <TileLayer />        # OpenStreetMap tiles
    │   ├── <FeatureGroup>
    │   │   ├── <EditControl />  # Drawing tools
    │   │   └── <Polygon />      # Danger zones
    │   ├── <Marker />           # Location markers
    │   └── <LocationRecenter /> # Map positioning
    ├── <LocationSearchBar />
    ├── <RecenterButton />
    ├── <DrawingControls />
    └── <InstructionsPanel />
```

### Data Flow

```
┌─────────────────────────────────────┐
│      Admin Dashboard (React)        │
│  ┌─────────────────────────────┐   │
│  │     Leaflet Map View        │   │
│  │  • Draw/Edit Polygons       │   │
│  │  • View Zones               │   │
│  │  • Search Locations         │   │
│  └─────────────────────────────┘   │
│           │             │           │
│      Axios API     Socket.IO        │
└───────────┼─────────────┼───────────┘
            │             │
            ▼             ▼
┌─────────────────────────────────────┐
│    Backend Server (Node.js)         │
│  • REST API Endpoints               │
│  • Socket.IO Events                 │
│  • MongoDB Operations               │
└─────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────┐
│   MongoDB Atlas (GeoSpatial DB)     │
│  • Zone Collections                 │
│  • 2dsphere Indexes                 │
│  • GeoJSON Data                     │
└─────────────────────────────────────┘
```

---

## 🔗 Related Projects

This dashboard is part of the **Geo-Guardian Ecosystem**:

### 📱 Mobile Client (Tourist App)
**Repository:** [Geo-Guardian-App](https://github.com/MAHAVEER-IT/Geo-Guardian-App.git)  
- Flutter mobile application
- Real-time GPS tracking
- Proximity alerts
- User safety monitoring

### 🔧 Backend Server
**Repository:** [Geo-Guardian-Backend](https://github.com/MAHAVEER-IT/Geo-Guardian-Backend.git)  
- Node.js + Express backend
- MongoDB with geospatial indexing
- Socket.IO event handling
- RESTful API endpoints

---

## 📥 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher) or [yarn](https://yarnpkg.com/)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Active internet connection

### Setup Steps

1. **Clone the repository**
   ```bash
   cd GeoGuardian/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure backend URL** (if needed)
   
   Edit `src/App.jsx` and `src/components/AdminMap.jsx`:
   ```javascript
   // For local development
   const socket = io('http://localhost:5000');
   const API_URL = 'http://localhost:5000/api/zones';
   
   // For production
   const socket = io('https://geo-guardian-backend.onrender.com');
   const API_URL = 'https://geo-guardian-backend.onrender.com/api/zones';
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The production build will be in the `dist/` folder.

---

## 💻 Usage

### Getting Started

1. **Allow Location Access**
   - Browser will prompt for location permission
   - This helps center the map on your current location

2. **View Existing Zones**
   - Red polygons show existing danger zones
   - Click on any zone to see details
   - Hover for quick information

3. **Create a New Zone**
   - Click the **"Polygon"** button in the top-right
   - Click on the map to add polygon points
   - Double-click or click first point to complete
   - Enter zone name and description
   - Click **"Save Zone"**

### Drawing Zones

1. **Start Drawing**
   - Click "Polygon" button
   - Click map to place vertices
   - Create at least 3 points

2. **Complete Shape**
   - Double-click last point
   - Or click the first point
   - Shape auto-closes

3. **Save Zone**
   - Enter descriptive name
   - Add optional description
   - Click "Save Zone" button
   - Wait for success confirmation

### Editing Zones

1. **Select Zone**
   - Click on any polygon
   - Edit controls appear

2. **Modify**
   - Drag vertices to reshape
   - Add/remove points
   - Move entire zone

3. **Delete Zone**
   - Click "Delete" button
   - Confirm deletion
   - Zone removed from database

### Searching Locations

1. **Enter Location**
   - Type city, address, or place name
   - Or enter coordinates (lat, lng)

2. **Select Result**
   - Click on search result
   - Map automatically centers
   - Marker shows location

### Receiving Alerts

- **Danger Alerts** appear automatically when:
  - Mobile user enters a danger zone
  - Real-time notification with coordinates
  - Sound and visual alert
  - Alert stays for 8 seconds

---

## ⚙️ Configuration

### Environment Variables

While this app uses hardcoded URLs, you can create a `.env` file for custom configuration:

```env
VITE_API_URL=https://geo-guardian-backend.onrender.com
VITE_SOCKET_URL=https://geo-guardian-backend.onrender.com
```

Then update your code to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
const socket = io(import.meta.env.VITE_SOCKET_URL);
```

### Map Configuration

Edit `src/components/AdminMap.jsx`:

```javascript
// Default map center
const DEFAULT_CENTER = [20.5937, 78.9629]; // India

// Default zoom level
const DEFAULT_ZOOM = 5;

// Map tile provider
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
```

### Styling

Customize colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        danger: '#dc2626',
        warning: '#f59e0b',
        safe: '#10b981'
      }
    }
  }
}
```

---

## 🚀 Deployment

### Quick Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Drag & drop the `dist` folder
   - Your site is live! 🎉

### Deploy with Git Integration

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/geo-guardian-admin.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Import project from GitHub
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy!

### Other Platforms

- **Vercel:** Similar to Netlify, auto-detects Vite
- **GitHub Pages:** Requires gh-pages package
- **Firebase Hosting:** Use `firebase deploy`

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🎨 Screenshots

### Main Dashboard
*Interactive map with danger zones and controls*

### Drawing Mode
*Creating new danger zones with polygon tool*

### Alert Notification
*Real-time danger alert from mobile client*

### Search Feature
*Location search and navigation*

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages
- Test before submitting PR
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Map tiles not loading  
**Solution:** Check internet connection and ensure OpenStreetMap is accessible

**Issue:** Can't draw on map  
**Solution:** Click the "Polygon" button first to activate drawing mode

**Issue:** Zones not saving  
**Solution:** Verify backend server is running and accessible

**Issue:** Not receiving alerts  
**Solution:** Check Socket.IO connection in browser console

**Issue:** Location search not working  
**Solution:** Ensure Nominatim API is accessible (OpenStreetMap geocoding)

### Debug Mode

Enable console logging by opening browser DevTools:

```javascript
// In App.jsx
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('admin_alert', (data) => {
  console.log('Alert received:', data);
});
```

---

## 📋 API Integration

### Backend Endpoints

```javascript
// Get all zones
GET /api/zones

// Create new zone
POST /api/zones
Body: {
  name: string,
  description: string,
  polygon: [[lat, lng], ...]
}

// Update zone
PUT /api/zones/:id
Body: { polygon: [[lat, lng], ...] }

// Delete zone
DELETE /api/zones/:id
```

### Socket.IO Events

```javascript
// Listen for alerts from mobile clients
socket.on('admin_alert', (data) => {
  // data: { message, location: { lat, lng } }
});

// Send custom events
socket.emit('custom_event', data);
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 👥 Authors

**Mahaveer IT Team**

---

## 🙏 Acknowledgments

- [Leaflet](https://leafletjs.com/) - Open-source map library
- [OpenStreetMap](https://www.openstreetmap.org/) - Free map data
- [React](https://reactjs.org/) - JavaScript library
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Socket.IO](https://socket.io/) - Real-time engine

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Contact the development team

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by Mahaveer IT Team

</div>
