import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ThreeDFactory, ThreeDClock, ThreeDStar } from '@/components/ThreeDIcons';

export const metadata: Metadata = {
  title: 'About Shree Ganesh Steel & Welding Workshop | 25+ Years Experience in Ghatanji & Vidarbha',
  description:
    'Learn about Shree Ganesh Steel and Welding Workshop (Shri Ganesh Welding Workshop) - 25+ years of master fabrication in Ghatanji, Yavatmal, Nagpur & Vidarbha. ISO-certified steel craftsmanship.',
  keywords: [
    'about shree ganesh steel',
    'shri ganesh welding workshop ghatanji',
    'steel fabrication history yavatmal',
    'master welders vidarbha',
  ],
};

export default function AboutPage() {
  const milestones = [
    { year: '2001', title: 'Workshop Founded', desc: 'Started with two manual stick welding rigs serving local building contractors.' },
    { year: '2009', title: 'TIG & SS Expansion', desc: 'Installed dedicated argon TIG welding stations for luxury architectural stainless steel handrails.' },
    { year: '2016', title: 'MIDC Facility Move', desc: 'Expanded into an 8,500 sq.ft industrial facility with overhead gantry cranes and hydraulic benders.' },
    { year: '2022', title: 'Fiber Laser & Automation', desc: 'Integrated CNC fiber laser cutting systems and automated gate motor assemblies.' },
    { year: '2026', title: 'ISO 9001:2015 Certified', desc: 'Over 3,500 completed structural and architectural steel installations with zero weld failures.' },
  ];

  const team = [
    {
      name: 'Rameshwar Sharma',
      role: 'Founder & Chief Metallurgist',
      exp: '28 Years Experience',
      badge: 'AWS Certified Inspector',
      desc: 'Master of structural metallurgy and weld penetration diagnostics. Oversees quality control across all high-stress steel assemblies.',
    },
    {
      name: 'Ganesh M. Sutar',
      role: 'Lead Fabrication Engineer',
      exp: '16 Years Experience',
      badge: 'CAD/CAM Specialist',
      desc: 'Translates architectural blueprints into precision CNC toolpaths and parametric 3D models with 0.5mm tolerances.',
    },
    {
      name: 'Pravin Jadhav',
      role: 'Senior TIG Argon Craftsman',
      exp: '14 Years Experience',
      badge: 'Mirror Polish Expert',
      desc: 'Specializes in seamless architectural stainless steel joins, curved spiral balustrades, and high-spec hairline finishing.',
    },
  ];

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>About Workshop</span>
        </nav>

        {/* Page Hero */}
        <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
          <div className="badge-ice" style={{ marginBottom: '1rem' }}>
            25+ Years of Steel Engineering
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.6rem)',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Artisanal Precision Meets Heavy Industrial Muscle.
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: '#475569' }}>
            Since 2001, <strong>Shree Ganesh Steel and Welding Workshop</strong> has set the gold standard in bespoke metal fabrication.
            From high-tolerance architectural gates and designer staircases to heavy industrial factory sheds, we craft steel that endures for generations.
          </p>
        </div>

        {/* Facility & Workshop Tour */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '6rem',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(35, 128, 184, 0.2)',
                border: '3px solid #ffffff',
              }}
            >
              <Image
                src="/images/about_workshop.jpg"
                alt="Inside Shree Ganesh Workshop Floor"
                width={700}
                height={500}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
            <div
              className="ice-glass"
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                padding: '1.25rem 1.75rem',
                borderRadius: '16px',
                boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                }}
              >
                <ThreeDFactory size={36} />
              </div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>8,500 Sq.Ft</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Industrial Heavy Fabrication Bay</div>
              </div>
            </div>
          </div>

          <div>
            <div className="badge-ice" style={{ marginBottom: '1rem' }}>
              Advanced Machinery
            </div>
            <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>
              High-Precision Tools for Exacting Standards
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '2rem' }}>
              Our workshop floor is purpose-built for both structural capacity and surgical detailing. We house state-of-the-art tools ensuring zero-compromise execution:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#000000', marginBottom: '0.25rem' }}>
                  <ThreeDStar size={18} /> 3kW CNC Fiber Laser
                </div>
                <div style={{ fontSize: '0.825rem', color: '#64748b' }}>Clean cuts up to 20mm mild steel &amp; 12mm stainless.</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#000000', marginBottom: '0.25rem' }}>
                  <ThreeDStar size={18} /> Digital Inverter TIG
                </div>
                <div style={{ fontSize: '0.825rem', color: '#64748b' }}>High-frequency pulse arc for flawless stainless joins.</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#000000', marginBottom: '0.25rem' }}>
                  <ThreeDStar size={18} /> 160-Ton Press Brake
                </div>
                <div style={{ fontSize: '0.825rem', color: '#64748b' }}>Precision hydraulic bending with programmable backstops.</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#000000', marginBottom: '0.25rem' }}>
                  <ThreeDStar size={18} /> Electrostatic Powder Line
                </div>
                <div style={{ fontSize: '0.825rem', color: '#64748b' }}>200°C cured durable weather-resistant polymer coat.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Craftsmanship Workflow */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <div className="badge-ice" style={{ marginBottom: '0.75rem' }}>
              Our Process
            </div>
            <h2 className="font-display" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f172a' }}>
              From Raw Steel to Finished Masterpiece
            </h2>
            <p style={{ color: '#64748b', marginTop: '0.75rem' }}>
              How our workshop fabricates every piece with strict quality milestones.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { step: '01', title: 'Site Survey & CAD', desc: 'Digital on-site laser measurements and parametric CAD models for client approval.' },
              { step: '02', title: 'Laser Cutting', desc: 'CNC fiber laser cutting and hydraulic beveling for precise interlocking fit.' },
              { step: '03', title: 'Jig Clamping', desc: 'Cast-iron modular welding tables ensure exact 90° angles and prevent heat warping.' },
              { step: '04', title: 'Dual-Pass Welding', desc: 'TIG aesthetic cosmetic cap over structural MIG root pass with dye-penetrant inspection.' },
              { step: '05', title: 'Anti-Rust Coating', desc: 'Zinc-rich phosphate undercoat and baked electrostatic powder coat finish.' },
            ].map((p) => (
              <div
                key={p.step}
                className="ice-card"
                style={{ padding: '1.75rem 1.25rem', position: 'relative' }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#e2e8f0',
                    marginBottom: '0.75rem',
                  }}
                >
                  {p.step}
                </div>
                <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Master Craftsmen Team */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <div className="badge-ice" style={{ marginBottom: '0.75rem' }}>
              Leadership &amp; Masters
            </div>
            <h2 className="font-display" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f172a' }}>
              Meet Our Master Fabricators
            </h2>
            <p style={{ color: '#64748b', marginTop: '0.75rem' }}>
              Over six decades of combined metallurgical expertise under one roof.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="ice-card"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>{member.role}</div>
                  </div>
                  <span
                    style={{
                      background: '#f1f5f9',
                      color: '#0f172a',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {member.badge}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <ThreeDClock size={16} /> {member.exp}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, flex: 1 }}>
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <div className="badge-ice" style={{ marginBottom: '0.75rem' }}>
              Our Journey
            </div>
            <h2 className="font-display" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f172a' }}>
              25 Years of Solid Progress
            </h2>
          </div>

          <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {milestones.map((m) => (
              <div
                key={m.year}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  alignItems: 'center',
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#000000',
                    width: '75px',
                    flexShrink: 0,
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div
          style={{
            background: '#000000',
            color: 'white',
            padding: '4rem 2rem',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.35)',
          }}
        >
          <h3 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Build With Our Master Fabricators?
          </h3>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Schedule an on-site consultation or visit our workshop floor in MIDC Industrial Estate.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="btn-secondary"
              style={{ backgroundColor: '#ffffff', color: '#000000', fontWeight: 700 }}
            >
              Request Free On-Site Inspection
            </Link>
            <Link
              href="/shop"
              className="btn-primary"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              Browse Catalog Designs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
