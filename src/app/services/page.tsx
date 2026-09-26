import Link from 'next/link';
import type { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';
import { IconCheck, IconPhone, IconMicrophone, IconBolt } from '@/components/Icons';
import { ThreeDClock, ThreeDMicroscope, ThreeDShield, ThreeDRuler, ThreeDTruck, ThreeDBolt, ThreeDFactory } from '@/components/ThreeDIcons';

export const metadata: Metadata = {
  title: 'Fabrication & Welding Services | Shree Ganesh Steel Workshop',
  description: 'Full-spectrum metal fabrication: architectural iron gates, stainless steel railings, industrial PEB sheds, CNC laser cutting, and mobile emergency welding.',
};

export default function ServicesPage() {
  return (
    <div style={{ padding: '2.5rem 0 5rem', backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Services &amp; Capabilities</span>
        </nav>

        {/* Page Header */}
        <div style={{ maxWidth: '880px', marginBottom: '4.5rem' }}>
          <div className="badge-ice" style={{ marginBottom: '1rem' }}>
            Comprehensive Fabrication Capabilities
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
              fontWeight: 800,
              color: '#000000',
              lineHeight: 1.12,
              marginBottom: '1.5rem',
              letterSpacing: '-0.025em',
            }}
          >
            Engineered Metal Solutions Built to Exacting Tolerances.
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: '#475569' }}>
            From one-off artisanal luxury metalwork to structural steel erections across Maharashtra,
            our certified technicians operate to AWS D1.1 and ISO standards. Explore our full suite of workshop capabilities below.
          </p>
        </div>

        {/* Services Showcase Sections (Antigravity Split-Screen Layout) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', marginBottom: '7rem' }}>
          
          {/* ============================================================ */}
          {/* 1. Architectural Gates & Safety Grills (Antigravity 2.0 Style) */}
          {/* ============================================================ */}
          <section
            id="architectural-gates"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              paddingBottom: '5rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            {/* Left Column: Typography & Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#64748b', textTransform: 'uppercase' }}>
                  Capability 01 // Architectural Steel
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#000000',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem',
                }}
              >
                Architectural Gates &amp; Safety Grills
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', marginBottom: '1.75rem' }}>
                Engineered for residential villas, modern bungalows, and commercial estates. We design and fabricate custom sliding, cantilever, and bi-fold gates utilizing laser-cut sheet inserts, wrought iron motifs, and heavy-wall structural tubing.
              </p>

              {/* Feature Chips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  'Precision laser-cut decorative geometric infill panels',
                  'Anti-sag heavy-duty pivot ball bearing hinges',
                  'Automation motor bracket & rack-and-pinion integration',
                  'Multi-stage zinc epoxy primer & PU weather coating',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                    <span style={{ color: '#000000', marginTop: '3px' }}>
                      <IconCheck size={16} color="#000000" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metadata badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                  ⏱ Turnaround: 7 – 12 Days
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Materials: IS 2062 Mild Steel, GI, Forged Iron
                </span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent('Architectural Gates & Safety Grills')}`}
                className="btn-primary"
                style={{ display: 'inline-flex', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
              >
                Configure Custom Gate Quotation →
              </Link>
            </div>

            {/* Right Column: Visual Card (Inspired by Screenshot 1 - Antigravity 2.0) */}
            <div
              style={{
                position: 'relative',
                minHeight: '480px',
                borderRadius: '36px',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 80% 20%, rgba(226, 232, 240, 0.7) 0%, rgba(248, 250, 252, 0.9) 45%, #ffffff 100%)',
                border: '1px solid #e2e8f0',
                boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.08)',
                padding: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Floating Ambient Glow aura behind card */}
              <div
                style={{
                  position: 'absolute',
                  top: '-15%',
                  right: '-10%',
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
                  filter: 'blur(35px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Floating UI Customizer Card */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '430px',
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 20px 45px -12px rgba(0, 0, 0, 0.1)',
                  padding: '1.75rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Project selector dropdown (as in Screenshot 1) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>SG-CAD-PROJECT // Villa Gate</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>▾</span>
                </div>

                {/* Input-style prompt box (as in Screenshot 1) */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '0.85rem 1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.65rem' }}>
                    Select gate parameters, @ to mention, / for specs
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                      <span>+</span>
                      <span>IS 2062 Grade Steel</span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>▾</span>
                    </div>
                    <IconMicrophone size={16} color="#94a3b8" />
                  </div>
                </div>

                {/* Gate CAD Schematic Elevation Viewport */}
                <div
                  style={{
                    backgroundColor: '#0f172a',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    marginBottom: '1rem',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '8px' }}>
                    <span>ELEVATION: FRONT BLUEPRINT</span>
                    <span style={{ color: '#38bdf8', fontWeight: 700 }}>18.0 FT × 7.5 FT</span>
                  </div>

                  {/* SVG Gate Blueprint */}
                  <svg width="100%" height="90" viewBox="0 0 300 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="280" height="65" rx="3" stroke="#475569" strokeWidth="2" fill="#1e293b" />
                    <line x1="150" y1="10" x2="150" y2="75" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                    {/* Laser cut slats */}
                    <rect x="25" y="22" width="110" height="42" rx="2" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6 3" />
                    <rect x="165" y="22" width="110" height="42" rx="2" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6 3" />
                    {/* Dimension callout */}
                    <line x1="10" y1="80" x2="290" y2="80" stroke="#38bdf8" strokeWidth="1" />
                    <circle cx="10" cy="80" r="2" fill="#38bdf8" />
                    <circle cx="290" cy="80" r="2" fill="#38bdf8" />
                  </svg>
                </div>

                {/* Floating inspector dropdown (matching Screenshot 1) */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 8px 20px -4px rgba(0,0,0,0.08)',
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                    <IconCheck size={14} color="#0f172a" />
                    <span>Anti-Sag Pivot Ball Bearings</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748b' }}>
                    <IconBolt size={14} color="#64748b" />
                    <span>Motorization Automation Track</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 2. Stainless Steel Railings (Antigravity CLI Terminal Style) */}
          {/* ============================================================ */}
          <section
            id="ss-railings"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              paddingBottom: '5rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            {/* Left Column: Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#64748b', textTransform: 'uppercase' }}>
                  Capability 02 // Argon Metallurgy
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#000000',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem',
                }}
              >
                Stainless Steel Railings &amp; Balustrades
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', marginBottom: '1.75rem' }}>
                Sleek, maintenance-free balustrade systems for residential stairways, terrace perimeters, and commercial corridors. We offer satin brushed or mirror finishes with precision argon-shielded TIG welds.
              </p>

              {/* Feature Checks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  'Pinhole-free argon gas purged TIG welding',
                  'Concealed anchor floor flanges with stainless base escutcheons',
                  'Compatible with 12mm toughened clear or frosted glass panels',
                  'Strict adherence to National Building Code railing height norms',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                    <span style={{ color: '#000000', marginTop: '3px' }}>
                      <IconCheck size={16} color="#000000" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metadata badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                  ⏱ Turnaround: 4 – 8 Days
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Materials: Jindal SS 304, Marine SS 316, Toughened Glass
                </span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent('Stainless Steel Railings & Balustrades')}`}
                className="btn-primary"
                style={{ display: 'inline-flex', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
              >
                Request Balustrade Quotation →
              </Link>
            </div>

            {/* Right Column: Visual Card (Inspired by Screenshot 2 - Antigravity CLI) */}
            <div
              style={{
                position: 'relative',
                minHeight: '480px',
                borderRadius: '36px',
                overflow: 'hidden',
                backgroundColor: '#090d16',
                border: '1px solid #1e293b',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Starry dust background */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.15,
                  backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Terminal Window Frame */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '440px',
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  overflow: 'hidden',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: '0.78rem',
                  color: '#e2e8f0',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Title Bar with macOS dots (matching Screenshot 2) */}
                <div
                  style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.7)',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>shree-ganesh-tig-cli</span>
                  <span style={{ color: '#64748b', fontSize: '0.7rem' }}>•••</span>
                </div>

                {/* Terminal Body */}
                <div style={{ padding: '1.25rem' }}>
                  {/* Colorful Pixel Arc Logo (as in Screenshot 2) */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
                    {['#f43f5e', '#fb923c', '#eab308', '#22c55e', '#06b6d4', '#6366f1'].map((c, i) => (
                      <span key={i} style={{ width: '8px', height: '12px', borderRadius: '2px', backgroundColor: c }} />
                    ))}
                  </div>

                  <div style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>
                    Welcome to <span style={{ color: '#38bdf8', fontWeight: 700 }}>SG TIG Metallurgy Console</span>!
                  </div>

                  <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '0.75rem' }}>
                    Inspection protocol: <strong>Jindal AISI 304 / 316 Marine</strong>
                  </div>

                  {/* Diff block (matching Screenshot 2's code diff view) */}
                  <div
                    style={{
                      backgroundColor: 'rgba(2, 6, 23, 0.8)',
                      borderRadius: '10px',
                      padding: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      marginBottom: '0.75rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <div style={{ color: '#38bdf8', marginBottom: '4px' }}>&gt; qc_inspection: verify weld joint</div>
                    <div style={{ color: '#64748b' }}>1  material: Jindal SS 304</div>
                    <div style={{ color: '#64748b' }}>2  shield_gas: 99.99% Argon (12 L/min)</div>
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '1px 4px', borderRadius: '4px' }}>
                      - pass: standard_smaw (spatter: 4.2%, pinhole: risk)
                    </div>
                    <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#86efac', padding: '1px 4px', borderRadius: '4px' }}>
                      + pass: pulsed_argon_tig (penetration: 100%, finish: mirror)
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                    <span style={{ color: '#4ade80', fontWeight: 700 }}>[NDT PASSED: ZERO CRACKS]</span>
                    <span style={{ color: '#eab308' }}>[Approved]</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 3. CNC Laser Cut Screens (Antigravity SDK Glowing Portal)    */}
          {/* ============================================================ */}
          <section
            id="laser-cut-panels"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              paddingBottom: '5rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            {/* Left Column: Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#64748b', textTransform: 'uppercase' }}>
                  Capability 03 // 12kW Optical Fiber
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#000000',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem',
                }}
              >
                CNC Laser Cut Metal Screens &amp; Facades
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', marginBottom: '1.75rem' }}>
                Transform architectural interiors and building exteriors with custom laser-perforated steel and aluminum screens. Perfect for sun-shading facades, room partitions, landscape screens, and branding backdrops.
              </p>

              {/* Feature Checks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  'Fiber laser cutting tolerance ±0.1mm for intricate geometry',
                  'Folded edge perimeter returns for structural rigidity',
                  'Durable powder coating in fine-texture metallic shades',
                  'Subframe bracket design for swift on-site mechanical anchoring',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                    <span style={{ color: '#000000', marginTop: '3px' }}>
                      <IconCheck size={16} color="#000000" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metadata badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                  ⏱ Turnaround: 5 – 10 Days
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Materials: MS (1.5mm - 8mm), Corten Steel, Aluminum 5052, SS 304
                </span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent('CNC Laser Cut Metal Screens & Facades')}`}
                className="btn-primary"
                style={{ display: 'inline-flex', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
              >
                Request Facade Screen Estimate →
              </Link>
            </div>

            {/* Right Column: Visual Card (Inspired by Screenshot 3 - Antigravity SDK Glowing Cosmic Ring) */}
            <div
              style={{
                position: 'relative',
                minHeight: '480px',
                borderRadius: '36px',
                overflow: 'hidden',
                backgroundColor: '#05070e',
                border: '1px solid #1e293b',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
            >
              {/* Deep Glowing Cosmic Spherical Portal (matching Screenshot 3) */}
              <div
                style={{
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(30, 58, 138, 0.35) 45%, rgba(5, 7, 14, 0.95) 75%)',
                  boxShadow: '0 0 90px rgba(56, 189, 248, 0.3), inset 0 0 60px rgba(14, 165, 233, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Thin technical crosshairs */}
                <svg
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35 }}
                  viewBox="0 0 320 320"
                >
                  <circle cx="160" cy="160" r="140" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6" fill="none" />
                  <circle cx="160" cy="160" r="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <line x1="160" y1="10" x2="160" y2="310" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="10" y1="160" x2="310" y2="160" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
                </svg>

                {/* Glowing Center Typography (as in Screenshot 3: "Antigravity SDK") */}
                <div style={{ textAlign: 'center', zIndex: 2 }}>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(56, 189, 248, 0.8)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    CNC Fiber Laser
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#7dd3fc',
                      marginTop: '6px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
                    }}
                  >
                    12kW Optical Tolerance ±0.1mm
                  </div>
                </div>
              </div>

              {/* Surrounding Floating Laser Metric Chips */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '28px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Bed Envelope: <strong style={{ color: '#ffffff' }}>3000 × 1500 mm</strong>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '28px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Laser Wavelength: <strong style={{ color: '#38bdf8' }}>1064 nm Fiber</strong>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 4. Heavy Structural PEB Sheds & Industrial Warehouses        */}
          {/* ============================================================ */}
          <section
            id="structural-steel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              paddingBottom: '5rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            {/* Left Column: Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#64748b', textTransform: 'uppercase' }}>
                  Capability 04 // Structural PEB
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#000000',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem',
                }}
              >
                Heavy Structural Steel Works &amp; Sheds
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', marginBottom: '1.75rem' }}>
                Certified structural steel fabrication and on-site erection for industrial warehouses, commercial showrooms, and factory sheds. Complete calculation of live, dead, and wind load engineering.
              </p>

              {/* Feature Checks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  'Structural design validation and CAD shop drawings',
                  'Certified welders under AWS D1.1 structural welding code',
                  'Ultrasonic & dye-penetrant weld testing available on request',
                  'Turnkey installation including foundation grouting and roof sheeting',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                    <span style={{ color: '#000000', marginTop: '3px' }}>
                      <IconCheck size={16} color="#000000" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metadata badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                  ⏱ Turnaround: 15 – 30 Days
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Materials: ISMB Beams, ISMC Channels, SHS/RHS Sections
                </span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent('Heavy Structural Steel Works & Sheds')}`}
                className="btn-primary"
                style={{ display: 'inline-flex', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
              >
                Request Structural PEB Quote →
              </Link>
            </div>

            {/* Right Column: Visual Card (CAD Blueprint Truss Grid) */}
            <div
              style={{
                position: 'relative',
                minHeight: '480px',
                borderRadius: '36px',
                overflow: 'hidden',
                backgroundColor: '#0b1120',
                border: '1px solid #1e293b',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Engineering Blueprint Grid lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.12,
                  backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Blueprint Framing Container */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ThreeDFactory size={24} />
                    <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.95rem' }}>PEB Industrial Shed Truss</span>
                  </div>
                  <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    AWS D1.1 Verified
                  </span>
                </div>

                {/* SVG Structural Truss Wireframe */}
                <svg width="100%" height="130" viewBox="0 0 360 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1.5rem' }}>
                  {/* Columns */}
                  <line x1="30" y1="120" x2="30" y2="40" stroke="#60a5fa" strokeWidth="4" />
                  <line x1="330" y1="120" x2="330" y2="40" stroke="#60a5fa" strokeWidth="4" />
                  {/* Roof rafter peak */}
                  <line x1="30" y1="40" x2="180" y2="10" stroke="#60a5fa" strokeWidth="4" />
                  <line x1="330" y1="40" x2="180" y2="10" stroke="#60a5fa" strokeWidth="4" />
                  {/* Bottom tie chord */}
                  <line x1="30" y1="40" x2="330" y2="40" stroke="#93c5fd" strokeWidth="2.5" />
                  {/* Web bracing */}
                  <line x1="90" y1="40" x2="90" y2="28" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="90" y1="28" x2="140" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="140" y1="40" x2="180" y2="10" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="220" y1="40" x2="180" y2="10" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="270" y1="28" x2="220" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="270" y1="40" x2="270" y2="28" stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Center vertical king post */}
                  <line x1="180" y1="10" x2="180" y2="40" stroke="#38bdf8" strokeWidth="2" />
                  {/* Ground base anchors */}
                  <rect x="22" y="118" width="16" height="6" fill="#94a3b8" />
                  <rect x="322" y="118" width="16" height="6" fill="#94a3b8" />
                </svg>

                {/* Technical Callout Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Clear Interior Span:</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>40.0 Meters</div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Wind Load Rating:</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>150 km/h Tested</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 5. Mobile Emergency Welding & Structural Repairs             */}
          {/* ============================================================ */}
          <section
            id="mobile-welding-repair"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              paddingBottom: '5rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            {/* Left Column: Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#64748b', textTransform: 'uppercase' }}>
                  Capability 05 // 24/7 Rapid Response
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#000000',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem',
                }}
              >
                On-Site Mobile Welding &amp; Repairs
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', marginBottom: '1.75rem' }}>
                Equipped with mobile inverter welding units, generators, and certified field technicians. We arrive on-site for rapid crack repair, structural reinforcement, beam modification, and emergency gate restoration.
              </p>

              {/* Feature Checks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  'Rapid emergency mobile dispatch across the industrial MIDC zone',
                  'Portable high-frequency inverter welding generators',
                  'Safe spark shielding and on-site fire prevention protocol',
                  'Post-repair grinding and protective touch-up anti-rust coat',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                    <span style={{ color: '#000000', marginTop: '3px' }}>
                      <IconCheck size={16} color="#000000" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metadata badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                  ⏱ Response Time: &lt; 60 Mins
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Coverage: Ghatanji, Yavatmal, Wardha, Pusad
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="tel:+919423032182"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
                >
                  <IconPhone size={18} color="white" /> Call Dispatch Desk (9423032182)
                </a>
              </div>
            </div>

            {/* Right Column: Visual Card (Radar Telemetry Dispatch Mock) */}
            <div
              style={{
                position: 'relative',
                minHeight: '480px',
                borderRadius: '36px',
                overflow: 'hidden',
                background: 'radial-gradient(circle at center, #111827 0%, #030712 100%)',
                border: '1px solid #1f2937',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Radar Sweep Animation circles */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ width: '380px', height: '380px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
                <div style={{ position: 'absolute', width: '260px', height: '260px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)' }} />
              </div>

              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                  <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.85rem' }}>FLEET TELEMETRY: ACTIVE</span>
                </div>
                <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#cbd5e1', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '9999px' }}>
                  Truck #01 Ghatanji
                </span>
              </div>

              {/* Center Map Telemetry Card */}
              <div
                style={{
                  backgroundColor: 'rgba(17, 24, 39, 0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '1.5rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <ThreeDTruck size={28} />
                  <div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>Mobile Workshop Truck Ready</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>High-Frequency Inverter + 15kVA Silent Generator</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: '#cbd5e1', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Emergency Response Window:</span>
                    <strong style={{ color: '#22c55e' }}>&lt; 60 Minutes</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Operational Sector:</span>
                    <span>Vidarbha Industrial Hub</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Lead Field Engineer:</span>
                    <span>Chief Master Welder Desk</span>
                  </div>
                </div>
              </div>

              {/* Bottom live status log */}
              <div style={{ position: 'relative', zIndex: 2, fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconBolt size={14} color="#64748b" />
                <span>Certified AWS D1.1 Field Welding • ISO 9001 Protocol</span>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 6. Industrial Bespoke Steel Furniture                        */}
          {/* ============================================================ */}
          <section
            id="custom-furniture"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              paddingBottom: '3rem',
            }}
          >
            {/* Left Column: Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#64748b', textTransform: 'uppercase' }}>
                  Capability 06 // Minimalist Design
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: '#000000',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem',
                }}
              >
                Industrial &amp; Bespoke Steel Furniture
              </h2>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', marginBottom: '1.75rem' }}>
                Combining raw industrial steel strength with minimalist architectural design. We build custom workbenches, open shelving units, conference table steel bases, and retail display racks.
              </p>

              {/* Feature Checks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {[
                  'Concealed mechanical fasteners & flush weld joints',
                  'Heavy 500 kg uniform static load capacity',
                  'Electrostatic architectural powder-coat finishes in matte obsidian',
                  'Precision M12 floor leveling glides with floor protectors',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                    <span style={{ color: '#000000', marginTop: '3px' }}>
                      <IconCheck size={16} color="#000000" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metadata badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                  ⏱ Turnaround: 4 – 7 Days
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Materials: Heavy RHS/SHS Sections, Solid Wood Tops, Perforated Mesh
                </span>
              </div>

              <Link
                href={`/contact?service=${encodeURIComponent('Industrial & Bespoke Steel Furniture')}`}
                className="btn-primary"
                style={{ display: 'inline-flex', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
              >
                Request Custom Furniture Estimate →
              </Link>
            </div>

            {/* Right Column: Visual Card (Minimalist Architectural Isometric Wireframe) */}
            <div
              style={{
                position: 'relative',
                minHeight: '480px',
                borderRadius: '36px',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 20% 20%, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)',
                border: '1px solid #cbd5e1',
                boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.08)',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.08)',
                  padding: '2rem',
                  width: '100%',
                  maxWidth: '400px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                    Architectural Frame Joinery
                  </span>
                  <span style={{ fontSize: '0.72rem', backgroundColor: '#000000', color: '#ffffff', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                    500 kg Rated
                  </span>
                </div>

                {/* Isometric Table Frame Vector */}
                <svg width="100%" height="110" viewBox="0 0 320 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1.25rem' }}>
                  {/* Isometric top surface */}
                  <polygon points="160,10 300,35 160,60 20,35" stroke="#0f172a" strokeWidth="2.5" fill="#f8fafc" />
                  {/* Legs */}
                  <line x1="20" y1="35" x2="20" y2="95" stroke="#0f172a" strokeWidth="3.5" />
                  <line x1="160" y1="60" x2="160" y2="105" stroke="#0f172a" strokeWidth="3.5" />
                  <line x1="300" y1="35" x2="300" y2="95" stroke="#0f172a" strokeWidth="3.5" />
                  {/* Lower stretcher bars */}
                  <line x1="20" y1="85" x2="160" y2="95" stroke="#64748b" strokeWidth="2" />
                  <line x1="160" y1="95" x2="300" y2="85" stroke="#64748b" strokeWidth="2" />
                </svg>

                {/* Specs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Structural Tubing:</span>
                    <strong style={{ color: '#0f172a' }}>50 × 50mm Grade A SHS</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Finish:</span>
                    <strong style={{ color: '#0f172a' }}>Matte Obsidian Powder Coat</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Leveling Glides:</span>
                    <strong style={{ color: '#0f172a' }}>M12 Heavy Adjustable</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Quality Guarantee Box */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            padding: '3rem',
            marginBottom: '4rem',
            boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            <div className="badge-ice" style={{ marginBottom: '0.75rem' }}>
              Quality Assurance
            </div>
            <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#000000' }}>
              Our Metallurgical &amp; Weld Integrity Guarantee
            </h2>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
              Every weld bead is inspected before leaving our shop.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <ThreeDMicroscope size={48} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#000000', marginBottom: '0.35rem' }}>Dye-Penetrant Testing</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Check for hairline cracks and sub-surface porosity on critical load-bearing joints.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <ThreeDShield size={48} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#000000', marginBottom: '0.35rem' }}>10-Year Rust Guarantee</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Duplex hot-dip galvanizing and electrostatic powder coat prevents corrosion.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <ThreeDRuler size={48} />
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#000000', marginBottom: '0.35rem' }}>±0.5mm Dimensional Fit</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Fixture jig alignment guarantees seamless on-site installation with zero gaps.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            background: '#000000',
            color: 'white',
            padding: '3.5rem 2rem',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.35)',
          }}
        >
          <h3 className="font-display" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Need Custom Dimensions or Structural Consultation?
          </h3>
          <p style={{ color: '#94a3b8', maxWidth: '560px', margin: '0 auto 1.75rem', fontSize: '1rem' }}>
            Upload your CAD drawings or architectural floor plans for rapid engineering review and quotation.
          </p>
          <Link href="/contact" className="btn-secondary" style={{ backgroundColor: '#ffffff', color: '#000000', fontWeight: 700 }}>
            Contact Workshop Engineering Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}
