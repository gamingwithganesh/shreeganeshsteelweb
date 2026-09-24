'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Order, OrderStatus } from '@/data/adminInitialData';
import ConfirmWipeModal from './ConfirmWipeModal';

export default function OrdersTab() {
  const { orders, updateOrderStatus, wipeAllAppData, seedSampleData } = useAdmin();

  // Filters & search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState('');
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const handleConfirmWipe = async () => {
    setIsWiping(true);
    await wipeAllAppData();
    setIsWiping(false);
    setIsWipeModalOpen(false);
  };

  // Proof Lightbox Preview Modal State
  const [inspectingProof, setInspectingProof] = useState<{
    title: string;
    imageUrl: string;
    fileName: string;
    order: Order;
  } | null>(null);

  function toSimpleStatus(status: string): OrderStatus {
    switch (status) {
      case 'order_confirmed':
      case 'confirmed':
      case 'pending':
        return 'order_confirmed';
      case 'assigned':
      case 'material_procured':
        return 'assigned';
      case 'under_work':
      case 'in_fabrication':
      case 'cutting':
      case 'welding':
        return 'under_work';
      case 'work_completed':
      case 'qc_inspection':
      case 'coating':
      case 'ready_dispatch':
        return 'work_completed';
      case 'out_for_delivery':
      case 'ready_pickup':
      case 'dispatched':
        return 'out_for_delivery';
      case 'delivered':
      case 'picked_up':
      case 'installed':
        return 'delivered';
      default:
        return (status as OrderStatus) || 'order_confirmed';
    }
  }

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.orderNumber.toLowerCase().includes(q) ||
      order.clientName.toLowerCase().includes(q) ||
      (order.clientEmail && order.clientEmail.toLowerCase().includes(q)) ||
      (order.clientPhone && order.clientPhone.includes(q)) ||
      (order.city && order.city.toLowerCase().includes(q)) ||
      (order.siteAddress && order.siteAddress.toLowerCase().includes(q)) ||
      (order.transactionRef && order.transactionRef.toLowerCase().includes(q)) ||
      order.serviceCategory.toLowerCase().includes(q);

    const simpleStat = toSimpleStatus(order.status);
    const matchesStatus = statusFilter === 'all' || simpleStat === statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    const labelMap: Record<string, string> = {
      order_confirmed: 'Order Confirmed',
      assigned: 'Assigned',
      under_work: 'Under Work',
      work_completed: 'Work Completed',
      out_for_delivery: 'Out for Delivery / Ready to Pick Up',
      delivered: 'Delivered / Picked Up Done',
    };
    setToastMsg(`Order updated to: ${labelMap[newStatus] || newStatus}`);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#09090b',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Orders
          </h1>
          <span
            style={{
              backgroundColor: '#09090b',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
            }}
          >
            {filteredOrders.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              seedSampleData();
              setToastMsg('Sample orders loaded.');
              setTimeout(() => setToastMsg(''), 2500);
            }}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              color: '#09090b',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            <span>Load Demo</span>
          </button>

          <button
            type="button"
            onClick={() => setIsWipeModalOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              color: '#dc2626',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Reset</span>
          </button>
        </div>
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

      {/* 2. Search & Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e4e4e7',
          padding: '12px 16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f4f4f5',
            borderRadius: '8px',
            padding: '8px 12px',
            flex: '1 1 260px',
          }}
        >
          <svg width="15" height="15" fill="none" stroke="#71717a" strokeWidth="2.2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '0.825rem',
              color: '#09090b',
              background: 'transparent',
            }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', alignItems: 'center' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'order_confirmed', label: 'Order Confirmed' },
            { id: 'assigned', label: 'Assigned' },
            { id: 'under_work', label: 'Under Work' },
            { id: 'work_completed', label: 'Work Complete' },
            { id: 'out_for_delivery', label: 'Out for Delivery / Ready' },
            { id: 'delivered', label: 'Delivered / Picked Up' },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: isActive ? '1px solid #09090b' : '1px solid #e4e4e7',
                  backgroundColor: isActive ? '#09090b' : '#ffffff',
                  color: isActive ? '#ffffff' : '#71717a',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredOrders.length === 0 ? (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e4e4e7',
              padding: '40px 20px',
              textAlign: 'center',
              color: '#71717a',
              fontSize: '0.85rem',
            }}
          >
            No orders found.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const hasScreenshot = Boolean(order.paymentScreenshot);
            const hasDesign = Boolean(order.customDesignImage);

            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e4e4e7',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    borderBottom: '1px solid #f4f4f5',
                    paddingBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        backgroundColor: '#09090b',
                        color: '#ffffff',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {order.orderNumber}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#71717a' }}>
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 600 }}>Status:</span>
                    <select
                      value={toSimpleStatus(order.status)}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e4e4e7',
                        color: '#09090b',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <option value="order_confirmed">1. Order Confirmed</option>
                      <option value="assigned">2. Assigned</option>
                      <option value="under_work">3. Under Work</option>
                      <option value="work_completed">4. Work Completed</option>
                      <option value="out_for_delivery">5. Out for Delivery / Ready to Pick Up</option>
                      <option value="delivered">6. Delivered / Picked Up Done</option>
                    </select>
                  </div>
                </div>

                {/* Content grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '14px',
                  }}
                >
                  {/* Client */}
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
                      Client
                    </div>
                    <div style={{ fontWeight: 700, color: '#09090b', fontSize: '0.85rem', marginTop: '2px' }}>
                      {order.clientName || 'Client'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#52525b', marginTop: '1px' }}>
                      {order.clientPhone || '-'}
                    </div>
                  </div>

                  {/* Site */}
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
                      Site
                    </div>
                    <div style={{ fontWeight: 600, color: '#09090b', fontSize: '0.85rem', marginTop: '2px' }}>
                      {order.city || 'Vidarbha'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '1px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {order.siteAddress || '-'}
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
                      Payment
                    </div>
                    <div style={{ fontWeight: 800, color: '#09090b', fontSize: '0.9rem', marginTop: '2px' }}>
                      ₹{order.amount.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#09090b', fontWeight: 600, marginTop: '1px' }}>
                      Adv: ₹{(order.advancePaid || order.amount).toLocaleString('en-IN')}
                      {order.balanceDue && order.balanceDue > 0 ? (
                        <span style={{ color: '#b91c1c', marginLeft: '6px' }}>
                          Due: ₹{order.balanceDue.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span style={{ color: '#71717a', marginLeft: '6px' }}>Paid</span>
                      )}
                    </div>
                  </div>

                  {/* Attachments */}
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
                      Attachments
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                      {hasScreenshot ? (
                        <button
                          type="button"
                          onClick={() =>
                            setInspectingProof({
                              title: 'Payment Receipt',
                              imageUrl: order.paymentScreenshot!,
                              fileName: `Receipt_${order.orderNumber}.jpg`,
                              order,
                            })
                          }
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e4e4e7',
                            backgroundColor: '#ffffff',
                            color: '#09090b',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span>Receipt</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>No receipt</span>
                      )}

                      {hasDesign && (
                        <button
                          type="button"
                          onClick={() =>
                            setInspectingProof({
                              title: 'Design Blueprint',
                              imageUrl: order.customDesignImage!,
                              fileName: order.customDesignFileName || `Design_${order.orderNumber}.jpg`,
                              order,
                            })
                          }
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e4e4e7',
                            backgroundColor: '#ffffff',
                            color: '#09090b',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                          <span>Blueprint</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items & Notes */}
                {(order.itemsSummary || order.serviceCategory || order.notes) && (
                  <div style={{ fontSize: '0.78rem', color: '#71717a', borderTop: '1px solid #f4f4f5', paddingTop: '8px' }}>
                    <span style={{ color: '#09090b', fontWeight: 600 }}>
                      {order.itemsSummary || order.serviceCategory}
                    </span>
                    {order.notes && <span style={{ marginLeft: '8px' }}>• {order.notes}</span>}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Proof Lightbox Modal */}
      {inspectingProof && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setInspectingProof(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e4e4e7',
              maxWidth: '560px',
              width: '100%',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 18px',
                borderBottom: '1px solid #e4e4e7',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#09090b' }}>
                {inspectingProof.title} ({inspectingProof.order.orderNumber})
              </span>
              <button
                type="button"
                onClick={() => setInspectingProof(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1rem',
                  color: '#71717a',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', backgroundColor: '#09090b' }}>
              <img
                src={inspectingProof.imageUrl}
                alt="Proof"
                style={{ maxHeight: '420px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '12px 18px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <a
                href={inspectingProof.imageUrl}
                download={inspectingProof.fileName}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: '1px solid #e4e4e7',
                  color: '#09090b',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Download
              </a>
              <button
                type="button"
                onClick={() => setInspectingProof(null)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#09090b',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
