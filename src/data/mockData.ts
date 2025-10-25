import { ParkingLocation, QuickSuggestion, Product } from '../types';

export const mockParkingLocations: ParkingLocation[] = [
  {
    id: '1',
    name: 'Port City Central Parking',
    position: [6.936522148462264, 79.835108989812],
    totalSlots: 200,
    availableSlots: 89,
    slots: [
      // Row A - Electric Vehicle Row (North) - 8 slots
      { id: 'A1', position: [6.93630, 79.83520], status: 'available', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 5 },
      { id: 'A2', position: [6.93640, 79.83520], status: 'occupied', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 8 },
      { id: 'A3', position: [6.93650, 79.83520], status: 'available', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 11 },
      { id: 'A4', position: [6.93660, 79.83520], status: 'reserved', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 14 },
      { id: 'A5', position: [6.93670, 79.83520], status: 'available', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 17 },
      { id: 'A6', position: [6.93680, 79.83520], status: 'occupied', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 20 },
      { id: 'A7', position: [6.93690, 79.83520], status: 'available', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 23 },
      { id: 'A8', position: [6.93700, 79.83520], status: 'occupied', price: 700, amenities: ['EV Charging', 'Premium'], type: 'electric', distance: 26 },
      
      // Row B - Standard Parking (North-Center) - 8 slots
      { id: 'B1', position: [6.93630, 79.83510], status: 'available', price: 500, amenities: ['Covered'], type: 'standard', distance: 30 },
      { id: 'B2', position: [6.93640, 79.83510], status: 'occupied', price: 500, amenities: ['Covered'], type: 'standard', distance: 33 },
      { id: 'B3', position: [6.93650, 79.83510], status: 'available', price: 500, amenities: ['Covered'], type: 'standard', distance: 36 },
      { id: 'B4', position: [6.93660, 79.83510], status: 'occupied', price: 500, amenities: ['Covered'], type: 'standard', distance: 39 },
      { id: 'B5', position: [6.93670, 79.83510], status: 'available', price: 500, amenities: ['Covered'], type: 'standard', distance: 42 },
      { id: 'B6', position: [6.93680, 79.83510], status: 'occupied', price: 500, amenities: ['Covered'], type: 'standard', distance: 45 },
      { id: 'B7', position: [6.93690, 79.83510], status: 'available', price: 500, amenities: ['Covered'], type: 'standard', distance: 48 },
      { id: 'B8', position: [6.93700, 79.83510], status: 'occupied', price: 500, amenities: ['Covered'], type: 'standard', distance: 51 },
      
      // Row C - Standard Parking (Center) - 8 slots
      { id: 'C1', position: [6.93630, 79.83500], status: 'available', price: 400, type: 'standard', distance: 55 },
      { id: 'C2', position: [6.93640, 79.83500], status: 'occupied', price: 400, type: 'standard', distance: 58 },
      { id: 'C3', position: [6.93650, 79.83500], status: 'available', price: 400, type: 'standard', distance: 61 },
      { id: 'C4', position: [6.93660, 79.83500], status: 'occupied', price: 400, type: 'standard', distance: 64 },
      { id: 'C5', position: [6.93670, 79.83500], status: 'available', price: 400, type: 'standard', distance: 67 },
      { id: 'C6', position: [6.93680, 79.83500], status: 'occupied', price: 400, type: 'standard', distance: 70 },
      { id: 'C7', position: [6.93690, 79.83500], status: 'available', price: 400, type: 'standard', distance: 73 },
      { id: 'C8', position: [6.93700, 79.83500], status: 'occupied', price: 400, type: 'standard', distance: 76 },
      
      // Row D - Handicap Accessible (South-Center) - 6 slots
      { id: 'D1', position: [6.93630, 79.83490], status: 'available', price: 200, amenities: ['Handicap Accessible', 'Wide Space'], type: 'handicap', distance: 80 },
      { id: 'D2', position: [6.93640, 79.83490], status: 'occupied', price: 200, amenities: ['Handicap Accessible', 'Wide Space'], type: 'handicap', distance: 83 },
      { id: 'D3', position: [6.93650, 79.83490], status: 'available', price: 200, amenities: ['Handicap Accessible', 'Wide Space'], type: 'handicap', distance: 86 },
      { id: 'D4', position: [6.93660, 79.83490], status: 'occupied', price: 200, amenities: ['Handicap Accessible', 'Wide Space'], type: 'handicap', distance: 89 },
      { id: 'D5', position: [6.93670, 79.83490], status: 'available', price: 200, amenities: ['Handicap Accessible', 'Wide Space'], type: 'handicap', distance: 92 },
      { id: 'D6', position: [6.93680, 79.83490], status: 'occupied', price: 200, amenities: ['Handicap Accessible', 'Wide Space'], type: 'handicap', distance: 95 },
      
      // Row E - Premium Parking (South) - 6 slots
      { id: 'E1', position: [6.93630, 79.83480], status: 'available', price: 800, amenities: ['Valet Service', 'Premium', 'Covered'], type: 'standard', distance: 100 },
      { id: 'E2', position: [6.93640, 79.83480], status: 'occupied', price: 800, amenities: ['Valet Service', 'Premium', 'Covered'], type: 'standard', distance: 103 },
      { id: 'E3', position: [6.93650, 79.83480], status: 'available', price: 800, amenities: ['Valet Service', 'Premium', 'Covered'], type: 'standard', distance: 106 },
      { id: 'E4', position: [6.93660, 79.83480], status: 'reserved', price: 800, amenities: ['Valet Service', 'Premium', 'Covered'], type: 'standard', distance: 109 },
      { id: 'E5', position: [6.93670, 79.83480], status: 'available', price: 800, amenities: ['Valet Service', 'Premium', 'Covered'], type: 'standard', distance: 112 },
      { id: 'E6', position: [6.93680, 79.83480], status: 'occupied', price: 800, amenities: ['Valet Service', 'Premium', 'Covered'], type: 'standard', distance: 115 },
    ]
  },
  {
    id: '2',
    name: 'Harbour View Parking',
    position: [6.940456092524432, 79.82928625547561],
    totalSlots: 150,
    availableSlots: 67,
    slots: [
      // Row F - Harbour View Electric Row - 8 slots
      { id: 'F1', position: [6.94020, 79.82940], status: 'available', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 120 },
      { id: 'F2', position: [6.94030, 79.82940], status: 'occupied', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 123 },
      { id: 'F3', position: [6.94040, 79.82940], status: 'available', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 126 },
      { id: 'F4', position: [6.94050, 79.82940], status: 'occupied', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 129 },
      { id: 'F5', position: [6.94060, 79.82940], status: 'available', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 132 },
      { id: 'F6', position: [6.94070, 79.82940], status: 'occupied', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 135 },
      { id: 'F7', position: [6.94080, 79.82940], status: 'available', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 138 },
      { id: 'F8', position: [6.94090, 79.82940], status: 'occupied', price: 800, amenities: ['EV Charging', 'Harbour View', 'Premium'], type: 'electric', distance: 141 },
      
      // Row G - Harbour View Standard - 8 slots
      { id: 'G1', position: [6.94020, 79.82930], status: 'available', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 145 },
      { id: 'G2', position: [6.94030, 79.82930], status: 'occupied', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 148 },
      { id: 'G3', position: [6.94040, 79.82930], status: 'available', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 151 },
      { id: 'G4', position: [6.94050, 79.82930], status: 'occupied', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 154 },
      { id: 'G5', position: [6.94060, 79.82930], status: 'available', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 157 },
      { id: 'G6', position: [6.94070, 79.82930], status: 'occupied', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 160 },
      { id: 'G7', position: [6.94080, 79.82930], status: 'available', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 163 },
      { id: 'G8', position: [6.94090, 79.82930], status: 'occupied', price: 600, amenities: ['Harbour View', 'Covered'], type: 'standard', distance: 166 },
      
      // Row H - Harbour View Standard - 8 slots
      { id: 'H1', position: [6.94020, 79.82920], status: 'available', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 170 },
      { id: 'H2', position: [6.94030, 79.82920], status: 'occupied', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 173 },
      { id: 'H3', position: [6.94040, 79.82920], status: 'available', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 176 },
      { id: 'H4', position: [6.94050, 79.82920], status: 'occupied', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 179 },
      { id: 'H5', position: [6.94060, 79.82920], status: 'available', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 182 },
      { id: 'H6', position: [6.94070, 79.82920], status: 'occupied', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 185 },
      { id: 'H7', position: [6.94080, 79.82920], status: 'available', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 188 },
      { id: 'H8', position: [6.94090, 79.82920], status: 'occupied', price: 500, amenities: ['Harbour View'], type: 'standard', distance: 191 },
    ]
  },
  {
    id: '3',
    name: 'Port City Business District Parking',
    position: [6.932006328231787, 79.83955067828329],
    totalSlots: 180,
    availableSlots: 78,
    slots: [
      // Row I - Business District Electric - 8 slots
      { id: 'I1', position: [6.93170, 79.83960], status: 'available', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 200 },
      { id: 'I2', position: [6.93180, 79.83960], status: 'occupied', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 203 },
      { id: 'I3', position: [6.93190, 79.83960], status: 'available', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 206 },
      { id: 'I4', position: [6.93200, 79.83960], status: 'occupied', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 209 },
      { id: 'I5', position: [6.93210, 79.83960], status: 'available', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 212 },
      { id: 'I6', position: [6.93220, 79.83960], status: 'occupied', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 215 },
      { id: 'I7', position: [6.93230, 79.83960], status: 'available', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 218 },
      { id: 'I8', position: [6.93240, 79.83960], status: 'occupied', price: 700, amenities: ['EV Charging', 'Business Hours', 'Fast Charging'], type: 'electric', distance: 221 },
      
      // Row J - Business District Standard - 8 slots
      { id: 'J1', position: [6.93170, 79.83950], status: 'available', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 225 },
      { id: 'J2', position: [6.93180, 79.83950], status: 'occupied', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 228 },
      { id: 'J3', position: [6.93190, 79.83950], status: 'available', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 231 },
      { id: 'J4', position: [6.93200, 79.83950], status: 'occupied', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 234 },
      { id: 'J5', position: [6.93210, 79.83950], status: 'available', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 237 },
      { id: 'J6', position: [6.93220, 79.83950], status: 'occupied', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 240 },
      { id: 'J7', position: [6.93230, 79.83950], status: 'available', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 243 },
      { id: 'J8', position: [6.93240, 79.83950], status: 'occupied', price: 600, amenities: ['Business Hours', 'Covered'], type: 'standard', distance: 246 },
      
      // Row K - Business District Standard - 8 slots
      { id: 'K1', position: [6.93170, 79.83940], status: 'available', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 250 },
      { id: 'K2', position: [6.93180, 79.83940], status: 'occupied', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 253 },
      { id: 'K3', position: [6.93190, 79.83940], status: 'available', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 256 },
      { id: 'K4', position: [6.93200, 79.83940], status: 'occupied', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 259 },
      { id: 'K5', position: [6.93210, 79.83940], status: 'available', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 262 },
      { id: 'K6', position: [6.93220, 79.83940], status: 'occupied', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 265 },
      { id: 'K7', position: [6.93230, 79.83940], status: 'available', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 268 },
      { id: 'K8', position: [6.93240, 79.83940], status: 'occupied', price: 500, amenities: ['Business Hours'], type: 'standard', distance: 271 },
    ]
  }
];

