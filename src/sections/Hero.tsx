"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(captionRef.current, { opacity: 1, y: 0, duration: 0.4 })
      .fromTo(
        line1Ref.current,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.6, ease: "power4.out" },
        0,
      )
      .fromTo(
        line2Ref.current,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.6, ease: "power4.out" },
        0.1,
      )
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.3)
      .to(
        imageRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.2,
      );

    gsap.to(imageRef.current, {
      y: -15,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });

    // Scroll indicator bounce
    const chevron = scrollIndicatorRef.current?.querySelector(".chevron");
    if (chevron) {
      gsap.to(chevron, {
        y: 8,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // Hide scroll indicator on scroll
    const handleScroll = () => {
      if (window.scrollY > 100 && scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      tl.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex items-center min-h-screen pt-28 lg:pt-0 pb-16 lg:pb-0"
      style={{ zIndex: 1 }}
    >
      <div
        className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-6 md:px-16"
        style={{ maxWidth: 1280 }}
      >
        {/* Left Column: Text Content */}
        <div>
          {/* Caption */}
          <div
            ref={captionRef}
            className="text-caption opacity-0 translate-y-5"
            style={{ color: "#B8F5D4", marginBottom: 24 }}
          >
            BULK WATER DELIVERY IN NAKURU
          </div>

          {/* Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ color: "#fff", lineHeight: 1.1 }}
          >
            <div className="overflow-hidden pb-2">
              <div ref={line1Ref}>
                <span style={{ color: "#00D26A" }}>Mr Clean Water</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={line2Ref}>Delivered Fast.</div>
            </div>
          </h1>

          {/* Subheading */}
          <p
            ref={subRef}
            className="text-body-large opacity-0 translate-y-5"
            style={{
              color: "rgba(255,255,255,0.8)",
              maxWidth: 520,
              marginTop: 24,
            }}
          >
            Reliable bulk water delivery for homes, businesses, construction
            sites, and institutions across Nakuru Town and surrounding areas.
          </p>

          {/* CTA Group */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 opacity-0 translate-y-4"
            style={{ marginTop: 40 }}
          >
            <a
              href="tel:0724755580"
              className="inline-flex items-center transition-all duration-200 hover:scale-[1.03] px-6 py-3 md:px-8 md:py-4 text-sm md:text-base whitespace-nowrap"
              style={{
                background: "#00D26A",
                color: "#004863",
                borderRadius: 100,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Call or WhatsApp: 0724 755 580
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("services");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center transition-all duration-200 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base whitespace-nowrap"
              style={{
                background: "transparent",
                color: "#fff",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.2)",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              View Services
            </button>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div
          ref={imageRef}
          className="relative hidden lg:block opacity-0 translate-y-8"
        >
          <div
            className="relative w-full aspect-square flex items-center justify-center overflow-hidden"
            style={{
              maskImage:
                "radial-gradient(circle at center, black 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 40%, transparent 80%)",
            }}
          >
            <img
              src="/images/hero_mr_clean_water.webp"
              alt="Mr Clean Water Delivery"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ filter: "brightness(1.1) contrast(1.1)" }}
            />
          </div>
          {/* Subtle green ambient glow behind the image */}
          <div className="absolute inset-0 bg-[#00D26A] rounded-full blur-[100px] opacity-10 -z-10 mix-blend-screen" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-caption"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Scroll
        </span>
        <ChevronDown className="chevron" size={24} color="#fff" />
      </div>
    </section>
  );
}
