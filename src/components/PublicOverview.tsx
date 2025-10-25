import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveHeatMap from './InteractiveHeatMap';
import { 
  Shield, 
  Eye, 
  Camera, 
  AlertTriangle, 
  Users, 
  Search, 
  Heart,
  Activity,
  Zap,
  CheckCircle,
  Play,
  Pause,
  RefreshCw,
  MapPin,
  Clock,
  TrendingUp,
  Settings,
  Maximize2,
  Minimize2,
  Filter,
  Download,
  AlertCircle,
  Thermometer,
  Gauge,
  Circle,
  ChevronDown
} from 'lucide-react';

interface PublicOverviewProps {
  onClose: () => void;
}

const PublicOverview: React.FC<PublicOverviewProps> = ({ onClose }) => {
  const [isLive, setIsLive] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveData, setLiveData] = useState({
    activeIncidents: 3,
    crowdDensity: 78,
    threatLevel: 'Low',
    systemLoad: 45,
    temperature: 22,
    humidity: 65,
    airQuality: 'Good'
  });

  // Heat map state
  const [selectedHeatMapCategory, setSelectedHeatMapCategory] = useState('incidents');
  const [hoveredCellData, setHoveredCellData] = useState<any>(null);

  // Port City coordinates and dimensions
  const PORT_CITY_CENTER = { lat: 6.933774250378392, lng: 79.83122508116483 };
  const PORT_CITY_WIDTH = 1.5; // km
  const PORT_CITY_HEIGHT = 3; // km

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live data updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setLiveData(prev => ({
        activeIncidents: Math.max(0, prev.activeIncidents + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
        crowdDensity: Math.max(0, Math.min(100, prev.crowdDensity + (Math.random() - 0.5) * 10)),
        threatLevel: prev.activeIncidents > 5 ? 'High' : prev.activeIncidents > 2 ? 'Medium' : 'Low',
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        airQuality: prev.temperature > 30 ? 'Moderate' : 'Good'
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Demo data for charts and visualizations (removed - now using Leaflet heat map)

  // Heat map data generation functions removed - now handled by InteractiveHeatMap component

  const heatMapCategories = [
    { id: 'incidents', name: 'Incidents', icon: AlertTriangle, color: 'text-red-400' },
    { id: 'crowd', name: 'Crowd Density', icon: Users, color: 'text-blue-400' },
    { id: 'security', name: 'Security Coverage', icon: Shield, color: 'text-green-400' },
    { id: 'traffic', name: 'Traffic Flow', icon: Activity, color: 'text-yellow-400' },
    { id: 'environmental', name: 'Environmental', icon: Thermometer, color: 'text-purple-400' }
  ];

  const surveillanceFeatures = [
    {
      icon: AlertTriangle,
      title: 'Incident Detection',
      description: 'Real-time monitoring and automatic detection of security incidents, accidents, and emergency situations.',
      status: 'Active',
      color: 'from-red-500/20 to-orange-500/20 border-red-500/30',
      iconColor: 'text-red-400',
      metrics: {
        incidents: liveData.activeIncidents,
        accuracy: '99.2%',
        responseTime: '1.8s',
        lastUpdate: '2s ago'
      },
      alerts: [
        { type: 'warning', message: 'Unusual activity detected in Zone A', time: '2m ago' },
        { type: 'info', message: 'System performing routine maintenance', time: '5m ago' }
      ],
      chartData: [
        { time: '00:00', incidents: 1 },
        { time: '04:00', incidents: 0 },
        { time: '08:00', incidents: 3 },
        { time: '12:00', incidents: 5 },
        { time: '16:00', incidents: 2 },
        { time: '20:00', incidents: 4 },
        { time: '24:00', incidents: 3 }
      ],
      exampleImages: [
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop'
      ]
    },
    {
      icon: Users,
      title: 'Behavior Detection',
      description: 'Advanced AI analysis of crowd patterns, suspicious activities, and behavioral anomalies.',
      status: 'Active',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      iconColor: 'text-blue-400',
      metrics: {
        crowdDensity: `${liveData.crowdDensity}%`,
        anomalies: 2,
        patterns: 15,
        lastUpdate: '1s ago'
      },
      alerts: [
        { type: 'success', message: 'Normal crowd patterns detected', time: '1m ago' },
        { type: 'warning', message: 'High density area identified', time: '3m ago' }
      ],
      chartData: [
        { zone: 'Zone A', density: 78, anomalies: 1 },
        { zone: 'Zone B', density: 92, anomalies: 3 },
        { zone: 'Zone C', density: 45, anomalies: 0 },
        { zone: 'Zone D', density: 67, anomalies: 1 },
        { zone: 'Zone E', density: 83, anomalies: 2 }
      ],
      exampleImages: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop'
      ]
    },
    {
      icon: Search,
      title: 'Facial Recognition',
      description: 'Secure identity verification and person tracking for enhanced security and safety.',
      status: 'Active',
      color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      iconColor: 'text-green-400',
      metrics: {
        faces: 1247,
        matches: 98.3,
        processing: '2.1s',
        lastUpdate: '1s ago'
      },
      alerts: [
        { type: 'success', message: 'Identity verification successful', time: '30s ago' },
        { type: 'info', message: 'Database updated with new profiles', time: '2m ago' }
      ],
      chartData: [
        { time: '00:00', faces: 45, matches: 44 },
        { time: '04:00', faces: 23, matches: 22 },
        { time: '08:00', faces: 156, matches: 153 },
        { time: '12:00', faces: 234, matches: 230 },
        { time: '16:00', faces: 189, matches: 186 },
        { time: '20:00', faces: 98, matches: 96 },
        { time: '24:00', faces: 67, matches: 66 }
      ],
      exampleImages: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=150&fit=crop'
      ]
    },
    {
      icon: Camera,
      title: 'Object Recognition',
      description: 'Intelligent detection and classification of objects, vehicles, and potential threats.',
      status: 'Active',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      iconColor: 'text-purple-400',
      metrics: {
        objects: 3421,
        vehicles: 156,
        threats: 0,
        lastUpdate: '1s ago'
      },
      alerts: [
        { type: 'success', message: 'No threats detected', time: '1m ago' },
        { type: 'info', message: 'Vehicle tracking active', time: '2m ago' }
      ],
      chartData: [
        { type: 'Vehicles', count: 156, color: 'bg-blue-400' },
        { type: 'People', count: 1247, color: 'bg-green-400' },
        { type: 'Bags', count: 89, color: 'bg-yellow-400' },
        { type: 'Bicycles', count: 23, color: 'bg-purple-400' },
        { type: 'Other', count: 1906, color: 'bg-gray-400' }
      ],
      exampleImages: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop'
      ]
    },
    {
      icon: Heart,
      title: 'Sentiment Analysis',
      description: 'Real-time analysis of public mood and crowd sentiment for proactive safety measures.',
      status: 'Active',
      color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
      iconColor: 'text-yellow-400',
      metrics: {
        sentiment: 'Positive',
        confidence: '87%',
        mood: 'Calm',
        lastUpdate: '1s ago'
      },
      alerts: [
        { type: 'success', message: 'Positive sentiment detected', time: '1m ago' },
        { type: 'info', message: 'Mood analysis complete', time: '2m ago' }
      ],
      chartData: [
        { emotion: 'Happy', percentage: 45, color: 'bg-green-400' },
        { emotion: 'Neutral', percentage: 35, color: 'bg-gray-400' },
        { emotion: 'Concerned', percentage: 15, color: 'bg-yellow-400' },
        { emotion: 'Stressed', percentage: 5, color: 'bg-red-400' }
      ],
      exampleImages: [
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=150&fit=crop'
      ]
    }
  ];

  const stats = [
    { label: 'Cameras Active', value: '247', icon: Camera, trend: '+2.3%' },
    { label: 'Incidents Prevented', value: '1,234', icon: Shield, trend: '+15.2%' },
    { label: 'Response Time', value: '2.3s', icon: Zap, trend: '-0.8s' },
    { label: 'Accuracy Rate', value: '99.7%', icon: CheckCircle, trend: '+0.1%' }
  ];

  const cameras = [
    { 
      id: 0, 
      name: 'Main Plaza', 
      status: 'Active', 
      feed: 'Live', 
      location: 'Zone A',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      people: 45,
      alerts: 2,
      lastUpdate: '2s ago'
    },
    { 
      id: 1, 
      name: 'Shopping District', 
      status: 'Active', 
      feed: 'Live', 
      location: 'Zone B',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      people: 128,
      alerts: 0,
      lastUpdate: '1s ago'
    },
    { 
      id: 2, 
      name: 'Transport Hub', 
      status: 'Maintenance', 
      feed: 'Offline', 
      location: 'Zone C',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
      people: 0,
      alerts: 0,
      lastUpdate: '5m ago'
    },
    { 
      id: 3, 
      name: 'Residential Area', 
      status: 'Active', 
      feed: 'Live', 
      location: 'Zone D',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      people: 23,
      alerts: 1,
      lastUpdate: '3s ago'
    },
    { 
      id: 4, 
      name: 'Business District', 
      status: 'Active', 
      feed: 'Live', 
      location: 'Zone E',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      people: 67,
      alerts: 0,
      lastUpdate: '1s ago'
    }
  ];

  const recentEvents = [
    { time: '2m ago', type: 'incident', message: 'Minor disturbance reported in Zone A', severity: 'low' },
    { time: '5m ago', type: 'maintenance', message: 'Camera 3 maintenance completed', severity: 'info' },
    { time: '8m ago', type: 'alert', message: 'High crowd density detected in Zone B', severity: 'medium' },
    { time: '12m ago', type: 'success', message: 'Security protocol activated successfully', severity: 'info' },
    { time: '15m ago', type: 'incident', message: 'Suspicious activity cleared in Zone C', severity: 'low' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-7xl ${isFullscreen ? 'max-h-[95vh]' : 'max-h-[90vh]'} overflow-y-auto`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Public Safety Overview</h2>
                <p className="text-gray-300 text-sm">Advanced Surveillance & Security Systems</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Live Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                  isLive 
                    ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                    : 'bg-gray-700/50 border-gray-600/30 text-gray-300'
                }`}
              >
                {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm font-medium">{isLive ? 'Live' : 'Paused'}</span>
              </motion.button>
              
              {/* Fullscreen Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </motion.button>
              
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              >
                ×
              </motion.button>
            </div>
          </div>
          
          {/* Live Status Bar */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">System Load: {liveData.systemLoad}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className={`w-4 h-4 ${
                  liveData.threatLevel === 'High' ? 'text-red-400' : 
                  liveData.threatLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                }`} />
                <span className="text-gray-300">Threat Level: {liveData.threatLevel}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className={`w-4 h-4 text-blue-400 ${isLive ? 'animate-spin' : ''}`} />
              <span className="text-gray-300">Auto-refresh {isLive ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Camera Feeds Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Live Camera Feeds</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Settings className="w-4 h-4 text-gray-400" />
                <Download className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Camera Selector */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Select Camera</h4>
                {cameras.map((camera) => (
                  <motion.button
                    key={camera.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCamera(camera.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                      selectedCamera === camera.id
                        ? 'bg-blue-500/20 border-blue-500/50 text-white'
                        : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{camera.name}</div>
                        <div className="text-xs text-gray-400">{camera.location}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          camera.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></div>
                        <span className="text-xs">{camera.feed}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Camera Feed Display */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden">
                  <div className="p-4 border-b border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{cameras[selectedCamera].name}</h4>
                        <p className="text-xs text-gray-400">{cameras[selectedCamera].location}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{cameras[selectedCamera].people} people</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-gray-300">{cameras[selectedCamera].alerts} alerts</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${cameras[selectedCamera].status === 'Active' ? 'bg-red-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                          <span className="text-xs text-gray-400">{cameras[selectedCamera].feed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-video relative bg-gradient-to-br from-gray-800 to-gray-900">
                    {cameras[selectedCamera].status === 'Active' ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={cameras[selectedCamera].image} 
                          alt={cameras[selectedCamera].name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">LIVE</span>
                            <span className="text-xs text-gray-300">{cameras[selectedCamera].lastUpdate}</span>
                          </div>
                          <div className="text-xs text-gray-300">
                            {cameras[selectedCamera].people} people detected • {cameras[selectedCamera].alerts} active alerts
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 rounded-lg px-3 py-1">
                          <div className="flex items-center space-x-2 text-white text-sm">
                            <Thermometer className="w-4 h-4" />
                            <span>{liveData.temperature}°C</span>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/50 rounded-lg px-3 py-1">
                          <div className="flex items-center space-x-2 text-white text-sm">
                            <Gauge className="w-4 h-4" />
                            <span>{liveData.humidity}%</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400 text-sm">Camera Offline</p>
                          <p className="text-gray-500 text-xs mt-1">Maintenance in progress</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Surveillance Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Surveillance Systems</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {surveillanceFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl bg-gradient-to-br ${feature.color} border backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                  onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-300 font-medium">{feature.status}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {feature.description}
                      </p>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {Object.entries(feature.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-white">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-green-300">Real-time Processing</span>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedFeature === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-600/30"
                      >
                        <div className="space-y-6">
                          {/* Recent Alerts */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-white text-sm">Recent Alerts</h5>
                            {feature.alerts.map((alert, alertIndex) => (
                              <div key={alertIndex} className="flex items-start space-x-3 p-2 bg-gray-800/30 rounded-lg">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  alert.type === 'success' ? 'bg-green-400' :
                                  alert.type === 'warning' ? 'bg-yellow-400' :
                                  alert.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                                }`}></div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-300">{alert.message}</p>
                                  <p className="text-xs text-gray-500">{alert.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Chart Visualization */}
                          {feature.chartData && (
                            <div className="space-y-3">
                              <h5 className="font-medium text-white text-sm">Analytics</h5>
                              <div className="bg-gray-800/30 rounded-lg p-4">
                                {feature.title === 'Incident Detection' && (
                                  <div className="space-y-2">
                                    <div className="text-xs text-gray-400 mb-2">Incidents over 24h</div>
                                    {feature.chartData.map((data, dataIndex) => (
                                      <div key={dataIndex} className="flex items-center space-x-3">
                                        <div className="w-12 text-xs text-gray-300">{(data as any).time}</div>
                                        <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                                          <div 
                                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                                            style={{ width: `${((data as any).incidents / 8) * 100}%` }}
                                          ></div>
                                        </div>
                                        <div className="w-6 text-xs text-white">{(data as any).incidents}</div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {feature.title === 'Behavior Detection' && (
                                  <div className="space-y-2">
                                    <div className="text-xs text-gray-400 mb-2">Crowd Density by Zone</div>
                                    {feature.chartData.map((data, dataIndex) => (
                                      <div key={dataIndex} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-gray-300">{(data as any).zone}</span>
                                          <span className="text-white">{(data as any).density}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                                          <div 
                                            className={`h-2 rounded-full transition-all duration-1000 ${
                                              (data as any).density > 80 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                                              (data as any).density > 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                              'bg-gradient-to-r from-green-500 to-blue-500'
                                            }`}
                                            style={{ width: `${(data as any).density}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {feature.title === 'Facial Recognition' && (
                                  <div className="space-y-2">
                                    <div className="text-xs text-gray-400 mb-2">Faces Detected vs Matched</div>
                                    {feature.chartData.map((data, dataIndex) => (
                                      <div key={dataIndex} className="flex items-center space-x-3">
                                        <div className="w-12 text-xs text-gray-300">{(data as any).time}</div>
                                        <div className="flex-1 space-y-1">
                                          <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span className="text-xs text-gray-300">Detected: {(data as any).faces}</span>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span className="text-xs text-gray-300">Matched: {(data as any).matches}</span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {feature.title === 'Object Recognition' && (
                                  <div className="space-y-2">
                                    <div className="text-xs text-gray-400 mb-2">Object Types Detected</div>
                                    {feature.chartData.map((data, dataIndex) => (
                                      <div key={dataIndex} className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${(data as any).color}`}></div>
                                        <div className="flex-1 text-xs text-gray-300">{(data as any).type}</div>
                                        <div className="text-xs text-white font-medium">{(data as any).count}</div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {feature.title === 'Sentiment Analysis' && (
                                  <div className="space-y-2">
                                    <div className="text-xs text-gray-400 mb-2">Emotion Distribution</div>
                                    {feature.chartData.map((data, dataIndex) => (
                                      <div key={dataIndex} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                          <span className="text-gray-300">{(data as any).emotion}</span>
                                          <span className="text-white">{(data as any).percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                                          <div 
                                            className={`h-2 rounded-full transition-all duration-1000 ${(data as any).color}`}
                                            style={{ width: `${(data as any).percentage}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Example Images */}
                          {feature.exampleImages && (
                            <div className="space-y-3">
                              <h5 className="font-medium text-white text-sm">Example Detections</h5>
                              <div className="grid grid-cols-2 gap-2">
                                {feature.exampleImages.map((image, imageIndex) => (
                                  <div key={imageIndex} className="relative group">
                                    <img 
                                      src={image} 
                                      alt={`${feature.title} example ${imageIndex + 1}`}
                                      className="w-full h-20 object-cover rounded-lg"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                      <div className="text-white text-xs text-center">
                                        <feature.icon className="w-4 h-4 mx-auto mb-1" />
                                        <div>{feature.title}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive Charts and Analytics */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Port City Heat Map</h3>
                <div className="text-sm text-gray-400">
                  ({PORT_CITY_CENTER.lat.toFixed(6)}, {PORT_CITY_CENTER.lng.toFixed(6)})
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedHeatMapCategory} 
                  onChange={(e) => setSelectedHeatMapCategory(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {heatMapCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Heat Map Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Heat Map */}
              <div className="lg:col-span-2 bg-gray-900/50 rounded-xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">
                    {heatMapCategories.find(cat => cat.id === selectedHeatMapCategory)?.name} Distribution
                  </h4>
                  <div className="text-sm text-gray-400">
                    {PORT_CITY_WIDTH}km × {PORT_CITY_HEIGHT}km Area
                  </div>
                </div>
                
                {/* Interactive Leaflet Heat Map */}
                <div className="h-96 w-full rounded-lg overflow-hidden">
                  <InteractiveHeatMap 
                    selectedCategory={selectedHeatMapCategory}
                    onCellHover={setHoveredCellData}
                  />
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">Intensity:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                      <span className="text-xs text-gray-300">Low</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                      <span className="text-xs text-gray-300">Medium</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                      <span className="text-xs text-gray-300">High</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span className="text-xs text-gray-300">Very High</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-600 rounded-sm"></div>
                      <span className="text-xs text-gray-300">Critical</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Heat Map Info Panel */}
              <div className="space-y-4">
                {/* Selected Cell Info */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
                  <h5 className="text-sm font-semibold text-white mb-3">Location Information</h5>
                  {hoveredCellData ? (
                    <>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-300">
                          Coordinates: {hoveredCellData.lat.toFixed(6)}, {hoveredCellData.lng.toFixed(6)}
                        </div>
                        <div className="text-sm text-gray-300">
                          Intensity: {(hoveredCellData.intensity * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-300">
                          Category: {heatMapCategories.find(cat => cat.id === selectedHeatMapCategory)?.name}
                        </div>
                        <div className="text-sm text-gray-300">
                          Details: {JSON.stringify(hoveredCellData.details, null, 2)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-gray-400">Hover over a location on the map for details</div>
                  )}
                </div>


                {/* Environmental Data */}
                <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
                  <h5 className="text-sm font-semibold text-white mb-3">Environmental Data</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-gray-300">Temperature</span>
                      </div>
                      <span className="text-sm text-white font-medium">{liveData.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">Humidity</span>
                      </div>
                      <span className="text-sm text-white font-medium">{liveData.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Circle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-300">Air Quality</span>
                      </div>
                      <span className="text-sm text-white font-medium">{liveData.airQuality}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Recent Events</h3>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
              <div className="space-y-3">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      event.severity === 'high' ? 'bg-red-400' :
                      event.severity === 'medium' ? 'bg-yellow-400' :
                      event.severity === 'low' ? 'bg-green-400' : 'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">{event.message}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{event.type}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-bold text-white">System Status</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                <div className="text-sm text-gray-300">System Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-gray-300">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">AI-Powered</div>
                <div className="text-sm text-gray-300">Intelligence</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400">
            <p>All surveillance systems are operated in compliance with privacy regulations and security protocols.</p>
            <p className="mt-1">For emergency response, contact: <span className="text-blue-400 font-medium">Emergency Services</span></p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PublicOverview;
