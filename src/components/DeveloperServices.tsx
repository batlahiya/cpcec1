import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Cloud, Shield, Zap, Users, BookOpen, X, ExternalLink, CheckCircle } from 'lucide-react';

interface DeveloperServicesProps {
  onClose: () => void;
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  features: string[];
  pricing: string;
  status: 'available' | 'coming-soon' | 'beta';
  documentation?: string;
  apiEndpoint?: string;
}

const DeveloperServices: React.FC<DeveloperServicesProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const categories = [
    { id: 'all', name: 'All Services', icon: '🔧' },
    { id: 'apis', name: 'APIs', icon: '🔌' },
    { id: 'tools', name: 'Development Tools', icon: '🛠️' },
    { id: 'infrastructure', name: 'Infrastructure', icon: '☁️' },
    { id: 'support', name: 'Support', icon: '🤝' }
  ];

  const services: Service[] = [
    {
      id: '1',
      name: 'Port City Data API',
      description: 'Access real-time city data including parking, traffic, events, and public services.',
      icon: <Database className="w-6 h-6" />,
      category: 'apis',
      features: ['Real-time data', 'RESTful endpoints', 'JSON responses', 'Rate limiting', 'Authentication'],
      pricing: 'Free tier available',
      status: 'available',
      documentation: 'https://docs.portcity.dev/api',
      apiEndpoint: 'https://api.portcity.dev/v1'
    },
    {
      id: '2',
      name: 'Smart City SDK',
      description: 'Comprehensive SDK for building smart city applications with pre-built components.',
      icon: <Code className="w-6 h-6" />,
      category: 'tools',
      features: ['React components', 'TypeScript support', 'Maps integration', 'Real-time updates', 'Mobile ready'],
      pricing: 'Open source',
      status: 'available',
      documentation: 'https://github.com/portcity/sdk'
    },
    {
      id: '3',
      name: 'Cloud Infrastructure',
      description: 'Scalable cloud infrastructure for hosting your city applications.',
      icon: <Cloud className="w-6 h-6" />,
      category: 'infrastructure',
      features: ['Auto-scaling', '99.9% uptime', 'Global CDN', 'SSL certificates', 'Monitoring'],
      pricing: 'Pay as you scale',
      status: 'available'
    },
    {
      id: '4',
      name: 'Security Services',
      description: 'Enterprise-grade security services for protecting your applications and data.',
      icon: <Shield className="w-6 h-6" />,
      category: 'support',
      features: ['DDoS protection', 'SSL/TLS', 'API security', 'Data encryption', 'Compliance'],
      pricing: 'Contact for pricing',
      status: 'available'
    },
    {
      id: '5',
      name: 'AI/ML Services',
      description: 'Machine learning services for predictive analytics and intelligent automation.',
      icon: <Zap className="w-6 h-6" />,
      category: 'apis',
      features: ['Predictive analytics', 'Image recognition', 'Natural language processing', 'Recommendation engine'],
      pricing: 'Usage-based',
      status: 'beta',
      documentation: 'https://docs.portcity.dev/ai'
    },
    {
      id: '6',
      name: 'Developer Community',
      description: 'Connect with other developers, share projects, and get support.',
      icon: <Users className="w-6 h-6" />,
      category: 'support',
      features: ['Forums', 'Code sharing', 'Mentorship', 'Hackathons', 'Documentation'],
      pricing: 'Free',
      status: 'available',
      documentation: 'https://community.portcity.dev'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleRequestAccess = () => {
    setShowRequestForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'beta':
        return 'bg-yellow-100 text-yellow-800';
      case 'coming-soon':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Developer Services</h2>
              <p className="text-gray-600 mt-1">Build amazing applications with Port City's developer tools</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {selectedService ? (
              /* Service Details */
              <motion.div
                key="service-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-start justify-between">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    ← Back to Services
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        {selectedService.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-800">{selectedService.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedService.status)}`}>
                            {selectedService.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-lg">{selectedService.description}</p>
                        <p className="text-blue-600 font-medium mt-2">{selectedService.pricing}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedService.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {(selectedService.documentation || selectedService.apiEndpoint) && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Resources</h4>
                        <div className="space-y-2">
                          {selectedService.documentation && (
                            <a
                              href={selectedService.documentation}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>Documentation</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {selectedService.apiEndpoint && (
                            <a
                              href={selectedService.apiEndpoint}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                            >
                              <Code className="w-4 h-4" />
                              <span>API Endpoint</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          Get Started
                        </button>
                        <button 
                          onClick={handleRequestAccess}
                          className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                        >
                          Request Access
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Contact Support
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
                      <p className="text-sm text-blue-600 mb-3">
                        Our developer support team is here to help you get started.
                      </p>
                      <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                        Contact Developer Support →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Services List */
              <motion.div
                key="services-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceClick(service)}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-800">{service.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                              {service.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                          <p className="text-sm text-blue-600 font-medium">{service.pricing}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredServices.length === 0 && (
                  <div className="text-center py-12">
                    <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No services found</h3>
                    <p className="text-gray-500">Try selecting a different category</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Request Access Form Modal */}
        <AnimatePresence>
          {showRequestForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4"
              onClick={() => setShowRequestForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Request Access</h3>
                  <button
                    onClick={() => setShowRequestForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your project name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe how you plan to use this service..."
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowRequestForm(false)}
                      className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                      Submit Request
                    </button>
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

export default DeveloperServices;

