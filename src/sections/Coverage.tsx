'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const areas = [
  'Nakuru Town CBD',
  'Lanet',
  'Milimani',
  'London',
  'Section 58',
  'Kiamunyi',
  'Mawanga',
  'Bahati',
  'Dundori',
  'Subukia',
  'Njoro',
  'Rongai',
];

export default function Coverage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current.filter(Boolean), 
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="coverage"
      ref={sectionRef}
      style={{ background: '#F0F8F5', padding: '120px 64px', position: 'relative', zIndex: 2 }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Section Header */}
        <div>
          <div className="text-caption" style={{ color: '#00D26A', marginBottom: 16 }}>
            WHERE WE DELIVER
          </div>
          <h2 className="text-display-l" style={{ color: '#002B3D', marginBottom: 16 }}>
            Nakuru &amp; Surrounding Areas
          </h2>
          <p className="text-body-large" style={{ color: '#3D5A66', maxWidth: 600 }}>
            We serve Nakuru Town and all neighboring estates and environs. No location is too far when you need clean water.
          </p>
        </div>

        {/* Coverage List */}
        <div
          className="grid gap-x-8 gap-y-4"
          style={{
            marginTop: 48,
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          }}
        >
          {areas.map((area, i) => (
            <div
              key={area}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="flex items-center gap-3"
            >
              <Check size={20} color="#00D26A" strokeWidth={2.5} />
              <span className="text-body" style={{ color: '#002B3D' }}>{area}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48 }}>
          <a
            href="https://wa.me/254724755580"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center transition-all duration-200 hover:scale-[1.02]"
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
            Check Your Area
          </a>
        </div>
      </div>
    </section>
  );
}
