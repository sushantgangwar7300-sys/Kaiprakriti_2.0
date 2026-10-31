import { Lead, AnalyticsData } from '../types';
import {
  DEV_TEST_REFERENCE_LEAD,
  saveLeadToFirestore,
  updateLeadInFirestore,
  deleteLeadFromFirestore,
  fetchLeadsFromFirestore,
} from '../services/firebase';

const LEADS_STORAGE_KEY = 'kai_prakriti_leads_v2';
const BLOGS_STORAGE_KEY = 'kai_prakriti_blogs_v2';

// Single reference test lead as requested by user (all fake leads removed)
export const INITIAL_LEADS: Lead[] = [DEV_TEST_REFERENCE_LEAD];

export { DEV_TEST_REFERENCE_LEAD };

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
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([DEV_TEST_REFERENCE_LEAD]));
      return [DEV_TEST_REFERENCE_LEAD];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Purge any fake mock leads from earlier versions
      const isContaminated = parsed.some(
        l => l.id === 'lead-001' || l.id === 'lead-002' || l.id === 'lead-003' || l.id === 'lead-004' || l.id === 'lead-005' || l.name === 'Rajesh Singhania'
      );
      if (isContaminated) {
        const cleaned = parsed.filter(
          l => l.id !== 'lead-001' && l.id !== 'lead-002' && l.id !== 'lead-003' && l.id !== 'lead-004' && l.id !== 'lead-005' && l.name !== 'Rajesh Singhania'
        );
        const finalLeads = cleaned.length > 0 ? cleaned : [DEV_TEST_REFERENCE_LEAD];
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(finalLeads));
        return finalLeads;
      }
      return parsed.length > 0 ? parsed : [DEV_TEST_REFERENCE_LEAD];
    }
    return [DEV_TEST_REFERENCE_LEAD];
  } catch (e) {
    return [DEV_TEST_REFERENCE_LEAD];
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
    console.error('Failed to persist lead locally', e);
  }

  // 1. Save directly to Firebase Firestore
  saveLeadToFirestore(newLead).catch((err) => {
    console.warn('Firestore direct write fallback:', err);
  });

  // 2. Dispatch to backend /api/v1/leads with honeypot field
  try {
    fetch('/api/v1/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newLead,
        websiteUrl: '', // Honeypot shield passes
      }),
    }).catch(() => {
      // Offline or dev preview fallback
    });
  } catch (_) {}

  // 3. Trigger Gmail lead alert to sushantgangwar7300@gmail.com
  try {
    import('../services/googleAuth').then(({ dispatchLeadEmailViaGmail }) => {
      dispatchLeadEmailViaGmail({
        name: newLead.name,
        company: newLead.company,
        email: newLead.email,
        phone: newLead.phone,
        serviceId: newLead.serviceId,
        estimatedBudget: newLead.estimatedBudget,
        targetDeadline: newLead.targetDeadline,
        message: newLead.message,
        source: newLead.source,
        leadId: newLead.id,
      }).catch(() => {});
    }).catch(() => {});
  } catch (_) {}

  return newLead;
}

export function updateLeadStatus(id: string, newStatus: Lead['status'], note?: string): Lead[] {
  const current = getStoredLeads();
  let updatedNotesToPersist: string[] = [];
  const updated = current.map(lead => {
    if (lead.id === id) {
      const existingNotes = lead.notes || [];
      const updatedNotes = note ? [note, ...existingNotes] : existingNotes;
      updatedNotesToPersist = updatedNotes;
      return { ...lead, status: newStatus, notes: updatedNotes };
    }
    return lead;
  });
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kai_prakriti_leads_updated', { detail: updated }));
  } catch (e) {}

  // Sync update to Firebase Firestore
  updateLeadInFirestore(id, { status: newStatus, notes: updatedNotesToPersist }).catch((err) => {
    console.warn('Firestore update fallback:', err);
  });

  // Sync to backend if token available
  const token = localStorage.getItem('kai_prakriti_admin_jwt');
  if (token) {
    fetch(`/api/v1/leads/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus, note }),
    }).catch(() => {});
  }

  return updated;
}

export function deleteLead(id: string): Lead[] {
  const current = getStoredLeads();
  const updated = current.filter(lead => lead.id !== id);
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('kai_prakriti_leads_updated', { detail: updated }));
  } catch (e) {}

  // Sync deletion to Firebase Firestore
  deleteLeadFromFirestore(id).catch((err) => {
    console.warn('Firestore delete fallback:', err);
  });

  // Sync delete to backend if token available
  const token = localStorage.getItem('kai_prakriti_admin_jwt');
  if (token) {
    fetch(`/api/v1/leads/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }

  return updated;
}

export async function fetchServerLeads(): Promise<Lead[] | null> {
  const token = localStorage.getItem('kai_prakriti_admin_jwt');
  if (!token) return null;
  try {
    const res = await fetch('/api/v1/leads', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.leads)) {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(data.leads));
        return data.leads;
      }
    }
  } catch (_) {}
  return null;
}

