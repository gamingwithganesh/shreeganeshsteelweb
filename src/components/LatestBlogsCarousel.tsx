'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOGS } from '@/data/blogs';

// Graphic cards styling inspired by the reference screenshot (dark glowing cards with high-contrast typography)
const BLOG_CARD_GRAPHICS = [
  {
    bg: 'radial-gradient(circle at 50% 60%, rgba(37, 99, 235, 0.45) 0%, rgba(15, 23, 42, 0.95) 75%), #050814',
    badge: 'Welding Metallurgy',
    titleHero: 'TIG vs MIG Mastercraft',
    iconType: 'spark',
  },
  {
    bg: 'radial-gradient(circle at 60% 30%, rgba(99, 102, 241, 0.35) 0%, rgba(15, 23, 42, 0.95) 70%), #060919',
    badge: 'Digital Fabrication',
    titleHero: 'CAD to Finished Steel',
    iconType: 'cad',
  },
  {
    bg: 'radial-gradient(circle at 45% 50%, rgba(14, 165, 233, 0.35) 0%, rgba(15, 23, 42, 0.95) 70%), #050a18',
    badge: 'Anti-Rust Chemistry',
    titleHero: 'Duplex Coating Defense',
    iconType: 'shield',
  },
  {
    bg: 'radial-gradient(circle at 55% 45%, rgba(59, 130, 246, 0.35) 0%, rgba(15, 23, 42, 0.95) 70%), #040815',
    badge: 'Structural PEB',
    titleHero: 'Heavy Industrial Trusses',
    iconType: 'peb',
  },
  {
    bg: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, rgba(15, 23, 42, 0.95) 70%), #080616',
    badge: 'Fiber Laser Optics',
    titleHero: '±0.1mm CNC Facades',
    iconType: 'laser',
  },
];

function renderBlogBadgeIcon(type: string) {
  switch (type) {
    case 'spark':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'cad':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'peb':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z" />
        </svg>
      );
    case 'laser':
      return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
        </svg>
      );
    default:
      return null;
  }
}

export default function LatestBlogsCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  // Auto-sliding interval (loops every 3.5 seconds when not hovered/paused)
  useEffect(() => {
    if (isPaused) return;

    const autoSlideTimer = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      // When near the end, wrap smoothly back to the beginning
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Step forward by 1 card width + gap (320 + 32 = 352)
        scrollRef.current.scrollBy({ left: 352, behavior: 'smooth' });
      }
    }, 3500);

    return () => clearInterval(autoSlideTimer);
  }, [isPaused]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 352;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="latest-blogs"
      style={{
        backgroundColor: '#ffffff',
        padding: '6.5rem 0',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Top Header Row matching Reference: 'Latest Blogs' on left, 'View blog' on right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            gap: '1rem',
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '-0.035em',
              margin: 0,
            }}
          >
            Latest Blogs
          </h2>

          <Link
            href="/blogs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '9px 24px',
              borderRadius: '9999px',
              backgroundColor: '#f1f3f5',
              color: '#0f172a',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f3f5';
              e.currentTarget.style.transform = 'none';
            }}
          >
            View blog
          </Link>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="no-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            display: 'flex',
            gap: '2rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingBottom: '1rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {BLOGS.map((blog, idx) => {
            const graphic = BLOG_CARD_GRAPHICS[idx % BLOG_CARD_GRAPHICS.length];
            return (
              <div
                key={blog.id}
                style={{
                  width: '320px',
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 1. Visual Card Top: Dark Glowing Squircle matching Antigravity Screenshot */}
                <Link
                  href={`/blogs/${blog.id}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '280px',
                    borderRadius: '24px',
                    background: graphic.bg,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.15)',
                    textDecoration: 'none',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 12px 30px -10px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  {/* Subtle Workshop Photography Inset with Opacity */}
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      opacity: 0.28,
                      filter: 'contrast(1.15) brightness(0.85)',
                      transition: 'transform 0.5s ease',
                    }}
                  />

                  {/* Dark Vignette Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%)',
                    }}
                  />

                  {/* Top Pill / Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#ffffff',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {renderBlogBadgeIcon(graphic.iconType)}
                    </span>
                    <span>{graphic.badge}</span>
                  </div>

                  {/* Centered / Lower High-Contrast Title matching screenshot */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'inherit',
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      {graphic.titleHero}
                    </div>
                  </div>
                </Link>

                {/* 2. Text Meta & Title Below the Image */}
                <div style={{ paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      color: '#000000',
                      lineHeight: 1.35,
                      letterSpacing: '-0.02em',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <Link
                      href={`/blogs/${blog.id}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Date & Category row matching screenshot */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      fontSize: '0.85rem',
                      color: '#64748b',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span>{blog.date}</span>
                    <span style={{ color: '#475569', fontWeight: 500 }}>{blog.category}</span>
                  </div>

                  {/* Read blog link matching screenshot: 'Read blog ›' */}
                  <Link
                    href={`/blogs/${blog.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#000000',
                      textDecoration: 'none',
                      marginTop: 'auto',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
                  >
                    <span>Read blog</span>
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>›</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Bottom Navigation Controls + Auto Slide Status Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '2.5rem',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: canScrollLeft ? '#ffffff' : '#f8fafc',
                color: canScrollLeft ? '#0f172a' : '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'default',
                transition: 'all 0.15s ease',
                boxShadow: canScrollLeft ? '0 2px 6px rgba(0, 0, 0, 0.04)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (canScrollLeft) {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.borderColor = '#000000';
                }
              }}
              onMouseLeave={(e) => {
                if (canScrollLeft) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }
              }}
              title="Scroll left"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: canScrollRight ? '#ffffff' : '#f8fafc',
                color: canScrollRight ? '#0f172a' : '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'default',
                transition: 'all 0.15s ease',
                boxShadow: canScrollRight ? '0 2px 6px rgba(0, 0, 0, 0.04)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (canScrollRight) {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.borderColor = '#000000';
                }
              }}
              onMouseLeave={(e) => {
                if (canScrollRight) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }
              }}
              title="Scroll right"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Auto-Slide Status Indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#94a3b8',
              letterSpacing: '0.01em',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isPaused ? '#f59e0b' : '#10b981',
                boxShadow: isPaused ? '0 0 8px rgba(245, 158, 11, 0.5)' : '0 0 8px rgba(16, 185, 129, 0.5)',
                transition: 'all 0.3s ease',
              }}
            />
            <span>{isPaused ? 'Auto-slide paused' : 'Auto-sliding'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
