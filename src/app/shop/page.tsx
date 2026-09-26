'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, SECTORS, MATERIAL_GRADES, ProductItem } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ThreeDStar, ThreeDRuler, ThreeDShield, ThreeDFactory, ThreeDBolt } from '@/components/ThreeDIcons';
import { ModernLocationPin } from '@/components/Icons';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialSector = searchParams.get('sector') || 'All Sectors';

  const { addToCart, selectedCity, setIsLocationModalOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSector, setSelectedSector] = useState<string>(initialSector);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All Materials');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSector = selectedSector === 'All Sectors' || item.sector === selectedSector;
      const matchMaterial = selectedMaterial === 'All Materials' || item.materialGrade === selectedMaterial;
      const matchStock = inStockOnly ? item.inStockStandard : true;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchCat && matchSector && matchMaterial && matchStock && matchSearch;
    });

    if (sortBy === 'rating') {
      list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.unitPriceNumeric - b.unitPriceNumeric);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.unitPriceNumeric - a.unitPriceNumeric);
    }

    return list;
  }, [selectedCategory, selectedSector, selectedMaterial, inStockOnly, searchQuery, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedSector !== 'All Sectors') count++;
    if (selectedMaterial !== 'All Materials') count++;
    if (inStockOnly) count++;
    return count;
  }, [selectedCategory, selectedSector, selectedMaterial, inStockOnly]);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSector('All Sectors');
    setSelectedMaterial('All Materials');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('default');
  };

  return (
    <div style={{ padding: '2rem 0 5rem', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" style={{ flexWrap: 'wrap', gap: '0.4rem' }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Fabrication Catalog &amp; E-Commerce</span>
        </nav>

        {/* Top Delivery Hub Banner */}
        <div className="shop-delivery-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <ThreeDFactory size={28} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(0.92rem, 2.5vw, 1rem)' }}>
                Workshop Direct Pricing • Direct Transport from Ghatanji
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                Showing verified delivery availability to <strong>{selectedCity.name}</strong> ({selectedCity.transitDays})
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="delivery-btn"
            style={{
              padding: '0.55rem 1.4rem',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontWeight: 700,
              border: 'none',
              fontSize: '0.825rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            <span>Change City</span>
            <ModernLocationPin size={13} color="#000000" />
          </button>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="shop-controls-bar">
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 1.85rem)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}
            >
              Fabrication Storefront
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Showing {filteredProducts.length} certified workshop fabrications
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="shop-controls-actions">
            <div className="shop-search-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem', background: 'transparent' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    padding: '2px',
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="shop-filter-sort-row">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.85rem',
                  color: '#334155',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="mobile-filter-btn"
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Filters</span>
                <span style={{ fontSize: '0.85rem' }}>⚙</span>
                {activeFilterCount > 0 && (
                  <span
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      borderRadius: '9999px',
                      padding: '1px 6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                    }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Summary Chips */}
        {(activeFilterCount > 0 || searchQuery) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Active Filters:</span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Category: {selectedCategory}</span>
                <span>✕</span>
              </button>
            )}
            {selectedSector !== 'All Sectors' && (
              <button
                onClick={() => setSelectedSector('All Sectors')}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Sector: {selectedSector}</span>
                <span>✕</span>
              </button>
            )}
            {selectedMaterial !== 'All Materials' && (
              <button
                onClick={() => setSelectedMaterial('All Materials')}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Grade: {selectedMaterial}</span>
                <span>✕</span>
              </button>
            )}
            {inStockOnly && (
              <button
                onClick={() => setInStockOnly(false)}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Ready-To-Install</span>
                <span>✕</span>
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>&quot;{searchQuery}&quot;</span>
                <span>✕</span>
              </button>
            )}
            <button
              onClick={clearAllFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '2px 6px',
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Sector Quick Tabs */}
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            marginBottom: '2rem',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '9999px',
                  border: isSelected ? '1px solid #000000' : '1px solid #e2e8f0',
                  backgroundColor: isSelected ? '#000000' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                }}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Sidebar Filters & Product Grid */}
        <div className="shop-grid-container">
          {/* Left Sidebar Filters */}
          <aside
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.75rem',
              boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.04)',
              position: 'sticky',
              top: '110px',
            }}
            className="desktop-filter-sidebar"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Filter Catalog</span>
              <button
                onClick={clearAllFilters}
                style={{ background: 'none', border: 'none', color: '#000000', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Fabrication Category
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        textAlign: 'left',
                        fontSize: '0.825rem',
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? '#f1f5f9' : 'transparent',
                        color: isSelected ? '#000000' : '#334155',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material Grade Filter */}
            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Steel &amp; Material Grade
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {MATERIAL_GRADES.map((mat) => {
                  const isSelected = selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        textAlign: 'left',
                        fontSize: '0.825rem',
                        fontWeight: isSelected ? 700 : 500,
                        backgroundColor: isSelected ? '#f1f5f9' : 'transparent',
                        color: isSelected ? '#000000' : '#334155',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {mat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock Availability Toggle */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: '#000000', width: '16px', height: '16px' }}
                />
                <span>Ready-To-Install Standard Sizes Only</span>
              </label>
            </div>
          </aside>

          {/* Right Column: Product Cards Grid */}
          <div style={{ minWidth: 0, width: '100%' }}>
            {filteredProducts.length > 0 ? (
              <div className="shop-products-grid">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="ice-card"
                    style={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      width: '100%',
                      minWidth: 0,
                    }}
                  >
                    {/* Product Image Viewport */}
                    <div style={{ position: 'relative', height: '220px', width: '100%', backgroundColor: '#0f172a' }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      {product.badge && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                          }}
                        >
                          {product.badge}
                        </span>
                      )}

                      <span
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(9, 15, 28, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#ffffff',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                        }}
                      >
                        {product.materialGrade}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: 'clamp(1rem, 3.5vw, 1.5rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                          {product.category}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>
                          ★ {product.rating} <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        className="font-display"
                        style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: '0.5rem' }}
                      >
                        <Link href={`/shop/${product.id}`} style={{ color: 'inherit' }}>
                          {product.name}
                        </Link>
                      </h3>

                      <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                        {product.description}
                      </p>

                      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.85rem' }}>
                          <div>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Workshop Price:</span>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000000' }}>
                              {product.price}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                            {product.leadTime}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <Link
                            href={`/shop/${product.id}`}
                            className="btn-secondary"
                            style={{
                              padding: '0.7rem 0.5rem',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              textAlign: 'center',
                            }}
                          >
                            Customize ⚙
                          </Link>

                          <button
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                category: product.category,
                                image: product.image,
                                calculatedTotalPrice: product.unitPriceNumeric,
                                quantity: 1,
                              })
                            }
                            className="btn-primary"
                            style={{
                              padding: '0.7rem 0.5rem',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              textAlign: 'center',
                            }}
                          >
                            Add to Cart +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  No Fabrications Found Matching Criteria
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '420px', margin: '0.5rem auto 1.5rem' }}>
                  Try resetting your category or steel material filters, or contact our engineering desk for custom blueprints.
                </p>
                <button onClick={clearAllFilters} className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {isMobileFilterOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {/* Dark Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          {/* Bottom Sheet Modal Container */}
          <div
            className="animate-drawer-slide-up"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#ffffff',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              zIndex: 10000,
            }}
          >
            {/* Sheet Handle & Header */}
            <div
              style={{
                padding: '12px 20px 14px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: '#cbd5e1',
                  margin: '0 auto',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                    Filter Catalog
                  </span>
                  {activeFilterCount > 0 && (
                    <span
                      style={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '9999px',
                      }}
                    >
                      {activeFilterCount} active
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Reset All
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="Close filters"
                    style={{
                      background: '#f1f5f9',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#475569',
                      fontSize: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Filters Body */}
            <div
              style={{
                padding: '1.25rem 1.25rem 2rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* Category Filter */}
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Fabrication Category
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? 700 : 500,
                          backgroundColor: isSelected ? '#000000' : '#f8fafc',
                          color: isSelected ? '#ffffff' : '#334155',
                          border: isSelected ? '1px solid #000000' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Steel & Material Grade Filter */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Steel &amp; Material Grade
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {MATERIAL_GRADES.map((mat) => {
                    const isSelected = selectedMaterial === mat;
                    return (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? 700 : 500,
                          backgroundColor: isSelected ? '#000000' : '#f8fafc',
                          color: isSelected ? '#ffffff' : '#334155',
                          border: isSelected ? '1px solid #000000' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sector Filter inside Drawer */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  Industry Sector
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {SECTORS.map((sec) => {
                    const isSelected = selectedSector === sec;
                    return (
                      <button
                        key={sec}
                        onClick={() => setSelectedSector(sec)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? 700 : 500,
                          backgroundColor: isSelected ? '#000000' : '#f8fafc',
                          color: isSelected ? '#ffffff' : '#334155',
                          border: isSelected ? '1px solid #000000' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {sec}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ready-to-Install Toggle */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    style={{ accentColor: '#000000', width: '18px', height: '18px' }}
                  />
                  <span>Ready-To-Install Standard Sizes Only</span>
                </label>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderTop: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
              }}
            >
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  justifyContent: 'center',
                }}
              >
                Apply &amp; View {filteredProducts.length} Fabrications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center', color: '#000000' }}>Loading fabrication catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

