'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, BLOGS } from '@/data/blogs';
import { IconCalendar, IconClock, IconCheck } from '@/components/Icons';
import { ThreeDUser, ThreeDLightbulb, ThreeDChat } from '@/components/ThreeDIcons';

export default function BlogDetailClient({ blog }: { blog: BlogPost }) {
  const relatedBlogs = BLOGS.filter((b) => b.id !== blog.id);

  return (
    <div style={{ padding: '2.5rem 0 5rem', backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blogs">Welding Blogs</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Article</span>
        </nav>

        {/* Article Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 2.5rem' }}>
          <div className="badge-ice" style={{ marginBottom: '1rem' }}>
            {blog.category}
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            {blog.title}
          </h1>

          {/* Author & Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ThreeDUser size={28} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{blog.author.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{blog.author.role}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '0.85rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <IconCalendar size={14} color="#64748b" /> {blog.date}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <IconClock size={14} color="#64748b" /> {blog.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article Main Image */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto 3rem',
            position: 'relative',
            height: '440px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Image src={blog.image} alt={blog.title} fill priority style={{ objectFit: 'cover' }} />
        </div>

        {/* Article Body Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Key Takeaways Box */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
              marginBottom: '3rem',
            }}
          >
            <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ThreeDLightbulb size={26} /> Key Workshop Takeaways:
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {blog.keyTakeaways.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.925rem', color: '#334155', lineHeight: 1.5, alignItems: 'flex-start' }}>
                  <span style={{ color: '#000000', display: 'flex', marginTop: '3px' }}>
                    <IconCheck size={16} color="#000000" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structured Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
            {blog.content.map((sec, idx) => (
              <div key={idx}>
                <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                  {sec.heading}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#334155' }}>
                      {p}
                    </p>
                  ))}
                </div>

                {sec.callout && (
                  <div
                    style={{
                      marginTop: '1.5rem',
                      padding: '1.25rem 1.5rem',
                      backgroundColor: '#f8fafc',
                      borderLeft: '4px solid #000000',
                      borderRadius: '8px',
                      color: '#0f172a',
                      fontSize: '0.95rem',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <ThreeDChat size={22} />
                    <span>{sec.callout}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Author Card */}
          <div
            style={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              marginBottom: '4rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ThreeDUser size={40} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Written by {blog.author.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, marginBottom: '0.4rem' }}>{blog.author.role}</div>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
                Master fabricator holding certified credentials in structural steel joint metallurgy, ultrasonic test diagnostics, and modern CNC automation.
              </p>
            </div>
          </div>

          {/* Shop Related Information */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              padding: '2rem',
              marginBottom: '3.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>Workshop Storefront</span>
                <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
                  Related Products Available in Shop
                </h3>
              </div>
              <Link
                href="/shop"
                style={{
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  color: '#000000',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Browse All Shop Products →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Custom Architectural Gates</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>Ornamental CNC Laser Gate</div>
                <div style={{ fontSize: '0.825rem', color: '#000000', fontWeight: 700, marginBottom: '8px' }}>From ₹28,500</div>
                <Link href="/shop?category=Gates" style={{ fontSize: '0.78rem', color: '#000000', fontWeight: 600, textDecoration: 'underline' }}>View in Shop →</Link>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Structural Steelwork</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>Industrial Pre-Fab Sheds</div>
                <div style={{ fontSize: '0.825rem', color: '#000000', fontWeight: 700, marginBottom: '8px' }}>From ₹220 / sq.ft</div>
                <Link href="/shop?category=Sheds" style={{ fontSize: '0.78rem', color: '#000000', fontWeight: 600, textDecoration: 'underline' }}>View in Shop →</Link>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Stainless Steel 304</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>Argon TIG Balustrades</div>
                <div style={{ fontSize: '0.825rem', color: '#000000', fontWeight: 700, marginBottom: '8px' }}>From ₹750 / rft</div>
                <Link href="/shop?category=Railings" style={{ fontSize: '0.78rem', color: '#000000', fontWeight: 600, textDecoration: 'underline' }}>View in Shop →</Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '3rem', marginBottom: '3rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
              More Articles from Our Workshop:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {relatedBlogs.map((rel) => (
                <div key={rel.id} className="ice-card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: '0.4rem' }}>
                    {rel.category} • {rel.readTime}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                    <Link href={`/blogs/${rel.id}`} style={{ color: 'inherit' }}>
                      {rel.title}
                    </Link>
                  </h4>
                  <Link href={`/blogs/${rel.id}`} style={{ fontSize: '0.8rem', color: '#000000', fontWeight: 700 }}>
                    Read Article →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Back to blogs */}
          <div style={{ textAlign: 'center' }}>
            <Link href="/blogs" className="btn-secondary">
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
