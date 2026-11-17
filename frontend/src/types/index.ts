export interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: 'villa' | 'plot' | 'apartment';
  configuration: string;
  plotArea: {
    value: number;
    unit: string;
  };
  builtUpArea: {
    value: number;
    unit: string;
  };
  price: number;
  priceDisplay: string;
  location: {
    area: string;
    city: string;
    state: string;
  };
  amenities: string[];
  images: Array<{
    url: string;
    publicId?: string;
    alt?: string;
    isPrimary?: boolean;
  }>;
  status: 'available' | 'sold' | 'upcoming' | 'unavailable';
  isPublished: boolean;
  featured: boolean;
  highlights: string[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface WebsiteSettings {
  siteKey: string;
  logo: {
    url: string;
    publicId?: string;
    alt?: string;
  };
  navbar: {
    phone: string;
    links: Array<{
      label: string;
      href: string;
      order?: number;
    }>;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: {
      text: string;
      link: string;
    };
    ctaSecondary: {
      text: string;
      link: string;
    };
    images: Array<{
      url: string;
      publicId?: string;
      alt?: string;
    }>;
  };
  about: {
    title: string;
    description: string;
    vision?: string;
    entranceImage?: string;
    heroImage?: string;
    highlights: string[];
    images?: Array<{
      url: string;
      publicId?: string;
      alt?: string;
    }>;
  };
  amenities: Array<{
    title: string;
    description: string;
    icon?: string;
    image?: {
      url: string;
      publicId?: string;
    };
  }>;
  propertyOptions?: {
    eyebrow?: string;
    headingFirst?: string;
    headingSecond?: string;
    description?: string;
    card1?: {
      title?: string;
      spec?: string;
      image?: string;
    };
    card2?: {
      title?: string;
      subtitle?: string;
      image?: string;
    };
    card3?: {
      title?: string;
      spec?: string;
      image?: string;
    };
  };
  signatureProjects?: {
    eyebrow?: string;
    heading?: string;
    subtitle?: string;
    islandImage?: string;
    phase1?: {
      title?: string;
      spec?: string;
      description?: string;
      image?: string;
    };
    phase2?: {
      title?: string;
      spec?: string;
      description?: string;
      image?: string;
    };
    phase3?: {
      title?: string;
      spec?: string;
      description?: string;
      image?: string;
    };
    leaf1?: {
      value?: string;
      label?: string;
    };
    leaf2?: {
      value?: string;
      label?: string;
    };
    leaf3?: {
      value?: string;
      label?: string;
    };
    leaf4?: {
      value?: string;
      label?: string;
    };
  };
  curatedAmenities?: {
    eyebrow?: string;
    heading?: string;
    subtitle?: string;
    clubhouseImage?: string;
    card1?: {
      title?: string;
      image?: string;
    };
    card2?: {
      title?: string;
      image?: string;
    };
    card3?: {
      title?: string;
      image?: string;
    };
    clubDiningImage?: string;
    clubLoungeImage?: string;
    clubPrivateDiningImage?: string;
    yogaImage?: string;
    golfImage?: string;
    sportsCourtImage?: string;
    joggingTrackImage?: string;
    weddingLawnImage?: string;
    banquetHallImage?: string;
    amphitheatreImage?: string;
    roadsImage?: string;
    drainageImage?: string;
    securityImage?: string;
  };
  connectivityHighwayImage?: string;
  locationHighlights: Array<{
    name: string;
    description: string;
    distance: string;
    image?: {
      url: string;
      publicId?: string;
    };
  }>;
  contact: {
    phone: string;
    email: string;
    address: string;
    mapEmbedUrl?: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  footer: {
    description: string;
    copyright: string;
    links?: Array<{
      label: string;
      href: string;
    }>;
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    ogImage?: string;
  };
  documentChecklist?: {
    title?: string;
    subtitle?: string;
    contactAssistance?: string;
  };
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  propertyInterest?: string;
  message?: string;
}

export interface EnquiryItem {
  _id: string;
  name: string;
  phone: string;
  email: string;
  propertyInterest: string;
  message: string;
  status: 'new' | 'contacted' | 'follow-up' | 'closed';
  source?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SiteVisitPayload {
  name: string;
  phone: string;
  email?: string;
  propertyInterested: string;
  preferredDate: string;
  preferredSlot: string;
  transportAssistance?: string;
  visitorsCount?: number;
  notes?: string;
}

export interface SiteVisitItem {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  propertyInterested: string;
  preferredDate: string;
  preferredSlot: string;
  transportAssistance: string;
  visitorsCount: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface MediaItem {
  _id: string;
  url: string;
  publicId: string;
  alt: string;
  category: 'villas' | 'architecture' | 'interiors' | 'landscapes' | 'amenities' | 'lifestyle' | 'hero' | 'gallery' | 'other';
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  createdAt: string;
}

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'superadmin';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}
