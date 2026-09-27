'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { StoreSettings } from '@/data/adminInitialData';
import ConfirmWipeModal from './ConfirmWipeModal';

export default function SettingsTab() {
  const {
    settings,
    updateSettings,
    wipeAllAppData,
    seedSampleData,
    notificationPermission,
    requestNotificationPermission,
    triggerTestNotification,
  } = useAdmin();

  const [formSettings, setFormSettings] = useState<StoreSettings>(settings);
  const [toastMsg, setToastMsg] = useState('');
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const handleConfirmWipe = async () => {
    setIsWiping(true);
    await wipeAllAppData();
    setIsWiping(false);
    setIsWipeModalOpen(false);
  };

  const handleBannerChange = (field: string, val: any) => {
    setFormSettings((prev) => ({
      ...prev,
      promoBanner: {
        ...prev.promoBanner,
        [field]: val,
      },
    }));
  };

  const handleCardChange = (idx: number, field: string, val: any) => {
    setFormSettings((prev) => {
      const updatedCards = [...prev.promoCards];
      updatedCards[idx] = {
        ...updatedCards[idx],
        [field]: val,
      };
      return {
        ...prev,
        promoCards: updatedCards,
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setToastMsg('Settings saved successfully.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Header Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#09090b',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Settings
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.8rem', margin: '2px 0 0 0' }}>
            Store banner &amp; promotional settings
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          style={{
            backgroundColor: '#09090b',
            color: '#ffffff',
            border: 'none',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Save Changes
        </button>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div
          style={{
            backgroundColor: '#09090b',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '0.825rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>✓</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Form Controls */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Section 1: Promo Banner */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            padding: '20px 22px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#09090b', margin: 0 }}>
              Top Announcement Banner
            </h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#09090b' }}>
              <input
                type="checkbox"
                checked={formSettings.promoBanner.enabled}
                onChange={(e) => handleBannerChange('enabled', e.target.checked)}
                style={{ width: '15px', height: '15px', cursor: 'pointer' }}
              />
              Show on Storefront
            </label>
          </div>

          <div className="admin-form-grid-2" style={{ marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#71717a', marginBottom: '4px' }}>
                Banner Text
              </label>
              <input
                type="text"
                value={formSettings.promoBanner.text}
                onChange={(e) => handleBannerChange('text', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                  fontSize: '0.825rem',
                  color: '#09090b',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#71717a', marginBottom: '4px' }}>
                Tag
              </label>
              <input
                type="text"
                value={formSettings.promoBanner.statusTag}
                onChange={(e) => handleBannerChange('statusTag', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                  fontSize: '0.825rem',
                  color: '#09090b',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#71717a', marginBottom: '4px' }}>
                Coupon Code
              </label>
              <input
                type="text"
                value={formSettings.promoBanner.couponCode}
                onChange={(e) => handleBannerChange('couponCode', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                  fontSize: '0.825rem',
                  color: '#09090b',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#71717a', marginBottom: '4px' }}>
                Discount (%)
              </label>
              <input
                type="number"
                value={formSettings.promoBanner.discountPercent}
                onChange={(e) => handleBannerChange('discountPercent', Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e4e4e7',
                  fontSize: '0.825rem',
                  color: '#09090b',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Promo Cards */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            padding: '20px 22px',
          }}
        >
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#09090b', margin: '0 0 14px 0' }}>
            Featured Hero Cards
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '14px' }}>
            {formSettings.promoCards.map((card, idx) => (
              <div
                key={card.id || idx}
                style={{
                  border: '1px solid #e4e4e7',
                  borderRadius: '12px',
                  padding: '14px',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#71717a' }}>
                  Card #{idx + 1}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#71717a', marginBottom: '2px' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: '1px solid #e4e4e7',
                      fontSize: '0.8rem',
                      color: '#09090b',
                      backgroundColor: '#ffffff',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#71717a', marginBottom: '2px' }}>
                      Badge
                    </label>
                    <input
                      type="text"
                      value={card.badge}
                      onChange={(e) => handleCardChange(idx, 'badge', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '7px 10px',
                        borderRadius: '6px',
                        border: '1px solid #e4e4e7',
                        fontSize: '0.8rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#71717a', marginBottom: '2px' }}>
                      Price
                    </label>
                    <input
                      type="text"
                      value={card.startingPrice}
                      onChange={(e) => handleCardChange(idx, 'startingPrice', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '7px 10px',
                        borderRadius: '6px',
                        border: '1px solid #e4e4e7',
                        fontSize: '0.8rem',
                        color: '#09090b',
                        backgroundColor: '#ffffff',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#71717a', marginBottom: '2px' }}>
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={card.description}
                    onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: '1px solid #e4e4e7',
                      fontSize: '0.8rem',
                      color: '#09090b',
                      backgroundColor: '#ffffff',
                      resize: 'none',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: System & Alerts */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e4e4e7',
            padding: '20px 22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#09090b', margin: 0 }}>
              System Alerts
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#71717a', marginTop: '2px' }}>
              Permission: <strong>{notificationPermission}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {notificationPermission !== 'granted' && (
              <button
                type="button"
                onClick={() => requestNotificationPermission()}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e4e4e7',
                  color: '#09090b',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Enable Notifications
              </button>
            )}

            <button
              type="button"
              onClick={() => triggerTestNotification()}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                color: '#09090b',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Test Notification
            </button>

            <button
              type="button"
              onClick={() => seedSampleData()}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                color: '#09090b',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Load Demo Data
            </button>

            <button
              type="button"
              onClick={() => setIsWipeModalOpen(true)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                color: '#dc2626',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset Data
            </button>
          </div>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmWipeModal
        isOpen={isWipeModalOpen}
        onClose={() => setIsWipeModalOpen(false)}
        onConfirm={handleConfirmWipe}
        isProcessing={isWiping}
      />
    </div>
  );
}
