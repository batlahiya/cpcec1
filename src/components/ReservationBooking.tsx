import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Calendar, Clock, MapPin, Phone, Star, Zap, Wifi, Utensils, Hotel, Sparkles, Mic, Gamepad, Heart, Share2, ArrowRight, ChevronRight } from 'lucide-react';
import { mockVenues, Venue } from '../data/mockData';

interface ReservationBookingProps {
  onClose: () => void;
}

const ReservationBooking: React.FC<ReservationBookingProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const reservationTypes = [
    { 
      id: 'restaurant', 
      name: 'Restaurant', 
      icon: <Utensils className="w-8 h-8 text-blue-400" />, 
      description: 'Book a table at your favorite restaurant',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400'
    },
    { 
      id: 'hotel', 
      name: 'Hotel', 
      icon: <Hotel className="w-8 h-8 text-purple-400" />, 
      description: 'Reserve a room for your stay',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400'
    },
    { 
      id: 'spa', 
      name: 'Spa & Wellness', 
      icon: <Sparkles className="w-8 h-8 text-pink-400" />, 
      description: 'Book a relaxing spa treatment',
      color: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-400'
    },
    { 
      id: 'event', 
      name: 'Event', 
      icon: <Mic className="w-8 h-8 text-green-400" />, 
      description: 'Book tickets for events and shows',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400'
    },
    { 
      id: 'entertainment', 
      name: 'Entertainment', 
      icon: <Gamepad className="w-8 h-8 text-yellow-400" />, 
      description: 'Reserve a spot at gaming centers or attractions',
      color: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-500/30',
      textColor: 'text-yellow-400'
    }
  ];

  const filteredVenues = selectedType 
    ? mockVenues.filter(venue => venue.type === selectedType)
    : mockVenues;

  const availableDates = selectedVenue 
    ? selectedVenue.availability.map(a => a.date)
    : [];

  const availableTimes = selectedVenue && selectedDate
    ? selectedVenue.availability.find(a => a.date === selectedDate)?.timeSlots || []
    : [];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
    setStep(2);
  };

  const handleSelectVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setStep(3);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };


  const handleBack = () => {
    if (step > 1) {
      if (step === 2) {
        setSelectedType('');
        setSelectedVenue(null);
      } else if (step === 3) {
        setSelectedDate('');
        setSelectedTime('');
      }
      setStep(step - 1);
    }
  };

  const handleBooking = async () => {
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBookingId = `BK${Date.now().toString().slice(-6)}`;
    setBookingId(newBookingId);
    setBookingConfirmed(true);
    setIsBooking(false);
    setStep(4);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'ev charging': return <Zap className="w-4 h-4 text-blue-400" />;
      case 'harbor view': return <MapPin className="w-4 h-4 text-teal-400" />;
      case 'molecular cuisine': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'ai chef': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'holographic menu': return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'vr dining': return <Gamepad className="w-4 h-4 text-green-400" />;
      case 'zero-gravity pods': return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'ai concierge': return <Zap className="w-4 h-4 text-blue-400" />;
      case 'smart mirrors': return <Zap className="w-4 h-4 text-purple-400" />;
      case 'cryotherapy': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'float tanks': return <Wifi className="w-4 h-4 text-teal-400" />;
      case 'ai wellness': return <Zap className="w-4 h-4 text-green-400" />;
      case 'holographic presentations': return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'vr meeting rooms': return <Gamepad className="w-4 h-4 text-orange-400" />;
      case 'full-body vr': return <Gamepad className="w-4 h-4 text-red-400" />;
      case 'haptic suits': return <Zap className="w-4 h-4 text-pink-400" />;
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriceRangeColor = (priceRange: string) => {
    if (priceRange.includes('LKR 20,000+')) return 'text-purple-400';
    if (priceRange.includes('LKR 10,000+')) return 'text-red-400';
    if (priceRange.includes('LKR 4,000-10,000')) return 'text-orange-400';
    if (priceRange.includes('LKR 1,500-4,000')) return 'text-yellow-400';
    if (priceRange.includes('LKR') && priceRange.includes('1,000')) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border border-blue-700/50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-b border-blue-700/50 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Smart Reservations
                </h2>
                <p className="text-gray-400">Book your perfect experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full transition-colors text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Step {step} of 4</span>
              <span className="text-sm text-gray-400">{Math.round((step / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full shadow-lg shadow-blue-500/25"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Reservation Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">What would you like to book?</h3>
                  <p className="text-gray-400">Choose your experience type to get started</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reservationTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectType(type.id)}
                      className={`p-8 rounded-2xl bg-gradient-to-br ${type.color} border ${type.borderColor} backdrop-blur-sm text-left transition-all duration-300 hover:shadow-xl group`}
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          {type.icon}
                        </div>
                        <div>
                          <h4 className={`text-xl font-bold ${type.textColor} mb-2`}>{type.name}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{type.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                          <span>Get Started</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Venue Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Choose Your Venue</h3>
                    <p className="text-gray-400">Select from our premium {selectedType} options</p>
                  </div>
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredVenues.map((venue) => (
                    <motion.div
                      key={venue.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectVenue(venue)}
                      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden cursor-pointer group hover:border-blue-500/50 transition-all duration-300"
                    >
                      {/* Venue Image */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-8xl opacity-80">{venue.image}</div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                          <div className="flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm font-medium">{venue.rating}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full bg-black/50 ${getPriceRangeColor(venue.priceRange)} text-sm font-medium`}>
                            {venue.priceRange}
                          </div>
                        </div>
                      </div>

                      {/* Venue Details */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">{venue.name}</h4>
                            <p className="text-gray-400 text-sm mb-2">{venue.category}</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{venue.description}</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {venue.amenities.slice(0, 3).map((amenity, index) => (
                              <div key={index} className="flex items-center space-x-1 bg-gray-700/50 px-3 py-1 rounded-full">
                                {getAmenityIcon(amenity)}
                                <span className="text-gray-300 text-xs">{amenity}</span>
                              </div>
                            ))}
                            {venue.amenities.length > 3 && (
                              <div className="bg-gray-700/50 px-3 py-1 rounded-full">
                                <span className="text-gray-300 text-xs">+{venue.amenities.length - 3} more</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Location & Contact */}
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{venue.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{venue.contact}</span>
                          </div>
                        </div>

                        {/* Select Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <span>Select This Venue</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Booking Details */}
            {step === 3 && selectedVenue && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Complete Your Booking</h3>
                    <p className="text-gray-400">Fill in your details and preferences</p>
                  </div>
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Selected Venue Card */}
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      Selected Venue
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{selectedVenue.image}</div>
                        <div>
                          <h5 className="text-lg font-semibold text-white">{selectedVenue.name}</h5>
                          <p className="text-gray-400 text-sm">{selectedVenue.category}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white text-sm">{selectedVenue.rating}</span>
                            </div>
                            <div className={`text-sm ${getPriceRangeColor(selectedVenue.priceRange)}`}>
                              {selectedVenue.priceRange}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedVenue.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="space-y-6">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Select Date</label>
                      <div className="grid grid-cols-2 gap-3">
                        {availableDates.map((date) => (
                          <motion.button
                            key={date}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDateSelect(date)}
                            className={`p-3 rounded-xl border transition-all duration-300 ${
                              selectedDate === date
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                : 'bg-gray-700/50 border-gray-600/50 text-gray-300 hover:border-blue-500/50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm font-medium">{new Date(date).toLocaleDateString()}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">Select Time</label>
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimes.map((time) => (
                            <motion.button
                              key={time}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleTimeSelect(time)}
                              className={`p-3 rounded-xl border transition-all duration-300 ${
                                selectedTime === time
                                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                  : 'bg-gray-700/50 border-gray-600/50 text-gray-300 hover:border-green-500/50'
                              }`}
                            >
                              <div className="flex items-center justify-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">{time}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Guest Count */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Number of Guests</label>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleInputChange('guests', Math.max(1, formData.guests - 1))}
                          className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-white font-medium min-w-[2rem] text-center">{formData.guests}</span>
                        <button
                          onClick={() => handleInputChange('guests', Math.min(20, formData.guests + 1))}
                          className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests (Optional)</label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                          placeholder="Any special requests or dietary requirements?"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || isBooking}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isBooking ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Confirm Booking</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Booking Confirmation */}
            {step === 4 && bookingConfirmed && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-8"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl"
                  />
                </div>

                <div className="space-y-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-3xl font-bold text-white"
                  >
                    Booking Confirmed! 🎉
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-gray-400 text-lg"
                  >
                    Your reservation has been successfully created
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-2">Booking ID: {bookingId}</div>
                    <div className="space-y-2 text-gray-300">
                      <p><strong>Venue:</strong> {selectedVenue?.name}</p>
                      <p><strong>Date:</strong> {selectedDate && new Date(selectedDate).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {selectedTime}</p>
                      <p><strong>Guests:</strong> {formData.guests}</p>
                      <p><strong>Contact:</strong> {formData.email}</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Done</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setSelectedType('');
                      setSelectedVenue(null);
                      setSelectedDate('');
                      setSelectedTime('');
                      setFormData({ name: '', email: '', phone: '', guests: 1, specialRequests: '' });
                      setBookingConfirmed(false);
                      setBookingId('');
                    }}
                    className="px-8 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Book Another</span>
                    <Calendar className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReservationBooking;