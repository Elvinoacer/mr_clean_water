'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoFeature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!section || !sticky || !video || !overlay || !text) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: false,
        },
      });

      tl.fromTo(
        sticky,
        { scale: 0.5, rotateX: 45 },
        { scale: 1, rotateX: 0, duration: 1, ease: 'none' }
      )
        .fromTo(
          video,
          { filter: 'brightness(0.3)' },
          { filter: 'brightness(1)', duration: 1, ease: 'none' },
          0
        )
        .fromTo(
          overlay,
          { backgroundColor: 'rgba(0, 10, 20, 1)' },
          { backgroundColor: 'rgba(0, 10, 20, 0)', duration: 1, ease: 'none' },
          0
        )
        .fromTo(
          text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'none' },
          0.5
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#004863',
        minHeight: '300vh',
        zIndex: 2,
      }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/tanker-feature.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 10, 20, 1)',
            zIndex: 1,
          }}
        />

        {/* Text Overlay */}
        <div
          ref={textRef}
          className="relative z-10 text-center px-6"
          style={{ opacity: 0 }}
        >
          <h2 className="text-display-xl" style={{ color: '#fff' }}>
            Serving All of Nakuru
          </h2>
          <p
            className="text-body-large mx-auto"
            style={{
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 600,
              marginTop: 24,
            }}
          >
            From residential estates to construction sites, we deliver clean water across Nakuru Town and every surrounding neighborhood.
          </p>
        </div>
      </div>
    </section>
  );
}
