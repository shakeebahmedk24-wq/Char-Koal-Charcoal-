export interface MenuItem {
  id: string;
  name: string;
  category: 'grill' | 'appetizers' | 'steaks' | 'kebabs' | 'seafood' | 'vegetarian' | 'drinks' | 'desserts';
  description: string;
  price: string;
  calories?: string;
  dietary: ('Halal' | 'Gluten-Free' | 'Chef Special' | 'Vegetarian' | 'Spicy' | 'Signature')[];
  image: string;
  featured?: boolean;
}

export interface BanquetHall {
  id: string;
  name: string;
  tagline: string;
  capacitySeated: number;
  capacityReception: number;
  dimensions: string;
  description: string;
  features: string[];
  image: string;
  floorPlanUrl?: string;
  basePricing?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'dishes' | 'hearth' | 'banquet' | 'ambiance';
  image: string;
  description: string;
}

export interface VisitingHourDay {
  day: string;
  lunch: string;
  dinner: string;
  status: 'open' | 'special' | 'closed';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  source: 'Google' | 'TripAdvisor' | 'Yelp' | 'Michelin Guide';
  date: string;
  comment: string;
  avatar: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: string;
  occasion: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  tier: 'Silver' | 'Gold' | 'Black Diamond';
  pricePerPerson: number;
  description: string;
  minGuests: number;
  includes: string[];
  popular?: boolean;
}

export type PageId =
  | 'home'
  | 'about'
  | 'menu'
  | 'banquet'
  | 'gallery'
  | 'catering'
  | 'contact'
  | 'hours'
  | 'booking'
  | 'menukit';
