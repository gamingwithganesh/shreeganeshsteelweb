'use client';

import React from 'react';
import { StoredOrder } from '@/context/CartContext';

interface OrderTrackerTimelineProps {
  status: StoredOrder['status'] | string;
  deliveryMethod?: 'workshop_dispatch' | 'factory_pickup';
}

export function getStageIndex(status: string): number {
  const s = (status || '').toLowerCase().trim();
  switch (s) {
    case 'order_confirmed':
    case 'confirmed':
    case 'pending':
      return 0;

    case 'assigned':
    case 'material_procured':
      return 1;

    case 'under_work':
    case 'in_fabrication':
    case 'cutting':
    case 'welding':
      return 2;

    case 'work_completed':
    case 'qc_inspection':
    case 'coating':
    case 'ready_dispatch':
      return 3;

    case 'out_for_delivery':
    case 'ready_pickup':
    case 'ready_to_pick_up':
    case 'dispatched':
      return 4;

    case 'delivered':
    case 'picked_up':
    case 'installed':
      return 5;

    default:
      return 0;
  }
}

export default function OrderTrackerTimeline({ status, deliveryMethod }: OrderTrackerTimelineProps) {
  const isPickup = deliveryMethod === 'factory_pickup';
  const activeIndex = getStageIndex(status);

  const stages = [
    {
      id: 'order_confirmed',
      title: 'Order Confirmed',
      desc: 'Booking received & order details verified',
    },
    {
      id: 'assigned',
      title: 'Assigned',
      desc: 'Assigned to workshop floor & materials allocated',
    },
    {
      id: 'under_work',
      title: 'Under Work',
      desc: 'Cutting, welding & fabrication in progress',
    },
    {
      id: 'work_completed',
      title: 'Work Completed',
      desc: 'Fabrication finished & quality inspection passed',
    },
    {
      id: 'out_for_delivery',
      title: isPickup ? 'Ready to Pick Up' : 'Out for Delivery',
      desc: isPickup
        ? 'Ready for pickup at Ghatanji workshop'
        : 'Dispatched for site delivery & installation',
    },
    {
      id: 'delivered',
      title: isPickup ? 'Picked Up Done' : 'Delivered Done',
      desc: isPickup
        ? 'Successfully handed over to client at workshop'
        : 'Safely delivered and erected on project site',
    },
  ];

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          position: 'relative',
        }}
      >
        {stages.map((stage, idx) => {
          const isDone = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div
              key={stage.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Icon Step Circle */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  marginBottom: '0.75rem',
                  transition: 'all 0.3s ease',
                  backgroundColor: isDone ? '#10b981' : isCurrent ? '#000000' : '#f1f5f9',
                  color: isDone || isCurrent ? '#ffffff' : '#94a3b8',
                  border: isCurrent ? '3px solid #000000' : 'none',
                  boxShadow: isCurrent ? '0 4px 12px rgba(0, 0, 0, 0.25)' : 'none',
                }}
              >
                {isDone ? '✓' : idx + 1}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: isCurrent ? '#000000' : isDone ? '#0f172a' : '#94a3b8',
                  marginBottom: '2px',
                }}
              >
                {stage.title}
              </div>

              {/* Description */}
              <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4, maxWidth: '130px' }}>
                {stage.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

