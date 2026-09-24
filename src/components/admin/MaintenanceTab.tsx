'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Machine, MachineStatus, MaintenanceLog } from '@/data/adminInitialData';
import {
  ThreeDShield,
  ThreeDClock,
  ThreeDBolt,
  ThreeDSuccess,
  ThreeDFactory,
  ThreeDLaser,
} from '@/components/ThreeDIcons';

export default function MaintenanceTab() {
  const { machines, maintenanceLogs, updateMachineStatus, addMaintenanceLog, resolveMaintenanceTicket } = useAdmin();

  const [isAddLogModalOpen, setIsAddLogModalOpen] = useState(false);
  const [selectedMachineForLog, setSelectedMachineForLog] = useState(machines[0]?.id || '');
  const [logForm, setLogForm] = useState({
    type: 'preventative' as 'preventative' | 'repair' | 'calibration',
    technician: 'Dinesh Sawant',
    cost: '5000',
    serviceDate: new Date().toISOString().split('T')[0],
    status: 'scheduled' as 'scheduled' | 'in_progress' | 'completed',
    notes: '',
  });

  const [resolvingLog, setResolvingLog] = useState<MaintenanceLog | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getStatusBadge = (status: MachineStatus) => {
    switch (status) {
      case 'operational':
        return (
          <span
            style={{
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
            Operational
          </span>
        );
      case 'scheduled_service':
        return (
          <span
            style={{
              backgroundColor: '#fef3c7',
              color: '#b45309',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d97706' }} />
            Service Scheduled
          </span>
        );
      case 'maintenance_required':
        return (
          <span
            style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
            Maintenance Required
          </span>
        );
    }
  };

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    const machine = machines.find((m) => m.id === selectedMachineForLog);
    if (!machine) return;

    addMaintenanceLog({
      machineId: machine.id,
      machineName: machine.name,
      serviceDate: logForm.serviceDate,
      type: logForm.type,
      technician: logForm.technician,
      cost: parseFloat(logForm.cost) || 0,
      status: logForm.status,
      notes: logForm.notes || 'Routine preventative inspection & oil check',
    });

    setIsAddLogModalOpen(false);
    setLogForm({
      type: 'preventative',
      technician: 'Dinesh Sawant',
      cost: '5000',
      serviceDate: new Date().toISOString().split('T')[0],
      status: 'scheduled',
      notes: '',
    });
  };

  const handleResolveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingLog) return;

    resolveMaintenanceTicket(
      resolvingLog.id,
      resolvingLog.machineId,
      resolutionNotes || 'Technician completed repair and certified zero fault tolerance.'
    );

    setResolvingLog(null);
    setResolutionNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '1.5rem 2rem',
          borderRadius: '18px',
          border: '1px solid #cce7f5',
          boxShadow: '0 8px 24px -8px rgba(56, 158, 211, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Machinery Health &amp; Maintenance Diagnostics
          </h2>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', marginTop: '2px' }}>
            Telemetry, preventative calibration cycles, and ISO-9001 compliance logs
          </p>
        </div>

        <button
          onClick={() => setIsAddLogModalOpen(true)}
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.65rem 1.25rem',
            fontSize: '0.875rem',
            borderRadius: '10px',
          }}
        >
          <ThreeDShield size={18} />
          <span>+ Log Maintenance Ticket</span>
        </button>
      </div>

      {/* Machine Health Cards Grid */}
      <div>
        <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
          Fabrication Floor Equipment Status ({machines.length} Units)
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {machines.map((machine) => {
            const isAlert = machine.status === 'maintenance_required';
            const isWarning = machine.status === 'scheduled_service';

            return (
              <div
                key={machine.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: isAlert ? '2px solid #fca5a5' : isWarning ? '1px solid #fde68a' : '1px solid #cce7f5',
                  boxShadow: '0 8px 24px -8px rgba(56, 158, 211, 0.1)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          backgroundColor: '#e5f3fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {machine.category.includes('Laser') ? <ThreeDLaser size={24} /> : <ThreeDFactory size={24} />}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                          {machine.name}
                        </h4>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{machine.model}</div>
                      </div>
                    </div>
                    {getStatusBadge(machine.status)}
                  </div>

                  {/* Health score gauge */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                      <span style={{ color: '#475569' }}>Health Score</span>
                      <span style={{ color: machine.healthPercentage >= 90 ? '#16a34a' : machine.healthPercentage >= 80 ? '#d97706' : '#dc2626' }}>
                        {machine.healthPercentage}%
                      </span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${machine.healthPercentage}%`,
                          borderRadius: '9999px',
                          backgroundColor: machine.healthPercentage >= 90 ? '#16a34a' : machine.healthPercentage >= 80 ? '#f59e0b' : '#ef4444',
                        }}
                      />
                    </div>
                  </div>

                  {/* Metadata fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', marginBottom: '1rem', backgroundColor: '#f8fbfd', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Hours Logged</div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{machine.hoursRun.toLocaleString()} hrs</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Lead Technician</div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{machine.assignedTechnician}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Last Service</div>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{machine.lastServiceDate}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.72rem' }}>Next Due</div>
                      <div style={{ fontWeight: 700, color: isAlert ? '#dc2626' : isWarning ? '#d97706' : '#1d6796' }}>
                        {machine.nextServiceDue}
                      </div>
                    </div>
                  </div>

                  {machine.notes && (
                    <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, margin: '0 0 1rem', fontStyle: 'italic' }}>
                      "{machine.notes}"
                    </p>
                  )}
                </div>

                {/* Status Toggle control */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Override Status:</span>
                  <select
                    value={machine.status}
                    onChange={(e) => {
                      const newSt = e.target.value as MachineStatus;
                      const health = newSt === 'operational' ? 96 : newSt === 'scheduled_service' ? 88 : 72;
                      updateMachineStatus(machine.id, newSt, health);
                    }}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      color: '#334155',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="operational">Operational</option>
                    <option value="scheduled_service">Scheduled Service</option>
                    <option value="maintenance_required">Maintenance Required</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Maintenance History & Ticket Registry Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #cce7f5',
          boxShadow: '0 10px 30px -10px rgba(56, 158, 211, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Maintenance Service &amp; Calibration Logs
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
              Historical record of repairs, preventative flushes, and precision alignments
            </p>
          </div>
          <span className="badge-ice">
            {maintenanceLogs.length} Records
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fbfd', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  Date &amp; Equipment
                </th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  Service Type
                </th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  Technician
                </th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  Cost
                </th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                  Ticket Status
                </th>
                <th style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'right' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.map((log) => {
                const isCompleted = log.status === 'completed';

                return (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.1rem 1.25rem' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.925rem' }}>
                        {log.machineName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                        Date: {log.serviceDate}
                      </div>
                    </td>

                    <td style={{ padding: '1.1rem 1.25rem' }}>
                      <span
                        style={{
                          textTransform: 'capitalize',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: log.type === 'repair' ? '#b91c1c' : log.type === 'calibration' ? '#1d6796' : '#15803d',
                        }}
                      >
                        {log.type}
                      </span>
                    </td>

                    <td style={{ padding: '1.1rem 1.25rem' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>{log.technician}</div>
                    </td>

                    <td style={{ padding: '1.1rem 1.25rem' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{formatINR(log.cost)}</div>
                    </td>

                    <td style={{ padding: '1.1rem 1.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor:
                            log.status === 'completed'
                              ? '#dcfce7'
                              : log.status === 'in_progress'
                              ? '#fef3c7'
                              : '#e0f2fe',
                          color:
                            log.status === 'completed'
                              ? '#15803d'
                              : log.status === 'in_progress'
                              ? '#b45309'
                              : '#0369a1',
                        }}
                      >
                        {log.status === 'completed' ? 'Completed' : log.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                      </span>
                    </td>

                    <td style={{ padding: '1.1rem 1.25rem', textAlign: 'right' }}>
                      {!isCompleted ? (
                        <button
                          onClick={() => setResolvingLog(log)}
                          style={{
                            backgroundColor: '#2380b8',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                          Verified OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Create Maintenance Log */}
      {isAddLogModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={() => setIsAddLogModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ThreeDShield size={26} />
                <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Log Workshop Service Ticket
                </h3>
              </div>
              <button
                onClick={() => setIsAddLogModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: '#64748b', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLog}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Select Workshop Equipment *
                </label>
                <select
                  value={selectedMachineForLog}
                  onChange={(e) => setSelectedMachineForLog(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                >
                  {machines.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.model})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Service Category
                  </label>
                  <select
                    value={logForm.type}
                    onChange={(e) => setLogForm({ ...logForm, type: e.target.value as any })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  >
                    <option value="preventative">Preventative Maintenance</option>
                    <option value="repair">Corrective Repair</option>
                    <option value="calibration">Precision Calibration</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Assigned Technician
                  </label>
                  <input
                    type="text"
                    required
                    value={logForm.technician}
                    onChange={(e) => setLogForm({ ...logForm, technician: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Estimated Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={logForm.cost}
                    onChange={(e) => setLogForm({ ...logForm, cost: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Service Date
                  </label>
                  <input
                    type="date"
                    value={logForm.serviceDate}
                    onChange={(e) => setLogForm({ ...logForm, serviceDate: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Initial Status
                  </label>
                  <select
                    value={logForm.status}
                    onChange={(e) => setLogForm({ ...logForm, status: e.target.value as any })}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Diagnostics &amp; Scope of Work
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Inspect hydraulic lines, replace seal rings, purge nitrogen line, check digital optical sensor."
                  value={logForm.notes}
                  onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddLogModalOpen(false)}
                  style={{ padding: '0.7rem 1.25rem', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.7rem 1.5rem', borderRadius: '10px' }}
                >
                  Log Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Resolve Ticket */}
      {resolvingLog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={() => setResolvingLog(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <ThreeDSuccess size={32} />
              <div>
                <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Certify Service Completion
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{resolvingLog.machineName}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Marking this maintenance service ticket as resolved will restore the machine's health gauge to <strong>98% (Operational)</strong>.
            </p>

            <form onSubmit={handleResolveTicket}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Resolution Summary &amp; QC Verification Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Ground clamp cable replaced with heavy duty copper core. Resistance tested at 0.02 ohms. Certified ready for shift."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.875rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setResolvingLog(null)}
                  style={{ padding: '0.7rem 1.25rem', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.7rem 1.5rem', borderRadius: '10px' }}
                >
                  Confirm &amp; Restore Machine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
