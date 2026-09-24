'use client';

import React from 'react';
import { ThreeDRuler, ThreeDShield, ThreeDClock, ThreeDPhone } from '@/components/ThreeDIcons';

interface MeasurementGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function MeasurementGuideModal({ isOpen, onClose, category }: MeasurementGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 15, 28, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 999,
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
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
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
          aria-label="Close measurement guide"
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ThreeDRuler size={26} />
          </div>
          <div>
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              Master Measurement &amp; Tolerance Guide
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Shree Ganesh Workshop Standard • Precision Laser Tolerances ±0.5mm
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#000000',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0,
              }}
            >
              1
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>
                Measuring Gate Openings (Clear Pillar-to-Pillar Width)
              </h4>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginTop: '4px' }}>
                Measure the clear distance between masonry or RCC pillars at 3 distinct heights: bottom (near driveway),
                middle (waist height), and top. If dimensions differ, always use the <strong>narrowest measurement</strong>.
                Our master fabricator will factor in the standard 50mm hinge and latch clearance.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#000000',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0,
              }}
            >
              2
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>
                Driveway Slope &amp; Ground Clearance
              </h4>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginTop: '4px' }}>
                Check if your driveway or flooring slopes upward along the gate swing path. Standard bottom ground
                clearance is 75mm (3 inches) to avoid scraping stones or water accumulation during monsoon rains.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#000000',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0,
              }}
            >
              3
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>
                Staircase Railings &amp; Balustrades Run Length
              </h4>
              <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6, marginTop: '4px' }}>
                Measure diagonally along the stair nosing from first tread to top landing. Standard handrail height is
                36 inches (900mm) for residential stairs, or 42 inches (1050mm) for high-rise balconies under NBC rules.
              </p>
            </div>
          </div>

          {/* Need On-Site Assistance Box */}
          <div
            style={{
              backgroundColor: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontWeight: 800, color: '#0369a1', fontSize: '0.95rem' }}>
                Prefer Professional Laser Measurement?
              </div>
              <div style={{ fontSize: '0.825rem', color: '#0284c7', marginTop: '2px' }}>
                Our technician visits your site anywhere in Vidarbha with digital laser measurement tools.
              </div>
            </div>

            <a
              href="tel:+919423032182"
              className="btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            >
              <ThreeDPhone size={16} /> Book Free Site Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
