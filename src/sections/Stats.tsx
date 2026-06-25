'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '5,000L\u201320,000L', label: 'Tanker Capacities' },
  { number: '24/7', label: 'Emergency Response' },
  { number: 'Same Day', label: 'Delivery Available' },
  { number: 'All of Nakuru', label: 'Service Coverage' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each stat item
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        gsap.fromTo(item, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: '#004863', padding: '64px', position: 'relative', zIndex: 2 }}
    >
      <div
        className="mx-auto grid gap-8"
        style={{
          maxWidth: 1280,
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="flex flex-col items-center text-center relative"
          >
            {/* Divider */}
            {i > 0 && (
              <div
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2"
                style={{
                  width: 1,
                  height: 60,
                  background: 'rgba(255,255,255,0.15)',
                }}
              />
            )}
            <div className="stat-number text-stat" style={{ color: '#00D26A' }}>
              {stat.number}
            </div>
            <div
              className="stat-label text-body mt-2"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
