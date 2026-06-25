'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Mr Clean Water has kept our construction site running for 6 months straight. Never missed a scheduled delivery.',
    name: 'James Mwangi',
    detail: 'Construction Manager, Nakuru',
  },
  {
    quote: 'During the last water rationing, they were the only service that answered at 9 PM and delivered the same night.',
    name: 'Grace Wanjiku',
    detail: 'Residential Customer',
  },
  {
    quote: 'We run a boarding school of 400 students. Mr Clean Water gives us peace of mind with their reliable weekly supply.',
    name: 'Peter Ochieng',
    detail: 'School Administrator',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: '#004863', padding: '120px 64px', position: 'relative', zIndex: 2 }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Section Header */}
        <div className="text-center">
          <div className="text-caption" style={{ color: '#B8F5D4', marginBottom: 16 }}>
            TRUSTED BY NAKURU
          </div>
          <h2 className="text-display-l" style={{ color: '#fff' }}>
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          className="grid gap-8"
          style={{
            marginTop: 64,
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="transition-all duration-300 opacity-0 translate-y-8"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: 40,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Quote */}
              <p
                className="text-body-large"
                style={{
                  color: '#fff',
                  fontStyle: 'italic',
                  marginBottom: 24,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="text-body" style={{ color: '#00D26A', fontWeight: 600 }}>
                {t.name}
              </div>

              {/* Detail */}
              <div className="text-caption" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                {t.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
