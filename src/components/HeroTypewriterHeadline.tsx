'use client';

import React, { useState, useEffect } from 'react';

const LINE1_TEXT = 'Precision Steel Engineering.';
const LINE2_TEXT = 'Crafted for Generations.';

// Slower, deliberate typing pace (~85ms per char)
const TYPING_SPEED_MS = 85;
const PAUSE_BETWEEN_LINES_MS = 450;

export default function HeroTypewriterHeadline() {
  const [line1, setLine1] = useState(LINE1_TEXT);
  const [line2, setLine2] = useState(LINE2_TEXT);
  const [phase, setPhase] = useState<'line1' | 'pause' | 'line2' | 'done'>('done');

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroCaretBlink {
              0%, 45% { opacity: 1; }
              50%, 95% { opacity: 0; }
              100% { opacity: 1; }
            }
            .hero-typing-caret {
              display: inline-block;
              margin-left: 5px;
              color: #000000;
              font-weight: 300;
              animation: heroCaretBlink 0.9s infinite;
              user-select: none;
            }
          `,
        }}
      />
      <h1
        className="font-display"
        aria-label="Precision Steel Engineering. Crafted for Generations."
        style={{
          fontSize: 'clamp(1.85rem, 5.2vw, 4.5rem)',
          lineHeight: 1.15,
          fontWeight: 700,
          color: '#000000',
          letterSpacing: '-0.035em',
          maxWidth: '980px',
          margin: '0 auto 2rem',
          textAlign: 'center',
          padding: '0 0.5rem',
          wordBreak: 'break-word',
        }}
      >
        <span style={{ display: 'inline' }}>
          {line1}
        </span>
        <br />
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
          }}
        >
          {line2}
        </span>
      </h1>
    </>
  );
}
