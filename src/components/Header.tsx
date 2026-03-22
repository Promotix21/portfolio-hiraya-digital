'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#process' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300
        bg-white/90 backdrop-blur-xl border-b border-surface-border
        ${scrolled ? 'shadow-md' : ''}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Logo variant="blue" size={36} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-navy/70 transition-colors hover:text-teal"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary rounded-full px-5 py-2 text-sm font-medium transition-all"
          >
            Start Project
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-full bg-navy transition-all duration-300
                ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-full bg-navy transition-all duration-300
                ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-[1.5px] w-full bg-navy transition-all duration-300
                ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white backdrop-blur-xl transition-opacity duration-300 md:hidden
          ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-2xl font-light text-navy/70 transition-colors hover:text-teal"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="btn-primary mt-4 rounded-full px-8 py-3 text-lg font-medium transition-all"
          >
            Start Project
          </a>
        </nav>
      </div>
    </header>
  );
}
