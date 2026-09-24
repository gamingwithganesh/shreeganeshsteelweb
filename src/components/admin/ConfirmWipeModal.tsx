'use client';

import React from 'react';

interface ConfirmWipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing?: boolean;
}

export default function ConfirmWipeModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing = false,
}: ConfirmWipeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          padding: '24px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
          color: '#09090b',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0', color: '#09090b' }}>
          Reset All Data?
        </h3>

        <p style={{ fontSize: '0.85rem', color: '#71717a', lineHeight: 1.5, margin: '0 0 20px 0' }}>
          This will clear all orders, cart items, and uploaded proofs from the application.
        </p>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e4e4e7',
              backgroundColor: '#ffffff',
              color: '#09090b',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#09090b',
              color: '#ffffff',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: isProcessing ? 'wait' : 'pointer',
            }}
          >
            {isProcessing ? 'Resetting...' : 'Confirm Reset'}
          </button>
        </div>
      </div>
    </div>
  );
}
