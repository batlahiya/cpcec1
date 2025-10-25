import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Sparkles } from 'lucide-react';
import { ParkingLocation, ParkingSlot } from '../types';
import ParkingSlotDetails from './ParkingSlotDetails';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ParkingMapProps {
  locations: ParkingLocation[];
}

const ParkingMap: React.FC<ParkingMapProps> = ({ locations }) => {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Error getting location:', error);
          // Default to Port City coordinates
          setUserLocation([6.936522148462264, 79.835108989812]);
        }
      );
    } else {
      setUserLocation([6.936522148462264, 79.835108989812]);
    }
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const createCustomIcon = (status: string, type?: string, slotId?: string) => {
    const colors = {
      available: { 
        bg: '#10b981', 
        border: '#059669', 
        shadow: '#065f46',
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        inner: '#6ee7b7'
      },
      occupied: { 
        bg: '#ef4444', 
        border: '#dc2626', 
        shadow: '#991b1b',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
        inner: '#fca5a5'
      },
      reserved: { 
        bg: '#f59e0b', 
        border: '#d97706', 
        shadow: '#92400e',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        inner: '#fcd34d'
      }
    };
    
    const color = colors[status as keyof typeof colors];
    const slotNumber = slotId?.replace(/[A-Z]/, '') || '';
    
    // Create a more realistic parking space icon
    const svgString = `<svg width="40" height="60" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="${color.shadow}" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color.inner};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Parking space background -->
      <rect x="3" y="3" width="34" height="54" rx="6" fill="url(#gradient)" stroke="${color.border}" stroke-width="2" filter="url(#shadow)"/>
      
      <!-- Inner border -->
      <rect x="5" y="5" width="30" height="50" rx="4" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
      
      <!-- Slot number -->
      <text x="20" y="18" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="Arial, sans-serif">${slotNumber}</text>
      
      <!-- Status indicator -->
      <circle cx="20" cy="30" r="6" fill="white" opacity="0.9"/>
      <text x="20" y="34" text-anchor="middle" fill="${color.bg}" font-size="8" font-weight="bold">${status.charAt(0).toUpperCase()}</text>
      
      <!-- Type indicator -->
      <text x="20" y="48" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
        ${type === 'electric' ? '⚡' : type === 'handicap' ? '♿' : '🚗'}
      </text>
      
      <!-- Corner indicators -->
      <circle cx="8" cy="10" r="2" fill="white" opacity="0.6"/>
      <circle cx="32" cy="10" r="2" fill="white" opacity="0.6"/>
      <circle cx="8" cy="50" r="2" fill="white" opacity="0.6"/>
      <circle cx="32" cy="50" r="2" fill="white" opacity="0.6"/>
    </svg>`;
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`,
      iconSize: [40, 60],
      iconAnchor: [20, 30],
      popupAnchor: [0, -30],
    });
  };

  const handleSlotClick = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setShowDetails(true);
  };

  const handleReserveSlot = (slot: ParkingSlot) => {
    // Simulate slot reservation
    console.log(`Reserving slot ${slot.id}`);
    // In a real app, this would make an API call
    setShowDetails(false);
    setSelectedSlot(null);
  };

  const handleGetDirections = (slot: ParkingSlot) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${slot.position[0]},${slot.position[1]}`;
    window.open(url, '_blank');
  };

  const MapCenter: React.FC<{ center: LatLngTuple }> = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 15);
    }, [map, center]);
    return null;
  };

  // Calculate total available, occupied, reserved slots across all locations
  const totalAvailable = locations.reduce((sum, loc) => sum + loc.slots.filter(s => s.status === 'available').length, 0);
  const totalOccupied = locations.reduce((sum, loc) => sum + loc.slots.filter(s => s.status === 'occupied').length, 0);
  const totalReserved = locations.reduce((sum, loc) => sum + loc.slots.filter(s => s.status === 'reserved').length, 0);

  if (!userLocation) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
                <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Quantum Parking System
                      </span>
                    </h3>
                    <div className="text-sm text-gray-300 flex items-center px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Neural Network Active • {lastUpdate.toLocaleTimeString()}
                    </div>
                  </div>
          
                  {/* Quantum Parking Statistics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 text-center border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400">{totalAvailable}</div>
                      <div className="text-sm text-green-300 font-medium">Available</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-4 text-center border border-red-500/30">
                      <div className="text-3xl font-bold text-red-400">{totalOccupied}</div>
                      <div className="text-sm text-red-300 font-medium">Occupied</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl p-4 text-center border border-yellow-500/30">
                      <div className="text-3xl font-bold text-yellow-400">{totalReserved}</div>
                      <div className="text-sm text-yellow-300 font-medium">Reserved</div>
                    </div>
                  </div>
          
          <p className="text-sm text-gray-300 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-blue-400" />
            Click on any quantum parking spot for neural network analysis and directions
          </p>
        </div>

        <div className="h-[500px] relative bg-gradient-to-b from-gray-800/20 to-gray-900/20">
          <MapContainer
            center={[6.93665, 79.83505]}
            zoom={18}
            className="h-full w-full"
            zoomControl={true}
            minZoom={16}
            maxZoom={20}
          >
            <MapCenter center={[6.936522148462264, 79.835108989812]} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* User Location Marker */}
            <Marker
              position={userLocation}
              icon={new Icon({
                iconUrl: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="userShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#1e40af" flood-opacity="0.4"/>
                      </filter>
                    </defs>
                    <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="4" filter="url(#userShadow)"/>
                    <circle cx="20" cy="20" r="8" fill="white"/>
                    <text x="20" y="25" text-anchor="middle" fill="#3b82f6" font-size="10" font-weight="bold">YOU</text>
                  </svg>
                `))),
                iconSize: [40, 40],
                iconAnchor: [20, 20],
              })}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">Your Location</p>
                </div>
              </Popup>
            </Marker>

            {/* Parking Location Markers */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.position}
                icon={new Icon({
                  iconUrl: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(`
                    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="locationShadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.4"/>
                        </filter>
                      </defs>
                      <rect x="5" y="5" width="50" height="50" rx="12" fill="#1f2937" stroke="#374151" stroke-width="4" filter="url(#locationShadow)"/>
                      <rect x="8" y="8" width="44" height="44" rx="8" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
                      <text x="30" y="38" text-anchor="middle" fill="white" font-size="20" font-weight="bold" font-family="Arial, sans-serif">P</text>
                    </svg>
                  `))),
                  iconSize: [60, 60],
                  iconAnchor: [30, 30],
                })}
              >
                <Popup>
                  <div className="text-center min-w-[200px]">
                    <h4 className="font-semibold text-gray-800 mb-2">{location.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center justify-between">
                        <span className="text-green-600 font-medium">Available:</span>
                        <span className="font-semibold">{location.availableSlots}</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span>{location.totalSlots}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleSlotClick(location.slots[0])}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Row Labels */}
            {locations.map((location) => {
              const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
              return rows.map((row) => {
                const rowSlots = location.slots.filter(slot => slot.id.startsWith(row));
                if (rowSlots.length === 0) return null;
                
                const firstSlot = rowSlots[0];
                const rowLabelPosition: [number, number] = [
                  firstSlot.position[0] - 0.0001,
                  firstSlot.position[1]
                ];
                
                return (
                  <Marker
                    key={`row-${row}`}
                    position={rowLabelPosition}
                    icon={new Icon({
                      iconUrl: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(`
                        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <filter id="rowShadow" x="-50%" y="-50%" width="200%" height="200%">
                              <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#000000" flood-opacity="0.3"/>
                            </filter>
                          </defs>
                          <rect x="3" y="3" width="24" height="24" rx="12" fill="#1f2937" stroke="#374151" stroke-width="2" filter="url(#rowShadow)"/>
                          <rect x="5" y="5" width="20" height="20" rx="10" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
                          <text x="15" y="18" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="Arial, sans-serif">${row}</text>
                        </svg>
                      `))),
                      iconSize: [30, 30],
                      iconAnchor: [15, 15],
                    })}
                  >
                    <Popup>
                      <div className="text-center">
                        <p className="font-semibold">Row {row}</p>
                        <p className="text-sm text-gray-600">
                          {rowSlots.filter(s => s.status === 'available').length} available
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                );
              });
            })}

            {/* Individual Parking Slot Markers */}
            {locations.map((location) =>
              location.slots.map((slot) => (
                <Marker
                  key={slot.id}
                  position={slot.position}
                  icon={createCustomIcon(slot.status, slot.type, slot.id)}
                  eventHandlers={{
                    click: () => handleSlotClick(slot),
                  }}
                >
                  <Popup>
                    <div className="text-center min-w-[150px]">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-lg">
                          {slot.type === 'electric' ? '⚡' : slot.type === 'handicap' ? '♿' : '🚗'}
                        </span>
                        <span className="ml-2 font-semibold capitalize">{slot.status}</span>
                      </div>
                      {slot.price && (
                        <p className="text-sm text-gray-600 mb-2">
                          ${slot.price}/hour
                        </p>
                      )}
                      {slot.amenities && slot.amenities.length > 0 && (
                        <div className="text-xs text-gray-500 mb-2">
                          {slot.amenities.join(', ')}
                        </div>
                      )}
                      <button
                        onClick={() => handleGetDirections(slot)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition-colors"
                      >
                        Get Directions
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
          </MapContainer>
        </div>

        {/* Quantum Legend */}
        <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-t border-gray-700/50">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h4 className="text-lg font-bold text-white">Neural Network Legend</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-400 rounded-lg shadow-lg"></div>
              <span className="font-medium text-gray-200">Available</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-400 rounded-lg shadow-lg"></div>
              <span className="font-medium text-gray-200">Occupied</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg shadow-lg"></div>
              <span className="font-medium text-gray-200">Reserved</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">⚡</span>
              <span className="font-medium text-gray-200">EV Charging</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">♿</span>
              <span className="font-medium text-gray-200">Handicap Accessible</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">🚗</span>
              <span className="font-medium text-gray-200">Standard</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">🏆</span>
              <span className="font-medium text-gray-200">Premium</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">🌧️</span>
              <span className="font-medium text-gray-200">Covered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Slot Details Modal */}
              <AnimatePresence>
                {showDetails && selectedSlot && (
                  <ParkingSlotDetails
                    slot={selectedSlot}
                    onClose={() => setShowDetails(false)}
                    onGetDirections={() => handleGetDirections(selectedSlot)}
                    onReserve={handleReserveSlot}
                  />
                )}
              </AnimatePresence>
    </div>
  );
};

export default ParkingMap;
