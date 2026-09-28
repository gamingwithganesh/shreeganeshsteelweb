'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, SECTORS, MATERIAL_GRADES, ProductItem, formatProductDimensions } from '@/data/products';
import { useLiveProducts } from '@/hooks/useLiveProducts';
import { useCart } from '@/context/CartContext';
import { ThreeDStar, ThreeDRuler, ThreeDShield, ThreeDFactory, ThreeDBolt } from '@/components/ThreeDIcons';
import { 
  ModernLocationPin, 
  IconTag, 
  IconPackage, 
  IconShield, 
  IconGate, 
  IconStructural, 
  IconStar, 
  IconGear, 
  IconHeart, 
  IconVerifiedShield, 
  IconSearch, 
  IconPlus, 
  IconCheck,
  IconMenu 
} from '@/components/Icons';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialSector = searchParams.get('sector') || 'All Sectors';

  const { addToCart, cart, setIsCartOpen, selectedCity, setIsLocationModalOpen } = useCart();
  const { products: liveProducts } = useLiveProducts();
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSector, setSelectedSector] = useState<string>(initialSector);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All Materials');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getMarketPrice = (priceNum: number) => {
    const mrp = Math.round((priceNum * 1.25) / 100) * 100;
    return `₹${mrp.toLocaleString('en-IN')}`;
  };

  const getDiscountPercent = (priceNum: number) => {
    const mrp = Math.round((priceNum * 1.25) / 100) * 100;
    const discount = Math.round(((mrp - priceNum) / mrp) * 100);
    return `${discount}%`;
  };

  const getSortLabel = (val: string) => {
    switch (val) {
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'rating': return 'Top Rated';
      default: return 'Featured';
    }
  };

  const filteredProducts = useMemo(() => {
    let list = liveProducts.filter((item) => {
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
  }, [liveProducts, selectedCategory, selectedSector, selectedMaterial, inStockOnly, searchQuery, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedSector !== 'All Sectors') count++;
    if (selectedMaterial !== 'All Materials') count++;
    if (inStockOnly) count++;
    return count;
  }, [selectedCategory, selectedSector, selectedMaterial, inStockOnly]);

  useEffect(() => {
    if (isMobileFilterOpen || isSortModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen, isSortModalOpen]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSector('All Sectors');
    setSelectedMaterial('All Materials');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('default');
  };

  return (
    <div style={{ padding: '0.75rem 0 5rem', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className="container-custom">
        {/* Mobile App Header (Flipkart-Style E-Commerce Nav on < 768px) */}
        <div className="mobile-ecommerce-header">
          <Link href="/" aria-label="Go to home" style={{ color: '#0f172a', display: 'flex', alignItems: 'center', padding: '4px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>

          <div className="mobile-search-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search gates, railings, sheds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.8rem', padding: '2px', cursor: 'pointer' }}
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => {
              if (wishlist.length > 0) {
                // User can toggle view of wishlisted
              }
            }}
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#0f172a' }}
            aria-label="Wishlist"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#ef4444' : 'none'} stroke={wishlist.length > 0 ? '#ef4444' : 'currentColor'} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.62rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#0f172a' }}
            aria-label="Open Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartItemCount > 0 && (
              <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: '#ef4444', color: '#ffffff', fontSize: '0.62rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Sticky Sort & Filter Dual Bar (Mobile Only) */}
        <div className="mobile-sort-filter-bar">
          <button
            onClick={() => setIsSortModalOpen(true)}
            className="sort-filter-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 15l5 5 5-5" />
              <path d="M7 9l5-5 5 5" />
            </svg>
            <span>Sort: {getSortLabel(sortBy)}</span>
          </button>

          <div className="sort-filter-divider" />

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="sort-filter-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="filter-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Quick Filter Carousel (Flipkart Style on Mobile) */}
        <div className="quick-chips-row no-scrollbar">
          <button
            onClick={() => setSortBy(sortBy === 'price-asc' ? 'default' : 'price-asc')}
            className={`quick-chip ${sortBy === 'price-asc' ? 'active' : ''}`}
          >
            <IconTag size={13} />
            <span>Direct Factory Rates</span>
          </button>

          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`quick-chip ${inStockOnly ? 'active' : ''}`}
          >
            <IconPackage size={13} />
            <span>Ready In Stock</span>
          </button>

          <button
            onClick={() => setSelectedMaterial(selectedMaterial === 'SS Grade 304' ? 'All Materials' : 'SS Grade 304')}
            className={`quick-chip ${selectedMaterial === 'SS Grade 304' ? 'active' : ''}`}
          >
            <IconShield size={13} />
            <span>SS Grade 304</span>
          </button>

          <button
            onClick={() => setSelectedCategory(selectedCategory === 'Gates & Entrances' ? 'All' : 'Gates & Entrances')}
            className={`quick-chip ${selectedCategory === 'Gates & Entrances' ? 'active' : ''}`}
          >
            <IconGate size={13} />
            <span>Gates &amp; Entrances</span>
          </button>

          <button
            onClick={() => setSelectedCategory(selectedCategory === 'Industrial Sheds & PEB' ? 'All' : 'Industrial Sheds & PEB')}
            className={`quick-chip ${selectedCategory === 'Industrial Sheds & PEB' ? 'active' : ''}`}
          >
            <IconStructural size={13} />
            <span>PEB &amp; Sheds</span>
          </button>

          <button
            onClick={() => setSortBy(sortBy === 'rating' ? 'default' : 'rating')}
            className={`quick-chip ${sortBy === 'rating' ? 'active' : ''}`}
          >
            <IconStar size={13} color="#f59e0b" style={{ fill: '#f59e0b' }} />
            <span>4.5+ Rated</span>
          </button>
        </div>

        {/* Desktop Breadcrumbs (Hidden on Mobile) */}
        <div className="desktop-shop-header">
          <nav className="breadcrumbs" style={{ flexWrap: 'wrap', gap: '0.4rem' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Fabrication Catalog &amp; E-Commerce</span>
          </nav>
        </div>

        {/* Top Delivery Hub Banner */}
        <div className="shop-delivery-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <ThreeDFactory size={26} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(0.88rem, 2.5vw, 0.98rem)' }}>
                Workshop Direct Pricing • Direct Transport from Ghatanji
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                Showing verified delivery availability to <strong>{selectedCity.name}</strong> ({selectedCity.transitDays})
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="delivery-btn"
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontWeight: 700,
              border: 'none',
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Change City</span>
            <ModernLocationPin size={13} color="#000000" />
          </button>
        </div>

        {/* Desktop Controls Bar (Hidden on Mobile) */}
        <div className="desktop-shop-header shop-controls-bar">
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

          {/* Quick Search & Sort Bar for Desktop */}
          <div className="shop-controls-actions">
            {/* Desktop Hamburger Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="desktop-filter-hamburger-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.62rem 1.15rem',
                borderRadius: '12px',
                border: activeFilterCount > 0 ? '1.5px solid #000000' : '1px solid #cbd5e1',
                backgroundColor: activeFilterCount > 0 ? '#000000' : '#ffffff',
                color: activeFilterCount > 0 ? '#ffffff' : '#0f172a',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                boxShadow: activeFilterCount > 0 ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeFilterCount === 0) {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilterCount === 0) {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }
              }}
              aria-label="Filter Catalog"
            >
              <IconMenu size={18} color={activeFilterCount > 0 ? '#ffffff' : '#0f172a'} />
              <span>Filter Catalog</span>
              {activeFilterCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    lineHeight: 1.2,
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

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
            </div>
          </div>
        </div>

        {/* Sector Quick Tabs (Desktop View) */}
        <div
          className="desktop-shop-header no-scrollbar"
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

        {/* Active Filters Summary Chips */}
        {(activeFilterCount > 0 || searchQuery) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              padding: '0 2px',
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

        {/* MOBILE VIEW (< 768px): Indian E-Commerce (Flipkart Style) Horizontal Product Cards List */}
        <div className="mobile-products-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const marketPrice = getMarketPrice(product.unitPriceNumeric);
              const discountPercent = getDiscountPercent(product.unitPriceNumeric);

              return (
                <div key={product.id} className="mobile-product-card">
                  {/* Top Row: Thumbnail Image + Details */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {/* Left Thumbnail with Badge */}
                    <div
                      style={{
                        position: 'relative',
                        width: '115px',
                        height: '115px',
                        flexShrink: 0,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#0f172a',
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized={Boolean(product.image?.startsWith('http'))}
                        style={{ objectFit: 'cover' }}
                      />
                      {product.badge && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            fontSize: '0.58rem',
                            fontWeight: 800,
                            padding: '2px 5px',
                            borderRadius: '4px',
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '4px',
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          color: '#ffffff',
                          fontSize: '0.58rem',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '4px',
                        }}
                      >
                        {product.materialGrade.split(' ')[0]}
                      </span>
                    </div>

                    {/* Right Info Details */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      {/* Name & Wishlist Heart */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                        <Link href={`/shop/${product.id}`} style={{ textDecoration: 'none', color: '#0f172a', flex: 1 }}>
                          <h3
                            style={{
                              fontSize: '0.92rem',
                              fontWeight: 700,
                              lineHeight: 1.3,
                              margin: 0,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {product.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          aria-label="Toggle Wishlist"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isWishlisted ? '#ef4444' : '#cbd5e1',
                            flexShrink: 0,
                          }}
                        >
                          <IconHeart size={18} filled={isWishlisted} color={isWishlisted ? '#ef4444' : '#94a3b8'} />
                        </button>
                      </div>

                      {/* Rating & SGS Assured Badge (Flipkart Style) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            backgroundColor: '#16a34a',
                            color: '#ffffff',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '2px',
                          }}
                        >
                          <IconStar size={10} color="#ffffff" style={{ fill: '#ffffff' }} />
                          <span>{product.rating}</span>
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          ({product.reviewsCount})
                        </span>
                        {/* Assured Shield Badge */}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '0.72rem',
                            color: '#1d4ed8',
                            fontWeight: 800,
                          }}
                        >
                          <IconVerifiedShield size={13} color="#1d4ed8" />
                          <span style={{ fontStyle: 'italic', fontWeight: 900 }}>Assured</span>
                        </span>
                      </div>

                      {/* Prominent Measurements Badge (L × H × B) */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '5px', fontSize: '0.72rem', color: '#0f172a', fontWeight: 700, backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '2px 7px', borderRadius: '5px', width: 'fit-content' }}>
                        <span>📏</span>
                        <span>{formatProductDimensions(product)}</span>
                      </div>

                      {/* Price Row: Discount % + MRP Strikethrough + Direct Price */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.88rem' }}>
                          ↓ {discountPercent}
                        </span>
                        <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '0.8rem' }}>
                          {marketPrice}
                        </span>
                        <span style={{ color: '#000000', fontWeight: 900, fontSize: '1.15rem' }}>
                          {product.price}
                        </span>
                      </div>

                      {/* Factory Tag & Delivery */}
                      <div style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 700, marginTop: '2px' }}>
                        Workshop Direct • Zero Retail Markup
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '3px' }}>
                        Delivery in <strong>{product.leadTime}</strong> to {selectedCity.name}
                      </div>
                    </div>
                  </div>

                  {/* Specification Chips Row (Flipkart-Style Spec Tags) */}
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '10px' }}>
                    <span className="spec-tag" style={{ fontWeight: 700, color: '#0f172a', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}>📏 {formatProductDimensions(product)}</span>
                    <span className="spec-tag">{product.materialGrade}</span>
                    <span className="spec-tag">{product.sector}</span>
                    <span className="spec-tag">0.5mm Laser Precision</span>
                  </div>

                  {/* Action Buttons Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                    <Link
                      href={`/shop/${product.id}`}
                      className="btn-secondary"
                      style={{
                        padding: '0.65rem 0.4rem',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <IconGear size={13} />
                      <span>Customize</span>
                    </Link>

                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          category: product.category,
                          image: product.image,
                          widthFeet: product.defaultDimensions?.lengthFeet ?? product.defaultDimensions?.widthFeet,
                          lengthFeet: product.defaultDimensions?.lengthFeet ?? product.defaultDimensions?.widthFeet,
                          heightFeet: product.defaultDimensions?.heightFeet,
                          breadthFeet: product.defaultDimensions?.breadthFeet,
                          dimensionsText: formatProductDimensions(product),
                          calculatedTotalPrice: product.unitPriceNumeric,
                          quantity: 1,
                        })
                      }
                      className="btn-primary"
                      style={{
                        padding: '0.65rem 0.4rem',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <IconPlus size={13} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                backgroundColor: '#fafafa',
                borderRadius: '20px',
                border: '1px dashed #cbd5e1',
                padding: '3rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                }}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16l-1.5 12.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 7z" />
                  <path d="M9 7V4a3 3 0 0 1 6 0v3" />
                  <line x1="9" y1="11" x2="9" y2="15" />
                  <line x1="15" y1="11" x2="15" y2="15" />
                  <line x1="12" y1="11" x2="12" y2="15" />
                </svg>
              </div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                {liveProducts.length === 0 ? 'Catalog Is Currently Empty' : 'No Fabrications Found'}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', maxWidth: '380px', margin: '0.4rem auto 1.25rem' }}>
                {liveProducts.length === 0
                  ? 'All products have been cleared or workshop inventory is updating. Submit custom steel fabrication requirements directly.'
                  : 'Try clearing active filters or search queries to view all workshop fabrications.'}
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {liveProducts.length > 0 && (
                  <button onClick={clearAllFilters} className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.82rem' }}>
                    Clear All Filters
                  </button>
                )}
                <Link
                  href="/orders/create"
                  style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Custom Fabrication</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP VIEW (≥ 768px): Full-Width Product Grid with Hamburger-Triggered Filter Drawer */}
        <div className="desktop-products-view shop-grid-container">
          <div style={{ minWidth: 0, width: '100%' }}>
            {filteredProducts.length > 0 ? (
              <div className="shop-products-grid">
                {filteredProducts.map((product) => {
                  const marketPrice = getMarketPrice(product.unitPriceNumeric);
                  const discountPercent = getDiscountPercent(product.unitPriceNumeric);

                  return (
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
                          unoptimized={Boolean(product.image?.startsWith('http'))}
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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>
                              <IconStar size={13} color="#f59e0b" style={{ fill: '#f59e0b' }} />
                              <span>{product.rating}</span>
                              <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>({product.reviewsCount})</span>
                            </div>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: '#1d4ed8', fontWeight: 800 }}>
                              <IconVerifiedShield size={13} color="#1d4ed8" />
                              <span style={{ fontStyle: 'italic', fontWeight: 900 }}>Assured</span>
                            </span>
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

                        <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.85rem', flex: 1 }}>
                          {product.description}
                        </p>

                        {/* Standard Size Banner (L × H × B) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '7px 12px', borderRadius: '10px', marginBottom: '0.85rem' }}>
                          <span style={{ fontSize: '1rem' }}>📏</span>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Standard Size (L × H × B)</div>
                            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>{formatProductDimensions(product)}</div>
                          </div>
                        </div>

                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.82rem' }}>↓ {discountPercent}</span>
                                <span style={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '0.78rem' }}>{marketPrice}</span>
                              </div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000000' }}>
                                {product.price}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                              {product.leadTime}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#15803d', fontWeight: 600, marginBottom: '0.85rem' }}>
                            Workshop Direct • Zero Retail Markup
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
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <IconGear size={14} />
                              <span>Customize</span>
                            </Link>

                            <button
                              onClick={() =>
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  category: product.category,
                                  image: product.image,
                                  widthFeet: product.defaultDimensions?.lengthFeet ?? product.defaultDimensions?.widthFeet,
                                  lengthFeet: product.defaultDimensions?.lengthFeet ?? product.defaultDimensions?.widthFeet,
                                  heightFeet: product.defaultDimensions?.heightFeet,
                                  breadthFeet: product.defaultDimensions?.breadthFeet,
                                  dimensionsText: formatProductDimensions(product),
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
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <IconPlus size={14} />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: '#fafafa',
                  borderRadius: '24px',
                  border: '1px dashed #cbd5e1',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                }}
              >
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
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  {liveProducts.length === 0 ? 'Catalog Is Currently Empty' : 'No Fabrications Found Matching Criteria'}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '440px', margin: '0.5rem auto 1.5rem' }}>
                  {liveProducts.length === 0
                    ? 'All items have been cleared or our engineering team is updating inventory. You can submit custom blueprints or site fabrication requests directly.'
                    : 'Try resetting your category or steel material filters, or contact our engineering desk for custom blueprints.'}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {liveProducts.length > 0 && (
                    <button onClick={clearAllFilters} className="btn-primary" style={{ padding: '0.75rem 1.6rem' }}>
                      Clear All Filters
                    </button>
                  )}
                  <Link
                    href="/orders/create"
                    style={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      padding: '0.75rem 1.6rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                    }}
                  >
                    <span>Request Custom Fabrication</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sort Bottom Sheet Modal (Mobile) */}
      {isSortModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => setIsSortModalOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }} />
          <div className="animate-drawer-slide-up" style={{ position: 'relative', width: '100%', maxWidth: '500px', backgroundColor: '#ffffff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '1.25rem 1.5rem 2rem', zIndex: 10000, boxShadow: '0 -10px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', backgroundColor: '#cbd5e1', margin: '0 auto 1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>Sort Fabrications</span>
              <button onClick={() => setIsSortModalOpen(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'default', label: 'Featured (Recommended)' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' },
                { id: 'rating', label: 'Customer Rating: High to Low' },
              ].map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => { setSortBy(opt.id as any); setIsSortModalOpen(false); }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #000000' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#f8fafc' : '#ffffff',
                      fontWeight: isSelected ? 800 : 500,
                      color: isSelected ? '#000000' : '#334155',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <IconCheck size={16} color="#000000" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filter Drawer / Off-Canvas Panel (Responsive: Left Slide-Over on Desktop, Bottom Sheet on Mobile) */}
      {isMobileFilterOpen && (
        <div className="filter-drawer-wrapper">
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

          {/* Drawer Container (Side drawer on desktop, bottom sheet on mobile) */}
          <div className="filter-drawer-container">
            {/* Sheet Handle & Header */}
            <div
              style={{
                padding: '16px 20px 14px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                className="mobile-only-handle"
                style={{
                  width: '36px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: '#cbd5e1',
                  margin: '0 auto 4px auto',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <IconMenu size={20} color="#0f172a" />
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

