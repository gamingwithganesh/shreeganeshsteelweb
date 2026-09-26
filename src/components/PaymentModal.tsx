'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart, StoredOrder } from '@/context/CartContext';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import { ThreeDShield, ThreeDBolt, ThreeDSuccess, ThreeDPhone } from '@/components/ThreeDIcons';
import { compressImageToTargetRange } from '@/utils/imageCompressor';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlacedSuccess?: (order: StoredOrder) => void;
}

export default function PaymentModal({ isOpen, onClose, onOrderPlacedSuccess }: PaymentModalProps) {
  const { cart, subtotal, coatingCharge, deliveryCharge, installationCharge, grandTotal, projectSiteInfo, placeOrder } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank_transfer' | 'card' | 'advance_token'>('upi');
  const [paymentOption, setPaymentOption] = useState<'advance_20' | 'full'>('advance_20');
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Screenshot & Verification states
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState('');
  const [screenshotSizeKb, setScreenshotSizeKb] = useState<number | null>(null);
  const [isCompressingScreenshot, setIsCompressingScreenshot] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [toastError, setToastError] = useState('');

  // Card input states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing & Success State
  const [processing, setProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<StoredOrder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const upiId = '9423032182@sbi';
  const advanceAmount = Math.round(grandTotal * 0.2);
  const payableAmount = paymentOption === 'advance_20' ? advanceAmount : grandTotal;
  const balanceAmount = paymentOption === 'advance_20' ? grandTotal - advanceAmount : 0;

  // Reset inputs when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCompletedOrder(null);
      setPaymentScreenshot(null);
      setScreenshotName('');
      setScreenshotSizeKb(null);
      setIsCompressingScreenshot(false);
      setTransactionRef('');
      setProcessing(false);
    }
  }, [isOpen]);

  // Simple pure JS confetti launcher
  useEffect(() => {
    if (completedOrder && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 450;

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

      const colors = ['#2380b8', '#68bae2', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      for (let i = 0; i < 70; i++) {
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
  }, [completedOrder]);

  if (!isOpen) return null;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const handleCopyBank = () => {
    const bankDetails = `Account: Shree Ganesh Steel & Welding Workshop\nA/C No: 50200088912345\nIFSC: HDFC0001248\nBranch: Ghatanji`;
    navigator.clipboard.writeText(bankDetails);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScreenshotName(file.name);
    setIsCompressingScreenshot(true);

    try {
      const result = await compressImageToTargetRange(file, 100, 200);
      setPaymentScreenshot(result.dataUrl);
      setScreenshotSizeKb(result.sizeKb);
    } catch (err) {
      console.error('Failed to compress payment screenshot', err);
    } finally {
      setIsCompressingScreenshot(false);
    }
  };

  const handleConfirmPayment = () => {
    // Block if payment proof is required but not uploaded
    if ((paymentMethod === 'upi' || paymentMethod === 'bank_transfer') && !paymentScreenshot) {
      setToastError('Please upload your payment screenshot/proof before confirming the order.');
      setTimeout(() => setToastError(''), 4000);
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        status: 'confirmed',
        items: cart,
        subtotal,
        coatingCharge,
        deliveryCharge,
        installationCharge,
        grandTotal,
        advancePaid: payableAmount,
        balanceDue: balanceAmount,
        paymentMethod,
        siteInfo: projectSiteInfo,
        paymentScreenshot: paymentScreenshot || undefined,
        transactionRef: transactionRef.trim() || undefined,
      });

      setProcessing(false);
      setCompletedOrder(order);
      if (onOrderPlacedSuccess) onOrderPlacedSuccess(order);
    }, 1200);
  };

  return (
    <>
      <div
        style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 15, 28, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
          border: '1px solid #e2e8f0',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
          }}
          aria-label="Close payment modal"
        >
          ✕
        </button>

        {completedOrder ? (
          /* Order Confirmation View */
          <div style={{ textAlign: 'center', position: 'relative', padding: '1rem 0' }}>
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ThreeDSuccess size={72} />
            </div>

            <div className="badge-ice" style={{ marginBottom: '0.75rem', padding: '0.35rem 1rem' }}>
              Order Confirmed &amp; Queued for Fabrication
            </div>

            <h3 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
              Fabrication Booking Successful!
            </h3>

            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '480px', margin: '0.5rem auto 1.5rem' }}>
              Thank you! Your order has been assigned to our master workshop fabrication queue at Ghatanji.
            </p>

            {/* Receipt Summary Box */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '1.25rem',
                marginBottom: '2rem',
                fontSize: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Fabrication Order ID:</span>
                <span style={{ fontWeight: 800, color: '#000000' }}>#{completedOrder.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Project Site:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>
                  {completedOrder.siteInfo.city} ({completedOrder.siteInfo.clientName})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Project Value:</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>₹{completedOrder.grandTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', paddingTop: '0.5rem' }}>
                <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.875rem' }}>Advance Paid:</span>
                <span style={{ fontWeight: 800, color: '#16a34a' }}>₹{completedOrder.advancePaid.toLocaleString()}</span>
              </div>
              {completedOrder.balanceDue > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Balance on Site Inspection:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{completedOrder.balanceDue.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Official Handover Receipt Notice */}
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '14px',
                padding: '12px 16px',
                marginBottom: '1.75rem',
                fontSize: '0.825rem',
                color: '#166534',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                  <path d="M8 7h8" />
                  <path d="M8 11h8" />
                  <path d="M8 15h5" />
                </svg>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.875rem', marginBottom: '2px' }}>
                  Official Workshop Receipt Ready!
                </strong>
                <span>
                  You can print or download this bill now. Show this receipt or Order #{completedOrder.orderId} when visiting our Ghatanji workshop or upon site delivery. No login required.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(true)}
                style={{
                  padding: '0.85rem 1.6rem',
                  fontWeight: 700,
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                <span>Print / Download Receipt (PDF)</span>
              </button>

              <Link
                href={`/track-order?id=${completedOrder.orderId}`}
                onClick={onClose}
                style={{
                  padding: '0.85rem 1.6rem',
                  fontWeight: 700,
                  backgroundColor: '#f1f5f9',
                  color: '#0f172a',
                  borderRadius: '9999px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Track Live Progress →
              </Link>

              <a
                href={`https://wa.me/919423032182?text=${encodeURIComponent(
                  `Hello Shree Ganesh Welding Works, I placed order #${completedOrder.orderId} for project in ${completedOrder.siteInfo.city}. Please confirm fabrication schedule.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.85rem 1.4rem',
                  fontWeight: 700,
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        ) : (
          /* Payment Selection Form */
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="badge-ice" style={{ marginBottom: '0.5rem' }}>
                Secure Workshop Checkout
              </div>
              <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
                Select Payment &amp; Advance Option
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Fabrication begins immediately upon blueprint verification and advance token.
              </p>
            </div>

            {/* Advance vs Full Payment Toggle */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              <button
                type="button"
                onClick={() => setPaymentOption('advance_20')}
                style={{
                  padding: '1rem',
                  borderRadius: '16px',
                  border: paymentOption === 'advance_20' ? '2px solid #000000' : '1px solid #e2e8f0',
                  backgroundColor: paymentOption === 'advance_20' ? '#f8fafc' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>20% Advance Token</span>
                  <span style={{ fontSize: '0.72rem', backgroundColor: '#000000', color: '#ffffff', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                    Recommended
                  </span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000000', marginTop: '4px' }}>
                  ₹{advanceAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                  Remaining ₹{balanceAmount.toLocaleString()} upon on-site delivery
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('full')}
                style={{
                  padding: '1rem',
                  borderRadius: '16px',
                  border: paymentOption === 'full' ? '2px solid #000000' : '1px solid #e2e8f0',
                  backgroundColor: paymentOption === 'full' ? '#f8fafc' : '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>100% Full Payment</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000000', marginTop: '4px' }}>
                  ₹{grandTotal.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                  Instant bill &amp; receipt generated • Priority scheduling
                </div>
              </button>
            </div>

            {/* Payment Method Selector Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'upi', label: 'UPI & QR Code' },
                { id: 'bank_transfer', label: 'Bank Transfer (NEFT)' },
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'advance_token', label: 'Cash at Site' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPaymentMethod(tab.id as any)}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: paymentMethod === tab.id ? '#000000' : 'transparent',
                    color: paymentMethod === tab.id ? '#ffffff' : '#64748b',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Method Content */}
            {paymentMethod === 'upi' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '1.25rem',
                    backgroundColor: '#ffffff',
                    border: '3px solid #000000',
                    borderRadius: '20px',
                    marginBottom: '1rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* Real UPI QR Code */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ganesh_upi_qr.png"
                    alt="Scan to Pay – Shree Ganesh Steel & Welding Workshop UPI"
                    style={{ width: '320px', height: '320px', objectFit: 'contain', display: 'block', imageRendering: 'crisp-edges' }}
                  />
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginTop: '10px', textAlign: 'center' }}>📷 Scan with GPay / PhonePe / Paytm / Any UPI App</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>UPI ID: {upiId}</span>
                  <button
                    onClick={handleCopyUPI}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#0f172a',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedUPI ? '✓ Copied' : 'Copy ID'}
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a' }}>Workshop Commercial Current Account</span>
                  <button
                    onClick={handleCopyBank}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '6px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedBank ? '✓ Copied Details' : 'Copy Bank Details'}
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Account Name:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Shree Ganesh Steel &amp; Welding Workshop</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Account Number:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>50200088912345</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>IFSC Code:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>HDFC0001248</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Branch:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>Ghatanji, Dist. Yavatmal</div>
                  </div>
                </div>
              </div>
            )}

            {(paymentMethod === 'upi' || paymentMethod === 'bank_transfer') && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px dashed #cbd5e1',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
                      Upload Payment Proof / Transfer Screenshot
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '2px 7px', borderRadius: '5px', border: '1px solid #fecaca' }}>Required</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>
                    For Quick Admin Verification
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem', lineHeight: 1.4 }}>
                  After transferring via Google Pay, PhonePe, Paytm, or Net Banking, upload the screenshot or receipt slip here so our workshop team can verify and stamp your fabrication order immediately.
                </p>

                {/* Upload Zone */}
                {!paymentScreenshot ? (
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.25rem',
                      border: '1.5px dashed #94a3b8',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      cursor: isCompressingScreenshot ? 'wait' : 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isCompressingScreenshot}
                      onChange={handleScreenshotUpload}
                      style={{ display: 'none' }}
                    />
                    <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>
                      {isCompressingScreenshot ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                      {isCompressingScreenshot
                        ? 'Optimizing to 100 KB – 200 KB...'
                        : 'Click to Browse & Upload Payment Screenshot'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                      PNG, JPG, JPEG • Automatically compressed to 100 KB – 200 KB
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
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      <img
                        src={paymentScreenshot}
                        alt="Payment Proof Preview"
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #86efac', flexShrink: 0 }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>✓ Screenshot Uploaded</span>
                          {screenshotSizeKb && (
                            <span style={{ fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }}>
                              {screenshotSizeKb} KB
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#15803d', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {screenshotName || 'payment_proof.jpg'}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#16a34a', marginTop: '1px' }}>
                          Target reached: 100 KB – 200 KB compressed
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentScreenshot(null);
                        setScreenshotName('');
                        setScreenshotSizeKb(null);
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

                {/* UTR / Reference ID Field */}
                <div style={{ marginTop: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    UPI Reference / UTR / Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 423819284920 or HDFC00918"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      fontFamily: 'monospace',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8921"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Ganesh Rathod"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'advance_token' && (
              <div
                style={{
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ fontWeight: 800, color: '#92400e', fontSize: '0.95rem' }}>
                  Cash On Site Measurement / Direct Workshop Visit
                </div>
                <p style={{ color: '#b45309', fontSize: '0.825rem', lineHeight: 1.5, marginTop: '4px' }}>
                  Book your fabrication order now. Our site engineer will visit your project site in {projectSiteInfo.city || 'Vidarbha'} to take final laser dimensions, collect the advance token in cash, and issue an official physical receipt.
                </p>
              </div>
            )}

            {/* Toast Error */}
            {toastError && (
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1rem',
                  color: '#dc2626',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {toastError}
              </div>
            )}

            {/* Total summary & Action */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.25rem',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Amount Payable Now:</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000000' }}>
                  ₹{payableAmount.toLocaleString()}
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={processing}
                className="btn-primary"
                style={{ padding: '0.9rem 2.2rem', fontSize: '1rem', fontWeight: 800 }}
              >
                {processing ? 'Confirming with Workshop...' : `Confirm & Place Order (₹${payableAmount.toLocaleString()})`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Official Receipt / Bill View Modal */}
    {isInvoiceModalOpen && completedOrder && (
      <OrderDetailsModal
        order={completedOrder}
        onClose={() => setIsInvoiceModalOpen(false)}
      />
    )}
    </>
  );
}
