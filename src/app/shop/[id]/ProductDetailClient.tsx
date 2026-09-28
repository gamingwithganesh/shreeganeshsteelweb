'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItem, formatProductDimensions } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLiveProducts } from '@/hooks/useLiveProducts';
import MeasurementGuideModal from '@/components/MeasurementGuideModal';
import { ThreeDClock, ThreeDShield, ThreeDTruck, ThreeDStar, ThreeDRuler, ThreeDFactory, ThreeDPhone } from '@/components/ThreeDIcons';
import { ModernLocationPin, IconRuler, IconUpload } from '@/components/Icons';
import { compressImageToTargetRange } from '@/utils/imageCompressor';

export default function ProductDetailClient({
  product: initialProduct,
  productId,
}: {
  product?: ProductItem;
  productId?: string;
}) {
  const { products: liveProducts, isLoaded } = useLiveProducts();
  const product = initialProduct || liveProducts.find((p) => p.id === productId);

  if (!product) {
    if (!isLoaded) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#71717a', fontSize: '0.9rem' }}>Loading product details...</p>
        </div>
      );
    }
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#09090b' }}>Product Not Found</h2>
        <p style={{ color: '#71717a', maxWidth: '420px', fontSize: '0.875rem' }}>
          The requested custom fabrication product is unavailable or may have been modified by workshop administration.
        </p>
        <Link href="/shop" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#09090b', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' }}>
          Return to Fabrication Catalog
        </Link>
      </div>
    );
  }

  return <ProductDetailView product={product} />;
}

