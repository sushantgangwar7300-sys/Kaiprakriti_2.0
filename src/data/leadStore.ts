import { Lead, AnalyticsData } from '../types';

const LEADS_STORAGE_KEY = 'kai_prakriti_leads_v2';
const BLOGS_STORAGE_KEY = 'kai_prakriti_blogs_v2';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-001',
    name: 'Rajesh Singhania',
    company: 'Jindal Steels & Alloys Ltd',
    email: 'r.singhania@jindalsteels.in',
    phone: '+91 98112 44321',
    companyType: 'listed_top_1000',
    serviceId: 'cbam-embedded',
    status: 'proposal',
    estimatedBudget: '₹14,50,000',
    targetDeadline: 'Q4 2026',
    message: 'We require actual embedded carbon calculation for 45,000 MT of hot-rolled steel coils exported to Rotterdam under EU CBAM 2026 guidelines.',
    notes: ['Met VP Procurement on Sep 12', 'Shared draft MRV boundary document', 'Awaiting legal sign-off on facilitated verifier SLA'],
    source: 'Website Scope Calculator',
    createdAt: '2026-09-15T10:30:00Z',
  },
  {
    id: 'lead-002',
    name: 'Ananya Deshmukh',
    company: 'Mahindra Logistics Infrastructure',
    email: 'deshmukh.ananya@mahindralogistics.com',
    phone: '+91 99201 88765',
    companyType: 'listed_top_1000',
    serviceId: 'brsr-core',
    status: 'scoping',
    estimatedBudget: '₹9,80,000',
    targetDeadline: 'Q3 2026',
    message: 'Need complete BRSR Core assurance trail preparation for FY 2026-27 filing. Looking for zero self-audit compliance.',
    notes: ['Initial kickoff call completed', 'Data request sent for Scope 1 diesel fleets and Scope 2 EV depot chargers'],
    source: 'Direct Web Inquiry',
    createdAt: '2026-09-16T14:15:00Z',
  },
  {
    id: 'lead-003',
    name: 'Vikram Mehta',
    company: 'Apex Precision Auto Components (MSME)',
    email: 'vikram@apexprecision.co.in',
    phone: '+91 97420 11234',
    companyType: 'tier1_supplier',
    serviceId: 'zed-prep',
    status: 'new',
    estimatedBudget: '₹4,20,000',
    targetDeadline: 'Q4 2026',
    message: 'Our Tier-1 customer Bosch Germany has asked for ZED Gold rating or EcoVadis equivalent. We want to apply for MSME subsidy.',
    notes: ['New lead from MSME ZED blog post'],
    source: 'Blog Cross-Link (Medium)',
    createdAt: '2026-09-18T08:45:00Z',
  },
  {
    id: 'lead-004',
    name: 'Dr. Priya Sundaram',
    company: 'Greenko Bio-Chemicals Ltd',
    email: 'p.sundaram@greenkobio.com',
    phone: '+91 94441 55678',
    companyType: 'exporter_eu',
    serviceId: 'lca-product',
    status: 'contacted',
    estimatedBudget: '₹12,000,000',
    targetDeadline: 'Q1 2027',
    message: 'Cradle-to-grave ISO 14044 Life Cycle Assessment for bio-ethylene product line destined for French export.',
    notes: ['Sent intro capabilities deck and LCA methodology brief'],
    source: 'Website Contact Page',
    createdAt: '2026-09-17T11:20:00Z',
  },
  {
    id: 'lead-005',
    name: 'Harpreet Singh Sandhu',
    company: 'Punjab Agro Renewable Energy Corp',
    email: 'hssandhu@punjabagroenergy.org',
    phone: '+91 98765 43210',
    companyType: 'other',
    serviceId: 'pdd-authoring',
    status: 'won',
    estimatedBudget: '₹22,00,000',
    targetDeadline: 'Q2 2027',
    message: 'Paddy straw biochar carbon removal project for Verra VCS registration. Need PDD writing and VVB facilitation.',
    notes: ['Contract signed Sep 10', 'BEE and Verra VVB alignment finalized', 'Field sampling underway'],
    source: 'Referral',
    createdAt: '2026-09-10T09:00:00Z',
  },
];

export const MOCK_ANALYTICS: AnalyticsData = {
  pageviews: 48620,
  uniqueVisitors: 19480,
  bounceRate: 28.4,
  avgSessionDuration: '3m 48s',
  activeNow: 24,
  conversionRate: 4.8,
  topChannels: [
    { channel: 'Organic Search (Google)', visitors: 8240, share: 42.3 },
    { channel: 'LinkedIn Posts & Newsletter', visitors: 4890, share: 25.1 },
    { channel: 'Medium Syndicated Articles', visitors: 3120, share: 16.0 },
    { channel: 'Direct / Bookmarks', visitors: 2150, share: 11.0 },
    { channel: 'Referrals (Industry Portals)', visitors: 1080, share: 5.6 },
  ],
  topPages: [
    { path: '/', views: 18450, change: '+18.2%' },
    { path: '/services (11 Governed Services)', views: 11200, change: '+24.5%' },
    { path: '/blog/eu-cbam-2026-definitive-phase', views: 7640, change: '+45.1%' },
    { path: '/blog/sebi-brsr-core-decoupling', views: 6180, change: '+32.0%' },
    { path: '/about (Philosophical & Ethics)', views: 3420, change: '+12.4%' },
    { path: '/contact (Scoping Consultation)', views: 1730, change: '+19.8%' },
  ],
  countries: [
    { country: 'India', flag: '🇮🇳', share: 74.2 },
    { country: 'Germany', flag: '🇩🇪', share: 9.6 },
    { country: 'United Arab Emirates', flag: '🇦🇪', share: 6.4 },
    { country: 'United Kingdom', flag: '🇬🇧', share: 5.1 },
    { country: 'United States', flag: '🇺🇸', share: 4.7 },
  ],
  deviceBreakdown: [
    { device: 'Desktop (Workstations & Laptops)', share: 64.8 },
    { device: 'Mobile Phones', share: 31.4 },
    { device: 'Tablets', share: 3.8 },
  ],
};

// Lead management helper
export function getStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_LEADS;
  }
}

export function saveLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const current = getStoredLeads();
  const newLead: Lead = {
    ...leadData,
    id: `lead-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newLead, ...current];
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kai_prakriti_leads_updated', { detail: updated }));
  } catch (e) {
    console.error('Failed to persist lead', e);
  }
  return newLead;
}

export function updateLeadStatus(id: string, newStatus: Lead['status'], note?: string): Lead[] {
  const current = getStoredLeads();
  const updated = current.map(lead => {
    if (lead.id === id) {
      const existingNotes = lead.notes || [];
      const updatedNotes = note ? [note, ...existingNotes] : existingNotes;
      return { ...lead, status: newStatus, notes: updatedNotes };
    }
    return lead;
  });
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kai_prakriti_leads_updated', { detail: updated }));
  } catch (e) {}
  return updated;
}

export function deleteLead(id: string): Lead[] {
  const current = getStoredLeads();
  const updated = current.filter(lead => lead.id !== id);
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kai_prakriti_leads_updated', { detail: updated }));
  } catch (e) {}
  return updated;
}
