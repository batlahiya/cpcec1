import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import { X, MapPin, Car, Clock, Navigation } from 'lucide-react';
import { ParkingSlot } from '../types';
import 'leaflet/dist/leaflet.css';

interface CustomDirectionsMapProps {
  slot: ParkingSlot;
  userLocation: LatLngTuple;
  onClose: () => void;
}

const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 16);
  }, [lat, lng, map]);
  return null;
};

const CustomDirectionsMap: React.FC<CustomDirectionsMapProps> = ({ slot, userLocation, onClose }) => {
  const destination = slot.position;
  
  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance * 1000; // Convert to meters
  };

  const distance = calculateDistance(userLocation[0], userLocation[1], destination[0], destination[1]);
  const estimatedTime = Math.round(distance / 80); // Assuming 80m/min walking speed

  // Create waypoints for a more realistic route
  const createRoute = (start: LatLngTuple, end: LatLngTuple): LatLngTuple[] => {
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    
    // Add some slight curve to make it look more like a real route
    const offsetLat = (end[0] - start[0]) * 0.1;
    const offsetLng = (end[1] - start[1]) * 0.1;
    
    return [
      start,
      [midLat + offsetLat, midLng + offsetLng],
      end
    ];
  };

  const route = createRoute(userLocation, destination);

  const userIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="userShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#1e40af" flood-opacity="0.4"/>
          </filter>
        </defs>
        <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="white" stroke-width="3" filter="url(#userShadow)"/>
        <circle cx="20" cy="20" r="8" fill="white"/>
        <text x="20" y="25" text-anchor="middle" fill="#3b82f6" font-size="10" font-weight="bold">YOU</text>
      </svg>
    `))),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const parkingIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="parkingShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#059669" flood-opacity="0.4"/>
          </filter>
        </defs>
        <rect x="5" y="5" width="30" height="30" rx="8" fill="#10b981" stroke="white" stroke-width="3" filter="url(#parkingShadow)"/>
        <text x="20" y="28" text-anchor="middle" fill="white" font-size="16" font-weight="bold">P</text>
      </svg>
    `))),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Directions to Parking Spot {slot.id}</h3>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>Distance: {Math.round(distance)}m</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-green-500" />
            <span>Time: ~{estimatedTime} min</span>
          </div>
        </div>
      </div>

      <div className="h-[500px] w-full rounded-xl overflow-hidden mb-4">
        <MapContainer
          center={userLocation}
          zoom={16}
          className="h-full w-full"
          zoomControl={true}
        >
          <RecenterAutomatically lat={userLocation[0]} lng={userLocation[1]} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User Location Marker */}
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-blue-600">Your Current Location</p>
                <p className="text-sm text-gray-600">Start your journey here</p>
              </div>
            </Popup>
          </Marker>
          
          {/* Parking Spot Marker */}
          <Marker position={destination} icon={parkingIcon}>
            <Popup>
              <div className="text-center min-w-[200px]">
                <p className="font-semibold text-green-600">Parking Spot {slot.id}</p>
                <p className="text-sm text-gray-600">Your destination</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs">Type: {slot.type === 'electric' ? 'Electric' : slot.type === 'handicap' ? 'Handicap' : 'Standard'}</p>
                  <p className="text-xs">Price: ${slot.price}/hour</p>
                  {slot.amenities && slot.amenities.length > 0 && (
                    <p className="text-xs">Amenities: {slot.amenities.join(', ')}</p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
          
          {/* Route Line */}
          <Polyline 
            positions={route} 
            color="#3b82f6" 
            weight={6} 
            opacity={0.8} 
            dashArray="10, 10"
          />
        </MapContainer>
      </div>

      {/* Directions Steps */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <Navigation className="w-5 h-5 mr-2 text-blue-500" />
          Turn-by-Turn Directions
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <p className="text-gray-700">Start from your current location</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <p className="text-gray-700">Head towards the parking area (follow the blue route)</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <p className="text-gray-700">Arrive at Parking Spot {slot.id}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <Car className="w-4 h-4" />
              <span>Walking Route</span>
            </div>
            <div className="text-gray-600">
              {Math.round(distance)}m • {estimatedTime} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDirectionsMap;

