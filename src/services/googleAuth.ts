/**
 * Google Workspace & Gmail Integration Service for Kai Prakriti
 * Scope: https://www.googleapis.com/auth/gmail.send
 * Target notification email: sushantgangwar7300@gmail.com
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Define the required Workspace scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
];

export const TARGET_NOTIFICATION_EMAIL = 'sushantgangwar7300@gmail.com';

// Initialize Firebase App instance safely (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));
// Force prompt to ensure user can select account and grant Gmail scope
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline',
});

// In-memory token storage (per Workspace Integration security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface GoogleAuthState {
  user: User | null;
  accessToken: string | null;
  isLinked: boolean;
  email: string | null;
}

// Listen to auth state
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

/**
 * Sign in / Link Google Account with Gmail Send permissions
 */
export const linkGoogleAccount = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google access token with Gmail scope.');
    }

    cachedAccessToken = credential.accessToken;

    // Persist token to backend so background form submissions can dispatch emails reliably
    try {
      await fetch('/api/v1/google-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: cachedAccessToken,
          email: result.user.email || TARGET_NOTIFICATION_EMAIL,
          displayName: result.user.displayName || 'Sushant Gangwar',
        }),
      });
    } catch (e) {
      console.warn('Could not sync token to backend server route', e);
    }

    // Also store linked flag and email in localStorage for UI state
    try {
      localStorage.setItem('kai_prakriti_google_linked_email', result.user.email || TARGET_NOTIFICATION_EMAIL);
      localStorage.setItem('kai_prakriti_google_linked_time', new Date().toISOString());
      window.dispatchEvent(new CustomEvent('kai_prakriti_google_linked', {
        detail: { email: result.user.email, linked: true }
      }));
    } catch (_) {}

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google link error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const unlinkGoogleAccount = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
  try {
    localStorage.removeItem('kai_prakriti_google_linked_email');
    localStorage.removeItem('kai_prakriti_google_linked_time');
    await fetch('/api/v1/google-token', { method: 'DELETE' });
    window.dispatchEvent(new CustomEvent('kai_prakriti_google_linked', {
      detail: { linked: false }
    }));
  } catch (_) {}
};

export interface LeadEmailPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  companyType?: string;
  serviceId?: string;
  serviceTitle?: string;
  estimatedBudget?: string;
  targetDeadline?: string;
  message?: string;
  source?: string;
  leadId?: string;
}

/**
 * Creates RFC 2822 standard email encoded in base64url format for Gmail API
 */
