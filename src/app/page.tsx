'use client';

import { useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Stats from '../sections/Stats';
import HowItWorks from '../sections/HowItWorks';
import Coverage from '../sections/Coverage';
import Testimonials from '../sections/Testimonials';
import CTABanner from '../sections/CTABanner';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const WaterCaustics = dynamic(() => import('../components/WaterCaustics'), { ssr: false });
const VideoFeature = dynamic(() => import('../sections/VideoFeature'), { ssr: false });

export default function Page() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after a short delay to account for async Next.js components
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0 });
    }
  };

  return (
    <div style={{ backgroundColor: '#002B3D', minHeight: '100vh' }}>
      {/* Water Caustics Background - Fixed behind hero */}
      <Suspense fallback={
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          backgroundImage: 'url(/images/preview_image_url.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
        }} />
      }>
        <WaterCaustics />
      </Suspense>

      {/* Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Main Content */}
      <main>
        <Hero />
        <Services />
        <Stats />
        <HowItWorks />
        <Suspense fallback={
          <div style={{ height: '100vh', background: '#004863', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-caption" style={{ color: '#B8F5D4' }}>Loading...</div>
          </div>
        }>
          <VideoFeature />
        </Suspense>
        <Coverage />
        <Testimonials />
        <CTABanner />
        <Footer />
      </main>
    </div>
  );
}
