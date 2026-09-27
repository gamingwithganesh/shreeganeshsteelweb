'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, ProductItem } from '@/data/products';
import { useLiveProducts } from '@/hooks/useLiveProducts';
import { useCart } from '@/context/CartContext';
import { ThreeDStar, ThreeDTruck, ThreeDShield, ThreeDFactory, ThreeDRuler } from '@/components/ThreeDIcons';
import { IconCheck, IconPlus, IconGear, IconTag, IconVerifiedShield, IconStar } from '@/components/Icons';

const getMarketPrice = (priceNum: number) => {
  const mrp = Math.round((priceNum * 1.25) / 100) * 100;
  return `₹${mrp.toLocaleString('en-IN')}`;
};

const getDiscountPercent = (priceNum: number) => {
  const mrp = Math.round((priceNum * 1.25) / 100) * 100;
  const discount = Math.round(((mrp - priceNum) / mrp) * 100);
  return `${discount}%`;
};

const SECTORS = [
  { id: 'all', label: 'All Products' },
  { id: 'Industrial', label: 'Industrial & PEB' },
  { id: 'Residential', label: 'Gates & Railings' },
  { id: 'Agricultural', label: 'Agro Equipment' },
  { id: 'Commercial', label: 'Commercial Facades' },
];

function renderSectorIcon(id: string) {
  switch (id) {
    case 'all':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'Industrial':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z" />
        </svg>
      );
    case 'Residential':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'Agricultural':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="17" r="4" />
          <circle cx="18" cy="18" r="3" />
          <path d="M11 17h4" />
          <path d="M7 13V5h8l3 5" />
          <path d="M15 10h4" />
        </svg>
      );
    case 'Commercial':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="9" y1="22" x2="9" y2="22.01" />
          <line x1="15" y1="22" x2="15" y2="22.01" />
          <line x1="8" y1="6" x2="8" y2="6.01" />
          <line x1="16" y1="6" x2="16" y2="6.01" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomeShoppingSection() {
  const { addToCart } = useCart();
  const { products: liveProducts } = useLiveProducts();
  const [activeSector, setActiveSector] = useState('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = activeSector === 'all'
    ? liveProducts
    : liveProducts.filter((p) => p.sector === activeSector);

  const handleQuickAdd = (product: ProductItem) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 2200);
  };

  return (
    <section
      id="storefront-section"
      style={{
        backgroundColor: '#ffffff',
        padding: 'clamp(3.5rem, 8vw, 7.5rem) 0',
        position: 'relative',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="container-custom">
        {/* Modern Section Header with Generous Spacing */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '7px 20px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
            <span>Direct Workshop Storefront • Vidarbha Fast Dispatch</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              marginBottom: '1.25rem',
            }}
          >
            Shop Custom Metal Fabrication &amp; Structures
          </h2>

          <p style={{ color: '#64748b', fontSize: '1.125rem', lineHeight: 1.65, fontWeight: 400, maxWidth: '680px', margin: '0 auto' }}>
            Browse certified architectural models or configure custom site blueprints in parallel. Direct factory rates, ISO standard steel, and verified site delivery.
          </p>
        </div>

        {/* Minimalist Segmented Filter Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '4rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              flexWrap: 'wrap',
              gap: '4px',
              maxWidth: '100%',
              justifyContent: 'center',
            }}
          >
            {SECTORS.map((sec) => {
              const isSelected = activeSector === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSector(sec.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 600 : 500,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: isSelected ? '#000000' : 'transparent',
                    color: isSelected ? '#ffffff' : '#475569',
                    boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                    transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.color = '#0f172a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {renderSectorIcon(sec.id)}
                  </span>
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              backgroundColor: '#fafafa',
              borderRadius: '24px',
              border: '1px dashed #cbd5e1',
              padding: 'clamp(2.5rem, 6vw, 4.5rem) 1.5rem',
              textAlign: 'center',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            {/* Empty Basket Icon */}
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
              }}
            >
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16l-1.5 12.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 7z" />
                <path d="M9 7V4a3 3 0 0 1 6 0v3" />
                <line x1="9" y1="11" x2="9" y2="15" />
                <line x1="15" y1="11" x2="15" y2="15" />
                <line x1="12" y1="11" x2="12" y2="15" />
              </svg>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.45rem)',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.6rem',
                letterSpacing: '-0.02em',
              }}
            >
              Catalog Is Currently Empty
            </h3>

            <p
              style={{
                color: '#64748b',
                fontSize: '0.925rem',
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: '0 auto 1.75rem auto',
              }}
            >
              {activeSector !== 'all'
                ? 'No fabrications found in this category. Switch back to all categories or submit your custom requirement.'
                : 'All products have been cleared or our engineering team is currently updating workshop inventory. You can request custom steel fabrication directly.'}
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {activeSector !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveSector('all')}
                  style={{
                    padding: '0.75rem 1.4rem',
                    borderRadius: '9999px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  View All Categories
                </button>
              )}
              <Link
                href="/orders/create"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Request Custom Fabrication</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW (< 768px): 2-Column E-Commerce Grid (Flipkart Style matching user reference) */}
            <div className="home-products-mobile-grid">
              {filteredProducts.map((prod) => {
            const isAdded = addedProductId === prod.id;
            return (
              <div key={prod.id} className="home-mobile-product-card">
                {/* Product Thumbnail */}
                <div style={{ position: 'relative', width: '100%', height: '140px', backgroundColor: '#0f172a' }}>
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    unoptimized={Boolean(prod.image?.startsWith('http'))}
                    style={{ objectFit: 'cover' }}
                  />
                  {prod.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontSize: '0.58rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                      }}
                    >
                      {prod.badge}
                    </span>
                  )}
                  {/* Rating Pill overlay at bottom-left */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '6px',
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(4px)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    <IconStar size={11} color="#f59e0b" style={{ fill: '#f59e0b' }} />
                    <span>{prod.rating}</span>
                    <span style={{ color: '#cbd5e1', fontSize: '0.6rem' }}>({prod.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '10px 10px 12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.62rem',
                      color: '#64748b',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '2px',
                    }}
                  >
                    {prod.category.split('&')[0]}
                  </div>

                  <Link href={`/shop/${prod.id}`} style={{ textDecoration: 'none', color: '#0f172a' }}>
                    <h3
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        lineHeight: 1.25,
                        margin: '0 0 6px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {prod.name}
                    </h3>
                  </Link>

                  <div style={{ marginTop: 'auto' }}>
                    {/* Price Row: Strikethrough Market MRP + Bold Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', flexWrap: 'wrap' }}>
                      <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '0.72rem' }}>
                        {getMarketPrice(prod.unitPriceNumeric)}
                      </span>
                      <span style={{ color: '#000000', fontWeight: 900, fontSize: '0.98rem' }}>
                        {prod.price}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.64rem', color: '#16a34a', fontWeight: 800, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <span>↓ {getDiscountPercent(prod.unitPriceNumeric)}</span>
                      <span>• Direct Rate</span>
                    </div>

                    {/* Quick Add Button */}
                    <div style={{ marginTop: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(prod)}
                        style={{
                          width: '100%',
                          padding: '7px 4px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: isAdded ? '#10b981' : '#000000',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isAdded ? (
                          <>
                            <IconCheck size={13} color="#ffffff" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <IconPlus size={13} color="#ffffff" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP VIEW (≥ 768px): Spacious 3-Column Product Grid */}
        <div className="home-products-desktop-grid">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease',
                position: 'relative',
                minWidth: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              }}
            >
              {/* Product Photo Showcase */}
              <div
                style={{
                  position: 'relative',
                  height: '270px',
                  backgroundColor: '#f8fafc',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={prod.image}
                  alt={prod.name}
                  width={460}
                  height={300}
                  unoptimized={Boolean(prod.image?.startsWith('http'))}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />

                {/* Top Badge Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pointerEvents: 'none',
                  }}
                >
                  {prod.badge ? (
                    <span
                      style={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        letterSpacing: '0.03em',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      {prod.badge}
                    </span>
                  ) : <div />}

                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: '#0f172a',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <ThreeDStar size={13} />
                    <span>{prod.rating} ({prod.reviewsCount})</span>
                  </span>
                </div>

                {/* Bottom Material Grade Over Image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '16px',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.82)',
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {prod.materialGrade}
                  </span>
                </div>
              </div>

              {/* Spacious Card Body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Category Meta */}
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {prod.category}
                </div>

                {/* Product Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '0.6rem',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <Link href={`/shop/${prod.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {prod.name}
                  </Link>
                </h3>

                {/* Concise 2-line Description */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flex: 1,
                  }}
                >
                  {prod.description}
                </p>

                {/* Clean Pill Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      backgroundColor: '#f8fafc',
                      color: '#334155',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    Gauge: {prod.availableGauges?.[0] || '14 Gauge'}
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      backgroundColor: '#f8fafc',
                      color: '#334155',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    Finish: {prod.availableFinishes?.[0] || 'Anti-Rust Primed'}
                  </span>
                </div>

                {/* Card Footer: Price & Direct Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #f1f5f9',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 800 }}>↓ {getDiscountPercent(prod.unitPriceNumeric)}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>{getMarketPrice(prod.unitPriceNumeric)}</span>
                    </div>
                    <div
                      className="font-display"
                      style={{ fontSize: '1.45rem', fontWeight: 800, color: '#000000', letterSpacing: '-0.03em' }}
                    >
                      {prod.price}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <Link
                      href={`/shop/${prod.id}`}
                      style={{
                        padding: '0.55rem 1rem',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        border: '1.5px solid #e2e8f0',
                        color: '#0f172a',
                        backgroundColor: '#ffffff',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#000000';
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      Configure
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(prod)}
                      style={{
                        padding: '0.55rem 1.15rem',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: addedProductId === prod.id ? '#10b981' : '#000000',
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => {
                        if (addedProductId !== prod.id) {
                          e.currentTarget.style.backgroundColor = '#1e293b';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (addedProductId !== prod.id) {
                          e.currentTarget.style.backgroundColor = '#000000';
                          e.currentTarget.style.transform = 'none';
                        }
                      }}
                    >
                      {addedProductId === prod.id ? (
                        <>
                          <IconCheck size={14} color="#ffffff" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <IconPlus size={14} color="#ffffff" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          </>
        )}

        {/* E-Commerce Guarantee Strip with Modern Spacing */}
        <div
          style={{
            marginTop: '4.5rem',
            backgroundColor: '#fafafa',
            borderRadius: '24px',
            padding: '2.5rem 3rem',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ThreeDFactory size={36} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>Direct Workshop Rates</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '2px' }}>Zero middlemen markups on raw steel</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ThreeDRuler size={36} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>Custom Fit Tolerance</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '2px' }}>±1mm laser &amp; CAD precision</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ThreeDTruck size={36} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>Vidarbha Site Dispatch</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '2px' }}>7 major operational delivery hubs</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ThreeDShield size={36} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>15-Year Weld Guarantee</div>
              <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '2px' }}>ISO certified joinery &amp; anti-rust coat</div>
            </div>
          </div>
        </div>

        {/* Bottom Catalog Action */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link
            href="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '1.1rem 3rem',
              fontSize: '1.025rem',
              fontWeight: 600,
              borderRadius: '9999px',
              backgroundColor: '#000000',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1e293b';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            }}
          >
            <span>Explore All 8+ Fabrication Categories in Steel Catalog</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
