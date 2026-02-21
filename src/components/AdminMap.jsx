import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, FeatureGroup, Popup, Marker, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import InstructionsPanel from './InstructionsPanel';
import LocationSearchBar from './LocationSearchBar';
import RecenterButton from './RecenterButton';
import DrawingControls from './DrawingControls';

const API_URL = 'https://geo-guardian-backend.onrender.com/api/zones';

// Fix Leaflet default icon issue with Vite
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to recenter map when location changes
function LocationRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, {
        duration: 2
      });
    }
  }, [center, zoom, map]);
  return null;
}

function AdminMap({ socket }) {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null); // User's actual GPS location
  const [currentLocation, setCurrentLocation] = useState(null); // Map center (can be user location or searched)
  const [targetZoom, setTargetZoom] = useState(13);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);

  // Fetch current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      toast.loading('Getting your location...', { id: 'location' });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = [latitude, longitude];
          setUserLocation(location);
          setCurrentLocation(location);
          toast.success('Location found!', { id: 'location' });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast.error('Could not get your location', { id: 'location' });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  }, []);

  // Fetch all existing zones on component mount
  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      // GEOSPATIAL OPTIMIZATION: Could fetch zones by viewport bounds
      // Using: GET /api/zones/within?minLat=...&minLng=...&maxLat=...&maxLng=...
      // For now, fetching all zones (suitable for small-medium datasets)
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setZones(response.data.zones);
      }
    } catch (error) {
      console.error('Error fetching zones:', error);
      toast.error('Failed to load danger zones');
    } finally {
      setLoading(false);
    }
  };

  // Handle zone creation (when user draws on map)
  const handleZoneCreated = async (e) => {
    const { layerType, layer } = e;
    
    if (layerType === 'polygon' || layerType === 'rectangle') {
      const geoJSON = layer.toGeoJSON();
      const zoneName = prompt('Enter a name for this danger zone:') || 'Unnamed Zone';
      
      try {
        const response = await axios.post(API_URL, {
          name: zoneName,
          geometry: geoJSON.geometry
        });
        
        if (response.data.success) {
          setZones([...zones, response.data.zone]);
          toast.success(
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-bold">Zone Created!</p>
                <p className="text-xs opacity-90">"{zoneName}" is now active</p>
              </div>
            </div>,
            {
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '10px',
                boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
              },
              icon: null
            }
          );
        }
      } catch (error) {
        console.error('Error creating zone:', error);
        toast.error(
          <div className="flex items-center gap-2">
            <span className="text-xl">❌</span>
            <div>
              <p className="font-bold">Creation Failed</p>
              <p className="text-xs opacity-90">Could not save the zone</p>
            </div>
          </div>,
          {
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)'
            },
            icon: null
          }
        );
        // Remove the layer if save failed
        layer.remove();
      }
    }
  };

  // Handle zone deletion
  const handleZoneDeleted = async (e) => {
    const layers = e.layers;
    layers.eachLayer(async (layer) => {
      const zoneId = layer.options.zoneId;
      if (zoneId) {
        try {
          const response = await axios.delete(`${API_URL}/${zoneId}`);
          if (response.data.success) {
            setZones(zones.filter(z => z._id !== zoneId));
            toast.success(
              <div className="flex items-center gap-2">
                <span className="text-xl">🗑️</span>
                <div>
                  <p className="font-bold">Zone Deleted</p>
                  <p className="text-xs opacity-90">Successfully removed</p>
                </div>
              </div>,
              {
                duration: 3000,
                style: {
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#fff',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)'
                },
                icon: null
              }
            );
          }
        } catch (error) {
          console.error('Error deleting zone:', error);
          toast.error('Failed to delete zone');
        }
      }
    });
  };

  // Delete a specific zone by ID (called from popup)
  const deleteZoneById = async (zoneId, zoneName) => {
    try {
      const response = await axios.delete(`${API_URL}/${zoneId}`);
      if (response.data.success) {
        setZones(zones.filter(z => z._id !== zoneId));
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-xl">🗑️</span>
            <div>
              <p className="font-bold">Zone Deleted</p>
              <p className="text-xs opacity-90">"{zoneName}" removed successfully</p>
            </div>
          </div>,
          {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)'
            },
            icon: null
          }
        );
      }
    } catch (error) {
      console.error('Error deleting zone:', error);
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-xl">❌</span>
          <div>
            <p className="font-bold">Delete Failed</p>
            <p className="text-xs opacity-90">Could not remove the zone</p>
          </div>
        </div>,
        {
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '10px',
            boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)'
          },
          icon: null
        }
      );
    }
  };

  // Handle manual recenter to current location
  const handleRecenter = () => {
    if (userLocation) {
      // Set maximum zoom level for detailed view
      setTargetZoom(18);
      // Update map center to user's actual GPS location
      setCurrentLocation([...userLocation]);
      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <span className="font-semibold">Zooming to your location</span>
        </div>,
        {
          duration: 2000,
          style: {
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '10px',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
          },
          icon: null
        }
      );
    } else {
      toast.error('GPS location not available');
    }
  };

  // Handle zoom in
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  // Handle zoom out
  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  // Handle location search
  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      toast.loading('Searching location...', { id: 'search' });
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        const newLocation = [parseFloat(lat), parseFloat(lon)];
        
        setCurrentLocation(newLocation);
        setTargetZoom(15);
        
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            <div>
              <p className="font-bold">Location Found!</p>
              <p className="text-xs opacity-90">{display_name.split(',').slice(0, 3).join(',')}</p>
            </div>
          </div>,
          {
            id: 'search',
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
            },
            icon: null
          }
        );
        setSearchQuery('');
      } else {
        toast.error('Location not found. Try a different search.', { id: 'search' });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.', { id: 'search' });
    }
  };

  return (
    <div className="h-full w-full">
      {loading ? (
        <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="relative">
            {/* Animated spinner */}
            <div className="w-20 h-20 border-4 border-blue-200/30 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white text-2xl font-bold tracking-wide">Loading Map...</p>
            <p className="text-blue-300 text-sm mt-2 animate-pulse">Preparing your dashboard</p>
          </div>
        </div>
      ) : (
        <MapContainer
          center={currentLocation || [20.5937, 78.9629]} // Use current location or default
          zoom={currentLocation ? 13 : 5}
          className="h-full w-full"
          ref={mapRef}
          zoomControl={false}
        >
          {/* Recenter when current location changes */}
          <LocationRecenter center={currentLocation} zoom={targetZoom} />

          {/* Esri World Imagery - Satellite View */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            maxZoom={19}
          />

          {/* Drawing Controls */}
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={handleZoneCreated}
              onDeleted={handleZoneDeleted}
              draw={{
                rectangle: false,
                polygon: {
                  shapeOptions: {
                    color: '#ef4444',
                    fillColor: '#ef4444',
                    fillOpacity: 0.3
                  },
                  allowIntersection: false,
                  drawError: {
                    color: '#e74c3c',
                    message: '<strong>Error:</strong> Shape edges cannot cross!'
                  }
                },
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false
              }}
              edit={{
                remove: true,
                edit: false
              }}
            />
          </FeatureGroup>

          {/* Render existing zones from database */}
          {zones.map((zone) => {
            // Convert GeoJSON coordinates to Leaflet format [lat, lng]
            const coordinates = zone.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
            
            return (
              <Polygon
                key={zone._id}
                positions={coordinates}
                pathOptions={{
                  color: '#b91c1c',
                  fillColor: '#ef4444',
                  fillOpacity: 0.4,
                  weight: 3,
                  dashArray: '10, 5'
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.setStyle({
                      fillOpacity: 0.6,
                      weight: 4,
                      color: '#7f1d1d'
                    });
                  },
                  mouseout: (e) => {
                    e.target.setStyle({
                      fillOpacity: 0.4,
                      weight: 3,
                      color: '#b91c1c'
                    });
                  }
                }}
                zoneId={zone._id}
              >
                <Popup>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⚠️</span>
                      <h3 className="font-bold text-red-600 text-lg">{zone.name}</h3>
                    </div>
                    <div className="bg-red-50 border-l-4 border-red-500 p-2 rounded">
                      <p className="text-xs font-semibold text-red-700">DANGER ZONE</p>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <span>📅</span>
                        <span className="font-medium">Created:</span>
                        <span>{new Date(zone.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <span>⏰</span>
                        <span className="font-medium">Time:</span>
                        <span>{new Date(zone.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </p>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteZoneById(zone._id, zone.name)}
                      className="mt-4 w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50 hover:scale-105"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete Zone</span>
                    </button>
                  </div>
                </Popup>
              </Polygon>
            );
          })}

          {/* Current Location Marker */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📍</span>
                    <h3 className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-lg">Your Location</h3>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Latitude:</span>
                      <span className="text-xs font-mono font-bold text-blue-700">{userLocation[0].toFixed(6)}</span>
                    </div>
                    <div className="h-px bg-blue-200"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Longitude:</span>
                      <span className="text-xs font-mono font-bold text-blue-700">{userLocation[1].toFixed(6)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center italic">High accuracy position</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}

      {/* UI Components */}
      <LocationSearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleLocationSearch}
      />

      <RecenterButton 
        userLocation={userLocation}
        onRecenter={handleRecenter}
      />

      <DrawingControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      <InstructionsPanel />
    </div>
  );
}

export default AdminMap;
