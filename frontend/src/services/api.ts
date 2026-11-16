import type {
  Property,
  WebsiteSettings,
  EnquiryPayload,
  EnquiryItem,
  MediaItem,
  AdminUser,
} from '../types';

const getNormalizedApiUrl = (): string => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();

  // If no env variable set, use default relative proxy path '/api'
  if (!envUrl) return '/api';

  const cleanUrl = envUrl.replace(/\/+$/, '');

  // If user provided backend domain (e.g. https://vanam-backend.onrender.com) without /api, append /api
  if (cleanUrl.startsWith('http') && !cleanUrl.endsWith('/api')) {
    return `${cleanUrl}/api`;
  }

  return cleanUrl;
};

const API_BASE_URL = getNormalizedApiUrl();

// Admin Token Helpers
const TOKEN_KEY = 'vanam_admin_token';
const USER_KEY = 'vanam_admin_user';

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getUser(): AdminUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser(user: AdminUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

const getAuthHeaders = (): HeadersInit => {
  const token = authStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // ==========================================
  // Public APIs
  // ==========================================
  async getSettings(): Promise<WebsiteSettings | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      return data.settings;
    } catch (error) {
      console.warn('API error fetching settings, using defaults:', error);
      return null;
    }
  },

  async getProperties(params?: {
    type?: string;
    propertyType?: string;
    status?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ properties: Property[]; total: number; pages: number }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.propertyType) searchParams.set('propertyType', params.propertyType);
      else if (params?.type) searchParams.set('propertyType', params.type);
      if (params?.status) searchParams.set('status', params.status);
      if (params?.featured !== undefined) searchParams.set('featured', String(params.featured));
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));

      const url = `${API_BASE_URL}/properties?${searchParams.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch properties');
      const data = await res.json();
      return {
        properties: data.properties || [],
        total: data.total || 0,
        pages: data.pages || 1,
      };
    } catch (error) {
      console.error('API error fetching properties:', error);
      return { properties: [], total: 0, pages: 1 };
    }
  },

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${slug}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch property details');
      }
      const data = await res.json();
      return data.property;
    } catch (error) {
      console.error(`API error fetching property ${slug}:`, error);
      return null;
    }
  },

  async submitEnquiry(payload: EnquiryPayload): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || 'Submission failed' };
      }
      return { success: true, message: 'Enquiry submitted successfully' };
    } catch (error: any) {
      console.error('API error submitting enquiry:', error);
      return { success: false, message: error.message || 'Network error' };
    }
  },

  async bookSiteVisit(payload: any): Promise<{ success: boolean; message?: string; siteVisit?: any }> {
    try {
      const res = await fetch(`${API_BASE_URL}/site-visits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || 'Booking failed' };
      }
      return { success: true, message: data.message, siteVisit: data.siteVisit };
    } catch (error: any) {
      console.error('API error booking site visit:', error);
      return { success: false, message: error.message || 'Network error' };
    }
  },

  // ==========================================
  // Admin Authentication
  // ==========================================
  async adminLogin(email: string, password: string): Promise<{ success: boolean; token?: string; admin?: AdminUser; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Invalid credentials' };
      }
      if (data.token && data.admin) {
        authStorage.setToken(data.token);
        authStorage.setUser(data.admin);
      }
      return { success: true, token: data.token, admin: data.admin };
    } catch (error: any) {
      return { success: false, message: error.message || 'Login network error' };
    }
  },

  async adminGetMe(): Promise<AdminUser | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/me`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        authStorage.removeToken();
        return null;
      }
      const data = await res.json();
      return data.admin;
    } catch {
      return null;
    }
  },

  async adminChangePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/change-password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Network error' };
    }
  },

  // ==========================================
  // Admin Property Management
  // ==========================================
  async adminGetProperties(params?: { page?: number; limit?: number }): Promise<{ properties: Property[]; total: number; pages: number }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));

      const res = await fetch(`${API_BASE_URL}/admin/properties?${searchParams.toString()}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to fetch admin properties');
      const data = await res.json();
      return {
        properties: data.properties || [],
        total: data.total || 0,
        pages: data.pages || 1,
      };
    } catch (error) {
      console.error(error);
      return { properties: [], total: 0, pages: 1 };
    }
  },

  async adminCreateProperty(propertyData: Partial<Property>): Promise<{ success: boolean; property?: Property; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Creation failed' };
      }
      return { success: true, property: data.property };
    } catch (error: any) {
      return { success: false, message: error.message || 'Network error' };
    }
  },

  async adminUpdateProperty(id: string, propertyData: Partial<Property>): Promise<{ success: boolean; property?: Property; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Update failed' };
      }
      return { success: true, property: data.property };
    } catch (error: any) {
      return { success: false, message: error.message || 'Network error' };
    }
  },

  async adminDeleteProperty(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  // ==========================================
  // Admin Enquiry Management
  // ==========================================
  async adminGetEnquiries(params?: { status?: string; page?: number; limit?: number }): Promise<{ enquiries: EnquiryItem[]; total: number; pages: number }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set('status', params.status);
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));

      const res = await fetch(`${API_BASE_URL}/enquiries?${searchParams.toString()}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to fetch enquiries');
      const data = await res.json();
      return {
        enquiries: data.enquiries || [],
        total: data.total || 0,
        pages: data.pages || 1,
      };
    } catch (error) {
      console.error(error);
      return { enquiries: [], total: 0, pages: 1 };
    }
  },

  async adminUpdateEnquiry(id: string, updateData: { status?: string }): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  async adminDeleteEnquiry(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  // ==========================================
  // Admin Site Visit Management
  // ==========================================
  async adminGetSiteVisits(params?: { status?: string; date?: string; search?: string; page?: number; limit?: number }): Promise<{ siteVisits: any[]; total: number; pages: number }> {
    try {
      const query = new URLSearchParams();
      if (params?.status && params.status !== 'all') query.append('status', params.status);
      if (params?.date) query.append('date', params.date);
      if (params?.search) query.append('search', params.search);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());

      const res = await fetch(`${API_BASE_URL}/site-visits?${query.toString()}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return {
        siteVisits: data.siteVisits || [],
        total: data.total || 0,
        pages: data.pages || 1,
      };
    } catch (error) {
      console.error(error);
      return { siteVisits: [], total: 0, pages: 1 };
    }
  },

  async adminUpdateSiteVisit(id: string, updateData: { status?: string; notes?: string; preferredDate?: string; preferredSlot?: string }): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/site-visits/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  async adminDeleteSiteVisit(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/site-visits/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  // ==========================================
  // Admin Website Settings
  // ==========================================
  async adminUpdateSettings(settingsData: Partial<WebsiteSettings>): Promise<{ success: boolean; settings?: WebsiteSettings; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(settingsData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Settings update failed' };
      }
      return { success: true, settings: data.settings };
    } catch (error: any) {
      return { success: false, message: error.message || 'Network error' };
    }
  },

  // ==========================================
  // Admin Media Library
  // ==========================================
  async adminGetMedia(params?: { category?: string; page?: number; limit?: number }): Promise<{ media: MediaItem[]; total: number; pages: number }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.set('category', params.category);
      if (params?.page) searchParams.set('page', String(params.page));
      if (params?.limit) searchParams.set('limit', String(params.limit));

      const res = await fetch(`${API_BASE_URL}/media?${searchParams.toString()}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error('Failed to fetch media');
      const data = await res.json();
      return {
        media: data.media || [],
        total: data.total || 0,
        pages: data.pages || 1,
      };
    } catch (error) {
      console.error(error);
      return { media: [], total: 0, pages: 1 };
    }
  },

  async adminUploadMedia(formData: FormData): Promise<{ success: boolean; media?: MediaItem; message?: string }> {
    try {
      const token = authStorage.getToken();
      const res = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // Note: do not set Content-Type for FormData so boundary is added automatically
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Media upload failed' };
      }
      return { success: true, media: data.media };
    } catch (error: any) {
      return { success: false, message: error.message || 'Upload error' };
    }
  },

  async adminDeleteMedia(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/media/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return { success: res.ok && data.success, message: data.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },
};
