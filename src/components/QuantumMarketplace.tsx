import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, Star, Zap, Brain, Sparkles, Eye, Heart, Share2, Filter, Search, Grid, List } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

interface QuantumMarketplaceProps {
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuantumMarketplace: React.FC<QuantumMarketplaceProps> = ({ onClose, onAddToCart }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'hologram'>('hologram');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [quantumMode, setQuantumMode] = useState(false);
  const [neuralRecommendations, setNeuralRecommendations] = useState<Product[]>([]);

  const categories = ['all', 'Electronics', 'Fashion', 'Home & Living'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'trending':
      default:
        return Math.random() - 0.5; // Random for trending
    }
  });

  useEffect(() => {
    // Simulate neural recommendations
    const recommendations = mockProducts
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setNeuralRecommendations(recommendations);
  }, []);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
  };

  const getViewModeIcon = (mode: string) => {
    switch (mode) {
      case 'grid': return <Grid className="w-5 h-5" />;
      case 'list': return <List className="w-5 h-5" />;
      case 'hologram': return <Eye className="w-5 h-5" />;
      default: return <Grid className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Electronics': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
      case 'Fashion': return 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400';
      case 'Home & Living': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, rotateX: -10 }}
        animate={{ scale: 1, rotateX: 0 }}
        exit={{ scale: 0.9, rotateX: 10 }}
        className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto border border-purple-500/50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Quantum Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-800/90 to-pink-900/90 backdrop-blur-xl border-b border-purple-500/50 p-6 z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Smart Marketplace
                </h2>
                <p className="text-gray-300">Neural-powered shopping with AI recommendations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantumMode(!quantumMode)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  quantumMode 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Smart Mode</span>
                </div>
              </motion.button>
              <button
                onClick={onClose}
                className="p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-full transition-colors text-gray-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Neural Search & Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Neural search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-700/50 border border-purple-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-700/50 border border-purple-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            >
              <option value="trending" className="bg-gray-800">Trending</option>
              <option value="price-low" className="bg-gray-800">Price: Low to High</option>
              <option value="price-high" className="bg-gray-800">Price: High to Low</option>
              <option value="rating" className="bg-gray-800">Highest Rated</option>
            </select>

            <div className="flex space-x-2">
              {['grid', 'list', 'hologram'].map((mode) => (
                <motion.button
                  key={mode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode as any)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {getViewModeIcon(mode)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Neural Recommendations */}
          {quantumMode && neuralRecommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Neural Recommendations</h3>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {neuralRecommendations.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{product.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm">{product.name}</h4>
                        <div className="flex items-center space-x-1 mt-1">
                          {getRatingStars(product.rating)}
                          <span className="text-xs text-gray-400">({product.rating})</span>
                        </div>
                        <div className="text-purple-400 font-bold text-sm">LKR {product.price}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Products Display */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {filteredProducts.length} Products Found
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Filter className="w-4 h-4" />
                <span>Smart Filtered</span>
              </div>
            </div>

            {viewMode === 'hologram' ? (
              /* Holographic View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-purple-500/30 overflow-hidden group hover:border-purple-400/50 transition-all duration-300 relative"
                  >
                    {/* Holographic Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Product Hologram */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          rotateY: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="text-6xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {product.image}
                      </motion.div>
                      
                      {/* Floating Elements */}
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <motion.button
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-white" />
                        </motion.button>
                        <motion.button
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <Share2 className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>

                      {/* Quantum Badge */}
                      <div className="absolute bottom-3 left-3">
                        <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white">
                          SMART
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(product.category).split(' ')[0]} ${getCategoryColor(product.category).split(' ')[1]} border ${getCategoryColor(product.category).split(' ')[2]}`}>
                          {product.category}
                        </div>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(product.rating)}
                          <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          LKR {product.price}
                        </div>
                        <div className="text-sm text-gray-400">by {product.vendor}</div>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {}}
                          className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="h-48 bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center">
                      <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                        {product.image}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-white mb-2">{product.name}</h4>
                      <div className="text-2xl font-bold text-purple-400 mb-4">${product.price}</div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 flex items-center space-x-4 group hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="text-4xl">{product.image}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white">{product.name}</h4>
                      <p className="text-gray-400 text-sm">{product.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          {getRatingStars(product.rating)}
                          <span className="text-sm text-gray-400">({product.rating})</span>
                        </div>
                        <div className="text-purple-400 font-bold">LKR {product.price}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-6xl mb-4"
                >
                  🔍
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">No Products Found</h3>
                <p className="text-gray-400">Try adjusting your neural search parameters</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuantumMarketplace;
