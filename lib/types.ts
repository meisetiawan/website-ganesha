// Database entity types

export interface Admin {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'editor';
  created_at: Date;
  updated_at: Date;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author_id: number;
  author_name?: string;
  is_published: boolean;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string | null;
  location: string;
  start_date: Date;
  end_date: Date | null;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Staff {
  id: number;
  name: string;
  position: string;
  department: string;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  order_index: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Gallery {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  order_index: number;
  is_published: boolean;
  created_at: Date;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: Date;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

export interface SchoolInfo {
  id: number;
  key: string;
  value: string;
  updated_at: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  admin?: Omit<Admin, 'password'>;
  message?: string;
}

export interface JwtPayload {
  id: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  is_published: boolean;
}

export interface EventFormData {
  title: string;
  description: string;
  content: string;
  image_url?: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_published: boolean;
}

export interface StaffFormData {
  name: string;
  position: string;
  department: string;
  image_url?: string;
  email?: string;
  phone?: string;
  bio?: string;
  order_index: number;
  is_active: boolean;
}
