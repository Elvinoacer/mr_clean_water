'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '/images/service-icon-residential.png',
    name: 'Residential Supply',
    description: 'Clean water delivered straight to your domestic storage tanks during rationing or shortages.',
  },
  {
    icon: '/images/service-icon-commercial.png',
    name: 'Commercial Supply',
    description: 'Continuous water provision for hotels, offices, laundromats, and retail businesses.',
  },
  {
    icon: '/images/service-icon-construction.png',
    name: 'Construction Support',
    description: 'Water bowsers for concrete mixing, curing, dust suppression, and site welfare.',
  },
  {
    icon: '/images/service-icon-institutional.png',
    name: 'Institutional Supply',
    description: 'Bulk water for schools, colleges, hospitals, and government facilities.',
  },
  {
    icon: '/images/service-icon-industrial.png',
    name: 'Industrial Supply',
    description: 'Large-volume water dispatch for manufacturing plants and industrial operations.',
  },
  {
    icon: '/images/service-icon-emergency.png',
    name: 'Emergency Supply',
    description: 'Fast-response delivery during municipal outages, pump failures, or drought.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
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
      id="services"
      ref={sectionRef}
      style={{ background: '#F0F8F5', padding: '120px 64px', position: 'relative', zIndex: 2 }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Section Header */}
        <div>
          <div className="text-caption" style={{ color: '#00D26A', marginBottom: 16 }}>
            WHAT WE DELIVER
          </div>
          <h2 className="text-display-l" style={{ color: '#002B3D' }}>
            Water Solutions for Every Need
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div
          className="grid gap-8"
          style={{
            marginTop: 64,
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          }}
        >
          {services.map((service, i) => (
            <div
              key={service.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group transition-all duration-300 opacity-0 translate-y-10"
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: 40,
                border: '1px solid #E8F0EC',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,40,60,0.12)';
                const iconBg = e.currentTarget.querySelector('.icon-circle') as HTMLElement;
                if (iconBg) {
                  iconBg.style.background = '#00D26A';
                  const img = iconBg.querySelector('img') as HTMLElement;
                  if (img) img.style.filter = 'brightness(0) invert(1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,40,60,0.06)';
                const iconBg = e.currentTarget.querySelector('.icon-circle') as HTMLElement;
                if (iconBg) {
                  iconBg.style.background = '#E8F0EC';
                  const img = iconBg.querySelector('img') as HTMLElement;
                  if (img) img.style.filter = 'none';
                }
              }}
            >
              {/* Icon */}
              <div
                className="icon-circle flex items-center justify-center transition-all duration-300"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: '#E8F0EC',
                  marginBottom: 24,
                }}
              >
                <img
                  src={service.icon}
                  alt={service.name}
                  style={{ width: 24, height: 24, objectFit: 'contain' }}
                />
              </div>

              {/* Service Name */}
              <h3 className="text-subheading" style={{ color: '#002B3D', marginBottom: 12 }}>
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-body" style={{ color: '#3D5A66', marginBottom: 20 }}>
                {service.description}
              </p>

              {/* Learn More */}
              <a
                href="tel:0724755580"
                className="inline-flex items-center gap-2 transition-colors duration-200 group/link"
                style={{ color: '#2EC3E5', fontSize: 16 }}
              >
                <span className="relative">
                  Learn More
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 group-hover/link:w-full" />
                </span>
                <ArrowRight size={16} className="transition-transform duration-200 group-hover/link:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
