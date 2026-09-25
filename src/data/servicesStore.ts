import { ServiceItem } from '../types';
import { ELEVEN_SERVICES } from './consultancyData';

const STORAGE_KEY = 'kai_prakriti_services_v2';

export const getStoredServices = (): ServiceItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load services from localStorage', e);
  }
  return ELEVEN_SERVICES;
};

export const persistServices = (services: ServiceItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    window.dispatchEvent(new CustomEvent('kai_prakriti_services_updated', { detail: services }));
  } catch (e) {
    console.error('Failed to persist services', e);
  }
};

export const saveService = (newService: Omit<ServiceItem, 'id' | 'number'> & { id?: string; number?: string }): ServiceItem[] => {
  const current = getStoredServices();
  const id = newService.id || `service-${Date.now()}`;
  const number = newService.number || String(current.length + 1).padStart(2, '0');

  const item: ServiceItem = {
    ...newService,
    id,
    number,
  };

  const updated = [item, ...current];
  persistServices(updated);
  return updated;
};

export const updateService = (id: string, updates: Partial<ServiceItem>): ServiceItem[] => {
  const current = getStoredServices();
  const updated = current.map(s => (s.id === id ? { ...s, ...updates } : s));
  persistServices(updated);
  return updated;
};

export const deleteService = (id: string): ServiceItem[] => {
  const current = getStoredServices();
  const updated = current.filter(s => s.id !== id);
  persistServices(updated);
  return updated;
};

// Check if user has unlocked the full service catalogue
export const isCatalogueUnlocked = (): boolean => {
  try {
    return localStorage.getItem('kai_prakriti_services_unlocked') === 'true';
  } catch {
    return false;
  }
};

export const unlockCatalogue = (userData?: { name: string; email: string; company: string; phone?: string }): void => {
  try {
    localStorage.setItem('kai_prakriti_services_unlocked', 'true');
    if (userData) {
      localStorage.setItem('kai_prakriti_unlocked_user', JSON.stringify(userData));
    }
    window.dispatchEvent(new CustomEvent('kai_prakriti_catalogue_unlocked', { detail: userData }));
  } catch (e) {
    console.error('Failed to unlock catalogue', e);
  }
};
