'use client';

import React, { useState, useMemo, Suspense } from 'react';
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
        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Fabrication Catalog &amp; E-Commerce</span>
        </nav>

        {/* Top Delivery Hub Banner */}
        <div
          style={{
            background: '#000000',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ThreeDFactory size={28} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                Workshop Direct Pricing • Direct Transport from Ghatanji
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                Showing verified delivery availability to <strong>{selectedCity.name}</strong> ({selectedCity.transitDays})
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLocationModalOpen(true)}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1
              className="font-display"
              style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}
            >
              Fabrication Storefront
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Showing {filteredProducts.length} certified workshop fabrications
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '0.55rem 1rem',
                gap: '8px',
                minWidth: '220px',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '0.85rem',
                color: '#334155',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="mobile-filter-btn"
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'none',
              }}
            >
              Filters ⚙
            </button>
          </div>
        </div>

        {/* Sector Quick Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
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
                  transition: 'all 0.15s ease',
                }}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Sidebar Filters & Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '2rem', alignItems: 'flex-start' }} className="shop-grid-container">
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
          <div>
            {filteredProducts.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
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
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                            style={{ padding: '0.65rem', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}
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
                            style={{ padding: '0.65rem', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}
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