export const quickSuggestions: QuickSuggestion[] = [
  {
    id: 'parking',
    title: 'Parking',
    description: 'Find and reserve parking spots',
    icon: '🚗',
    action: () => {}
  },
  {
    id: 'reservation',
    title: 'Reservations',
    description: 'Book restaurants and venues',
    icon: '📅',
    action: () => {}
  },
  {
    id: 'shopping',
    title: 'Shopping',
    description: 'Browse and buy products',
    icon: '🛍️',
    action: () => {}
  },
  {
    id: 'investor',
    title: 'Investor Services',
    description: 'Business and investment services',
    icon: '💼',
    action: () => {}
  },
  {
    id: 'developer',
    title: 'Developer Services',
    description: 'Tech and development support',
    icon: '💻',
    action: () => {}
  },
  {
    id: 'weather',
    title: 'Weather',
    description: 'Current weather and forecasts',
    icon: '🌤️',
    action: () => {}
  }
];

export const popularDestinations = [
  'Port City Mall',
  'Business District',
  'Harbor View',
  'City Center',
  'Waterfront',
  'Tech Hub'
];


export interface InvestorService {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'banking' | 'investment' | 'legal' | 'tax' | 'real_estate' | 'insurance';
  contact: string;
  requirements: string[];
  processingTime: string;
  fees: string;
}

