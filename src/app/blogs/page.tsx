'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOGS, BlogPost } from '@/data/blogs';
import { IconSearch } from '@/components/Icons';

// Showcase items that pair Welding Insights with Shop Products (Top Hero Carousel)
interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  shopCategory: string;
  image: string;
  startingPrice: string;
  shopLink: string;
  blogLink: string;
  specSummary: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'sc-1',
    title: 'Architectural laser gates',
    subtitle: 'Dual-swing fiber laser CNC entrances',
    category: 'Gates & Entrances',
    shopCategory: 'Gates',
    image: '/images/product_gate.jpg',
    startingPrice: '₹28,500',
    shopLink: '/shop?category=Gates',
    blogLink: '/blogs/5',
    specSummary: '±0.1mm fiber laser cut motifs • Multi-stage zinc epoxy undercoat',
  },
  {
    id: 'sc-2',
    title: 'Industrial PEB sheds',
    subtitle: 'Clear-span pre-fab warehouse framing',
    category: 'Industrial PEB',
    shopCategory: 'Sheds',
    image: '/images/hero_welding.jpg',
    startingPrice: '₹220 / sq.ft',
    shopLink: '/shop?category=Sheds',
    blogLink: '/blogs/4',
    specSummary: 'IS 2062 Grade E250/E350 steel • High-tensile HSFG bolt assembly',
  },
  {
    id: 'sc-3',
    title: 'Stainless TIG balustrades',
    subtitle: 'Grade 304 mirror & hairline railings',
    category: 'Railings & Balustrades',
    shopCategory: 'Railings',
    image: '/images/product_railing.jpg',
    startingPrice: '₹750 / rft',
    shopLink: '/shop?category=Railings',
    blogLink: '/blogs/1',
    specSummary: 'Argon gas purged TIG welding • 12mm toughened laminated glass',
  },
  {
    id: 'sc-4',
    title: 'Heavy security doors',
    subtitle: 'Anti-tamper multi-lock entry frames',
    category: 'Doors & Grills',
    shopCategory: 'Doors',
    image: '/images/product_door.jpg',
    startingPrice: '₹18,500',
    shopLink: '/shop?category=Doors',
    blogLink: '/blogs/3',
    specSummary: '16-gauge cold rolled MS sheets • Zinc phosphate anti-corrosion wash',
  },
  {
    id: 'sc-5',
    title: 'CNC fiber laser screens',
    subtitle: 'Architectural facades & jali partitions',
    category: 'Laser & CNC',
    shopCategory: 'Laser',
    image: '/images/blog_fabrication.jpg',
    startingPrice: '₹340 / sq.ft',
    shopLink: '/shop?category=Laser',
    blogLink: '/blogs/2',
    specSummary: '3kW high-precision nitrogen cut • Up to 16mm plate tolerance',
  },
];

// Futuristic Precision Hardware Systems (Light Theme, Black & White, Minimal Text)
interface HardwareSystem {
  id: string;
  num: string;
  code: string;
  name: string;
  shortTag: string;
  category: string;
  price: string;
  priceSub: string;
  image: string;
  shopUrl: string;
  blogUrl: string;
  desc: string;
  specs: { label: string; val: string; sub: string }[];
}

