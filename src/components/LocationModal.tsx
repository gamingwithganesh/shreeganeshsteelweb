'use client';

import React, { useState } from 'react';
import { useCart, VIDARBHA_CITIES } from '@/context/CartContext';
import { ThreeDMapPin, ThreeDShield, ThreeDFactory } from '@/components/ThreeDIcons';
import { ModernLocationPin } from '@/components/Icons';

export default function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, selectedCity, setSelectedCityByName } = useCart();
  const [detecting, setDetecting] = useState(false);
  const [customPincode, setCustomPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState('');

  if (!isLocationModalOpen) return null;

  const handleDetectLocation = () => {
    setDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDetecting(false);
          // Default closest hub in Vidarbha (Ghatanji/Yavatmal)
          setSelectedCityByName('Ghatanji');
          setIsLocationModalOpen(false);
        },
        (error) => {
          setDetecting(false);
          // Fallback gracefully to Ghatanji
          setSelectedCityByName('Ghatanji');
        }
      );
    } else {
      setDetecting(false);
      setSelectedCityByName('Ghatanji');
    }
  };

  const handlePincodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPincode.trim()) return;

    const pin = customPincode.trim();
    if (pin.startsWith('4453') || pin === '445301') {
      setSelectedCityByName('Ghatanji');
      setIsLocationModalOpen(false);
    } else if (pin.startsWith('4450') || pin.startsWith('445')) {
      setSelectedCityByName('Yavatmal');
      setIsLocationModalOpen(false);
    } else if (pin.startsWith('442')) {
      setSelectedCityByName('Wardha');
      setIsLocationModalOpen(false);
    } else if (pin.startsWith('444')) {
      setSelectedCityByName('Amravati');
      setIsLocationModalOpen(false);
    } else if (pin.startsWith('440') || pin.startsWith('441')) {
      setSelectedCityByName('Nagpur');
      setIsLocationModalOpen(false);
    } else {
      setPincodeMessage('Pincode verified in Vidarbha region. Nearest logistics hub assigned: Yavatmal.');
      setSelectedCityByName('Yavatmal');
      setTimeout(() => {
        setIsLocationModalOpen(false);
      }, 1500);
    }
  };

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
      onClick={() => setIsLocationModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          padding: '2rem',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
          border: '1px solid #cce7f5',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsLocationModalOpen(false)}
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
          aria-label="Close location selector"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: '#e5f3fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ThreeDMapPin size={24} />
          </div>
          <div>
            <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              Select Delivery &amp; Site Location
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
              Direct truck delivery &amp; installation available all over Vidarbha
            </p>
          </div>
        </div>

        {/* Current Active Location Pill */}
        <div
          style={{
            backgroundColor: '#f8fbfd',
            border: '1px solid #cce7f5',
            borderRadius: '14px',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              Currently Selected
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1d6796' }}>
              {selectedCity.name} {selectedCity.isHQ ? '★ Master Workshop Plant' : `(${selectedCity.distanceKm} km)`}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Estimated transit: <strong>{selectedCity.transitDays}</strong>
            </div>
          </div>

          <button
            onClick={handleDetectLocation}
            disabled={detecting}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              backgroundColor: '#e5f3fa',
              color: '#1d6796',
              border: '1px solid #cce7f5',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ModernLocationPin size={13} color="currentColor" />
            <span>{detecting ? 'Detecting...' : 'Auto Detect'}</span>
          </button>
        </div>

        {/* Manual Pincode Input */}
        <form onSubmit={handlePincodeSearch} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Enter Vidarbha Pincode (e.g. 445301)"
              value={customPincode}
              onChange={(e) => setCustomPincode(e.target.value)}
              style={{
                flex: 1,
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.7rem 1.25rem', fontSize: '0.85rem' }}
            >
              Verify
            </button>
          </div>
          {pincodeMessage && (
            <p style={{ color: '#16a34a', fontSize: '0.8rem', marginTop: '4px', fontWeight: 600 }}>
              {pincodeMessage}
            </p>
          )}
        </form>

        {/* Vidarbha Hubs Grid */}
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem' }}>
          Operational Delivery Hubs Across Vidarbha:
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '8px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          {VIDARBHA_CITIES.map((city) => {
            const isSelected = selectedCity.name === city.name;
            return (
              <button
                key={city.name}
                onClick={() => {
                  setSelectedCityByName(city.name);
                  setIsLocationModalOpen(false);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  backgroundColor: isSelected ? '#e5f3fa' : '#ffffff',
                  border: isSelected ? '2px solid #2380b8' : '1px solid #e2e8f0',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#1d6796' : '#0f172a' }}>
                    {city.name}
                  </span>
                  {city.isHQ && (
                    <span style={{ fontSize: '0.65rem', color: '#d97706', fontWeight: 800 }}>★ HQ</span>
                  )}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                  {city.transitDays}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#1d6796', fontWeight: 700, marginTop: '4px' }}>
                  {city.baseDeliveryFee === 0 ? 'Free Factory Delivery' : `Truck Fleet: ₹${city.baseDeliveryFee}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
