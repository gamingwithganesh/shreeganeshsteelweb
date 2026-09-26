'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart, StoredOrder } from '@/context/CartContext';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import { ThreeDShield, ThreeDFactory, ThreeDTruck, ThreeDPhone, ThreeDClock } from '@/components/ThreeDIcons';
import { IconLogOut, IconDocument } from '@/components/Icons';

export default function ProfilePage() {
  const { userOrders, selectedCity, logoutUser } = useCart();
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<StoredOrder | null>(null);

  // Client info state
  const defaultClient = userOrders.length > 0 ? userOrders[0].siteInfo : {
    clientName: 'Sanjay Deshmukh',
    siteAddress: 'Civil Lines, Ring Road',
    city: 'Yavatmal',
    phone: '+91 94230 32182',
    whatsapp: '+91 94230 32182',
    siteIncharge: 'Self',
    includeInstallation: true,
    deliveryMethod: 'workshop_dispatch',
  };

  return (
    <div style={{ padding: '2rem 0 5rem', backgroundColor: '#f8fbfd', minHeight: '100vh' }}>
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Client Account &amp; Projects</span>
        </nav>

        {/* Profile Header */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #cce7f5',
            padding: '2rem 2.5rem',
            boxShadow: '0 12px 30px -10px rgba(56, 158, 211, 0.1)',
            marginBottom: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #68bae2, #1d6796)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.5rem',
                boxShadow: '0 4px 15px rgba(56, 158, 211, 0.3)',
              }}
            >
              {defaultClient.clientName ? defaultClient.clientName.charAt(0).toUpperCase() : 'C'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
                  {defaultClient.clientName || 'Client Portal'}
                </h1>
                <span className="badge-ice" style={{ fontSize: '0.72rem' }}>Verified Vidarbha Client</span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '2px' }}>
                Primary Site: <strong>{defaultClient.city}</strong> • Phone: {defaultClient.phone || '+91 94230 32182'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link href="/shop" className="btn-primary" style={{ padding: '0.7rem 1.4rem', fontSize: '0.85rem' }}>
              + Book New Fabrication
            </Link>
            <button
              type="button"
              onClick={logoutUser}
              style={{
                padding: '0.7rem 1.2rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#ef4444',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <IconLogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Section: Project Orders History */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Project Fabrication History ({userOrders.length})
            </h2>
            <Link href="/track-order" style={{ fontSize: '0.825rem', color: '#1d6796', fontWeight: 700 }}>
              Live Telemetry Tracker →
            </Link>
          </div>

          {userOrders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {userOrders.map((order) => (
                <div
                  key={order.orderId}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #cce7f5',
                    padding: '1.75rem',
                    boxShadow: '0 8px 24px -8px rgba(56, 158, 211, 0.08)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: '1rem',
                      marginBottom: '1rem',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                          #{order.orderId}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor:
                              order.status === 'installed'
                                ? '#dcfce7'
                                : order.status === 'dispatched'
                                ? '#fef3c7'
                                : '#e0f2fe',
                            color:
                              order.status === 'installed'
                                ? '#15803d'
                                : order.status === 'dispatched'
                                ? '#b45309'
                                : '#0369a1',
                          }}
                        >
                          ● {order.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                        Date: {order.date} • Site: {order.siteInfo.siteAddress}, {order.siteInfo.city}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d6796' }}>
                        ₹{order.grandTotal.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                        Advance: ₹{order.advancePaid.toLocaleString()} {order.balanceDue > 0 ? `(Bal: ₹${order.balanceDue.toLocaleString()})` : '(Fully Paid)'}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
                    {order.items.map((item, iIdx) => (
                      <div key={iIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                        <span style={{ color: '#0f172a', fontWeight: 600 }}>
                          • {item.name} ({item.widthFeet && item.heightFeet ? `${item.widthFeet}ft x ${item.heightFeet}ft` : 'Standard'} • {item.selectedGauge || '14G'})
                        </span>
                        <span style={{ color: '#64748b' }}>
                          ₹{(item.calculatedTotalPrice || parseInt(item.price.replace(/[^0-9]/g, '')) || 0).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                    <button
                      onClick={() => setSelectedOrderForModal(order)}
                      style={{
                        padding: '0.55rem 1.25rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                        fontWeight: 700,
                        fontSize: '0.825rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <IconDocument size={15} />
                      <span>View Bill / Receipt</span>
                    </button>

                    <Link
                      href={`/track-order?id=${order.orderId}`}
                      className="btn-primary"
                      style={{ padding: '0.55rem 1.25rem', fontSize: '0.825rem', fontWeight: 700 }}
                    >
                      Live Progress Tracker →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '3rem', textAlign: 'center', border: '1px solid #cce7f5' }}>
              <p style={{ color: '#64748b' }}>No past projects yet. Explore our workshop catalog to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      <OrderDetailsModal
        order={selectedOrderForModal}
        onClose={() => setSelectedOrderForModal(null)}
      />
    </div>
  );
}
