import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Wind, Droplets, Eye, Gauge, Sunrise, MapPin, Satellite, Zap, AlertTriangle, Activity } from 'lucide-react';

interface WeatherCommandCenterProps {
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
    feelsLike: number;
    dewPoint: number;
    cloudCover: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    windSpeed: number;
    humidity: number;
  }>;
  alerts: Array<{
    type: 'warning' | 'info' | 'severe';
    title: string;
    description: string;
    severity: number;
  }>;
  satellite: {
    image: string;
    lastUpdate: string;
    coverage: number;
  };
}

const WeatherCommandCenter: React.FC<WeatherCommandCenterProps> = ({ onClose }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [viewMode, setViewMode] = useState<'overview' | 'satellite' | 'radar' | 'forecast'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setWeatherData({
        current: {
          temperature: 28,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          pressure: 1013,
          uvIndex: 7,
          icon: '⛅',
          feelsLike: 31,
          dewPoint: 22,
          cloudCover: 45
        },
        forecast: [
          { date: 'Today', high: 30, low: 22, condition: 'Partly Cloudy', icon: '⛅', precipitation: 20, windSpeed: 12, humidity: 65 },
          { date: 'Tomorrow', high: 32, low: 24, condition: 'Sunny', icon: '☀️', precipitation: 5, windSpeed: 8, humidity: 55 },
          { date: 'Wednesday', high: 29, low: 21, condition: 'Rainy', icon: '🌧️', precipitation: 80, windSpeed: 15, humidity: 85 },
          { date: 'Thursday', high: 27, low: 19, condition: 'Cloudy', icon: '☁️', precipitation: 40, windSpeed: 10, humidity: 70 },
          { date: 'Friday', high: 31, low: 23, condition: 'Sunny', icon: '☀️', precipitation: 10, windSpeed: 6, humidity: 50 },
          { date: 'Saturday', high: 33, low: 25, condition: 'Hot', icon: '🔥', precipitation: 0, windSpeed: 4, humidity: 45 },
          { date: 'Sunday', high: 30, low: 22, condition: 'Partly Cloudy', icon: '⛅', precipitation: 15, windSpeed: 9, humidity: 60 }
        ],
        alerts: [
          { type: 'warning', title: 'UV Index High', description: 'UV index is 7 - High risk. Use sunscreen and seek shade.', severity: 7 },
          { type: 'info', title: 'Heat Advisory', description: 'Temperatures expected to reach 33°C on Saturday.', severity: 3 },
          { type: 'severe', title: 'Thunderstorm Warning', description: 'Severe thunderstorms possible Wednesday evening.', severity: 9 }
        ],
        satellite: {
          image: '🛰️',
          lastUpdate: new Date().toISOString(),
          coverage: 95
        }
      });
      setLoading(false);
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate data refresh
        console.log('Refreshing weather data...');
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getAlertColor = (type: string, severity: number) => {
    if (type === 'severe' || severity > 7) {
      return 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400';
    } else if (type === 'warning' || severity > 4) {
      return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400';
    } else {
      return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
    }
  };

  const getSeverityIcon = (severity: number) => {
    if (severity > 7) return <AlertTriangle className="w-5 h-5" />;
    if (severity > 4) return <Zap className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center z-[9999] p-4"
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
              />
              <p className="text-white text-lg">Initializing Weather Command Center...</p>
              <p className="text-gray-400 text-sm mt-2">Connecting to satellite network...</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (!weatherData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, rotateX: -5 }}
        animate={{ scale: 1, rotateX: 0 }}
        exit={{ scale: 0.9, rotateX: 5 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto border border-blue-700/50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command Center Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-800/90 to-indigo-900/90 backdrop-blur-xl border-b border-blue-700/50 p-6 z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center"
              >
                <Satellite className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Weather Command Center
                </h2>
                <p className="text-gray-300">Real-time atmospheric monitoring and analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-300">Auto Refresh</span>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full transition-colors text-gray-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Command Center Controls */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
                { id: 'satellite', label: 'Satellite', icon: <Satellite className="w-4 h-4" /> },
                { id: 'radar', label: 'Radar', icon: <Activity className="w-4 h-4" /> },
                { id: 'forecast', label: 'Forecast', icon: <Sunrise className="w-4 h-4" /> }
              ].map((mode) => (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode.id as any)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    viewMode === mode.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Last Update: {new Date().toLocaleTimeString()}
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                  autoRefresh
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-700/50 text-gray-300 border border-gray-600/50'
                }`}
              >
                {autoRefresh ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {viewMode === 'overview' && (
            <>
              {/* Current Weather Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Weather Display */}
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
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
                      <div className="text-sm text-gray-400">Feels like</div>
                      <div className="text-2xl font-bold text-white">{weatherData.current.feelsLike}°C</div>
                    </div>
                  </div>

                  {/* Weather Metrics Grid */}
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
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                    Weather Alerts
                  </h4>
                  {weatherData.alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl bg-gradient-to-r ${getAlertColor(alert.type, alert.severity).split(' ')[0]} ${getAlertColor(alert.type, alert.severity).split(' ')[1]} border ${getAlertColor(alert.type, alert.severity).split(' ')[2]}`}
                    >
                      <div className="flex items-start space-x-3">
                        {getSeverityIcon(alert.severity)}
                        <div>
                          <h5 className="font-semibold mb-1">{alert.title}</h5>
                          <p className="text-sm opacity-90">{alert.description}</p>
                          <div className="mt-2 text-xs opacity-75">
                            Severity: {alert.severity}/10
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

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
            </>
          )}

          {viewMode === 'satellite' && (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-8xl mb-4"
              >
                {weatherData.satellite.image}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Satellite View</h3>
              <p className="text-gray-400">Real-time satellite imagery and cloud coverage analysis</p>
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-400">{weatherData.satellite.coverage}%</div>
                  <div className="text-sm text-gray-400">Cloud Coverage</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-400">Live</div>
                  <div className="text-sm text-gray-400">Status</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400">HD</div>
                  <div className="text-sm text-gray-400">Quality</div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'radar' && (
            <div className="text-center py-12">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-4"
              >
                📡
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Radar View</h3>
              <p className="text-gray-400">Precipitation radar and storm tracking</p>
            </div>
          )}

          {viewMode === 'forecast' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Detailed Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weatherData.forecast.map((day, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6"
                  >
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-white">{day.date}</h4>
                      <div className="text-4xl my-2">{day.icon}</div>
                      <p className="text-gray-400">{day.condition}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">High:</span>
                        <span className="text-white font-bold">{day.high}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Low:</span>
                        <span className="text-white font-bold">{day.low}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Precipitation:</span>
                        <span className="text-blue-400 font-bold">{day.precipitation}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Wind:</span>
                        <span className="text-gray-300">{day.windSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Humidity:</span>
                        <span className="text-gray-300">{day.humidity}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherCommandCenter;