function createRawEmail(to: string, subject: string, htmlContent: string): string {
  const boundary = `__kai_prakriti_boundary_${Date.now()}__`;

  const emailLines = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlContent.replace(/<[^>]+>/g, ''), // Plain text strip
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlContent,
    '',
    `--${boundary}--`,
  ];

  const fullEmail = emailLines.join('\r\n');

  // Convert to base64url
  return btoa(unescape(encodeURIComponent(fullEmail)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Sends lead inquiry notification email directly via Gmail API v1
 */
export const dispatchLeadEmailViaGmail = async (
  payload: LeadEmailPayload,
  tokenOverride?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const token = tokenOverride || cachedAccessToken;
  if (!token) {
    // If no client token, fallback to backend proxy which holds the server-synced token
    try {
      const res = await fetch('/api/v1/leads/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, messageId: data.messageId, error: data.error };
    } catch (e: any) {
      return { success: false, error: e.message || 'No Gmail session active' };
    }
  }

  const subject = `[Kai Prakriti Lead Alert] New Scoping Request: ${payload.company} (${payload.name})`;

  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #264143; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E7E3DC; overflow: hidden; box-shadow: 0 4px 16px rgba(38,65,67,0.06); }
    .header { background: #264143; padding: 28px 32px; color: #ffffff; }
    .kicker { color: #E99F4C; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; margin-bottom: 6px; }
    .title { font-size: 22px; font-weight: 700; margin: 0; color: #ffffff; }
    .content { padding: 32px; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; padding: 18px; background: #FAF8F5; border-radius: 12px; border: 1px solid #E7E3DC; }
    .field { margin-bottom: 14px; }
    .label { font-size: 11px; text-transform: uppercase; color: #7B8A8B; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; }
    .value { font-size: 14px; color: #264143; font-weight: 600; }
    .badge { display: inline-block; padding: 3px 10px; background: #3E6B48; color: #ffffff; border-radius: 999px; font-size: 11px; font-weight: 700; }
    .message-box { padding: 18px; background: #FAF8F5; border-left: 4px solid #D96846; border-radius: 4px 12px 12px 4px; font-size: 14px; line-height: 1.6; color: #264143; margin-top: 16px; }
    .footer { padding: 20px 32px; background: #F4F1EB; border-top: 1px solid #E7E3DC; font-size: 12px; color: #7B8A8B; text-align: center; }
    .action-btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #D96846; color: #ffffff !important; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 13px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="kicker">Kai Prakriti • Lead Notification</div>
      <h1 class="title">New Client Scoping Submission</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #FAF8F5; opacity: 0.85;">
        Received on ${formattedDate}
      </p>
    </div>
    
    <div class="content">
      <div style="margin-bottom: 20px;">
        <span class="badge">${payload.source || 'Website Portal'}</span>
      </div>

      <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td width="35%" style="color: #7B8A8B; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #E7E3DC;">Client Name:</td>
          <td style="color: #264143; font-size: 15px; font-weight: bold; border-bottom: 1px solid #E7E3DC;">${payload.name}</td>
        </tr>
        <tr>
          <td style="color: #7B8A8B; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #E7E3DC;">Company / Enterprise:</td>
          <td style="color: #264143; font-size: 15px; font-weight: bold; border-bottom: 1px solid #E7E3DC;">${payload.company}</td>
        </tr>
        <tr>
          <td style="color: #7B8A8B; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #E7E3DC;">Email Address:</td>
          <td style="color: #D96846; font-size: 14px; font-weight: 600; border-bottom: 1px solid #E7E3DC;">
            <a href="mailto:${payload.email}" style="color: #D96846; text-decoration: none;">${payload.email}</a>
          </td>
        </tr>
        <tr>
          <td style="color: #7B8A8B; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #E7E3DC;">Phone / Mobile:</td>
          <td style="color: #264143; font-size: 14px; border-bottom: 1px solid #E7E3DC;">
            <a href="tel:${payload.phone}" style="color: #264143; text-decoration: none;">${payload.phone || 'Not provided'}</a>
          </td>
        </tr>
        <tr>
          <td style="color: #7B8A8B; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #E7E3DC;">Service Required:</td>
          <td style="color: #3E6B48; font-size: 14px; font-weight: bold; border-bottom: 1px solid #E7E3DC;">${payload.serviceTitle || payload.serviceId || 'General Scoping'}</td>
        </tr>
        <tr>
          <td style="color: #7B8A8B; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #E7E3DC;">Target Compliance:</td>
          <td style="color: #264143; font-size: 14px; border-bottom: 1px solid #E7E3DC;">${payload.targetDeadline || 'Immediate'}</td>
        </tr>
        <tr>
          <td style="color: #7B8A8B; font-size: 12px; text-transform: uppercase; font-weight: bold; border-bottom: 1px solid #E7E3DC;">Estimated Budget:</td>
          <td style="color: #264143; font-size: 14px; border-bottom: 1px solid #E7E3DC;">${payload.estimatedBudget || 'Under Scoping'}</td>
        </tr>
      </table>

      <div style="margin-top: 24px;">
        <div style="font-size: 12px; text-transform: uppercase; color: #7B8A8B; font-weight: bold;">Client Message / Scope Description:</div>
        <div class="message-box">
          "${payload.message || 'No additional details provided.'}"
        </div>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${payload.email}?subject=Kai%20Prakriti%20ESG%20Advisory%20Scoping%20Discussion&body=Dear%20${encodeURIComponent(payload.name)},%0D%0A%0D%0AThank%20you%20for%20contacting%20Kai%20Prakriti%20regarding%20your%20sustainability%20mandate." class="action-btn">
          Reply to ${payload.name} Directly
        </a>
      </div>
    </div>

    <div class="footer">
      Kai Prakriti ESG & Sustainability Advisory • Automated Lead Alert System<br>
      Dispatched to: <strong>${TARGET_NOTIFICATION_EMAIL}</strong>
    </div>
  </div>
</body>
</html>
`;

  const rawBase64 = createRawEmail(TARGET_NOTIFICATION_EMAIL, subject, htmlBody);

  try {
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: rawBase64 }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      console.error('Gmail API send error:', errJson);
      return {
        success: false,
        error: errJson.error?.message || `HTTP ${res.status}: Failed to send message via Gmail API`,
      };
    }

    const data = await res.json();
    return { success: true, messageId: data.id };
  } catch (err: any) {
    console.error('Gmail send exception:', err);
    return { success: false, error: err.message || 'Network error sending email' };
  }
};
