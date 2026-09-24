'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IconPhone } from '@/components/Icons';
import LocationSection from '@/components/LocationSection';

function ContactContent() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('service') || 'Custom Steel Gate & Grill';
  const prefilledNotes = searchParams.get('notes') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: prefilledService,
    dimensions: '',
    message: prefilledNotes,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
    if (prefilledNotes) {
      setFormData((prev) => ({ ...prev, message: prefilledNotes }));
    }
  }, [prefilledService, prefilledNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        service: 'Custom Steel Gate & Grill',
        dimensions: '',
        message: '',
      });
    }, 6000);
  };

  const googleMapsUrl =
    'https://www.google.com/maps/place/Shri+Ganesh+Welding+Works+shop+Ghatanji/@20.1441888,78.3122625,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd3b9157d1d648b:0x1efbfee1ed30f59e!8m2!3d20.1441838!4d78.3148374!16s%2Fg%2F11gm87w9rv?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '3.5rem 0 6rem 0' }}>
      <div className="container-custom">
        
        {/* =========================================================================
            1. HEADER: MINIMAL, BOLD, HIGH-CONTRAST (BLACK & WHITE)
           ========================================================================= */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#000000',
              backgroundColor: '#f1f5f9',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '4px 12px',
              borderRadius: '9999px',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#000000',
              }}
            />
            ENGINEERING DESK // GHATANJI PLANT
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              fontWeight: 600,
              color: '#000000',
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              margin: '0 0 1rem 0',
            }}
          >
            Contact &amp; Free Estimation.
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#475569',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Connect directly with our master fabricators. Get an upfront factory quote or request free on-site measurements across Vidarbha.
          </p>
        </div>

        {/* =========================================================================
            2. MAIN 2-COLUMN GRID: CONTACT DESKS (LEFT) & ESTIMATION FORM (RIGHT)
           ========================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '5rem',
          }}
        >
          {/* LEFT: WORKSHOP CONTACT DESKS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Direct Phone & WhatsApp Card */}
            <div
              style={{
                backgroundColor: '#fafafa',
                borderRadius: '24px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#64748b',
                  marginBottom: '0.5rem',
                }}
              >
                DIRECT LINES
              </div>
              <h2
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  margin: '0 0 1.25rem 0',
                }}
              >
                Call or WhatsApp Us
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Office Desk</div>
                    <a href="tel:+919423032182" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#000000', textDecoration: 'none' }}>
                      +91 94230 32182
                    </a>
                  </div>
                  <a
                    href="tel:+919423032182"
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Call
                  </a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Workshop Floor Counter</div>
                    <a href="tel:+919420627288" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#000000', textDecoration: 'none' }}>
                      +91 94206 27288
                    </a>
                  </div>
                  <a
                    href="tel:+919420627288"
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* WhatsApp Blueprint Button */}
              <a
                href="https://wa.me/919423032182?text=Hello%20Shree%20Ganesh%20Steel,%20I%20would%20like%20to%20share%20drawings%20for%20an%20estimate."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  color: '#000000',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
              >
                <span>💬 WhatsApp Your Drawings &amp; Blueprints</span>
              </a>
            </div>

            {/* Plant Address & Hours Card */}
            <div
              style={{
                backgroundColor: '#fafafa',
                borderRadius: '24px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#64748b',
                  marginBottom: '0.5rem',
                }}
              >
                PHYSICAL PLANT
              </div>
              <h2
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  margin: '0 0 1rem 0',
                }}
              >
                Workshop Facility
              </h2>

              <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.55, margin: '0 0 1.25rem 0' }}>
                Shri Ganesh Welding Works Shop, Ghatanji, District Yavatmal, Maharashtra — 445301
              </p>

              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>• <strong>Hours:</strong> Mon – Sat: 8:30 AM – 7:30 PM</div>
                <div>• <strong>Sunday:</strong> Open by appointment &amp; emergency repair dispatch</div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#000000',
                  textDecoration: 'none',
                  borderBottom: '1px solid #000000',
                  paddingBottom: '2px',
                }}
              >
                <span>Open in Google Maps</span>
                <span>↗</span>
              </a>
            </div>

            {/* High-Contrast Emergency 24/7 Mobile Rig Box */}
            <div
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '24px',
                padding: '1.75rem 2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>⚡</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  Emergency On-Site Welding
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                Broken industrial gate hinges, collapsed trusses, or urgent structural repairs. Mobile welding truck dispatches within 60 minutes.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a
                  href="tel:+919423032182"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Office: 9423032182
                </a>
                <a
                  href="tel:+919420627288"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Shop: 9420627288
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: STREAMLINED MINIMALIST ESTIMATION FORM */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '28px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '2.5rem',
              boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.06)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    margin: '0 auto 1.25rem auto',
                  }}
                >
                  ✓
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: '1.6rem', fontWeight: 700, color: '#000000', marginBottom: '0.5rem' }}
                >
                  Request Received
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                  Our chief fabrication engineer will review your specifications and call you within 2 hours with an upfront estimate.
                </p>
                <div
                  style={{
                    display: 'inline-block',
                    fontFamily: 'monospace',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#000000',
                    backgroundColor: '#f1f5f9',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                  }}
                >
                  REF // #SG-{Math.floor(1000 + Math.random() * 9000)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} autoComplete="off">
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                  }}
                >
                  ONLINE ESTIMATION
                </div>
                <h2
                  className="font-display"
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#000000',
                    letterSpacing: '-0.02em',
                    margin: '0 0 0.4rem 0',
                  }}
                >
                  Request Project Quote
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 2rem 0' }}>
                  Fill out key details for an immediate, transparent estimate with zero hidden costs.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem',
                        color: '#0f172a',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#000000')}
                      onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem',
                        color: '#0f172a',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#000000')}
                      onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                    Fabrication Category *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      color: '#0f172a',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#000000')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  >
                    <option>Custom Steel Gate &amp; Grill</option>
                    <option>Stainless Steel (SS 304) Balustrade Railing</option>
                    <option>Heavy Industrial PEB Warehouse Shed</option>
                    <option>CNC Fiber Laser Cut Facade Screens</option>
                    <option>Security Safety Doors &amp; Frames</option>
                    <option>Emergency On-Site Welding Repair</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                    Approximate Dimensions / Area (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 14ft x 7ft Gate, or 50 running feet railing"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      color: '#0f172a',
                      outline: 'none',
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#000000')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                    Project Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Lock provisions, motorized sliding requirements, site location..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem',
                      color: '#0f172a',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#000000')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.925rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e293b';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  Submit for Free Estimate →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* =========================================================================
            3. WORKSHOP PLANT & LIVE SATELLITE RADAR
           ========================================================================= */}
        <div style={{ marginBottom: '5rem' }}>
          <LocationSection />
        </div>

        {/* =========================================================================
            4. MINIMALIST FAQ ACCORDION (LESS TEXT, HIGH CLARITY)
           ========================================================================= */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2
              className="font-display"
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#000000',
                letterSpacing: '-0.02em',
                margin: '0 0 0.4rem 0',
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
              Clear answers on measurement, lead times, and factory warranties.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1rem' }}>
            {[
              {
                q: 'Do you visit on-site for measurements?',
                a: 'Yes. Our engineers conduct laser site surveys across Vidarbha to verify dimensions and leveling before steel is cut.',
              },
              {
                q: 'What is the standard production lead time?',
                a: 'Custom laser gates and railings ship within 7–10 days. Pre-fab structural PEB sheds take 15–25 days.',
              },
              {
                q: 'How is outdoor steel protected from rust?',
                a: 'We use hot-dip galvanizing or zinc-phosphate conversion wash topped with 200°C oven-baked polyester powder coating.',
              },
              {
                q: 'Can I share architect CAD blueprints or PDF drawings?',
                a: 'Yes. Send AutoCAD (.dwg, .dxf) or PDF drawings directly via WhatsApp or email for instant parametric nesting and costing.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fafafa',
                  borderRadius: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#000000', fontSize: '0.925rem', marginBottom: '0.4rem' }}>
                  {faq.q}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading contact page...</div>}>
      <ContactContent />
    </Suspense>
  );
}
