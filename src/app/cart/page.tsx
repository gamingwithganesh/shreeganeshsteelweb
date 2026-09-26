'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart, VIDARBHA_CITIES, StoredOrder } from '@/context/CartContext';
import PaymentModal from '@/components/PaymentModal';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import { ThreeDSuccess } from '@/components/ThreeDIcons';
import { IconPrinter, IconTruck, IconChat, IconUpload, IconRuler } from '@/components/Icons';
import { compressImageToTargetRange } from '@/utils/imageCompressor';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    coatingCharge,
    deliveryCharge,
    installationCharge,
    grandTotal,
    selectedCity,
    setSelectedCityByName,
    projectSiteInfo,
    setProjectSiteInfo,
    currentUser,
    setIsAuthModalOpen,
  } = useCart();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<StoredOrder | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isCompressingDesign, setIsCompressingDesign] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDesignUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressingDesign(true);
    try {
      const result = await compressImageToTargetRange(file, 100, 200);
      setProjectSiteInfo((prev) => ({
        ...prev,
        customDesignImage: result.dataUrl,
        customDesignFileName: result.fileName,
        customDesignSizeKb: result.sizeKb,
      }));
    } catch (err) {
      console.error('Failed to compress design image', err);
    } finally {
      setIsCompressingDesign(false);
    }
  };

  // Auto-fill site details when logged in user is available
  useEffect(() => {
    if (currentUser) {
      setProjectSiteInfo((prev) => ({
        ...prev,
        clientName: prev.clientName || currentUser.name || '',
        phone: prev.phone || currentUser.phone || '',
        siteAddress: prev.siteAddress || currentUser.address || '',
        city: prev.city || currentUser.city || 'Ghatanji',
      }));
    }
  }, [currentUser, setProjectSiteInfo]);

  // Load recently placed order from sessionStorage on page load if cart is empty
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('sgwwsp_last_placed_order');
      if (saved && cart.length === 0) {
        setPlacedOrder(JSON.parse(saved));
      }
    } catch (e) {}
  }, [cart.length]);

  // Pure JS Confetti animation when an order is placed
  useEffect(() => {
    if (placedOrder && confettiCanvasRef.current) {
      const canvas = confettiCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 420;

      const particles: Array<{
        x: number;
        y: number;
        r: number;
        d: number;
        color: string;
        tilt: number;
        tiltAngleIncremental: number;
        tiltAngle: number;
      }> = [];

      const colors = ['#000000', '#16a34a', '#2563eb', '#f59e0b', '#8b5cf6', '#ec4899'];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 6 + 4,
          d: Math.random() * 40 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.floor(Math.random() * 10) - 10,
          tiltAngleIncremental: Math.random() * 0.07 + 0.05,
          tiltAngle: 0,
        });
      }

      let animationFrameId: number;
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.tiltAngle += p.tiltAngleIncremental;
          p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
          p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

          ctx.beginPath();
          ctx.lineWidth = p.r / 2;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
          ctx.stroke();

          if (p.y > canvas.height) {
            p.x = Math.random() * canvas.width;
            p.y = -20;
          }
        }
        animationFrameId = requestAnimationFrame(render);
      };

      render();
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [placedOrder]);

  const handleSiteInfoChange = (field: string, value: any) => {
    setProjectSiteInfo((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!projectSiteInfo.clientName.trim()) {
      errors.clientName = 'Please enter your name.';
    }
    if (!projectSiteInfo.siteAddress.trim()) {
      errors.siteAddress = 'Please enter delivery address.';
    }
    if (!projectSiteInfo.phone.trim() || projectSiteInfo.phone.trim().length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsPaymentModalOpen(true);
  };

  // Full Order Confirmation View with Celebration Animation and Printable Bill/Receipt
  if (placedOrder && cart.length === 0) {
    return (
      <div style={{ padding: '2.5rem 0 5rem', backgroundColor: '#fafafa', minHeight: '90vh', position: 'relative' }}>
        <canvas
          ref={confettiCanvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '420px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div className="container-custom" style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
          {/* Header Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ThreeDSuccess size={76} />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #e5e7eb',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '1rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
              Order Confirmed &amp; Queued for Fabrication
            </div>

            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#000000', margin: '0 0 0.5rem' }}>
              Fabrication Booking Successful!
            </h1>

            <p style={{ color: '#4b5563', fontSize: '0.925rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
              Thank you, <strong>{placedOrder.siteInfo.clientName}</strong>! Your fabrication order has been recorded and scheduled at our Ghatanji workshop.
            </p>

            {/* Official Receipt Ready Alert Box */}
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '14px',
                padding: '1rem 1.25rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: '#166534', fontSize: '0.9rem', marginBottom: '2px' }}>
                  Official Copy of Bill / Handover Receipt Ready
                </div>
                <div style={{ color: '#15803d', fontSize: '0.825rem', lineHeight: 1.4 }}>
                  No login required. Click <strong>&quot;Print / Download Bill (PDF)&quot;</strong> below to save your official bill copy. Show this receipt or Order ID <strong>#{placedOrder.orderId}</strong> when visiting our workshop or upon site delivery.
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(true)}
                style={{
                  padding: '0.85rem 1.75rem',
                  fontWeight: 700,
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.925rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <IconPrinter size={16} />
                <span>Print / Download Bill (PDF)</span>
              </button>

              <Link
                href={`/track-order?id=${placedOrder.orderId}`}
                style={{
                  padding: '0.85rem 1.75rem',
                  fontWeight: 700,
                  backgroundColor: '#f3f4f6',
                  color: '#111827',
                  borderRadius: '9999px',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.925rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <IconTruck size={16} />
                <span>Track Live Status</span>
              </Link>

              <a
                href={`https://wa.me/919423032182?text=${encodeURIComponent(
                  `Hello Shree Ganesh Steel, I placed Order #${placedOrder.orderId} for ${placedOrder.siteInfo.city}. Please confirm my fabrication schedule.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontWeight: 700,
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.925rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <IconChat size={16} />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Order Meta Pills */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #f3f4f6',
                fontSize: '0.85rem',
                color: '#374151',
              }}
            >
              <span>Order Reference:</span>
              <strong style={{ color: '#000000', letterSpacing: '0.5px' }}>#{placedOrder.orderId}</strong>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(placedOrder.orderId);
                  setCopiedOrderId(true);
                  setTimeout(() => setCopiedOrderId(false), 2000);
                }}
                style={{
                  marginLeft: '6px',
                  padding: '2px 8px',
                  fontSize: '0.725rem',
                  borderRadius: '4px',
                  backgroundColor: '#e5e7eb',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {copiedOrderId ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Order Details & Summary Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000000', marginBottom: '1.25rem' }}>
              Project Summary &amp; Bill Breakdown
            </h3>

            {/* Site & Client Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                fontSize: '0.85rem',
              }}
            >
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Client Name</span>
                <strong style={{ color: '#111827' }}>{placedOrder.siteInfo.clientName}</strong>
              </div>
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</span>
                <strong style={{ color: '#111827' }}>{placedOrder.siteInfo.phone}</strong>
              </div>
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Site City</span>
                <strong style={{ color: '#111827' }}>{placedOrder.siteInfo.city}</strong>
              </div>
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Address</span>
                <span style={{ color: '#111827' }}>{placedOrder.siteInfo.siteAddress}</span>
              </div>
            </div>

            {/* Custom Design Blueprint Attachment Preview */}
            {(placedOrder.siteInfo.customDesignImage || placedOrder.customDesignImage) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0',
                  backgroundColor: '#f0fdf4',
                  marginBottom: '1.5rem',
                }}
              >
                <img
                  src={placedOrder.siteInfo.customDesignImage || placedOrder.customDesignImage}
                  alt="Custom Design Blueprint"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #86efac',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconRuler size={14} color="#166534" />
                    <span>Custom Design Attached (100KB – 200KB Optimized)</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#15803d', marginTop: '2px' }}>
                    File: {placedOrder.siteInfo.customDesignFileName || placedOrder.customDesignFileName || 'custom_design.jpg'}
                    {placedOrder.siteInfo.customDesignSizeKb ? ` (${placedOrder.siteInfo.customDesignSizeKb} KB)` : ''}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: '2px' }}>
                    ✓ Queued for master workshop cutting &amp; fabrication
                  </div>
                </div>
              </div>
            )}

            {/* Ordered Items Table */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
                Fabrication Items ({placedOrder.items.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {placedOrder.items.map((item, idx) => {
                  const unitPrice = item.unitPriceNumeric || parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
                  const itemTotal = item.calculatedTotalPrice || (unitPrice * (item.quantity || 1));
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #f3f4f6',
                        backgroundColor: '#fafafa',
                        fontSize: '0.875rem',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: '#000000' }}>
                          {item.name} <span style={{ color: '#6b7280', fontWeight: 500 }}>(Qty: {item.quantity || 1})</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>
                          {item.widthFeet && item.heightFeet
                            ? `${item.widthFeet} ft × ${item.heightFeet} ft (${item.calculatedSqFt || item.widthFeet * item.heightFeet} sq.ft)`
                            : 'Standard Workshop Sizing'}
                          {item.selectedGauge && ` • ${item.selectedGauge}`}
                          {item.selectedFinish && ` • ${item.selectedFinish}`}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#111827' }}>
                        ₹{itemTotal.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financials & Balance */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}>
                <span>Total Project Value:</span>
                <span style={{ fontWeight: 700, color: '#000000' }}>₹{placedOrder.grandTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Advance Paid ({placedOrder.advancePaid === placedOrder.grandTotal ? 'Full 100%' : '20% Advance'}):</span>
                <span style={{ fontWeight: 800 }}>₹{placedOrder.advancePaid.toLocaleString()}</span>
              </div>
              {placedOrder.balanceDue > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#000000', fontWeight: 700 }}>
                  <span>Balance Payable on Site Delivery:</span>
                  <span>₹{placedOrder.balanceDue.toLocaleString()}</span>
                </div>
              )}
              {placedOrder.transactionRef && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  <span>Payment Reference / UTR:</span>
                  <span style={{ fontFamily: 'monospace' }}>{placedOrder.transactionRef}</span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem' }}>
              <Link
                href="/shop"
                style={{
                  color: '#6b7280',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                ← Continue Browsing Workshop Catalog
              </Link>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(true)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <IconPrinter size={15} />
                <span>View Full Bill / Receipt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Modal for Printing / Downloading */}
        {isInvoiceModalOpen && (
          <OrderDetailsModal
            order={placedOrder}
            onClose={() => setIsInvoiceModalOpen(false)}
          />
        )}
      </div>
    );
  }

  // Empty state (only when no active modal and no order placed)
  if (cart.length === 0 && !isPaymentModalOpen) {
    return (
      <div style={{ padding: '6rem 0', backgroundColor: '#ffffff', minHeight: '80vh', textAlign: 'center' }}>
        <div className="container-custom" style={{ maxWidth: '440px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: '#6b7280',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000000', marginBottom: '0.5rem' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>
            Browse our catalog to select products with custom dimensions.
          </p>
          <Link
            href="/shop"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Browse Catalog →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0 5rem', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <div className="container-custom" style={{ maxWidth: '1100px' }}>
        {/* Minimal Breadcrumbs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: '#6b7280', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/shop" style={{ color: '#6b7280', textDecoration: 'none' }}>Catalog</Link>
          <span>/</span>
          <span style={{ color: '#000000', fontWeight: 600 }}>Cart</span>
        </nav>

        {/* Clean Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#000000', margin: 0, letterSpacing: '-0.02em' }}>
            Cart
          </h1>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Left Column: Cart Items & Delivery Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Cart Items Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontWeight: 700, color: '#000000', fontSize: '0.95rem' }}>
                  Items ({cart.length})
                </span>
                <button
                  onClick={clearCart}
                  style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                >
                  Clear all
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {cart.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '1rem 0',
                      borderBottom: idx < cart.length - 1 ? '1px solid #f3f4f6' : 'none',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                        flexShrink: 0,
                        backgroundColor: '#f3f4f6',
                      }}
                    >
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                        <div style={{ fontWeight: 700, color: '#000000', fontSize: '0.925rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </div>
                        <div style={{ fontWeight: 700, color: '#000000', fontSize: '0.925rem', whiteSpace: 'nowrap' }}>
                          ₹{(item.calculatedTotalPrice || parseInt(item.price.replace(/[^0-9]/g, '')) || 0).toLocaleString()}
                        </div>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '2px', marginBottom: '8px' }}>
                        {item.widthFeet && item.heightFeet ? `${item.widthFeet}ft × ${item.heightFeet}ft` : 'Standard'} • {item.selectedGauge || '14 Gauge'} • {item.selectedFinish || 'Anti-Rust Primer'}
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Sleek Minimal Stepper */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid #e5e7eb',
                            borderRadius: '9999px',
                            backgroundColor: '#fafafa',
                            padding: '1px 3px',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: (item.quantity || 1) <= 1 ? '#cbd5e1' : '#000000',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              cursor: (item.quantity || 1) <= 1 ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                              transition: 'background-color 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              if ((item.quantity || 1) > 1) e.currentTarget.style.backgroundColor = '#e5e7eb';
                            }}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            title="Decrease quantity"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: '#000000',
                              minWidth: '24px',
                              textAlign: 'center',
                              userSelect: 'none',
                            }}
                          >
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: '#000000',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                              transition: 'background-color 0.15s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            title="Increase quantity"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Minimal Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#9ca3af',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            padding: '4px 6px',
                            lineHeight: 1,
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                          title="Remove item"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontWeight: 700, color: '#000000', fontSize: '0.95rem' }}>
                  Delivery Details
                </span>
                {currentUser ? (
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                    ✓ Logged in as {currentUser.name}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(true)}
                    style={{ background: 'none', border: 'none', color: '#000000', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Sign in to autofill
                  </button>
                )}
              </div>

              {/* Form Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={projectSiteInfo.clientName}
                    onChange={(e) => handleSiteInfoChange('clientName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: formErrors.clientName ? '1px solid #ef4444' : '1px solid #d1d5db',
                      outline: 'none',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box',
                    }}
                  />
                  {formErrors.clientName && (
                    <span style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '2px', display: 'block' }}>{formErrors.clientName}</span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={projectSiteInfo.phone}
                    onChange={(e) => handleSiteInfoChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: formErrors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      outline: 'none',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box',
                    }}
                  />
                  {formErrors.phone && (
                    <span style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '2px', display: 'block' }}>{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Delivery Address *
                </label>
                <input
                  type="text"
                  placeholder="Street, society or landmark"
                  value={projectSiteInfo.siteAddress}
                  onChange={(e) => handleSiteInfoChange('siteAddress', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    border: formErrors.siteAddress ? '1px solid #ef4444' : '1px solid #d1d5db',
                    outline: 'none',
                    fontSize: '0.85rem',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                  }}
                />
                {formErrors.siteAddress && (
                  <span style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '2px', display: 'block' }}>{formErrors.siteAddress}</span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.15rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    City / District
                  </label>
                  <select
                    value={selectedCity.name}
                    onChange={(e) => setSelectedCityByName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      outline: 'none',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box',
                    }}
                  >
                    {VIDARBHA_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Alternate Contact (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Supervisor or contractor"
                    value={projectSiteInfo.siteIncharge}
                    onChange={(e) => handleSiteInfoChange('siteIncharge', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      outline: 'none',
                      fontSize: '0.85rem',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Delivery & Fitting Options */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#1f2937' }}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={projectSiteInfo.deliveryMethod === 'workshop_dispatch'}
                    onChange={() => handleSiteInfoChange('deliveryMethod', 'workshop_dispatch')}
                    style={{ accentColor: '#000000' }}
                  />
                  <span>Workshop Delivery to Site ({selectedCity.name}) — <span style={{ color: '#6b7280', fontStyle: 'italic' }}>Charge depends on location</span></span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#1f2937' }}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={projectSiteInfo.deliveryMethod === 'factory_pickup'}
                    onChange={() => handleSiteInfoChange('deliveryMethod', 'factory_pickup')}
                    style={{ accentColor: '#000000' }}
                  />
                  <span>Self Pickup from Workshop (Free)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#1f2937', marginTop: '2px' }}>
                  <input
                    type="checkbox"
                    checked={projectSiteInfo.includeAntiRustPrimer !== false}
                    onChange={(e) => handleSiteInfoChange('includeAntiRustPrimer', e.target.checked)}
                    style={{ accentColor: '#000000', width: '15px', height: '15px' }}
                  />
                  <span>Include Dual-Coat Anti-Rust Primer (+6%)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#1f2937', marginTop: '2px' }}>
                  <input
                    type="checkbox"
                    checked={projectSiteInfo.includeInstallation}
                    onChange={(e) => handleSiteInfoChange('includeInstallation', e.target.checked)}
                    style={{ accentColor: '#000000', width: '15px', height: '15px' }}
                  />
                  <span>Include On-Site Installation</span>
                </label>
              </div>

              {/* Custom Design / Blueprint Upload Section */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#000000', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconRuler size={14} color="#000000" />
                    <span>Upload Custom Design / Blueprint / Sketch (Optional)</span>
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    100 KB – 200 KB Auto-Optimized
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0 0 0.85rem 0', lineHeight: 1.4 }}>
                  Have an architectural drawing, sketch, or photo of your site? Upload it here. Our workshop will fabricate to your exact specifications.
                </p>

                {!projectSiteInfo.customDesignImage ? (
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.25rem',
                      border: '1.5px dashed #cbd5e1',
                      borderRadius: '12px',
                      backgroundColor: '#fafafa',
                      cursor: isCompressingDesign ? 'wait' : 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#000000')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isCompressingDesign}
                      onChange={handleDesignUpload}
                      style={{ display: 'none' }}
                    />
                    <div style={{ marginBottom: '6px', color: '#0f172a' }}>
                      {isCompressingDesign ? (
                        <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                      ) : (
                        <IconUpload size={24} color="#0f172a" />
                      )}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#000000' }}>
                      {isCompressingDesign ? 'Optimizing image to 100 KB – 200 KB...' : 'Click to Upload Custom Design or Photo'}
                    </span>
                    <span style={{ fontSize: '0.725rem', color: '#6b7280', marginTop: '2px' }}>
                      PNG, JPG, JPEG, WEBP • Automatically compressed into 100 KB – 200 KB
                    </span>
                  </label>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      backgroundColor: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      <img
                        src={projectSiteInfo.customDesignImage}
                        alt="Custom Design Preview"
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #86efac', flexShrink: 0 }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>✓ Custom Design Attached</span>
                          {projectSiteInfo.customDesignSizeKb && (
                            <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }}>
                              {projectSiteInfo.customDesignSizeKb} KB
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#15803d', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {projectSiteInfo.customDesignFileName || 'custom_design.jpg'}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#16a34a', marginTop: '1px' }}>
                          Target reached: 100 KB – 200 KB compressed
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleSiteInfoChange('customDesignImage', undefined);
                        handleSiteInfoChange('customDesignFileName', undefined);
                        handleSiteInfoChange('customDesignSizeKb', undefined);
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #fca5a5',
                        background: '#fef2f2',
                        color: '#b91c1c',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        flexShrink: 0,
                        marginLeft: '12px',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                padding: '1.5rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
              }}
            >
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#000000', margin: '0 0 1.25rem' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>₹{subtotal.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                  <span>Anti-Rust Primer</span>
                  <span style={{ fontWeight: 600, color: projectSiteInfo.includeAntiRustPrimer !== false ? '#111827' : '#9ca3af' }}>
                    {projectSiteInfo.includeAntiRustPrimer !== false ? `₹${coatingCharge.toLocaleString()}` : 'Excluded (₹0)'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                  <span>Delivery ({selectedCity.name})</span>
                  <span style={{ fontWeight: 600, color: projectSiteInfo.deliveryMethod === 'factory_pickup' ? '#16a34a' : '#374151', fontStyle: projectSiteInfo.deliveryMethod === 'factory_pickup' ? 'normal' : 'italic' }}>
                    {projectSiteInfo.deliveryMethod === 'factory_pickup' ? 'Free (Self Pickup)' : 'Depends on Location'}
                  </span>
                </div>

                {projectSiteInfo.includeInstallation && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                    <span>Installation</span>
                    <span style={{ fontWeight: 600, color: '#111827' }}>₹{installationCharge.toLocaleString()}</span>
                  </div>
                )}

                <div
                  style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '0.75rem',
                    marginTop: '0.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#000000',
                  }}
                >
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>

                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.78rem',
                    color: '#374151',
                    textAlign: 'center',
                    fontWeight: 600,
                  }}
                >
                  20% advance to book: <strong>₹{Math.round(grandTotal * 0.2).toLocaleString()}</strong>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToPayment}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '9999px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.925rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Proceed to Checkout →
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.85rem', fontSize: '0.72rem', color: '#9ca3af' }}>
                Official Workshop Bill • 5-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Advance Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onOrderPlacedSuccess={(order) => {
          setPlacedOrder(order);
          try {
            sessionStorage.setItem('sgwwsp_last_placed_order', JSON.stringify(order));
          } catch (e) {}
        }}
      />
    </div>
  );
}
