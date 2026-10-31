/**
 * Firebase Firestore & Authentication Service for Kai Prakriti
 * Configured with provisioned project: gen-lang-client-0486180934
 * Database ID: ai-studio-kaiprakritiesgca-4249ea73-76d4-4460-b4eb-60404c49031d
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  getDocFromServer,
  Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Lead } from '../types';

// Initialize singleton Firebase App
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(firebaseApp);

// Initialize Firestore targeting the specific provisioned database
const dbId = (firebaseConfig as any).firestoreDatabaseId;
export const db = dbId ? getFirestore(firebaseApp, dbId) : getFirestore(firebaseApp);

export const LEADS_COLLECTION = 'leads';

// Single reference test lead as requested by user
export const DEV_TEST_REFERENCE_LEAD: Lead = {
  id: 'dev-ref-001',
  name: 'Dev Test Reference',
  company: 'Kai Prakriti Advisory Labs',
  email: 'sushantgangwar7300@gmail.com',
  phone: '+91 7300513512',
  companyType: 'listed_top_1000',
  serviceId: 'ghg-accounting',
  status: 'new',
  estimatedBudget: '₹5,00,000',
  targetDeadline: 'Q4 2026',
  message: 'System reference lead to verify Firebase Firestore synchronization and Gmail lead alert delivery.',
  notes: ['Developer test lead for reference'],
  source: 'System Dev Verification',
  createdAt: new Date().toISOString(),
};

/**
 * Validates connection to Firestore at boot time as required by Firebase skill
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline status:', error.message);
      return false;
    }
    // Document not existing still means server responded
    return true;
  }
}

/**
 * Creates or updates a lead document in Firestore
 */
export async function saveLeadToFirestore(lead: Lead): Promise<void> {
  try {
    const leadRef = doc(db, LEADS_COLLECTION, lead.id);
    await setDoc(leadRef, lead, { merge: true });
  } catch (error) {
    console.error('Error saving lead to Firestore:', error);
    throw error;
  }
}

/**
 * Updates status and notes of a lead in Firestore
 */
export async function updateLeadInFirestore(
  id: string,
  updates: Partial<Pick<Lead, 'status' | 'notes'>>
): Promise<void> {
  try {
    const leadRef = doc(db, LEADS_COLLECTION, id);
    await updateDoc(leadRef, updates);
  } catch (error) {
    console.error('Error updating lead in Firestore:', error);
    throw error;
  }
}

/**
 * Deletes a lead from Firestore
 */
export async function deleteLeadFromFirestore(id: string): Promise<void> {
  try {
    const leadRef = doc(db, LEADS_COLLECTION, id);
    await deleteDoc(leadRef);
  } catch (error) {
    console.error('Error deleting lead from Firestore:', error);
    throw error;
  }
}

/**
 * Fetches all leads once from Firestore
 */
export async function fetchLeadsFromFirestore(): Promise<Lead[]> {
  try {
    const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      // Seed the reference dev test lead if empty
      await saveLeadToFirestore(DEV_TEST_REFERENCE_LEAD);
      return [DEV_TEST_REFERENCE_LEAD];
    }
    return snapshot.docs.map(docSnap => docSnap.data() as Lead);
  } catch (error) {
    console.warn('Could not fetch from Firestore directly, falling back:', error);
    return [DEV_TEST_REFERENCE_LEAD];
  }
}

/**
 * Subscribes to real-time updates for leads from Firestore
 */
export function subscribeToFirestoreLeads(
  onUpdate: (leads: Lead[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  try {
    const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      snapshot => {
        if (snapshot.empty) {
          // If Firestore collection is empty, seed the single reference test lead
          saveLeadToFirestore(DEV_TEST_REFERENCE_LEAD).catch(() => {});
          onUpdate([DEV_TEST_REFERENCE_LEAD]);
          return;
        }
        const leads = snapshot.docs.map(docSnap => docSnap.data() as Lead);
        onUpdate(leads);
      },
      error => {
        console.warn('Firestore onSnapshot listener error:', error);
        if (onError) onError(error);
      }
    );
  } catch (err: any) {
    console.warn('Failed to set up Firestore onSnapshot:', err);
    if (onError) onError(err);
    return () => {};
  }
}