export const mockProducts: Product[] = [
  // Electronics
  {
    id: 'p1',
    name: 'Quantum Smartphone Pro',
    description: 'Next-gen smartphone with AI assistant and holographic display',
    price: 1299.99,
    image: '📱',
    category: 'Electronics',
    inStock: true,
    rating: 4.8,
    vendor: 'TechCorp Port City'
  },
  {
    id: 'p2',
    name: 'Neural Headset VR',
    description: 'Virtual reality headset with brain-computer interface',
    price: 899.99,
    image: '🥽',
    category: 'Electronics',
    inStock: true,
    rating: 4.6,
    vendor: 'VR Innovations'
  },
  {
    id: 'p3',
    name: 'Solar Power Bank',
    description: 'Portable solar charger with wireless charging capability',
    price: 149.99,
    image: '🔋',
    category: 'Electronics',
    inStock: true,
    rating: 4.5,
    vendor: 'GreenTech Solutions'
  },
  
  // Fashion
  {
    id: 'p4',
    name: 'Smart Suit',
    description: 'Self-adjusting temperature control business suit',
    price: 599.99,
    image: '👔',
    category: 'Fashion',
    inStock: true,
    rating: 4.7,
    vendor: 'Fashion Forward'
  },
  {
    id: 'p5',
    name: 'Holographic Dress',
    description: 'Color-changing dress with embedded LED technology',
    price: 799.99,
    image: '👗',
    category: 'Fashion',
    inStock: false,
    rating: 4.9,
    vendor: 'Future Fashion'
  },
  
  // Home & Living
  {
    id: 'p6',
    name: 'Smart Home Hub',
    description: 'AI-powered home automation system',
    price: 399.99,
    image: '🏠',
    category: 'Home & Living',
    inStock: true,
    rating: 4.6,
    vendor: 'SmartHome Port City'
  },
  {
    id: 'p7',
    name: 'Air Purifier Pro',
    description: 'Advanced air purification with real-time monitoring',
    price: 299.99,
    image: '🌬️',
    category: 'Home & Living',
    inStock: true,
    rating: 4.4,
    vendor: 'CleanAir Solutions'
  }
];