const HARDWARE_SYSTEMS: HardwareSystem[] = [
  {
    id: '1',
    num: '01',
    code: 'SYS_01 // LASER GATES',
    name: 'Art Deco Ornamental Laser Gate',
    shortTag: 'Laser Gates',
    category: 'Gates & Entrances',
    price: '₹28,500',
    priceSub: 'Base Complete Unit',
    image: '/images/product_gate.jpg',
    shopUrl: '/shop/1',
    blogUrl: '/blogs/5',
    desc: 'Dual-swing cantilever frame with high-power nitrogen laser cut motifs.',
    specs: [
      { label: 'ALLOY GRADE', val: 'IS 2062 MS', sub: 'Structural Steel' },
      { label: 'TOLERANCE', val: '±0.1 mm', sub: 'CNC Fiber Laser' },
      { label: 'COATING', val: 'Zinc Epoxy', sub: 'Anti-Oxidation' },
      { label: 'LEAD TIME', val: '10–14 Days', sub: 'Vidarbha Dispatch' },
    ],
  },
  {
    id: '4',
    num: '02',
    code: 'SYS_02 // STRUCTURAL PEB',
    name: 'Heavy Industrial Pre-Fab PEB Shed',
    shortTag: 'PEB Sheds',
    category: 'Industrial PEB',
    price: '₹220',
    priceSub: 'per sq.ft covered',
    image: '/images/hero_welding.jpg',
    shopUrl: '/shop/4',
    blogUrl: '/blogs/4',
    desc: 'Clear-span tubular truss framing engineered for heavy gantry & factory roofs.',
    specs: [
      { label: 'ALLOY GRADE', val: 'Grade E250/E350', sub: 'High Tensile' },
      { label: 'SPAN WIDTH', val: '40ft Clear', sub: 'Zero Internal Pillars' },
      { label: 'JOINERY', val: 'HSFG Bolts', sub: 'Friction Grip 8.8' },
      { label: 'LEAD TIME', val: '18–25 Days', sub: 'On-Site Erection' },
    ],
  },
  {
    id: '2',
    num: '03',
    code: 'SYS_03 // TIG BALUSTRADE',
    name: 'Stainless Steel 304 Balustrade Railing',
    shortTag: 'TIG Balustrades',
    category: 'Railings & Balustrades',
    price: '₹750',
    priceSub: 'per running foot',
    image: '/images/product_railing.jpg',
    shopUrl: '/shop/2',
    blogUrl: '/blogs/1',
    desc: 'Mirror-polished SS 304 balustrades with pure argon TIG welds & 12mm glass.',
    specs: [
      { label: 'ALLOY GRADE', val: 'SS Grade 304', sub: 'Corrosion-Proof' },
      { label: 'WELD SPEC', val: 'Argon TIG', sub: 'Zero-Spatter Polish' },
      { label: 'GLASS PANEL', val: '12mm Toughened', sub: 'Laminated Safety' },
      { label: 'LEAD TIME', val: '7–10 Days', sub: 'Workshop Custom' },
    ],
  },
  {
    id: '3',
    num: '04',
    code: 'SYS_04 // SECURITY ARMOR',
    name: 'Anti-Tamper Heavy Security Door',
    shortTag: 'Security Doors',
    category: 'Doors & Grills',
    price: '₹18,500',
    priceSub: 'Complete Entryway Unit',
    image: '/images/product_door.jpg',
    shopUrl: '/shop/3',
    blogUrl: '/blogs/3',
    desc: '16-gauge cold-rolled steel door with integrated deadbolt lock housing.',
    specs: [
      { label: 'ALLOY GRADE', val: '16-Gauge MS', sub: 'Cold Rolled Sheet' },
      { label: 'LOCK SYSTEM', val: 'Triple Deadbolt', sub: 'Anti-Drill Housing' },
      { label: 'FINISH', val: 'Polymer Coat', sub: '200°C Oven Baked' },
      { label: 'LEAD TIME', val: '8–12 Days', sub: 'Vidarbha Dispatch' },
    ],
  },
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Hero Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Futuristic Hardware Spec Stage State
  const [activeSystemIndex, setActiveSystemIndex] = useState(0);

  // Auto slide hero carousel every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SHOWCASE_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
  };

  const categories = ['All', 'Welding Techniques', 'Workshop Craft', 'Maintenance', 'Industrial PEB', 'Laser & CNC'];

  const filteredBlogs = BLOGS.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesQuery =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const activeShowcase = SHOWCASE_ITEMS[currentIndex];
  const nextShowcase = SHOWCASE_ITEMS[(currentIndex + 1) % SHOWCASE_ITEMS.length];
  const activeSystem = HARDWARE_SYSTEMS[activeSystemIndex];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '3.5rem 0 6rem 0' }}>
      <div className="container-custom">
        
        {/* =========================================================================
            1. TOP HEADER SECTION MATCHING REFERENCE SCREENSHOT
               Left: "Built for precision for the modern steel era"
               Right: Explanatory paragraph with user trust & shop integration
           ========================================================================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Left Title */}
          <div style={{ maxWidth: '640px' }}>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                fontWeight: 600,
                color: '#000000',
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                margin: 0,
              }}
            >
              Built for precision<br />
              for the modern steel era
            </h1>
          </div>

          {/* Right Paragraph */}
          <div style={{ maxWidth: '460px', paddingTop: '0.5rem' }}>
            <p
              style={{
                fontSize: '1rem',
                color: '#475569',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Shree Ganesh Steel insights and workshop metallurgy. Whether you are an architect designing custom villa gates, an industrial contractor erecting PEB factory framing, or procuring certified metalcraft with live shop pricing.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. TWO LARGE SHOWCASE CARDS CAROUSEL (SIDE-BY-SIDE)
           ========================================================================= */}
        <div
          style={{ marginBottom: '5rem' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.25rem',
            }}
          >
            {/* Card 1: Primary Active Item */}
            <div
              style={{
                position: 'relative',
                height: '480px',
                borderRadius: '28px',
                overflow: 'hidden',
                backgroundColor: '#1e293b',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Image
                src={activeShowcase.image}
                alt={activeShowcase.title}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)',
                }}
              />

              {/* Shop Badge (Top Left) */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#000000',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>🛒 Available in Shop:</span>
                <span>{activeShowcase.startingPrice}</span>
              </div>

              {/* Card Bottom Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '28px',
                  right: '28px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: '0 0 0.4rem 0',
                      letterSpacing: '-0.025em',
                      textTransform: 'capitalize',
                    }}
                  >
                    {activeShowcase.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      margin: 0,
                      maxWidth: '380px',
                    }}
                  >
                    {activeShowcase.specSummary}
                  </p>
                </div>

                <Link
                  href={activeShowcase.shopLink}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexShrink: 0,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#000000">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Explore in Shop</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Secondary / Next Item */}
            <div
              style={{
                position: 'relative',
                height: '480px',
                borderRadius: '28px',
                overflow: 'hidden',
                backgroundColor: '#1e293b',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Image
                src={nextShowcase.image}
                alt={nextShowcase.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)',
                }}
              />

              {/* Shop Badge (Top Left) */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#000000',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>🛒 Available in Shop:</span>
                <span>{nextShowcase.startingPrice}</span>
              </div>

              {/* Card Bottom Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '28px',
                  right: '28px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)',
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: '0 0 0.4rem 0',
                      letterSpacing: '-0.025em',
                      textTransform: 'capitalize',
                    }}
                  >
                    {nextShowcase.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      margin: 0,
                      maxWidth: '380px',
                    }}
                  >
                    {nextShowcase.specSummary}
                  </p>
                </div>

                <Link
                  href={nextShowcase.shopLink}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexShrink: 0,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#000000">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Explore in Shop</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Carousel Footer Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  textTransform: 'capitalize',
                }}
              >
                {activeShowcase.title}
              </span>
              <span style={{ fontSize: '0.825rem', color: '#64748b' }}>
                ({currentIndex + 1} of {SHOWCASE_ITEMS.length})
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#0f172a';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                }}
                aria-label="Previous Slide"
              >
                ←
              </button>

              <button
                type="button"
                onClick={handleNext}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#0f172a';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                }}
                aria-label="Next Slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. REDESIGNED FUTURISTIC & ULTRA-PREMIUM SPECIFICATION LAB (LIGHT THEME)
               Replaced the boring generic grid with a sleek, minimalist, high-contrast
               interactive engineering hardware module with live pricing & minimal text.
           ========================================================================= */}
        <section
          style={{
            backgroundColor: '#fafafa',
            borderRadius: '32px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '3rem 2.25rem',
            marginBottom: '5.5rem',
            boxShadow: '0 20px 50px -20px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  marginBottom: '0.85rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#000000',
                  }}
                />
                SPECIFICATION LAB // 04 BLUEPRINTS
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)',
                  fontWeight: 600,
                  color: '#000000',
                  letterSpacing: '-0.03em',
                  margin: '0 0 0.4rem 0',
                  lineHeight: 1.15,
                }}
              >
                Precision Hardware.
              </h2>
              <p style={{ margin: 0, fontSize: '0.925rem', color: '#64748b' }}>
                Four core workshop systems. Engineered from insight to factory dispatch.
              </p>
            </div>

            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#000000',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                backgroundColor: '#ffffff',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#000000';
              }}
            >
              <span>Explore Entire Catalog</span>
              <span>→</span>
            </Link>
          </div>

          {/* Futuristic Segmented Tabs: 4 Systems */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.65rem',
              marginBottom: '1.75rem',
            }}
          >
            {HARDWARE_SYSTEMS.map((sys, idx) => {
              const active = activeSystemIndex === idx;
              return (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setActiveSystemIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    border: active ? '1px solid #000000' : '1px solid rgba(0, 0, 0, 0.08)',
                    backgroundColor: active ? '#000000' : '#ffffff',
                    color: active ? '#ffffff' : '#0f172a',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    boxShadow: active ? '0 8px 20px -6px rgba(0,0,0,0.25)' : 'none',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: active ? 'rgba(255, 255, 255, 0.65)' : '#94a3b8',
                        letterSpacing: '0.05em',
                        marginBottom: '2px',
                      }}
                    >
                      SYS_0{idx + 1}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{sys.shortTag}</div>
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: active ? '#ffffff' : '#000000',
                      backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : '#f1f5f9',
                      padding: '3px 8px',
                      borderRadius: '8px',
                    }}
                  >
                    {sys.price}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Futuristic Centerpiece Spec Stage */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
              padding: '2rem',
              alignItems: 'center',
            }}
          >
            {/* Visual Canvas with Futuristic Overlays */}
            <div
              style={{
                position: 'relative',
                height: '420px',
                borderRadius: '18px',
                overflow: 'hidden',
                backgroundColor: '#f1f5f9',
              }}
            >
              <Image
                src={activeSystem.image}
                alt={activeSystem.name}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)',
                }}
              />

              {/* HUD Monospace Overlay Top Left */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '0.04em',
                }}
              >
                {activeSystem.code}
              </div>

              {/* HUD Monospace Overlay Bottom Left */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#000000',
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '0.03em',
                }}
              >
                TOLERANCE // ±0.1mm FIBER OPTICS
              </div>

              {/* HUD Monospace Overlay Bottom Right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                GHATANJI PLANT
              </div>
            </div>

            {/* Futuristic High-Density Spec HUD */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Category tag */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginBottom: '6px',
                }}
              >
                SPEC SHEET // {activeSystem.category}
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '-0.025em',
                  margin: '0 0 0.6rem 0',
                  lineHeight: 1.2,
                }}
              >
                {activeSystem.name}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#475569',
                  lineHeight: 1.55,
                  margin: '0 0 1.5rem 0',
                }}
              >
                {activeSystem.desc}
              </p>

              {/* Minimal 2x2 Specification Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '1.75rem',
                }}
              >
                {activeSystem.specs.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#94a3b8',
                        letterSpacing: '0.05em',
                        marginBottom: '2px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0f172a' }}>
                      {item.val}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing and Action Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid #f1f5f9',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#64748b',
                      letterSpacing: '0.04em',
                    }}
                  >
                    STARTING PRICE
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em' }}>
                      {activeSystem.price}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {activeSystem.priceSub}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link
                    href={activeSystem.blogUrl}
                    style={{
                      padding: '9px 14px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(0, 0, 0, 0.15)',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    Tech Blueprint
                  </Link>

                  <Link
                    href={activeSystem.shopUrl}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '9999px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e293b';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <span>Configure in Shop</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. ALL FABRICATION INSIGHTS & TECHNICAL GUIDES (SEARCH & CATEGORIES)
           ========================================================================= */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '2rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  margin: '0 0 0.25rem 0',
                }}
              >
                Fabrication Journal &amp; Technical Guides
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                Field engineering notes, AWS weld procedures, and steel maintenance manuals.
              </p>
            </div>

            {/* Live Search */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search welding topics or steel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '7px 12px 7px 32px',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  outline: 'none',
                  minWidth: '240px',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#000000')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
              <span style={{ position: 'absolute', left: '10px', top: '8px', color: '#94a3b8' }}>
                <IconSearch size={15} color="#94a3b8" />
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.825rem',
                    fontWeight: active ? 600 : 500,
                    cursor: 'pointer',
                    border: '1px solid',
                    backgroundColor: active ? '#000000' : '#ffffff',
                    color: active ? '#ffffff' : '#475569',
                    borderColor: active ? '#000000' : 'rgba(0, 0, 0, 0.12)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = '#000000';
                      e.currentTarget.style.color = '#000000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', height: '200px', backgroundColor: '#f1f5f9' }}>
                  <Link href={`/blogs/${blog.id}`}>
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '9999px',
                    }}
                  >
                    {blog.category}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    <span>{blog.date}</span> • <span>{blog.readTime}</span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.35,
                      margin: '0 0 0.75rem 0',
                    }}
                  >
                    <Link href={`/blogs/${blog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#475569',
                      lineHeight: 1.6,
                      margin: '0 0 1.25rem 0',
                      flex: 1,
                    }}
                  >
                    {blog.summary}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid #f1f5f9',
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      By {blog.author.name}
                    </span>

                    <Link
                      href={`/blogs/${blog.id}`}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#000000',
                        textDecoration: 'none',
                      }}
                    >
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
