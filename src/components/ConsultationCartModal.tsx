'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { IconCheck } from './Icons';
import { ThreeDClipboard, ThreeDSuccess, ThreeDCart } from './ThreeDIcons';

export default function ConsultationCartModal() {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, toastMessage } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: '',
  });

  if (!isCartOpen && !toastMessage) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      setSubmitted(false);
      setIsCartOpen(false);
      setFormData({ name: '', phone: '', notes: '' });
    }, 4000);
  };

  return (
    <>
      {/* Global floating toast notification (Clean Black & White Theme) */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '9px 18px',
            borderRadius: '9999px',
            boxShadow: '0 10px 28px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.16)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            zIndex: 99999,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <span
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            ✓
          </span>
          <span style={{ fontSize: '0.84rem', fontWeight: 600, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
            {toastMessage}
          </span>
        </div>
      )}

      {/* Slide-over Drawer Overlay */}
      {isCartOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setIsCartOpen(false)}
        >
          {/* Drawer content */}
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              height: '100%',
              backgroundColor: '#ffffff',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ThreeDClipboard size={26} />
                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                  Consultation &amp; Quote Cart ({cart.length})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: '6px',
                  borderRadius: '6px',
                }}
                aria-label="Close Cart"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <ThreeDSuccess size={60} />
                  </div>
                  <h4 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Quote Request Received!
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>
                    Our master workshop engineer will review your selected items and contact you within 2 business hours with estimated pricing.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '20px',
                        backgroundColor: '#f1f8fc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px -6px rgba(56, 158, 211, 0.2)',
                      }}
                    >
                      <ThreeDCart size={48} />
                    </div>
                  </div>
                  <h4 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Your Quote Cart is Empty
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Browse our workshop catalog and add items you would like estimated.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    Browse Catalog
                  </Link>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: '#f8fbfd',
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            width: '64px',
                            height: '64px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.72rem', color: '#2380b8', fontWeight: 600, textTransform: 'uppercase' }}>
                            {item.category}
                          </div>
                          <div style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.name}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                            <div style={{ fontSize: '0.825rem', color: '#000000', fontWeight: 700 }}>
                              ₹{(item.calculatedTotalPrice || parseInt(item.price.replace(/[^0-9]/g, '')) || 0).toLocaleString()}
                            </div>
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '1px solid #e2e8f0',
                                borderRadius: '9999px',
                                backgroundColor: '#ffffff',
                                padding: '1px 3px',
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                disabled={(item.quantity || 1) <= 1}
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  color: (item.quantity || 1) <= 1 ? '#cbd5e1' : '#000000',
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  cursor: (item.quantity || 1) <= 1 ? 'not-allowed' : 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  padding: 0,
                                }}
                              >
                                −
                              </button>
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#000000', minWidth: '18px', textAlign: 'center' }}>
                                {item.quantity || 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  color: '#000000',
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  padding: 0,
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#94a3b8',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title="Remove item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                      Request Combined Estimation
                    </h4>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Kulkarni"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.875rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.875rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Site Location / Special Sizing Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Mention site dimensions or installation city/area..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.875rem',
                          outline: 'none',
                          resize: 'none',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Submit Quote for {cart.length} Item{cart.length > 1 ? 's' : ''}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
