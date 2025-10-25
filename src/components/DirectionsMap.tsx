import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import { ParkingSlot } from '../types';
import 'leaflet/dist/leaflet.css';

interface DirectionsMapProps {
  slot: ParkingSlot;
  userLocation: LatLngTuple;
  onClose: () => void;
}

const DirectionsMap: React.FC<DirectionsMapProps> = ({ slot, userLocation, onClose }) => {
  const createCustomIcon = (type: 'user' | 'destination', slotType?: string) => {
    if (type === 'user') {
      const svgString = `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="userShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#1e40af" flood-opacity="0.4"/>
          </filter>
        </defs>
        <circle cx="15" cy="15" r="12" fill="#3b82f6" stroke="white" stroke-width="3" filter="url(#userShadow)"/>
        <circle cx="15" cy="15" r="6" fill="white"/>
        <text x="15" y="18" text-anchor="middle" fill="#3b82f6" font-size="8" font-weight="bold">YOU</text>
      </svg>`;
      
      return new Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    } else {
      const colors = {
        available: { bg: '#10b981', border: '#059669' },
        occupied: { bg: '#ef4444', border: '#dc2626' },
        reserved: { bg: '#f59e0b', border: '#d97706' }
      };
      
      const color = colors[slot.status as keyof typeof colors];
      const iconType = slotType === 'electric' ? '⚡' : slotType === 'handicap' ? '♿' : '🚗';
      
      const svgString = `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="destShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="${color.border}" flood-opacity="0.4"/>
          </filter>
        </defs>
        <rect x="3" y="3" width="24" height="24" rx="4" fill="${color.bg}" stroke="${color.border}" stroke-width="2" filter="url(#destShadow)"/>
        <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${iconType}</text>
      </svg>`;
      
      return new Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-blue-500" />
            Directions to Parking Spot #{slot.id}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-gray-500">✕</span>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {slot.distance} meters away • {slot.price ? `$${slot.price}/hour` : 'Free'}
        </p>
      </div>

      <div className="h-[300px] relative">
        <MapContainer
          center={[6.93665, 79.83505]}
          zoom={18}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User Location */}
          <Marker
            position={userLocation}
            icon={createCustomIcon('user')}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Your Location</p>
              </div>
            </Popup>
          </Marker>

          {/* Destination Parking Slot */}
          <Marker
            position={slot.position}
            icon={createCustomIcon('destination', slot.type)}
          >
            <Popup>
              <div className="text-center min-w-[150px]">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg">
                    {slot.type === 'electric' ? '⚡' : slot.type === 'handicap' ? '♿' : '🚗'}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Parking Spot #{slot.id}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {slot.type === 'electric' ? 'Electric Vehicle' : 
                   slot.type === 'handicap' ? 'Accessible' : 'Standard'} Parking
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    slot.status === 'available' ? 'bg-green-100 text-green-800' :
                    slot.status === 'occupied' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                  </span>
                  {slot.price && (
                    <span className="font-semibold text-gray-800">
                      ${slot.price}/hr
                    </span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full ${
                slot.status === 'available' ? 'bg-green-500' :
                slot.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span>Parking Spot</span>
            </div>
          </div>
          <div className="text-gray-600">
            Distance: {slot.distance}m
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionsMap;