export const investorServices: InvestorService[] = [
  // Banking Services
  {
    id: 'inv1',
    name: 'Business Account Opening',
    description: 'Open corporate bank accounts with premium banking services',
    icon: '🏦',
    category: 'banking',
    contact: '+94 11 2345 700',
    requirements: ['Business Registration', 'Tax ID', 'Board Resolution', 'Financial Statements'],
    processingTime: '2-3 business days',
    fees: 'No setup fee, LKR 10,000/month maintenance'
  },
  {
    id: 'inv2',
    name: 'Investment Advisory',
    description: 'Professional investment portfolio management and advisory services',
    icon: '📈',
    category: 'investment',
    contact: '+94 11 2345 701',
    requirements: ['KYC Documents', 'Financial Profile', 'Investment Goals', 'Risk Assessment'],
    processingTime: '1-2 business days',
    fees: '1% of assets under management'
  },
  {
    id: 'inv3',
    name: 'Loan Processing',
    description: 'Business and personal loans with competitive interest rates',
    icon: '💰',
    category: 'banking',
    contact: '+94 11 2345 702',
    requirements: ['Credit Report', 'Income Proof', 'Collateral Documents', 'Business Plan'],
    processingTime: '5-7 business days',
    fees: 'Processing fee: 0.5% of loan amount'
  },
  
  // Legal Services
  {
    id: 'inv4',
    name: 'Company Incorporation',
    description: 'Complete company registration and legal setup services',
    icon: '⚖️',
    category: 'legal',
    contact: '+94 11 2345 703',
    requirements: ['Company Name', 'Business Type', 'Directors Info', 'Registered Address'],
    processingTime: '7-10 business days',
    fees: 'LKR 100,000 + government fees'
  },
  {
    id: 'inv5',
    name: 'Intellectual Property',
    description: 'Patent, trademark, and copyright registration services',
    icon: '🔒',
    category: 'legal',
    contact: '+94 11 2345 704',
    requirements: ['IP Documentation', 'Prior Art Search', 'Application Forms', 'Fees'],
    processingTime: '3-6 months',
    fees: 'Starting from LKR 40,000 per application'
  },
  
  // Tax Services
  {
    id: 'inv6',
    name: 'Tax Consultation',
    description: 'Professional tax planning and compliance services',
    icon: '📊',
    category: 'tax',
    contact: '+94 11 2345 705',
    requirements: ['Financial Records', 'Previous Tax Returns', 'Business Documents'],
    processingTime: '1-2 business days',
    fees: 'LKR 30,000/hour consultation'
  },
  
  // Real Estate
  {
    id: 'inv7',
    name: 'Property Investment',
    description: 'Commercial and residential property investment opportunities',
    icon: '🏢',
    category: 'real_estate',
    contact: '+94 11 2345 706',
    requirements: ['Investment Budget', 'Property Preferences', 'Location Analysis'],
    processingTime: '2-4 weeks',
    fees: '2% commission on purchase'
  },
  
  // Insurance
  {
    id: 'inv8',
    name: 'Business Insurance',
    description: 'Comprehensive business insurance coverage',
    icon: '🛡️',
    category: 'insurance',
    contact: '+94 11 2345 707',
    requirements: ['Business Details', 'Risk Assessment', 'Coverage Requirements'],
    processingTime: '3-5 business days',
    fees: 'Premium based on coverage'
  }
];

