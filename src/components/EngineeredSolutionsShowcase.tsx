'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ShowcaseSolution {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  image: string;
  ctaText: string;
  href: string;
  stats: string;
}

const SOLUTIONS: ShowcaseSolution[] = [
  {
    id: 'structural-steel',
    category: 'Industrial Infrastructure',
    title: 'Heavy Structural Steel & PEB Sheds',
    shortDesc: 'Certified factory warehouses, crane gantry framing, and high-tensile mezzanine platforms built to AWS D1.1 standard.',
    image: '/images/hero_welding.jpg',
    ctaText: 'View Case & Specs',
    href: '/services#structural-steel',
    stats: 'AWS D1.1 Certified • 15–30 Days Turnaround',
  },
  {
    id: 'architectural-gates',
    category: 'Residential & Commercial Estates',
    title: 'Architectural Laser-Cut Gates',
    shortDesc: 'Bespoke motorized swing, sliding, and cantilever gates with ±0.1mm fiber laser inserts and anti-sag pivot bearings.',
    image: '/images/product_gate.jpg',
    ctaText: 'View Case & Specs',
    href: '/services#architectural-gates',
    stats: '±0.1mm Fiber Laser • Anti-Sag Hinges',
  },
  {
    id: 'ss-railings',
    category: 'Modern Architectural Systems',
    title: 'Stainless Steel & Glass Balustrades',
    shortDesc: 'Grade 304/316 Jindal stainless steel handrails, toughened glass spigots, and pinhole-free argon TIG purged welds.',
    image: '/images/product_railing.jpg',
    ctaText: 'View Case & Specs',
    href: '/services#ss-railings',
    stats: 'Jindal SS 304/316 • Argon TIG Purged',
  },
  {
    id: 'about_facility',
    category: 'Precision Workshop Facility',
    title: 'Turnkey Workshop Fabrication Facility',
    shortDesc: 'Fully equipped CNC shearing, fiber laser beds, submerged arc welding rigs, and heavy-duty crane bays.',
    image: '/images/about_workshop.jpg',
    ctaText: 'View Case & Specs',
    href: '/about',
    stats: '4,500+ Completed Projects • 25+ Years',
  },
  {
    id: 'metal-doors',
    category: 'High-Security Metal Craft',
    title: 'Engineered Safety Doors & Grills',
    shortDesc: 'Reinforced heavy-gauge security doors, weather-sealed frames, and decorative compound security fencing.',
    image: '/images/product_door.jpg',
    ctaText: 'View Case & Specs',
    href: '/shop?category=Doors',
    stats: 'High-Tensile Steel • Anti-Tamper Core',
  },
  {
    id: 'laser-panels',
    category: 'Parametric Building Facades',
    title: 'CNC Laser Facades & Sun Louvers',
    shortDesc: 'Perforated building elevations, decorative terrace pergolas, and acoustic room divider screen partitions.',
    image: '/images/blog_fabrication.jpg',
    ctaText: 'View Case & Specs',
    href: '/services#laser-cut-panels',
    stats: 'Mild Steel & Aluminum • PU Weather Coated',
  },
];

