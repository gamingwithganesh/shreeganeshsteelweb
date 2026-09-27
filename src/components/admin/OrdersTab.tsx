'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Order, OrderStatus, OrderPriority } from '@/data/adminInitialData';
import { VIDARBHA_CITIES } from '@/context/CartContext';
import ConfirmWipeModal from './ConfirmWipeModal';

export default function OrdersTab() {
  const { orders, updateOrderStatus, deleteOrder, updateOrder, wipeAllAppData, seedSampleData, addOrder } = useAdmin();

  // Filters & search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState('');
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  // Delete confirmation
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  // Edit Order Modal State
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editForm, setEditForm] = useState<Partial<Order>>({});

  const handleConfirmWipe = async () => {
    setIsWiping(true);
    await wipeAllAppData();
    setIsWiping(false);
    setIsWipeModalOpen(false);
  };

  // Add Order Modal State
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    city: 'Ghatanji',
    siteAddress: '',
    serviceCategory: 'Custom Steel Gate',
    material: 'Mild Steel IS-2062 (14 Gauge)',
    dimensions: '12ft Width x 7ft Height',
    amount: 45000,
    advancePaid: 15000,
    deliveryMethod: 'workshop_dispatch' as 'workshop_dispatch' | 'factory_pickup',
    deliveryCharge: 0,
    includeAntiRustPrimer: true,
    coatingCharge: 2700,
    includeInstallation: true,
    installationCharge: 3500,
    priority: 'urgent' as OrderPriority,
    notes: '',
  });

  const handleCitySelect = (cityName: string) => {
    const found = VIDARBHA_CITIES.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
    const fee = found ? found.baseDeliveryFee : 850;
    setNewOrderForm((prev) => ({
      ...prev,
      city: cityName,
      deliveryCharge: prev.deliveryMethod === 'factory_pickup' ? 0 : fee,
    }));
  };

  const handleDeliveryMethodChange = (method: 'workshop_dispatch' | 'factory_pickup') => {
    const found = VIDARBHA_CITIES.find((c) => c.name.toLowerCase() === newOrderForm.city.toLowerCase());
    const fee = found ? found.baseDeliveryFee : 850;
    setNewOrderForm((prev) => ({
      ...prev,
      deliveryMethod: method,
      deliveryCharge: method === 'factory_pickup' ? 0 : fee,
    }));
  };

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderForm.clientName.trim() || !newOrderForm.clientPhone.trim()) {
      setToastMsg('Please enter Client Name and Phone number.');
      setTimeout(() => setToastMsg(''), 3000);
      return;
    }

    const totalAmt = Number(newOrderForm.amount) || 0;
    const advPaid = Math.min(Number(newOrderForm.advancePaid) || 0, totalAmt);
    const balance = Math.max(0, totalAmt - advPaid);

    const deliveryDesc =
      newOrderForm.deliveryMethod === 'factory_pickup'
        ? 'Self Pickup from Workshop (Free)'
        : `Workshop Delivery to Site (${newOrderForm.city})`;

    addOrder({
      clientName: newOrderForm.clientName.trim(),
      clientPhone: newOrderForm.clientPhone.trim(),
      clientEmail:
        newOrderForm.clientEmail.trim() ||
        `${newOrderForm.clientName.toLowerCase().replace(/[^a-z0-9]/g, '')}@client.in`,
      serviceCategory: newOrderForm.serviceCategory.trim() || 'Custom Steel Fabrication',
      material: newOrderForm.material.trim() || 'Mild Steel IS-2062',
      dimensions: newOrderForm.dimensions.trim() || 'Custom Fit',
      amount: totalAmt,
      advancePaid: advPaid,
      balanceDue: balance,
      city: newOrderForm.city,
      siteAddress: newOrderForm.siteAddress.trim() || `${newOrderForm.city}, Vidarbha`,
      deliveryMethod: newOrderForm.deliveryMethod,
      deliveryCharge: newOrderForm.deliveryMethod === 'factory_pickup' ? 0 : newOrderForm.deliveryCharge,
      includeAntiRustPrimer: newOrderForm.includeAntiRustPrimer,
      coatingCharge: newOrderForm.includeAntiRustPrimer ? newOrderForm.coatingCharge : 0,
      includeInstallation: newOrderForm.includeInstallation,
      installationCharge: newOrderForm.includeInstallation ? newOrderForm.installationCharge : 0,
      status: 'order_confirmed',
      priority: newOrderForm.priority,
      targetDate: 'Within 7-10 Days',
      notes: newOrderForm.notes
        ? `${deliveryDesc} | ${newOrderForm.notes}`
        : `${deliveryDesc} | ${newOrderForm.includeAntiRustPrimer ? 'Dual-Coat Anti-Rust Primer (+6%)' : 'Raw Finish'} | ${newOrderForm.includeInstallation ? 'On-Site Installation' : 'Fabrication Only'}`,
    });

    setToastMsg(`Order for ${newOrderForm.clientName} created successfully!`);
    setTimeout(() => setToastMsg(''), 3500);
    setIsAddOrderModalOpen(false);
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
      order.serviceCategory.toLowerCase().includes(q) ||
      (order.notes && order.notes.toLowerCase().includes(q)) ||
      (order.deliveryMethod && order.deliveryMethod.toLowerCase().includes(q)) ||
      (order.deliveryMethod === 'factory_pickup' && 'pickup free'.includes(q)) ||
      (order.deliveryMethod === 'workshop_dispatch' && 'delivery dispatch'.includes(q)) ||
      (order.includeAntiRustPrimer && 'primer anti-rust'.includes(q)) ||
      (order.includeInstallation && 'installation erection'.includes(q));

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

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId);
    setDeletingOrderId(null);
    setToastMsg('Order deleted successfully.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenEdit = (order: Order) => {
    setEditingOrder(order);
    setEditForm({
      clientName: order.clientName,
      clientPhone: order.clientPhone,
      clientEmail: order.clientEmail,
      serviceCategory: order.serviceCategory,
      city: order.city,
      siteAddress: order.siteAddress,
      amount: order.amount,
      advancePaid: order.advancePaid,
      balanceDue: order.balanceDue,
      notes: order.notes,
      material: order.material,
      dimensions: order.dimensions,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    const totalAmt = Number(editForm.amount) || 0;
    const advPaid = Math.min(Number(editForm.advancePaid) || 0, totalAmt);
    updateOrder(editingOrder.id, {
      ...editForm,
      amount: totalAmt,
      advancePaid: advPaid,
      balanceDue: Math.max(0, totalAmt - advPaid),
    });
    setEditingOrder(null);
    setEditForm({});
    setToastMsg('Order updated successfully.');
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
            onClick={() => setIsAddOrderModalOpen(true)}
            style={{
              backgroundColor: '#09090b',
              border: '1px solid #09090b',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>+ Add Order</span>
          </button>

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
        <div className="admin-tab-scroll" style={{ display: 'flex', gap: '6px', overflowX: 'auto', alignItems: 'center' }}>
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(order)}
                      title="Edit Order"
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        border: '1px solid #e4e4e7',
                        backgroundColor: '#ffffff',
                        color: '#09090b',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>

                    {/* Delete Button or Confirm */}
                    {deletingOrderId === order.id ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #fecdd3', backgroundColor: '#fff1f2' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9f1239' }}>Confirm delete?</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(order.id)}
                          style={{
                            padding: '2px 8px', borderRadius: '4px', border: 'none',
                            backgroundColor: '#e11d48', color: '#ffffff', fontSize: '0.72rem',
                            fontWeight: 700, cursor: 'pointer',
                          }}
                        >Yes, Delete</button>
                        <button
                          type="button"
                          onClick={() => setDeletingOrderId(null)}
                          style={{
                            padding: '2px 8px', borderRadius: '4px', border: '1px solid #e4e4e7',
                            backgroundColor: '#ffffff', color: '#71717a', fontSize: '0.72rem',
                            fontWeight: 600, cursor: 'pointer',
                          }}
                        >Cancel</button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeletingOrderId(order.id)}
                        title="Delete Order"
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid #fecdd3',
                          backgroundColor: '#fff1f2',
                          color: '#e11d48',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* Content grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                    gap: '12px',
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

                {/* Logistics & Add-ons Badge Row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    padding: '10px 12px',
                    backgroundColor: '#fafafa',
                    borderRadius: '10px',
                    border: '1px solid #f4f4f5',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#71717a',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginRight: '2px',
                    }}
                  >
                    Delivery &amp; Add-ons:
                  </span>

                  {/* 1. Delivery Badge */}
                  {order.deliveryMethod === 'factory_pickup' ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        backgroundColor: '#ffffff',
                        color: '#09090b',
                        border: '1px solid #d4d4d8',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Self Pickup from Workshop (Free)
                    </span>
                  ) : (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        backgroundColor: '#09090b',
                        color: '#ffffff',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      Workshop Delivery to Site ({order.city || 'Ghatanji'})
                      {order.deliveryCharge && order.deliveryCharge > 0
                        ? ` • ₹${order.deliveryCharge.toLocaleString('en-IN')}`
                        : ' • Free Delivery'}
                    </span>
                  )}

                  {/* 2. Anti-Rust Primer Badge */}
                  {order.includeAntiRustPrimer || (order.coatingCharge && order.coatingCharge > 0) ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        backgroundColor: '#ffffff',
                        color: '#09090b',
                        border: '1px solid #d4d4d8',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                      Include Dual-Coat Anti-Rust Primer (+6%)
                      {order.coatingCharge && order.coatingCharge > 0
                        ? ` • ₹${order.coatingCharge.toLocaleString('en-IN')}`
                        : ''}
                    </span>
                  ) : (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        color: '#a1a1aa',
                        border: '1px dashed #e4e4e7',
                      }}
                    >
                      Anti-Rust Primer: Excluded (Raw Finish)
                    </span>
                  )}

                  {/* 3. On-Site Installation Badge */}
                  {order.includeInstallation || (order.installationCharge && order.installationCharge > 0) ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        backgroundColor: '#ffffff',
                        color: '#09090b',
                        border: '1px solid #d4d4d8',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                      Include On-Site Installation
                      {order.installationCharge && order.installationCharge > 0
                        ? ` • ₹${order.installationCharge.toLocaleString('en-IN')}`
                        : ''}
                    </span>
                  ) : (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        color: '#a1a1aa',
                        border: '1px dashed #e4e4e7',
                      }}
                    >
                      Installation: Excluded (Fabrication Only)
                    </span>
                  )}
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

      {/* Edit Order Modal */}
      {editingOrder && (
        <div
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)', zIndex: 4000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          }}
          onClick={() => setEditingOrder(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e4e4e7',
              width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f4f4f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#09090b' }}>Edit Order</div>
                <div style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '2px', fontFamily: 'monospace' }}>{editingOrder.orderNumber}</div>
              </div>
              <button type="button" onClick={() => setEditingOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', fontSize: '1.1rem' }}>✕</button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleEditSubmit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="admin-form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Client Name *</label>
                  <input
                    type="text" required
                    value={editForm.clientName || ''}
                    onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Phone *</label>
                  <input
                    type="text" required
                    value={editForm.clientPhone || ''}
                    onChange={(e) => setEditForm({ ...editForm, clientPhone: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Email</label>
                <input
                  type="email"
                  value={editForm.clientEmail || ''}
                  onChange={(e) => setEditForm({ ...editForm, clientEmail: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div className="admin-form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Service / Category</label>
                  <input
                    type="text"
                    value={editForm.serviceCategory || ''}
                    onChange={(e) => setEditForm({ ...editForm, serviceCategory: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>City</label>
                  <input
                    type="text"
                    value={editForm.city || ''}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Site Address</label>
                <input
                  type="text"
                  value={editForm.siteAddress || ''}
                  onChange={(e) => setEditForm({ ...editForm, siteAddress: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div className="admin-form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Total Amount (₹)</label>
                  <input
                    type="number" min={0}
                    value={editForm.amount ?? ''}
                    onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Advance Paid (₹)</label>
                  <input
                    type="number" min={0}
                    value={editForm.advancePaid ?? ''}
                    onChange={(e) => setEditForm({ ...editForm, advancePaid: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#52525b', marginBottom: '4px' }}>Notes</label>
                <textarea
                  rows={2}
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '0.85rem', resize: 'vertical', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  style={{
                    padding: '9px 18px', borderRadius: '8px', border: '1px solid #e4e4e7',
                    backgroundColor: '#ffffff', color: '#52525b', fontSize: '0.85rem',
                    fontWeight: 600, cursor: 'pointer',
                  }}
                >Cancel</button>
                <button
                  type="submit"
                  style={{
                    padding: '9px 20px', borderRadius: '8px', border: 'none',
                    backgroundColor: '#09090b', color: '#ffffff', fontSize: '0.85rem',
                    fontWeight: 700, cursor: 'pointer',
                  }}
                >Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {/* Add New Workshop Order Modal */}
      {isAddOrderModalOpen && (
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
            padding: '16px',
          }}
          onClick={() => setIsAddOrderModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e4e4e7',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid #e4e4e7',
                position: 'sticky',
                top: 0,
                backgroundColor: '#ffffff',
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    backgroundColor: '#09090b',
                    color: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  NEW
                </span>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#09090b', margin: 0 }}>
                  Add Workshop Order
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddOrderModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  color: '#71717a',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateOrderSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Section 1: Client Information */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#09090b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  1. Client Details
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={newOrderForm.clientName}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, clientName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 94230 32182"
                      value={newOrderForm.clientPhone}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, clientPhone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginTop: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Operational City
                    </label>
                    <select
                      value={newOrderForm.city}
                      onChange={(e) => handleCitySelect(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {VIDARBHA_CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.transitDays}) {c.baseDeliveryFee > 0 ? `+₹${c.baseDeliveryFee}` : '(Free/HQ)'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Site Installation Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Plot 24, MIDC Road"
                      value={newOrderForm.siteAddress}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, siteAddress: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Fabrication Specs */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#09090b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  2. Fabrication Item &amp; Specifications
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Product / Service Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Architectural CNC Laser Cut Gate"
                      value={newOrderForm.serviceCategory}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, serviceCategory: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Material &amp; Gauge
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mild Steel IS-2062 (14 Gauge)"
                      value={newOrderForm.material}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, material: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginTop: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Dimensions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12ft Width x 7ft Height"
                      value={newOrderForm.dimensions}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, dimensions: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Total Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={newOrderForm.amount}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, amount: Number(e.target.value) || 0 })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                      Advance Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={newOrderForm.advancePaid}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, advancePaid: Number(e.target.value) || 0 })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #d4d4d8',
                        fontSize: '0.825rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Logistics & Delivery Method (Radio Selection) */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#09090b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  3. Logistics &amp; Delivery Method
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#09090b', fontWeight: 600 }}>
                    <input
                      type="radio"
                      name="adminDeliveryMethod"
                      checked={newOrderForm.deliveryMethod === 'workshop_dispatch'}
                      onChange={() => handleDeliveryMethodChange('workshop_dispatch')}
                      style={{ accentColor: '#09090b' }}
                    />
                    <span>Workshop Delivery to Site ({newOrderForm.city})</span>
                    {newOrderForm.deliveryCharge > 0 && (
                      <span style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 400 }}>
                        (Fee: ₹{newOrderForm.deliveryCharge})
                      </span>
                    )}
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#09090b', fontWeight: 600 }}>
                    <input
                      type="radio"
                      name="adminDeliveryMethod"
                      checked={newOrderForm.deliveryMethod === 'factory_pickup'}
                      onChange={() => handleDeliveryMethodChange('factory_pickup')}
                      style={{ accentColor: '#09090b' }}
                    />
                    <span>Self Pickup from Workshop (Free)</span>
                  </label>
                </div>
              </div>

              {/* Section 4: Workshop Add-ons (Checkboxes) */}
              <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#09090b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  4. Customer Chosen Add-ons
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#09090b', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={newOrderForm.includeAntiRustPrimer}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, includeAntiRustPrimer: e.target.checked })}
                      style={{ accentColor: '#09090b', width: '16px', height: '16px' }}
                    />
                    <span>Include Dual-Coat Anti-Rust Primer (+6%)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem', color: '#09090b', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={newOrderForm.includeInstallation}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, includeInstallation: e.target.checked })}
                      style={{ accentColor: '#09090b', width: '16px', height: '16px' }}
                    />
                    <span>Include On-Site Installation</span>
                  </label>
                </div>
              </div>

              {/* Section 5: Notes & Priority */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                    Priority
                  </label>
                  <select
                    value={newOrderForm.priority}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, priority: e.target.value as OrderPriority })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d4d4d8',
                      fontSize: '0.825rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="urgent">Urgent</option>
                    <option value="standard">Standard</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#52525b', marginBottom: '4px' }}>
                    Workshop Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Automated gate motor track mounting"
                    value={newOrderForm.notes}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d4d4d8',
                      fontSize: '0.825rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #e4e4e7', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddOrderModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e4e4e7',
                    backgroundColor: '#ffffff',
                    color: '#52525b',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#09090b',
                    color: '#ffffff',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Create Order
                </button>
              </div>
            </form>
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
