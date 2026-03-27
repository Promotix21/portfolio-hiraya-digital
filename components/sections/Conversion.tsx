'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';
import { getStoredRef } from '@/components/tracking/LeadTracker';

const IQ_API = process.env.NEXT_PUBLIC_IQ_API_URL || '';

export function Conversion() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Growth Engineering');

  // Auto-fill from UTM ref — if we know the lead, fetch their info
  useEffect(() => {
    const ref = getStoredRef();
    if (!ref || !IQ_API) return;

    fetch(`${IQ_API}/communication/lead-by-ref/${encodeURIComponent(ref)}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        if (data.business_name && !name) setName('');
        if (data.business_name && !company) setCompany(data.business_name);
        if (data.email && !email) setEmail(data.email);
      })
      .catch(() => {});
  }, []);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  // Honeypot — hidden field that bots fill but humans don't
  const [website, setWebsite] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    // Honeypot check — if filled, it's a bot
    if (website) { setSubmitted(true); return; }

    setSubmitting(true);
    setError('');

    const ref = getStoredRef();
    const utmData = typeof window !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('iq_utm') || '{}')
      : {};

    const payload = {
      name,
      company,
      email,
      projectType,
      ref,         // Lead's domain from Hiraya IQ email
      utm: utmData,
      source: 'portfolio_contact_form',
      timestamp: new Date().toISOString(),
    };

    try {
      // Send to Hiraya IQ API
      if (IQ_API) {
        await fetch(`${IQ_API}/communication/webhook/portfolio-inquiry`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setSubmitted(true);
    } catch {
      // Even if API fails, show success — we don't want to lose the lead's trust
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="contact" className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-hiraya-light to-white opacity-50"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">We&apos;ll be in touch!</h3>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              Thanks {name}! We&apos;ve received your inquiry and will get back to you within 24 hours with a personalized growth strategy.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-hiraya-light to-white opacity-50"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center"><span className="text-slate-900">Need systems </span><span className="text-gradient">like these?</span></h2>
            <p className="text-slate-600 text-lg">
              Let&apos;s engineer your growth infrastructure.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Honeypot — hidden from humans, bots fill it */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
              <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-hiraya-blue focus:ring-1 focus:ring-hiraya-blue transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-hiraya-blue focus:ring-1 focus:ring-hiraya-blue transition-all"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-hiraya-blue focus:ring-1 focus:ring-hiraya-blue transition-all"
                  placeholder="john@acme.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-hiraya-blue focus:ring-1 focus:ring-hiraya-blue transition-all appearance-none"
                >
                  <option>Growth Engineering</option>
                  <option>Marketing Automation</option>
                  <option>Custom Development</option>
                  <option>AI Integration</option>
                  <option>SEO & Digital Marketing</option>
                  <option>Social Media Management</option>
                  <option>Website Redesign</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button size="lg" className="w-full h-14 text-lg group mt-4" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Initialize Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-slate-500 mt-4">
              Your data is secure. We&apos;ll get back to you within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
