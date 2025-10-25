import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, Zap, Shield, Navigation, Star, Wifi, Car } from 'lucide-react';
import { ParkingSlot } from '../types';
import CustomDirectionsMap from './CustomDirectionsMap';

interface ParkingSlotDetailsProps {
  slot: ParkingSlot;
  onClose: () => void;
  onGetDirections: () => void;
  onReserve?: (slot: ParkingSlot) => void;
}

const ParkingSlotDetails: React.FC<ParkingSlotDetailsProps> = ({
  slot,
  onClose,
  onGetDirections,
  onReserve
}) => {
  const [showDirections, setShowDirections] = useState(false);
  const [userLocation] = useState<[number, number]>([6.936522148462264, 79.835108989812]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'occupied':
        return 'text-red-600 bg-red-100';
      case 'reserved':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'electric':
        return <Zap className="w-5 h-5 text-blue-500" />;
      case 'handicap':
        return <Shield className="w-5 h-5 text-purple-500" />;
      default:
        return <Car className="w-5 h-5 text-gray-500" />;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'ev charging':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'covered':
        return <Shield className="w-4 h-4 text-gray-500" />;
      case 'scenic view':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'wifi':
        return <Wifi className="w-4 h-4 text-green-500" />;
      default:
        return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleGetDirections = () => {
    setShowDirections(true);
    onGetDirections();
  };

  if (showDirections) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
        onClick={() => setShowDirections(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <CustomDirectionsMap
            slot={slot}
            userLocation={userLocation}
            onClose={() => setShowDirections(false)}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getTypeIcon(slot.type)}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Parking Spot #{slot.id.split('-')[1]}
                </h3>
                <p className="text-sm text-gray-600">
                  {slot.type === 'electric' ? 'Electric Vehicle' : 
                   slot.type === 'handicap' ? 'Accessible' : 'Standard'} Parking
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(slot.status)}`}>
              {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
            </span>
          </div>

          {/* Pricing */}
          {slot.price && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Hourly Rate
              </span>
              <span className="text-lg font-semibold text-gray-800">
                ${slot.price}/hour
              </span>
            </div>
          )}

          {/* Distance */}
          {slot.distance && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Distance
              </span>
              <span className="text-sm text-gray-800">
                {slot.distance || 0} meters away
              </span>
            </div>
          )}

          {/* Amenities */}
          {slot.amenities && slot.amenities.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {slot.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">Real-time Updates</h4>
                <p className="text-xs text-blue-600">
                  This parking spot status is updated in real-time. Availability may change quickly.
                </p>
              </div>
            </div>
          </div>

          {/* Custom Directions Info */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Navigation className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800 mb-1">Interactive Directions</h4>
                <p className="text-xs text-green-600">
                  Click "Get Directions" to open an interactive map with turn-by-turn directions and route visualization.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetDirections}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Navigation className="w-5 h-5" />
              <span>Get Directions</span>
            </motion.button>

            {slot.status === 'available' && onReserve && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onReserve(slot)}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Reserve This Spot</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            Parking availability is subject to change. Please verify before arriving.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ParkingSlotDetails;
