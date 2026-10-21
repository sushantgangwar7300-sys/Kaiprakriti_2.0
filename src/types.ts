export type DesignThemeId = 'verdant' | 'vibrant' | 'editorial';

export type ThemeMode = 'light' | 'dark';

export type Language = 'en' | 'hi';

export type PageId = 'home' | 'about' | 'services' | 'blog' | 'contact' | 'admin' | 'admin-login';

export type ServiceCategory = 'direct' | 'facilitated' | 'hybrid';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: ServiceCategory;
  standard: string;
  standardCode: string;
  deliverables: string[];
  whySeparateNote: string;
  keyMetric?: string;
}

export interface StandardItem {
  id: string;
  code: string;
  name: string;
  authority: string;
  scope: string;
  keyRequirement: string;
  status: string;
}

export interface DesignDirection {
  id: DesignThemeId;
  title: string;
  subtitle: string;
  aesthetic: string;
  primaryTone: string;
  background: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  accentBg: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  pillDirect: string;
  pillFacilitated: string;
  fontNotes: string;
  whyItWorks: string;
  swatches: { name: string; hex: string; role: string }[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  serviceId: string;
  companyType: string;
  message: string;
  estimatedBudget?: string;
  targetDeadline?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  mediumUrl?: string;
  linkedinUrl?: string;
  coverImage?: string;
  views: number;
  likes: number;
  featured?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  companyType: string;
  serviceId: string;
  status: 'new' | 'contacted' | 'scoping' | 'proposal' | 'won' | 'lost';
  estimatedBudget?: string;
  targetDeadline?: string;
  message: string;
  notes?: string[];
  source: string;
  createdAt: string;
}

export interface AnalyticsData {
  pageviews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  activeNow: number;
  conversionRate: number;
  topChannels: { channel: string; visitors: number; share: number }[];
  topPages: { path: string; views: number; change: string }[];
  countries: { country: string; flag: string; share: number }[];
  deviceBreakdown: { device: string; share: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

