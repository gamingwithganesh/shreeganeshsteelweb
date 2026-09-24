'use client';

import React from 'react';
import { StoredOrder } from '@/context/CartContext';
import { ThreeDShield, ThreeDPhone } from '@/components/ThreeDIcons';

interface OrderDetailsModalProps {
  order: StoredOrder | null;
  isOpen?: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen = true, onClose }: OrderDetailsModalProps) {
  if (!order || !isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 15, 28, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .printable-invoice-container, .printable-invoice-container * {
            visibility: visible !important;
          }
          .printable-invoice-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 20px !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      <div
        className="printable-invoice-container"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '740px',
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
          className="no-print"
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
          aria-label="Close invoice modal"
        >
          ✕
        </button>

        {/* Invoice Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#000000',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                SG
              </div>
              <span className="font-display" style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a' }}>
                Shree Ganesh Steel &amp; Welding Workshop
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Main Workshop, Ghatanji, District Yavatmal, Maharashtra - 445301
            </div>
            <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600 }}>
              Office: +91 94230 32182 • Shop: +91 94206 27288
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="badge-ice" style={{ marginBottom: '4px' }}>
              Official Workshop Bill / Receipt
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#000000' }}>
              #{order.orderId}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Date: {order.date}</div>
          </div>
        </div>

        {/* Client & Project Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
              Client Information
            </div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a', marginTop: '2px' }}>
              {order.siteInfo.clientName}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '2px' }}>
              Phone: {order.siteInfo.phone} {order.siteInfo.whatsapp ? `• WhatsApp: ${order.siteInfo.whatsapp}` : ''}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
              Project Installation Site
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginTop: '2px' }}>
              {order.siteInfo.siteAddress}, {order.siteInfo.city}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600, marginTop: '2px' }}>
              Delivery: {order.siteInfo.deliveryMethod === 'factory_pickup' ? 'Self Pickup at Ghatanji' : 'Workshop Flatbed Truck'}
            </div>
          </div>
        </div>

        {/* Custom Design Blueprint Attachment */}
        {(order.siteInfo.customDesignImage || order.customDesignImage) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.85rem 1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <img
              src={order.siteInfo.customDesignImage || order.customDesignImage}
              alt="Design Blueprint"
              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #86efac' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Custom Client Design Blueprint Attached</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#15803d' }}>
                {order.siteInfo.customDesignFileName || order.customDesignFileName || 'custom_design.jpg'} • Workshop specifications verified
              </div>
            </div>
          </div>
        )}

        {/* Line Items Table */}
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Fabrication Item &amp; Specs</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Dimensions</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Qty</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {item.selectedGauge || 'Standard Gauge'} • {item.selectedFinish || 'Anti-Rust Primer'}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#475569' }}>
                    {item.widthFeet && item.heightFeet
                      ? `${item.widthFeet}ft x ${item.heightFeet}ft (${item.calculatedSqFt} sq.ft)`
                      : 'Custom Size'}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#475569' }}>{item.quantity || 1}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                    ₹{(item.calculatedTotalPrice || parseInt(item.price.replace(/[^0-9]/g, '')) || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price Breakdown */}
        <div style={{ maxWidth: '340px', marginLeft: 'auto', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>Fabrication Subtotal:</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{order.subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>Anti-Rust Primer &amp; Finish Coating:</span>
            <span>{order.coatingCharge > 0 ? `₹${order.coatingCharge.toLocaleString()}` : 'Not Included (₹0)'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>Truck Logistics to {order.siteInfo.city}:</span>
            <span>₹{order.deliveryCharge.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>On-Site Erection &amp; Welding:</span>
            <span>₹{order.installationCharge.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #e2e8f0', paddingTop: '0.5rem', fontSize: '1.05rem', fontWeight: 800, color: '#000000' }}>
            <span>Total Project Value:</span>
            <span>₹{order.grandTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 700 }}>
            <span>Advance Token Received:</span>
            <span>₹{order.advancePaid.toLocaleString()}</span>
          </div>
          {order.transactionRef && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a', fontSize: '0.78rem' }}>
              <span>Transaction / UTR Ref:</span>
              <span style={{ fontWeight: 600 }}>{order.transactionRef}</span>
            </div>
          )}
          {order.balanceDue > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b91c1c', fontWeight: 700 }}>
              <span>Balance on Handover:</span>
              <span>₹{order.balanceDue.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Verification Note for Handover */}
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '10px 14px', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✓</span>
          <span>
            <strong>Official Workshop Copy:</strong> Present this receipt or Order ID when visiting our Ghatanji plant or upon on-site truck dispatch.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Computer-generated commercial estimate &amp; bill receipt.
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                border: '1px solid #000000',
                backgroundColor: '#000000',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print / Save PDF</span>
            </button>

            <a
              href={`https://wa.me/919423032182?text=${encodeURIComponent(
                `Regarding bill #${order.orderId} for ${order.siteInfo.clientName} in ${order.siteInfo.city}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem', fontWeight: 700 }}
            >
              Share with Workshop Chief
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
