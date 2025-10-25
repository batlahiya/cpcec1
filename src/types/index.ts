export interface ParkingSlot {
  id: string;
  position: [number, number];
  status: 'available' | 'occupied' | 'reserved';
  price?: number;
  amenities?: string[];
  distance?: number;
  type?: 'standard' | 'electric' | 'handicap';
}

export interface ParkingLocation {
  id: string;
  name: string;
  position: [number, number];
  slots: ParkingSlot[];
  totalSlots: number;
  availableSlots: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  mapData?: ParkingLocation[];
}

export interface QuickSuggestion {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  vendor: string;
}
