import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Sparkles, Zap, Brain, Rocket, Clock, ShoppingCart, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { quickSuggestions, mockParkingLocations, popularDestinations, weatherSuggestions, smartSuggestions } from '../data/mockData';
import ParkingMap from './ParkingMap';
import TypingIndicator from './TypingIndicator';
import ReservationBooking from './ReservationBooking';
import ShopQueries from './ShopQueries';
import DeveloperServices from './DeveloperServices';
import ShoppingCartModal from './ShoppingCart';
import InvestorServices from './InvestorServices';
import WeatherInfo from './WeatherInfo';
import PublicOverview from './PublicOverview';

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = '' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: "Welcome to Port City! I'm your intelligent assistant. How can I help you today?",
      timestamp: new Date(),
      suggestions: [...quickSuggestions.map(s => s.title), 'Public Safety Overview']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showParkingMap, setShowParkingMap] = useState(false);
  const [showReservationBooking, setShowReservationBooking] = useState(false);
  const [showShopQueries, setShowShopQueries] = useState(false);
  const [showDeveloperServices, setShowDeveloperServices] = useState(false);
  const [showInvestorServices, setShowInvestorServices] = useState(false);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);
  const [showPublicOverview, setShowPublicOverview] = useState(false);
  const [cartItems, setCartItems] = useState<Array<{product: any, quantity: number}>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCartItems([]);
    setShowShoppingCart(false);
    // Add success message
    const checkoutMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'agent',
      content: 'Your smart order has been processed successfully! You will receive a neural confirmation shortly.',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, checkoutMessage]);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Direct response handling
    setTimeout(() => {
    const response = generateResponse(content);
    if (response) {
      setMessages(prev => [...prev, response]);
    }
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): ChatMessage | null => {
    const input = userInput.toLowerCase();

            if (input.includes('parking') || input.includes('park')) {
              setShowParkingMap(true);
              return {
                id: Date.now().toString(),
                type: 'agent',
                content: "Finding available parking spots near you. Here's the real-time parking map with current availability and pricing.",
                timestamp: new Date()
              };
            }

            if (input.includes('reservation') || input.includes('book')) {
              setShowReservationBooking(true);
              return {
                id: Date.now().toString(),
                type: 'agent',
                content: "Opening the Smart Reservation System! You can browse venues and book directly.",
                timestamp: new Date()
              };
            }

            if (input.includes('shop') || input.includes('store') || input.includes('order')) {
              setShowShopQueries(true);
              return {
                id: Date.now().toString(),
                type: 'agent',
                content: "Opening the shopping catalog. Browse products by category, compare prices, and add items to your cart.",
                timestamp: new Date()
              };
            }

            if (input.includes('investor') || input.includes('investment') || input.includes('business')) {
              setShowInvestorServices(true);
              return {
                id: Date.now().toString(),
                type: 'agent',
                content: "Opening the Port City Investor Hub! Browse services and start applications directly.",
                timestamp: new Date()
              };
            }

            if (input.includes('weather')) {
              setShowWeatherInfo(true);
              return {
                id: Date.now().toString(),
                type: 'agent',
                content: "Checking current weather conditions and forecast for Port City. Here's the detailed weather information.",
                timestamp: new Date()
              };
            }

    if (input.includes('developer') || input.includes('tech')) {
      setShowDeveloperServices(true);
      return {
        id: Date.now().toString(),
        type: 'agent',
        content: "Great! I can connect you with developer resources and tech services. Let me show you what's available.",
        timestamp: new Date()
      };
    }

    if (input.includes('cart') || input.includes('shopping cart')) {
      setShowShoppingCart(true);
      return {
        id: Date.now().toString(),
        type: 'agent',
        content: "Opening your shopping cart...",
        timestamp: new Date()
      };
    }

    if (input.includes('public') || input.includes('safety') || input.includes('surveillance') || input.includes('overview')) {
      setShowPublicOverview(true);
      return {
        id: Date.now().toString(),
        type: 'agent',
        content: "Opening the Public Safety Overview. Here you can view our advanced surveillance systems and security features.",
        timestamp: new Date()
      };
    }

    if (input.includes('actions') || input.includes('available') || input.includes('help') || input.includes('what can you do') || input.includes('refresh')) {
      const allActions = [
        ...weatherSuggestions,
        ...smartSuggestions,
        'Public Safety Overview'
      ];
      
      const actionsMessage = {
        id: 'actions-list', // Fixed ID to prevent duplicates
        type: 'agent' as const,
        content: `🔄 **Actions Refreshed!** Here are all the available actions you can use:\n\n**Weather Services:**\n${weatherSuggestions.map(s => `• ${s}`).join('\n')}\n\n**Smart City Services:**\n${smartSuggestions.map(s => `• ${s}`).join('\n')}\n\n**Public Safety:**\n• Public Safety Overview\n\nClick on any action above to get started!`,
        timestamp: new Date(),
        suggestions: allActions
      };
      
      // Remove any existing actions message and add the new one
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => msg.id !== 'actions-list');
        return [...filteredMessages, actionsMessage];
      });
      
      return null; // Don't add a new message since we're handling it manually
    }

    return {
      id: Date.now().toString(),
      type: 'agent',
      content: "I'd love to help you! What can I assist you with today? I can help with parking, reservations, shopping, investor services, weather info, and much more!",
      timestamp: new Date(),
      suggestions: quickSuggestions.map(s => s.title)
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === 'Parking') {
      setShowParkingMap(true);
      handleSendMessage('Show parking');
    } else if (suggestion === 'Reservations') {
      setShowReservationBooking(true);
      handleSendMessage('Show reservations');
    } else if (suggestion === 'Shopping') {
      setShowShopQueries(true);
      handleSendMessage('Show shopping');
    } else if (suggestion === 'Investor Services') {
      setShowInvestorServices(true);
      handleSendMessage('Show investor services');
    } else if (suggestion === 'Developer Services') {
      setShowDeveloperServices(true);
      handleSendMessage('Show developer services');
    } else if (suggestion === 'Weather') {
      setShowWeatherInfo(true);
      handleSendMessage('Show weather');
    } else if (suggestion === 'Public Safety Overview') {
      setShowPublicOverview(true);
      handleSendMessage('Show public safety overview');
    } else {
      handleSendMessage(suggestion);
    }
  };

  const handleDestinationSelect = (destination: string) => {
    handleSendMessage(`Find parking near ${destination}`);
  };

  return (
    <div className={`flex flex-col h-screen relative ${className}`} style={{
      backgroundImage: 'url(/bkg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Background overlay with transparency effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/70 to-purple-900/80 backdrop-blur-[1px]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 p-3 sm:p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative flex items-center justify-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Port City Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                  <Brain className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Port City
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm flex items-center justify-center">
                <Zap className="w-2 h-2 sm:w-3 sm:h-3 mr-1 text-yellow-400" />
                <span className="hidden sm:inline">Intelligent City Assistant</span>
                <span className="sm:hidden">AI Assistant</span>
              </p>
            </div>
          </div>
        </div>
        {/* Right side controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm font-medium">System Active</span>
          </div>
          <div className="sm:hidden flex items-center space-x-1 px-2 py-1 bg-green-500/20 rounded border border-green-500/30">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-xs">Active</span>
          </div>
          {cartItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowShoppingCart(true)}
              className="relative w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
            </motion.button>
          )}
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-transparent to-gray-900/20">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`relative max-w-xs sm:max-w-sm lg:max-w-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto' 
                  : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700/50'
              }`}>
                {message.type === 'agent' && (
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.timestamp && (
                  <p className={`text-xs mt-2 flex items-center ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="relative max-w-xs sm:max-w-sm lg:max-w-md px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700/50">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        {/* Futuristic Suggestions */}
        {messages[messages.length - 1]?.suggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex items-center space-x-2 ml-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <p className="text-xs sm:text-sm text-gray-300 font-medium">Available Actions:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {messages[messages.length - 1].suggestions?.map((suggestion, index) => {
                const suggestionData = quickSuggestions.find(s => s.title === suggestion);
                const colors = [
                  'from-blue-500/20 to-purple-500/20 border-blue-500/30',
                  'from-green-500/20 to-teal-500/20 border-green-500/30',
                  'from-orange-500/20 to-red-500/20 border-orange-500/30',
                  'from-pink-500/20 to-rose-500/20 border-pink-500/30'
                ];
                const colorClass = colors[index % colors.length];
                
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colorClass} border backdrop-blur-sm text-left transition-all duration-300 hover:shadow-xl group`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="text-xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                        {suggestionData?.icon || '💡'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm sm:text-lg mb-1 truncate">{suggestion}</h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {suggestionData?.description}
                        </p>
                      </div>
                      <div className="ml-auto flex-shrink-0">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Futuristic Popular Destinations */}
        {messages[messages.length - 1]?.content.includes('parking') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 ml-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <p className="text-sm text-gray-300 font-medium">AI Recommendations:</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {popularDestinations.map((destination, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDestinationSelect(destination)}
                  className="px-4 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl hover:border-blue-500/50 transition-all duration-300 text-sm text-gray-200 hover:text-white group"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="font-medium">{destination}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Parking Map */}
        {showParkingMap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <ParkingMap locations={mockParkingLocations} onClose={() => setShowParkingMap(false)} />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showReservationBooking && (
          <ReservationBooking onClose={() => setShowReservationBooking(false)} />
        )}
        {showShopQueries && (
          <ShopQueries onClose={() => setShowShopQueries(false)} onAddToCart={addToCart} />
        )}
        {showDeveloperServices && (
          <DeveloperServices onClose={() => setShowDeveloperServices(false)} />
        )}
        {showInvestorServices && (
          <InvestorServices onClose={() => setShowInvestorServices(false)} />
        )}
        {showShoppingCart && (
          <ShoppingCartModal
            isOpen={showShoppingCart}
            onClose={() => setShowShoppingCart(false)}
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}
        {showWeatherInfo && (
          <WeatherInfo onClose={() => setShowWeatherInfo(false)} />
        )}
        {showPublicOverview && (
          <PublicOverview onClose={() => setShowPublicOverview(false)} />
        )}
      </AnimatePresence>

        {/* Persistent Suggestions */}
      <div className="quick-actions-section px-3 sm:px-6 py-2 sm:py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-t border-gray-700/30">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            <p className="text-xs sm:text-sm text-gray-300 font-medium">Quick Actions:</p>
          </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Refresh the entire page
            window.location.reload();
          }}
          className="px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-md text-xs text-blue-300 hover:text-blue-200 transition-all duration-300 flex items-center space-x-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>View Actions</span>
        </motion.button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {[...weatherSuggestions.slice(0, 3), ...smartSuggestions.slice(0, 5)].map((suggestion, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage(suggestion)}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-md sm:rounded-lg text-xs text-gray-200 hover:text-white transition-all duration-300 group"
            >
              <span className="group-hover:text-blue-300 transition-colors truncate">{suggestion}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Futuristic Input Area */}
      <div className="relative bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-t border-gray-700/50 p-3 sm:p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="relative flex space-x-2 sm:space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Enter your query..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm sm:text-base"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(inputValue)}
            className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center space-x-1 sm:space-x-2"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline font-medium">Send</span>
          </motion.button>
        </div>
        <div className="mt-2 sm:mt-3 flex items-center justify-center space-x-2 sm:space-x-4 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">AI-Powered</span>
            <span className="sm:hidden">AI</span>
          </div>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">AI Processing</span>
            <span className="sm:hidden">AI</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChatInterface;
