'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, 
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(btnRef.current, 
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(parallaxRef.current,
        { yPercent: -20 },
        {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-16 md:px-16 md:py-20"
      style={{
        background: '#00D26A',
        zIndex: 2,
      }}
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute left-0 w-full pointer-events-none"
        style={{
          height: '140%',
          top: '-20%',
          zIndex: 0,
        }}
      >
        <img
          src="/images/mr_clean_water_parralax.webp"
          alt="Water Delivery Parallax"
          className="w-full h-full object-cover mix-blend-multiply"
          style={{ opacity: 0.3 }}
        />
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
        style={{ maxWidth: 1280 }}
      >
        {/* Left: Text */}
        <div className="text-center md:text-left">
          <h2
            ref={headingRef}
            className="text-display-l"
            style={{ color: '#004863' }}
          >
            Need Water Delivered Today?
          </h2>
          <p
            className="text-body-large mt-4"
            style={{ color: 'rgba(0,72,99,0.8)' }}
          >
            Call or WhatsApp us now for same-day delivery across Nakuru. Emergency orders welcome.
          </p>
        </div>

        {/* Right: CTA */}
        <a
          ref={btnRef}
          href="tel:0724755580"
          className="inline-flex items-center flex-shrink-0 transition-all duration-200 hover:scale-[1.03] px-6 py-3 md:px-8 md:py-4 text-sm md:text-base whitespace-nowrap"
          style={{
            background: '#004863',
            color: '#fff',
            borderRadius: 100,
            fontWeight: 600,
          }}
        >
          Call or WhatsApp: 0724 755 580
        </a>
      </div>
    </section>
  );
}
