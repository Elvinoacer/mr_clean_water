'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Contact Us',
    description: 'Call or WhatsApp 0724 755 580 with your location and water capacity needs.',
  },
  {
    number: '02',
    title: 'Size Matching',
    description: 'We match your request to the right stainless steel tanker — 5,000L, 10,000L, or 20,000L.',
  },
  {
    number: '03',
    title: 'Source & Transit',
    description: 'Water is collected from safe, regulated sources and transported to your site.',
  },
  {
    number: '04',
    title: 'Pump & Fill',
    description: 'Our high-pressure pumps deliver water directly into your overhead or ground-level tanks.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const connectorsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Steps slide in from left
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step, 
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Connector lines draw in
      connectorsRef.current.forEach((conn) => {
        if (!conn) return;
        gsap.fromTo(conn, 
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
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
      id="how-it-works"
      ref={sectionRef}
      style={{ background: '#007DA0', padding: '120px 64px', position: 'relative', zIndex: 2 }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Section Header */}
        <div className="text-center">
          <div className="text-caption" style={{ color: '#B8F5D4', marginBottom: 16 }}>
            OUR PROCESS
          </div>
          <h2 className="text-display-l" style={{ color: '#fff' }}>
            From Order to Delivery in 4 Steps
          </h2>
        </div>

        {/* Steps */}
        <div
          className="grid gap-12"
          style={{
            marginTop: 80,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="relative"
            >
              {/* Step Number */}
              <div
                className="text-display-xl"
                style={{
                  fontSize: 80,
                  color: '#00D26A',
                  opacity: 0.3,
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-subheading" style={{ color: '#fff', marginBottom: 12 }}>
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {step.description}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div
                  ref={(el) => { connectorsRef.current[i] = el; }}
                  className="hidden lg:block absolute"
                  style={{
                    top: 40,
                    right: -24,
                    width: 48,
                    height: 2,
                    background: 'rgba(255,255,255,0.2)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
