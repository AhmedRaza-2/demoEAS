export type VehicleType = 'sedan' | 'suv' | 'crossover' | 'hatchback' | 'luxury';

export interface ServiceFeature {
  text: string;
  included: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  category: 'detailing' | 'ppf' | 'coating' | 'tints' | 'specialty';
  price: number | 'Prices on Inspection';
  priceDisplay: string;
  duration: string;
  popular?: boolean;
  germanProducts?: boolean;
  badge?: string;
  shortDesc: string;
  description: string;
  features: string[];
  image: string;
  recommendedFor: string;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  category: string;
  description: string;
}

export interface Booking {
  id: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  carMake: string;
  carModel: string;
  carYear: string;
  vehicleType: VehicleType;
  serviceId: string;
  serviceName: string;
  selectedAddOns: string[];
  date: string;
  timeSlot: string;
  estimatedTotal: number | string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  adminNotes?: string;
  confirmedAt?: string;
  createdAt: string;
  updatedAt?: string;
  source?: 'website' | 'whatsapp' | 'google_auth';
}

export interface UserProfile {
  id: string;
  uid?: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'customer' | 'admin';
  savedVehicles?: Array<{
    make: string;
    model: string;
    year: string;
    type: VehicleType;
  }>;
  createdAt: string;
  updatedAt?: string;
}

export interface InstagramPost {
  id: string;
  shortcode: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: 'image' | 'video' | 'carousel';
  carModel: string;
  serviceDone: string;
  videoDuration?: string;
  isPinned?: boolean;
}

export interface GoogleReview {
  id: string;
  userId?: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  verified: boolean;
  carServiced: string;
  service: string;
  comment: string;
  likesCount: number;
  photosCount?: number;
  isNew?: boolean;
  ownerReply?: string;
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: 'PPF Guide' | 'Ceramic Coating' | 'Detailing Tips' | 'UV Tints';
  tags: string[];
  coverImage: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  carDetails: string;
  serviceInterest: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'booked';
}

export interface ProjectGalleryItem {
  id: string;
  title: string;
  category: 'PPF' | 'Ceramic' | 'Detailing' | 'Tints' | 'Interior';
  car: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  packageUsed: string;
  completionTime: string;
  featured?: boolean;
  createdAt?: string;
}
