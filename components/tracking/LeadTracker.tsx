'use client';

import { useEffect } from 'react';

/**
 * LeadTracker — captures UTM/ref parameters from Hiraya IQ emails
 * and sends page view events back to the IQ API for lead activity tracking.
 *
 * When a lead clicks "See Our Work" in an email, the URL contains:
 *   ?utm_source=hiraya_iq&utm_medium=email&ref=theirdomain.com
 *
 * This component:
 * 1. Reads ref/UTM params from URL on first load
 * 2. Stores them in sessionStorage (persists across page navigation)
 * 3. Sends a "portfolio_visited" beacon to Hiraya IQ API
 */

const IQ_API = process.env.NEXT_PUBLIC_IQ_API_URL || '';
const IQ_KEY = process.env.NEXT_PUBLIC_IQ_API_KEY || '';

export function captureTrackingParams(): { ref: string | null; utm: Record<string, string> } {
  if (typeof window === 'undefined') return { ref: null, utm: {} };

  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref') || sessionStorage.getItem('iq_ref');
  const utm: Record<string, string> = {};

  for (const [key, val] of params.entries()) {
    if (key.startsWith('utm_')) utm[key] = val;
  }

  // Persist in session
  if (ref) sessionStorage.setItem('iq_ref', ref);
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('iq_utm', JSON.stringify(utm));
  }

  return {
    ref,
    utm: Object.keys(utm).length > 0 ? utm : JSON.parse(sessionStorage.getItem('iq_utm') || '{}'),
  };
}

export function getStoredRef(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('iq_ref');
}

export default function LeadTracker() {
  useEffect(() => {
    const { ref, utm } = captureTrackingParams();

    // Only send tracking if this visit came from a Hiraya IQ email
    if (!ref || !IQ_API) return;

    // Send page view event to Hiraya IQ
    fetch(`${IQ_API}/communication/webhook/portfolio-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ref,
        utm,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {
      // Silent fail — tracking should never block the user experience
    });
  }, []);

  return null; // Invisible component
}