function ProductDetailView({ product }: { product: ProductItem }) {
  const { addToCart, selectedCity, setIsLocationModalOpen } = useCart();

  // Gallery state
  const gallery = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.image];
  const [activeImage, setActiveImage] = useState<string>(gallery[0]);

  // Helper to safely parse any dimensional input (e.g. "2", "2.5", "2.5f", "2.5ft")
  const parseDim = (val: string | number, fallback: number): number => {
    if (typeof val === 'number') return isNaN(val) || val <= 0 ? fallback : val;
    const match = val.toString().trim().replace(',', '.').match(/[-+]?[0-9]*\.?[0-9]+/);
    if (!match) return fallback;
    const num = parseFloat(match[0]);
    return isNaN(num) || num <= 0 ? fallback : num;
  };

  // Sizing & Customization states
  const defaultL = product.defaultDimensions?.lengthFeet ?? product.defaultDimensions?.widthFeet ?? 10;
  const defaultH = product.defaultDimensions?.heightFeet ?? 6;
  const defaultB = product.defaultDimensions?.breadthFeet ?? (product.defaultDimensions?.depthInches ? +(product.defaultDimensions.depthInches / 12).toFixed(1) : undefined);

  const [lengthInput, setLengthInput] = useState<string>(String(defaultL));
  const [heightInput, setHeightInput] = useState<string>(String(defaultH));
  const [breadthInput, setBreadthInput] = useState<string>(defaultB !== undefined ? String(defaultB) : '');

  const lengthFeet = parseDim(lengthInput, defaultL);
  const heightFeet = parseDim(heightInput, defaultH);
  const breadthFeet = breadthInput.trim() ? parseDim(breadthInput, defaultB || 0) : undefined;

  const [selectedGauge, setSelectedGauge] = useState<string>(
    product.availableGauges?.[0] || '14 Gauge (2.0 mm)'
  );
  const [selectedFinish, setSelectedFinish] = useState<string>(
    product.availableFinishes?.[0] || 'Anti-Rust Primer'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [customDesignImage, setCustomDesignImage] = useState<string | null>(null);
  const [customDesignFileName, setCustomDesignFileName] = useState<string>('');
  const [customDesignSizeKb, setCustomDesignSizeKb] = useState<number | null>(null);
  const [isCompressingDesign, setIsCompressingDesign] = useState<boolean>(false);

  // Dynamic price calculation
  const totalSqFt = Number((lengthFeet * heightFeet).toFixed(2));
  let dynamicUnitPrice = product.unitPriceNumeric;

  if (product.priceType === 'per_sqft') {
    dynamicUnitPrice = Math.round(product.unitPriceNumeric * totalSqFt);
  } else if (product.priceType === 'per_ft') {
    dynamicUnitPrice = Math.round(product.unitPriceNumeric * lengthFeet);
  } else {
    // For per_unit items, scale slightly if custom dimensions differ from default
    const defaultSqFt = defaultL * defaultH;
    if (totalSqFt !== defaultSqFt && defaultSqFt > 0) {
      const ratio = totalSqFt / defaultSqFt;
      dynamicUnitPrice = Math.round(product.unitPriceNumeric * ratio);
    }
  }

  // Gauge surcharge
  if (selectedGauge.includes('10 Gauge') || selectedGauge.includes('Heavy Structural')) {
    dynamicUnitPrice = Math.round(dynamicUnitPrice * 1.15);
  } else if (selectedGauge.includes('12 Gauge')) {
    dynamicUnitPrice = Math.round(dynamicUnitPrice * 1.08);
  }

  // Finish surcharge
  if (selectedFinish.includes('Powder Coat') || selectedFinish.includes('PVD Gold')) {
    dynamicUnitPrice += Math.round(dynamicUnitPrice * 0.08);
  }

  const calculatedTotalPrice = dynamicUnitPrice * quantity;

  const handleAddToCart = () => {
    const formattedDimStr = `${lengthFeet}ft (L) × ${heightFeet}ft (H)${breadthFeet ? ` × ${breadthFeet}ft (B)` : ''}`;
    addToCart({
      id: `${product.id}-${selectedGauge}-${selectedFinish}`,
      name: product.name,
      price: `₹${dynamicUnitPrice.toLocaleString()}`,
      category: product.category,
      image: product.image,
      widthFeet: lengthFeet,
      lengthFeet,
      heightFeet,
      breadthFeet,
      dimensionsText: formattedDimStr,
      calculatedSqFt: totalSqFt,
      selectedGauge,
      selectedFinish,
      quantity,
      unitPriceNumeric: dynamicUnitPrice,
      calculatedTotalPrice,
      customDesignImage: customDesignImage || undefined,
      customDesignFileName: customDesignFileName || undefined,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div style={{ padding: '2rem 0 5rem', backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Catalog</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* 2-Column Product Detail Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.75rem, 4vw, 3.5rem)',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
        >
          {/* Left Column: Multi-Image Thumbnail Gallery */}
          <div>
            {/* Main Viewport */}
            <div
              style={{
                position: 'relative',
                height: 'clamp(280px, 50vw, 440px)',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.08)',
                marginBottom: '1rem',
              }}
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                unoptimized={Boolean(activeImage?.startsWith('http'))}
                style={{ objectFit: 'cover' }}
              />

              {product.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#000000',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {product.badge}
                </span>
              )}

              <span
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#e2e8f0',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {product.materialGrade}
              </span>
            </div>

            {/* Thumbnail Navigation Strip */}
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: activeImage === img ? '2px solid #000000' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      flexShrink: 0,
                      backgroundColor: '#1e293b',
                      padding: 0,
                      boxShadow: activeImage === img ? '0 4px 12px rgba(0,0,0,0.25)' : 'none',
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      fill
                      unoptimized={Boolean(img?.startsWith('http'))}
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Delivery to Active Hub Card */}
            <div
              style={{
                marginTop: '1.5rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ThreeDTruck size={26} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>
                    Delivery to {selectedCity.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Flatbed dispatch: <strong>{selectedCity.transitDays}</strong> ({selectedCity.distanceKm} km from Ghatanji)
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsLocationModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#000000',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Change
              </button>
            </div>
          </div>

          {/* Right Column: Customizer, Dynamic Pricing, Specs */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span className="badge-ice">{product.category}</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>• {product.sector} Application</span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.25,
                marginBottom: '0.75rem',
              }}
            >
              {product.name}
            </h1>

            {/* Rating & Reviews summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontWeight: 800, fontSize: '0.95rem' }}>
                ★ {product.rating}
              </div>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>•</span>
              <span style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>
                {product.reviewsCount} Verified Projects in Vidarbha
              </span>
            </div>

            {/* Standard Size & Measurement Specs Display */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.1rem 1.25rem',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                  <ThreeDRuler size={18} />
                  <span>Standard Product Measurements (L × H × B)</span>
                </div>
                <span style={{ fontSize: '0.72rem', backgroundColor: '#000000', color: '#ffffff', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                  {formatProductDimensions(product)}
                </span>
              </div>

              {/* 3 Metric Pills: Length, Height, Breadth */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '0.6rem' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '6px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Length (L)</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>{defaultL} ft</div>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '6px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Height (H)</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>{defaultH} ft</div>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '6px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Breadth (B)</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>
                    {defaultB !== undefined && defaultB > 0 ? `${defaultB} ft` : 'Flat / Standard'}
                  </div>
                </div>
              </div>

              {product.dimensionsText && (
                <div style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4 }}>
                  📐 <strong>Spec Note:</strong> {product.dimensionsText}
                </div>
              )}
            </div>

            {/* Dynamic Calculated Price Box */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.75rem',
                boxShadow: '0 4px 16px -4px rgba(0, 0, 0, 0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Estimated Fabrication Total:</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#000000' }}>
                    ₹{calculatedTotalPrice.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 800, display: 'block' }}>
                    {product.inStockStandard ? 'Ready Size Available' : 'Made to Custom Blueprints'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Lead time: {product.leadTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Dimension Customizer */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.5rem',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                  <ThreeDRuler size={20} />
                  <span>Custom Dimension Calculator (L × H × B)</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#000000',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  View Measurement Guide →
                </button>
              </div>

              {/* 3-Column Inputs: Length (L), Height (H), Breadth (B) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Length (L) in Feet
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={lengthInput}
                    onChange={(e) => setLengthInput(e.target.value)}
                    placeholder="e.g. 2 or 2.5"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Height (H) in Feet
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={heightInput}
                    onChange={(e) => setHeightInput(e.target.value)}
                    placeholder="e.g. 2.5 or 6"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Breadth (B) in Feet
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={breadthInput}
                    onChange={(e) => setBreadthInput(e.target.value)}
                    placeholder={defaultB !== undefined && defaultB > 0 ? `e.g. ${defaultB}` : 'Optional (e.g. 2.5)'}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#334155', backgroundColor: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                <span>📏 <strong>Configured Size:</strong> {lengthFeet} ft (L) × {heightFeet} ft (H){breadthFeet ? ` × ${breadthFeet} ft (B)` : ''}</span>
                <span>Area: <strong>{totalSqFt} sq.ft</strong></span>
              </div>
            </div>

            {/* Steel Gauge Picker */}
            {product.availableGauges && product.availableGauges.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  Select Steel Gauge &amp; Thickness
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.availableGauges.map((gauge) => {
                    const isSelected = selectedGauge === gauge;
                    return (
                      <button
                        key={gauge}
                        type="button"
                        onClick={() => setSelectedGauge(gauge)}
                        style={{
                          padding: '0.55rem 1rem',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #000000' : '1px solid #e2e8f0',
                          backgroundColor: isSelected ? '#000000' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#334155',
                          fontWeight: isSelected ? 800 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        {gauge}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Surface Finish Picker */}
            {product.availableFinishes && product.availableFinishes.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  Anti-Rust Primer &amp; Surface Treatment
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.availableFinishes.map((finish) => {
                    const isSelected = selectedFinish === finish;
                    return (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        style={{
                          padding: '0.55rem 1rem',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #000000' : '1px solid #e2e8f0',
                          backgroundColor: isSelected ? '#000000' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#334155',
                          fontWeight: isSelected ? 800 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        {finish}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Design / Sketch Upload */}
            <div style={{ marginBottom: '1.75rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconRuler size={14} color="#0f172a" />
                  <span>Custom Design / Sketch (Optional)</span>
                </label>
                <span style={{ fontSize: '0.7rem', color: '#64748b', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  100 KB – 200 KB Auto-Optimized
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: '#64748b', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                Attach a drawing or photo for custom fabrication specs. Automatically compressed to 100KB – 200KB.
              </p>

              {!customDesignImage ? (
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '0.65rem 1rem',
                    border: '1.5px dashed #94a3b8',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    cursor: isCompressingDesign ? 'wait' : 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isCompressingDesign}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsCompressingDesign(true);
                      try {
                        const res = await compressImageToTargetRange(file, 100, 200);
                        setCustomDesignImage(res.dataUrl);
                        setCustomDesignFileName(res.fileName);
                        setCustomDesignSizeKb(res.sizeKb);
                      } catch (err) {
                        console.error('Failed to compress design', err);
                      } finally {
                        setIsCompressingDesign(false);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {isCompressingDesign ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        <span>Optimizing to 100KB–200KB...</span>
                      </>
                    ) : (
                      <>
                        <IconUpload size={14} />
                        <span>Upload Custom Sketch / Photo</span>
                      </>
                    )}
                  </span>
                </label>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <img
                      src={customDesignImage}
                      alt="Custom Design"
                      style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #86efac', flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#166534' }}>
                        ✓ Design Attached ({customDesignSizeKb} KB)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#15803d', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {customDesignFileName || 'custom_design.jpg'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomDesignImage(null);
                      setCustomDesignFileName('');
                      setCustomDesignSizeKb(null);
                    }}
                    style={{ background: 'none', border: 'none', color: '#b91c1c', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', marginLeft: '8px' }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Quantity Counter & Add to Cart */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '4px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '36px', height: '36px', border: 'none', background: '#f1f5f9', borderRadius: '8px', cursor: 'pointer', fontWeight: 800 }}
                >
                  -
                </button>
                <span style={{ width: '40px', textAlign: 'center', fontWeight: 800, fontSize: '0.95rem' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '36px', height: '36px', border: 'none', background: '#f1f5f9', borderRadius: '8px', cursor: 'pointer', fontWeight: 800 }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: '0.9rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                }}
              >
                {addedAnimation ? '✓ Added to Cart!' : `Add to Cart — ₹${calculatedTotalPrice.toLocaleString()}`}
              </button>
            </div>

            {/* Technical Blueprint Specifications Table */}
            {product.specs && product.specs.length > 0 && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem', marginBottom: '1rem' }}>
                  Engineering Blueprint Specifications
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        borderBottom: sIdx < product.specs.length - 1 ? '1px solid #f1f5f9' : 'none',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span style={{ color: '#64748b' }}>{spec.label}:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Vidarbha Customer Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  Verified Installations in Vidarbha ({product.reviews.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {product.reviews.map((rev, rIdx) => (
                    <div
                      key={rIdx}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        padding: '1.25rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <div>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>{rev.author}</span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '8px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <ModernLocationPin size={12} color="#64748b" />
                            <span>{rev.location}</span>
                          </span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{rev.date}</span>
                      </div>
                      <div style={{ color: '#f59e0b', fontSize: '0.75rem', marginBottom: '6px' }}>
                        {'★'.repeat(rev.rating)}
                      </div>
                      <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '6px' }}>
                        "{rev.comment}"
                      </p>
                      <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700 }}>
                        ✓ Verified Project: {rev.verifiedProject}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Measurement Guide Modal */}
      <MeasurementGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}

