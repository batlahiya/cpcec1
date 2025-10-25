import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Clock, DollarSign, FileText, CheckCircle, ArrowRight, Upload, Download, Eye, Trash2, Plus, Send } from 'lucide-react';
import { InvestorService, investorServices } from '../data/mockData';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: 'uploaded' | 'processing' | 'approved' | 'rejected';
}

interface Application {
  id: string;
  serviceId: string;
  serviceName: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  documents: Document[];
  submittedAt?: Date;
  notes?: string;
}

interface InvestorServicesProps {
  onClose: () => void;
}

const InvestorServices: React.FC<InvestorServicesProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<InvestorService | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>([]);
  const [applicationNotes, setApplicationNotes] = useState('');

  const categories = [
    { id: 'all', name: 'All Services', icon: '🌟' },
    { id: 'banking', name: 'Banking', icon: '🏦' },
    { id: 'investment', name: 'Investment', icon: '📈' },
    { id: 'legal', name: 'Legal', icon: '⚖️' },
    { id: 'tax', name: 'Tax', icon: '📊' },
    { id: 'real_estate', name: 'Real Estate', icon: '🏢' },
    { id: 'insurance', name: 'Insurance', icon: '🛡️' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? investorServices 
    : investorServices.filter(service => service.category === selectedCategory);

  const handleServiceSelect = (service: InvestorService) => {
    setSelectedService(service);
  };

  const handleApply = () => {
    if (selectedService) {
      const newApplication: Application = {
        id: Date.now().toString(),
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        status: 'draft',
        documents: [],
        notes: applicationNotes
      };
      setCurrentApplication(newApplication);
      setShowDocumentUpload(true);
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDocument: Document = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date(),
          status: 'uploaded'
        };
        setUploadedDocuments(prev => [...prev, newDocument]);
      });
    }
  };

  const handleRemoveDocument = (documentId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const handleSubmitApplication = () => {
    if (currentApplication) {
      const updatedApplication = {
        ...currentApplication,
        documents: uploadedDocuments,
        status: 'submitted' as const,
        submittedAt: new Date()
      };
      setCurrentApplication(updatedApplication);
      setIsApplying(true);
      
      // Show success message with application details
      const successMessage = `
        🎉 Application Submitted Successfully!
        
        Service: ${selectedService?.name}
        Documents Uploaded: ${uploadedDocuments.length}
        Notes: ${applicationNotes || 'None'}
        
        Reference Number: INV-${Date.now().toString().slice(-6)}
        
        You will receive a confirmation email shortly with your application details.
      `;
      
      setTimeout(() => {
        alert(successMessage);
        setIsApplying(false);
        setSelectedService(null);
        setCurrentApplication(null);
        setUploadedDocuments([]);
        setApplicationNotes('');
        setShowDocumentUpload(false);
      }, 2000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      banking: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      investment: 'from-green-500/20 to-green-600/20 border-green-500/30',
      legal: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      tax: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      real_estate: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
      insurance: 'from-red-500/20 to-red-600/20 border-red-500/30'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };

  if (selectedService) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedService(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Service Details Header */}
          <div className="relative p-6 border-b border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-3xl"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedService.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {selectedService.name}
                  </h2>
                  <p className="text-gray-400">{selectedService.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-3 hover:bg-gray-700 rounded-xl transition-colors group"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Service Details */}
          <div className="p-6 space-y-6">
            {/* Contact & Processing Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">Contact</h3>
                </div>
                <p className="text-gray-300">{selectedService.contact}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Processing Time</h3>
                </div>
                <p className="text-gray-300">{selectedService.processingTime}</p>
              </div>
            </div>

            {/* Fees */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-white">Fees & Costs</h3>
              </div>
              <p className="text-gray-300">{selectedService.fees}</p>
            </div>

            {/* Requirements */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">Required Documents</h3>
              </div>
              <div className="space-y-2">
                {selectedService.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApply}
              disabled={isApplying}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isApplying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Application...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5" />
                  <span>Start Application Process</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (showDocumentUpload && currentApplication) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={() => setShowDocumentUpload(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Document Upload Header */}
          <div className="relative p-6 border-b border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-3xl"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Document Submission
                  </h2>
                  <p className="text-gray-400">Upload required documents for {currentApplication.serviceName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDocumentUpload(false)}
                className="p-3 hover:bg-gray-700 rounded-xl transition-colors group"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Document Upload Content */}
          <div className="p-6 space-y-6">
            {/* Required Documents */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                Required Documents
              </h3>
              <div className="space-y-2">
                {selectedService && (selectedService as any).requirements && (selectedService as any).requirements.map((requirement: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload Area */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Upload Documents</h3>
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">Drag and drop files here, or click to select</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Choose Files</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
              </div>
            </div>

            {/* Uploaded Documents */}
            {uploadedDocuments.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Uploaded Documents</h3>
                <div className="space-y-3">
                  {uploadedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">{doc.name}</p>
                          <p className="text-gray-400 text-sm">{formatFileSize(doc.size)} • {doc.uploadedAt.toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button 
                          onClick={() => handleRemoveDocument(doc.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Notes */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">Additional Notes (Optional)</h3>
              <textarea
                value={applicationNotes}
                onChange={(e) => setApplicationNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none"
                placeholder="Add any additional information or special requests..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDocumentUpload(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitApplication}
                disabled={uploadedDocuments.length === 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>Submit Application</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-3xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Investor Services Hub
                </h2>
                <p className="text-gray-400 text-sm">Complete business and investment solutions in one place</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-700 rounded-xl transition-colors group"
            >
              <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Service Categories</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceSelect(service)}
                className={`p-6 rounded-2xl bg-gradient-to-br ${getCategoryColor(service.category)} border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-xl group`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{service.processingTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{service.fees}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InvestorServices;