export const weatherSuggestions = [
  'Show me the weather dashboard',
  'What\'s the weather forecast?',
  'Check weather alerts for me',
  'Open weather command center',
  'I need weather information'
];

export const smartSuggestions = [
  'Find me a parking spot',
  'I want to make a reservation',
  'Show me shopping options',
  'I need investor services',
  'Help me with developer services',
  'Show me public safety overview',
  'Where can I park my car?',
  'I\'d like to book a venue'
];

export interface Venue {
  id: string;
  name: string;
  type: 'restaurant' | 'hotel' | 'spa' | 'event' | 'entertainment';
  category: string;
  description: string;
  rating: number;
  priceRange: string;
  image: string;
  amenities: string[];
  availability: {
    date: string;
    timeSlots: string[];
  }[];
  location: string;
  contact: string;
}

export const mockVenues: Venue[] = [
  // Restaurants
  {
    id: 'r1',
    name: 'Nebula Fine Dining',
    type: 'restaurant',
    category: 'Fine Dining',
    description: 'Experience molecular gastronomy in a zero-gravity inspired setting with panoramic harbor views.',
    rating: 4.9,
    priceRange: 'LKR 10,000+',
    image: '🌌',
    amenities: ['Harbor View', 'Molecular Cuisine', 'Wine Pairing', 'Private Dining'],
    availability: [
      { date: '2024-01-15', timeSlots: ['19:00', '19:30', '20:00', '20:30', '21:00'] },
      { date: '2024-01-16', timeSlots: ['18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'] },
      { date: '2024-01-17', timeSlots: ['19:00', '19:30', '20:00', '20:30'] }
    ],
    location: 'Port City Harbor Tower, Level 45',
    contact: '+94 11 2345 678'
  },
  {
    id: 'r2',
    name: 'Quantum Sushi Bar',
    type: 'restaurant',
    category: 'Japanese Fusion',
    description: 'AI-powered sushi preparation with holographic menu displays and interactive dining experiences.',
    rating: 4.7,
    priceRange: 'LKR 4,000-10,000',
    image: '🍣',
    amenities: ['AI Chef', 'Holographic Menu', 'Sake Bar', 'Omakase'],
    availability: [
      { date: '2024-01-15', timeSlots: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'] },
      { date: '2024-01-16', timeSlots: ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'] },
      { date: '2024-01-17', timeSlots: ['18:00', '18:30', '19:00', '19:30', '20:00'] }
    ],
    location: 'Port City Tech Hub, Floor 12',
    contact: '+94 11 2345 679'
  },
  {
    id: 'r3',
    name: 'Cyberpunk Café',
    type: 'restaurant',
    category: 'Fusion',
    description: 'Neon-lit cyberpunk themed café with virtual reality dining experiences and digital art displays.',
    rating: 4.5,
    priceRange: 'LKR 1,500-4,000',
    image: '🌆',
    amenities: ['VR Dining', 'Neon Ambiance', 'Digital Art', 'Live Music'],
    availability: [
      { date: '2024-01-15', timeSlots: ['12:00', '12:30', '13:00', '13:30', '14:00', '18:00', '18:30', '19:00'] },
      { date: '2024-01-16', timeSlots: ['12:00', '12:30', '13:00', '13:30', '14:00', '18:00', '18:30', '19:00', '19:30'] },
      { date: '2024-01-17', timeSlots: ['12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30'] }
    ],
    location: 'Port City Underground, Level B2',
    contact: '+94 11 2345 680'
  },

  // Hotels
  {
    id: 'h1',
    name: 'Stellar Suites',
    type: 'hotel',
    category: 'Luxury',
    description: 'Floating hotel pods with transparent floors, zero-gravity sleeping chambers, and AI concierge services.',
    rating: 4.9,
    priceRange: 'LKR 20,000+',
    image: '⭐',
    amenities: ['Zero-Gravity Pods', 'AI Concierge', 'Transparent Floors', 'Space Views', 'Floating Pool'],
    availability: [
      { date: '2024-01-15', timeSlots: ['Check-in: 15:00', 'Check-in: 16:00', 'Check-in: 17:00'] },
      { date: '2024-01-16', timeSlots: ['Check-in: 14:00', 'Check-in: 15:00', 'Check-in: 16:00', 'Check-in: 17:00'] },
      { date: '2024-01-17', timeSlots: ['Check-in: 15:00', 'Check-in: 16:00', 'Check-in: 17:00', 'Check-in: 18:00'] }
    ],
    location: 'Port City Sky District, Tower Alpha',
    contact: '+94 11 2345 681'
  },
  {
    id: 'h2',
    name: 'Neon Dreams Hotel',
    type: 'hotel',
    category: 'Boutique',
    description: 'Futuristic boutique hotel with holographic room service, smart mirrors, and immersive entertainment systems.',
    rating: 4.6,
    priceRange: 'LKR 4,000-10,000',
    image: '🌃',
    amenities: ['Holographic Service', 'Smart Mirrors', 'Immersive Entertainment', 'Neon Architecture'],
    availability: [
      { date: '2024-01-15', timeSlots: ['Check-in: 14:00', 'Check-in: 15:00', 'Check-in: 16:00'] },
      { date: '2024-01-16', timeSlots: ['Check-in: 13:00', 'Check-in: 14:00', 'Check-in: 15:00', 'Check-in: 16:00'] },
      { date: '2024-01-17', timeSlots: ['Check-in: 14:00', 'Check-in: 15:00', 'Check-in: 16:00', 'Check-in: 17:00'] }
    ],
    location: 'Port City Neon Quarter, Building 7',
    contact: '+94 11 2345 682'
  },

  // Spas
  {
    id: 's1',
    name: 'Quantum Wellness Center',
    type: 'spa',
    category: 'Luxury Spa',
    description: 'Advanced biohacking spa with cryotherapy chambers, float tanks, and AI-powered wellness optimization.',
    rating: 4.8,
    priceRange: 'LKR 4,000-10,000',
    image: '🧘',
    amenities: ['Cryotherapy', 'Float Tanks', 'AI Wellness', 'Biohacking', 'Meditation Pods'],
    availability: [
      { date: '2024-01-15', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { date: '2024-01-16', timeSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'] },
      { date: '2024-01-17', timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] }
    ],
    location: 'Port City Wellness District, Floor 8',
    contact: '+94 11 2345 683'
  },

  // Events
  {
    id: 'e1',
    name: 'Holographic Conference Center',
    type: 'event',
    category: 'Conference',
    description: 'State-of-the-art conference facility with holographic presentations, AI translation, and virtual reality meeting rooms.',
    rating: 4.7,
    priceRange: 'LKR 10,000+',
    image: '🎭',
    amenities: ['Holographic Presentations', 'AI Translation', 'VR Meeting Rooms', 'Smart Catering'],
    availability: [
      { date: '2024-01-15', timeSlots: ['09:00-12:00', '14:00-17:00', '18:00-21:00'] },
      { date: '2024-01-16', timeSlots: ['09:00-12:00', '14:00-17:00', '18:00-21:00'] },
      { date: '2024-01-17', timeSlots: ['09:00-12:00', '14:00-17:00'] }
    ],
    location: 'Port City Business District, Convention Center',
    contact: '+94 11 2345 684'
  },

  // Entertainment
  {
    id: 'ent1',
    name: 'Virtual Reality Arcade',
    type: 'entertainment',
    category: 'Gaming',
    description: 'Next-generation VR gaming center with full-body motion capture, haptic feedback suits, and multiplayer experiences.',
    rating: 4.6,
    priceRange: 'LKR 1,500-4,000',
    image: '🎮',
    amenities: ['Full-Body VR', 'Haptic Suits', 'Multiplayer', 'Esports Arena', 'AI Opponents'],
    availability: [
      { date: '2024-01-15', timeSlots: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '18:00', '19:00'] },
      { date: '2024-01-16', timeSlots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
      { date: '2024-01-17', timeSlots: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '18:00', '19:00'] }
    ],
    location: 'Port City Entertainment Zone, Level 3',
    contact: '+94 11 2345 685'
  }
];
