import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Sun, Wind, Droplets, Eye, Gauge, Sunrise, MapPin, Glasses, Umbrella, Car, Plane } from 'lucide-react';

interface WeatherInfoProps {
  onClose: () => void;
}

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
    uvIndex: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  alerts: Array<{
    type: 'warning' | 'info' | 'severe';
    title: string;
    description: string;
  }>;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ onClose }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    // Simulate API call
    const fetchWeatherData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setWeatherData({
        current: {
          temperature: 28,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          pressure: 1013,
          uvIndex: 7,
          icon: '⛅'
        },
        forecast: [
          { date: 'Today', high: 30, low: 22, condition: 'Partly Cloudy', icon: '⛅', precipitation: 20 },
          { date: 'Tomorrow', high: 32, low: 24, condition: 'Sunny', icon: '☀️', precipitation: 5 },
          { date: 'Wednesday', high: 29, low: 21, condition: 'Rainy', icon: '🌧️', precipitation: 80 },
          { date: 'Thursday', high: 27, low: 19, condition: 'Cloudy', icon: '☁️', precipitation: 40 },
          { date: 'Friday', high: 31, low: 23, condition: 'Sunny', icon: '☀️', precipitation: 10 },
          { date: 'Saturday', high: 33, low: 25, condition: 'Hot', icon: '🔥', precipitation: 0 },
          { date: 'Sunday', high: 30, low: 22, condition: 'Partly Cloudy', icon: '⛅', precipitation: 15 }
        ],
        alerts: [
          { type: 'info', title: 'UV Index High', description: 'UV index is 7 - High risk. Use sunscreen and seek shade.' },
          { type: 'warning', title: 'Heat Advisory', description: 'Temperatures expected to reach 33°C on Saturday.' }
        ]
      });
      setLoading(false);
    };

    fetchWeatherData();
  }, []);


  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400';
      case 'severe': return 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400';
      case 'info': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400';
    }
  };

  const getRecommendations = () => {
    if (!weatherData) return [];
    
    const recommendations = [];
    const { current, forecast } = weatherData;
    
    if (current.uvIndex > 6) {
      recommendations.push({
        icon: <Glasses className="w-6 h-6 text-yellow-400" />,
        title: 'Wear Sunglasses',
        description: 'High UV index detected. Protect your eyes from harmful rays.',
        color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      });
    }
    
    if (current.temperature > 30) {
      recommendations.push({
        icon: <Umbrella className="w-6 h-6 text-blue-400" />,
        title: 'Stay Hydrated',
        description: 'Hot weather ahead. Drink plenty of water and stay cool.',
        color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
      });
    }
    
    if (forecast[selectedDay]?.precipitation > 50) {
      recommendations.push({
        icon: <Umbrella className="w-6 h-6 text-blue-400" />,
        title: 'Bring an Umbrella',
        description: 'High chance of rain. Keep dry and stay safe.',
        color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
      });
    }
    
    if (current.windSpeed > 15) {
      recommendations.push({
        icon: <Wind className="w-6 h-6 text-gray-400" />,
        title: 'Windy Conditions',
        description: 'Strong winds detected. Secure loose items and drive carefully.',
        color: 'from-gray-500/20 to-gray-600/20 border-gray-500/30'
      });
    }
    
    return recommendations;
  };

  if (loading) {
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
          className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-700/50 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Loading weather data...</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (!weatherData) return null;

  const recommendations = getRecommendations();

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
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Port City Weather
                </h2>
                <p className="text-gray-400">Real-time weather information and forecasts</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full transition-colors text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{weatherData.current.icon}</div>
                <div>
                  <h3 className="text-4xl font-bold text-white">{weatherData.current.temperature}°C</h3>
                  <p className="text-xl text-gray-300">{weatherData.current.condition}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Port City, Sri Lanka</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Last updated</p>
                <p className="text-sm text-white">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{weatherData.current.humidity}%</p>
                <p className="text-sm text-gray-400">Humidity</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <Wind className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{weatherData.current.windSpeed} km/h</p>
                <p className="text-sm text-gray-400">Wind Speed</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <Eye className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{weatherData.current.visibility} km</p>
                <p className="text-sm text-gray-400">Visibility</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <Gauge className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{weatherData.current.pressure} hPa</p>
                <p className="text-sm text-gray-400">Pressure</p>
              </div>
            </div>
          </div>

          {/* Weather Alerts */}
          {weatherData.alerts.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white">Weather Alerts</h4>
              {weatherData.alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl bg-gradient-to-r ${getAlertColor(alert.type).split(' ')[0]} ${getAlertColor(alert.type).split(' ')[1]} border ${getAlertColor(alert.type).split(' ')[2]}`}
                >
                  <h5 className="font-semibold mb-1">{alert.title}</h5>
                  <p className="text-sm opacity-90">{alert.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* 7-Day Forecast */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">7-Day Forecast</h4>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {weatherData.forecast.map((day, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(index)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    selectedDay === index
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-blue-500/50'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm font-medium mb-2">{day.date}</p>
                    <div className="text-3xl mb-2">{day.icon}</div>
                    <div className="space-y-1">
                      <p className="text-lg font-bold">{day.high}°</p>
                      <p className="text-sm opacity-70">{day.low}°</p>
                      <p className="text-xs opacity-60">{day.precipitation}%</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Smart Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl bg-gradient-to-r ${rec.color.split(' ')[0]} ${rec.color.split(' ')[1]} border ${rec.color.split(' ')[2]}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-800/50 rounded-lg">
                        {rec.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">{rec.title}</h5>
                        <p className="text-sm opacity-90">{rec.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Suggestions */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Activity Suggestions</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Car className="w-6 h-6 text-green-400" />
                  <h5 className="font-semibold text-green-400">Outdoor Activities</h5>
                </div>
                <p className="text-sm text-gray-300">Perfect weather for outdoor adventures and sightseeing.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Plane className="w-6 h-6 text-blue-400" />
                  <h5 className="font-semibold text-blue-400">Travel Conditions</h5>
                </div>
                <p className="text-sm text-gray-300">Excellent conditions for air travel and transportation.</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Sunrise className="w-6 h-6 text-purple-400" />
                  <h5 className="font-semibold text-purple-400">Best Times</h5>
                </div>
                <p className="text-sm text-gray-300">Early morning and evening offer the most comfortable conditions.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherInfo;
