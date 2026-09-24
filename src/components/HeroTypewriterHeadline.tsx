'use client';

import React, { useState, useEffect } from 'react';

const LINE1_TEXT = 'Precision Steel Engineering.';
const LINE2_TEXT = 'Crafted for Generations.';

// Slower, deliberate typing pace (~85ms per char)
const TYPING_SPEED_MS = 85;
const PAUSE_BETWEEN_LINES_MS = 450;

export default function HeroTypewriterHeadline() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [phase, setPhase] = useState<'line1' | 'pause' | 'line2' | 'done'>('line1');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'line1') {
      if (line1.length < LINE1_TEXT.length) {
        timeout = setTimeout(() => {
          setLine1(LINE1_TEXT.slice(0, line1.length + 1));
        }, TYPING_SPEED_MS);
      } else {
        timeout = setTimeout(() => {
          setPhase('pause');
        }, PAUSE_BETWEEN_LINES_MS);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => {
        setPhase('line2');
      }, 200);
    } else if (phase === 'line2') {
      if (line2.length < LINE2_TEXT.length) {
        timeout = setTimeout(() => {
          setLine2(LINE2_TEXT.slice(0, line2.length + 1));
        }, TYPING_SPEED_MS);
      } else {
        // Once both lines are typed out, stay permanently without deleting!
        timeout = setTimeout(() => {
          setPhase('done');
        }, 150);
      }
    }

    return () => clearTimeout(timeout);
  }, [line1, line2, phase]);

  const showCursorLine1 = phase === 'line1' || phase === 'pause';
  const showCursorLine2 = phase === 'line2' || phase === 'done';

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
          fontSize: 'clamp(2.75rem, 5.8vw, 5.25rem)',
          lineHeight: 1.1,
          fontWeight: 600,
          color: '#000000',
          letterSpacing: '-0.035em',
          maxWidth: '980px',
          margin: '0 auto 2.5rem',
          minHeight: '2.3em',
          textAlign: 'center',
        }}
      >
        <span style={{ display: 'inline' }}>
          {line1 || (phase === 'line1' ? '' : '\u00A0')}
          {showCursorLine1 && <span className="hero-typing-caret">|</span>}
        </span>
        <br />
        <span
          style={{
            display: 'inline-block',
            minHeight: '1.1em',
            verticalAlign: 'bottom',
          }}
        >
          {line2}
          {showCursorLine2 && <span className="hero-typing-caret">|</span>}
        </span>
      </h1>
    </>
  );
}