export default function EngineeredSolutionsShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);

    // Calculate approximate active card safely
    const cardWidth = el.clientWidth > 768 ? 620 : el.clientWidth * 0.85;
    if (cardWidth > 10) {
      const index = Math.round(el.scrollLeft / cardWidth);
      const safeIndex = Number.isFinite(index)
        ? Math.min(Math.max(index, 0), SOLUTIONS.length - 1)
        : 0;
      setActiveIndex(safeIndex);
    } else {
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Automatic Smooth Slider
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const timer = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth - 25;
      const scrollStep = el.clientWidth > 768 ? 640 : el.clientWidth * 0.85;

      if (el.scrollLeft >= maxScroll) {
        // Seamless loop back to the first card
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth > 768 ? 640 : el.clientWidth * 0.85;
    
    if (direction === 'right' && el.scrollLeft >= el.scrollWidth - el.clientWidth - 25) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Split Header Layout matching the Google Antigravity screenshot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Left Title */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#6b7280',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              [ 02 // WORKSHOP CAPABILITIES &amp; FABRICATION // ]
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                fontWeight: 600,
                color: '#000000',
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                maxWidth: '620px',
              }}
            >
              Engineered solutions<br />
              built for the next generation
            </h2>
          </div>

          {/* Right Description Paragraph matching the screenshot */}
          <div style={{ maxWidth: '460px' }}>
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.65,
                color: '#4b5563',
                marginBottom: '1.25rem',
              }}
            >
              Shree Ganesh Steel is built for long-term structural trust — whether you need heavy multi-acre industrial PEB warehouses, automated driveway gates for private villas, or custom architectural stainless railings.
            </p>
            <Link
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.925rem',
                fontWeight: 600,
                color: '#000000',
                textDecoration: 'none',
                borderBottom: '1.5px solid #000000',
                paddingBottom: '2px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <span>Explore all workshop capabilities</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </Link>
          </div>
        </div>

        {/* Giant Rounded Cards Horizontal Slider matching screenshot */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 2500)}
          style={{
            display: 'flex',
            gap: '1.75rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '1.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
          }}
          className="no-scrollbar"
        >
          {SOLUTIONS.map((solution, index) => (
            <div
              key={solution.id}
              style={{
                position: 'relative',
                flex: '0 0 auto',
                width: 'clamp(320px, 48vw, 620px)',
                height: 'clamp(360px, 32vw, 440px)',
                borderRadius: '32px',
                overflow: 'hidden',
                backgroundColor: '#111827',
                scrollSnapAlign: 'start',
                boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.12)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 45px -8px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 36px -8px rgba(0, 0, 0, 0.12)';
              }}
            >
              {/* Background Image with Clean Cinematic Depth */}
              <Image
                src={solution.image}
                alt={solution.title}
                fill
                sizes="(max-width: 768px) 100vw, 620px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.5s ease',
                }}
              />

              {/* Dark Gradient Overlay for optimal text readability matching screenshot */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.3) 45%, rgba(0, 0, 0, 0.8) 100%)',
                  zIndex: 1,
                }}
              />

              {/* Top Category Badge Pill inside Card */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.75rem',
                  left: '1.75rem',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {solution.category}
                </span>
              </div>

              {/* Bottom Left Title matching the screenshot ("Full stack developer" overlay) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '160px',
                  zIndex: 2,
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.4rem, 2.3vw, 2.1rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.15,
                    marginBottom: '0.5rem',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {solution.title}
                </h3>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#e2e8f0',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {solution.shortDesc}
                </div>
              </div>

              {/* Bottom Right White Pill Button matching screenshot ("▶ Watch case") */}
              <Link
                href={solution.href}
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  right: '2rem',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  padding: '11px 22px',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.28)',
                  zIndex: 3,
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f3f5';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span style={{ fontSize: '0.75rem', lineHeight: 1 }}>▶</span>
                <span>{solution.ctaText}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel Bottom Controls Bar matching screenshot */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            marginTop: '1rem',
          }}
        >
          {/* Active Solution Indicator */}
          {(() => {
            const currentSolution = SOLUTIONS[activeIndex] || SOLUTIONS[0];
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#000000' }}>
                  {currentSolution?.title || ''}
                </span>
                <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>•</span>
                <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>
                  {currentSolution?.stats || ''}
                </span>
              </div>
            );
          })()}

          {/* Center & Right Controls: Pagination Dots + Auto-Slide Pill + Arrow Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Clickable Pagination Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {SOLUTIONS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    const el = scrollContainerRef.current;
                    if (!el) return;
                    const cardWidth = el.clientWidth > 768 ? 640 : el.clientWidth * 0.85;
                    el.scrollTo({ left: dotIdx * cardWidth, behavior: 'smooth' });
                  }}
                  aria-label={`Slide ${dotIdx + 1}`}
                  style={{
                    width: activeIndex === dotIdx ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    backgroundColor: activeIndex === dotIdx ? '#000000' : 'rgba(0, 0, 0, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>

            {/* Auto-Slide Status Toggle Pill */}
            <button
              type="button"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              style={{
                background: '#f1f3f5',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '5px 12px',
                borderRadius: '9999px',
                fontSize: '0.725rem',
                fontWeight: 600,
                color: '#111827',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
              title={isAutoPlay ? 'Pause auto-slide' : 'Resume auto-slide'}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isAutoPlay ? '#10b981' : '#f59e0b',
                  display: 'inline-block',
                }}
              />
              <span>{isAutoPlay ? 'Auto-Slide' : 'Paused'}</span>
            </button>

            {/* Left & Right Circular Pill Arrows matching screenshot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous solution"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: canScrollLeft ? '#ffffff' : '#f8f9fa',
                  color: canScrollLeft ? '#000000' : '#d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                  fontSize: '1.1rem',
                  transition: 'all 0.15s ease',
                  boxShadow: canScrollLeft ? '0 2px 8px rgba(0, 0, 0, 0.05)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (canScrollLeft) {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canScrollLeft) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#000000';
                  }
                }}
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next solution"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: canScrollRight ? '#ffffff' : '#f8f9fa',
                  color: canScrollRight ? '#000000' : '#d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollRight ? 'pointer' : 'not-allowed',
                  fontSize: '1.1rem',
                  transition: 'all 0.15s ease',
                  boxShadow: canScrollRight ? '0 2px 8px rgba(0, 0, 0, 0.05)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (canScrollRight) {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canScrollRight) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#000000';
                  }
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
