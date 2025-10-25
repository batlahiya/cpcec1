import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, MapPin, Car, Shield, Trophy, Target } from 'lucide-react';
import { mockParkingLocations } from '../data/mockData';
import { ParkingLocation, ParkingSlot } from '../types';

interface ParkingGameProps {
  onClose: () => void;
}

const ParkingGame: React.FC<ParkingGameProps> = ({ onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [gameMode, setGameMode] = useState<'hunt' | 'reserve' | 'battle'>('hunt');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [powerUps, setPowerUps] = useState<string[]>([]);
  const [showSlotDetails, setShowSlotDetails] = useState(false);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = (mode: 'hunt' | 'reserve' | 'battle') => {
    setGameMode(mode);
    setIsPlaying(true);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setPowerUps([]);
  };

  const handleSlotClick = (slot: ParkingSlot) => {
    if (!isPlaying) return;
    
    if (slot.status === 'available') {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      
      // Add power-ups based on streak
      if (streak % 5 === 0) {
        const newPowerUp = ['time_boost', 'double_points', 'reveal_all'][Math.floor(Math.random() * 3)];
        setPowerUps(prev => [...prev, newPowerUp]);
      }
      
      setSelectedSlot(slot);
      setShowSlotDetails(true);
    } else {
      setStreak(0);
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  const getSlotStyle = (slot: ParkingSlot) => {
    const baseStyle = "w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 hover:scale-125";
    
    if (slot.status === 'available') {
      return `${baseStyle} bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50 animate-pulse`;
    } else if (slot.status === 'occupied') {
      return `${baseStyle} bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/50`;
    } else {
      return `${baseStyle} bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50`;
    }
  };

  const getGameModeColor = (mode: string) => {
    switch (mode) {
      case 'hunt': return 'from-green-500 to-emerald-600';
      case 'reserve': return 'from-blue-500 to-cyan-600';
      case 'battle': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getGameModeIcon = (mode: string) => {
    switch (mode) {
      case 'hunt': return <Target className="w-6 h-6" />;
      case 'reserve': return <Shield className="w-6 h-6" />;
      case 'battle': return <Zap className="w-6 h-6" />;
      default: return <Car className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotateY: -15 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.8, rotateY: 15 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border border-purple-500/50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Game Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-800/90 to-indigo-900/90 backdrop-blur-xl border-b border-purple-500/50 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Quantum Parking Arena
                </h2>
                <p className="text-gray-300">Gamified parking experience with real-time challenges</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full transition-colors text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Game Stats */}
          {isPlaying && (
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 text-center border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">{score}</div>
                <div className="text-sm text-green-300">Score</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 text-center border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-400">{streak}</div>
                <div className="text-sm text-blue-300">Streak</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 text-center border border-orange-500/30">
                <div className="text-2xl font-bold text-orange-400">{timeLeft}</div>
                <div className="text-sm text-orange-300">Time</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 text-center border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400">{powerUps.length}</div>
                <div className="text-sm text-purple-300">Power-ups</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {!isPlaying ? (
            /* Game Mode Selection */
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Choose Your Parking Adventure</h3>
                <p className="text-gray-400">Each mode offers a unique challenge and rewards</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    mode: 'hunt',
                    title: 'Spot Hunter',
                    description: 'Find available parking spots as fast as possible. Race against time!',
                    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
                    icon: <Target className="w-8 h-8 text-green-400" />,
                    difficulty: 'Easy',
                    rewards: 'Speed bonuses, time extensions'
                  },
                  {
                    mode: 'reserve',
                    title: 'Reservation Master',
                    description: 'Strategically reserve premium spots. Think ahead to maximize points!',
                    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
                    icon: <Shield className="w-8 h-8 text-blue-400" />,
                    difficulty: 'Medium',
                    rewards: 'Strategic bonuses, premium spots'
                  },
                  {
                    mode: 'battle',
                    title: 'Parking Battle',
                    description: 'Compete with other players in real-time. Last one standing wins!',
                    color: 'from-red-500/20 to-pink-500/20 border-red-500/30',
                    icon: <Zap className="w-8 h-8 text-red-400" />,
                    difficulty: 'Hard',
                    rewards: 'Competitive rankings, exclusive rewards'
                  }
                ].map((game) => (
                  <motion.button
                    key={game.mode}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startGame(game.mode as any)}
                    className={`p-8 rounded-2xl bg-gradient-to-br ${game.color} border backdrop-blur-sm text-left transition-all duration-300 hover:shadow-2xl group`}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        {game.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{game.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">{game.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-1 bg-gray-700/50 rounded-full text-gray-300">
                            {game.difficulty}
                          </span>
                          <span className="text-gray-400">{game.rewards}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            /* Game Interface */
            <div className="space-y-6">
              {/* Game Mode Indicator */}
              <div className="flex items-center justify-center">
                <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${getGameModeColor(gameMode)} text-white font-bold flex items-center space-x-2`}>
                  {getGameModeIcon(gameMode)}
                  <span className="capitalize">{gameMode} Mode</span>
                </div>
              </div>

              {/* Power-ups */}
              {powerUps.length > 0 && (
                <div className="flex justify-center space-x-2">
                  {powerUps.map((powerUp, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full font-bold"
                    >
                      {powerUp.replace('_', ' ').toUpperCase()}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Parking Locations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockParkingLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-white">{location.name}</h4>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-400">{location.availableSlots} available</span>
                        </div>
                      </div>

                      {/* Parking Grid */}
                      <div className="grid grid-cols-10 gap-1 mb-4">
                        {location.slots.slice(0, 50).map((slot) => (
                          <motion.button
                            key={slot.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSlotClick(slot)}
                            className={getSlotStyle(slot)}
                            title={`${slot.id} - ${slot.status} - $${slot.price}/hr`}
                          >
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                              {slot.id.charAt(0)}
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <span>Occupied</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <span>Reserved</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedSlot(location.slots[0])}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Game Controls */}
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(false)}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-medium transition-all duration-300"
                >
                  Pause Game
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setScore(0);
                    setStreak(0);
                    setTimeLeft(60);
                    setPowerUps([]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium transition-all duration-300"
                >
                  Reset Game
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Slot Details Modal */}
        <AnimatePresence>
          {showSlotDetails && selectedSlot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
              onClick={() => setShowSlotDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.8, rotateY: -15 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.8, rotateY: 15 }}
                className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full border border-purple-500/50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Trophy className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Great Find!</h3>
                  <p className="text-gray-400 mb-6">You found an available parking spot!</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Spot ID:</span>
                      <span className="text-white font-bold">{selectedSlot.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-green-400 font-bold">${selectedSlot.price}/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-blue-400 font-bold capitalize">{selectedSlot.type}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSlotDetails(false)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                    >
                      Reserve Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSlotDetails(false)}
                      className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-medium transition-all duration-300"
                    >
                      Keep Hunting
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ParkingGame;
