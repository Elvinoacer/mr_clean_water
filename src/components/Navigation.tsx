'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (id: string) => void;
}

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Coverage', id: 'coverage' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'About', id: 'about' },
];

export default function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 72,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          background: scrolled ? 'rgba(0, 72, 99, 0.85)' : 'transparent',
        }}
      >
        <div className="mx-auto flex items-center justify-between h-full px-6 md:px-16" style={{ maxWidth: 1280 }}>
          {/* Logo */}
          <button onClick={() => onNavigate('hero')} className="flex flex-col items-start leading-none">
            <span className="text-xl font-bold tracking-tight" style={{ color: '#00D26A', fontSize: 22, letterSpacing: '-0.02em' }}>MR</span>
            <span className="text-xs font-semibold tracking-wide" style={{ color: '#fff', fontSize: 10, letterSpacing: '0.06em' }}>CLEAN WATER</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-nav transition-colors duration-200 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="tel:0724755580"
            className="hidden md:inline-flex items-center transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: '#00D26A',
              color: '#004863',
              borderRadius: 100,
              padding: '14px 28px',
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '0.02em',
            }}
          >
            Order Water Now
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} color="#fff" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: '#004863' }}
        >
          <button
            className="absolute top-5 right-6"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} color="#fff" />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-heading text-white transition-all duration-200 hover:text-[#00D26A]"
                style={{
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:0724755580"
              className="mt-4 inline-flex items-center transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: '#00D26A',
                color: '#004863',
                borderRadius: 100,
                padding: '16px 32px',
                fontWeight: 600,
                fontSize: 16,
              }}
              onClick={() => setMobileOpen(false)}
            >
              Order Water Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
