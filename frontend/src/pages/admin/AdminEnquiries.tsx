import React, { useState, useEffect } from 'react';
import {
  Search,
  Trash2,
  Phone,
  Mail,
  Eye,
  X,
  Calendar,
  Car,
  MessageSquare,
} from 'lucide-react';
import { api } from '../../services/api';
import type { EnquiryItem, SiteVisitItem } from '../../types';
import { LoadingSpinner, EmptyState } from '../../components/shared/StateStates';

type ActiveView = 'enquiries' | 'site_visits';

export const AdminEnquiries: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('enquiries');

  // Enquiries state
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  // Site visits state
  const [siteVisits, setSiteVisits] = useState<SiteVisitItem[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(true);
  const [visitStatusFilter, setVisitStatusFilter] = useState<string>('all');
  const [visitSearchQuery, setVisitSearchQuery] = useState('');
  const [selectedVisit, setSelectedVisit] = useState<SiteVisitItem | null>(null);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    const params: any = { limit: 100 };
    if (statusFilter !== 'all') params.status = statusFilter;
    const res = await api.adminGetEnquiries(params);
    setEnquiries(res.enquiries);
    setLoadingEnquiries(false);
  };

  const fetchSiteVisits = async () => {
    setLoadingVisits(true);
    const params: any = { limit: 100 };
    if (visitStatusFilter !== 'all') params.status = visitStatusFilter;
    const res = await api.adminGetSiteVisits(params);
    setSiteVisits(res.siteVisits || []);
    setLoadingVisits(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  useEffect(() => {
    fetchSiteVisits();
  }, [visitStatusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const res = await api.adminUpdateEnquiry(id, { status: newStatus });
    setUpdatingId(null);
    if (res.success) {
      setEnquiries(
        enquiries.map((e) => (e._id === id ? { ...e, status: newStatus as any } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as any });
      }
    } else {
      alert(res.message || 'Status update failed');
    }
  };

  const handleVisitStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const res = await api.adminUpdateSiteVisit(id, { status: newStatus });
    setUpdatingId(null);
    if (res.success) {
      setSiteVisits(
        siteVisits.map((v) => (v._id === id ? { ...v, status: newStatus as any } : v))
      );
      if (selectedVisit && selectedVisit._id === id) {
        setSelectedVisit({ ...selectedVisit, status: newStatus as any });
      }
    } else {
      alert(res.message || 'Status update failed');
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    const res = await api.adminDeleteEnquiry(id);
    if (res.success) {
      setEnquiries(enquiries.filter((e) => e._id !== id));
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } else {
      alert(res.message || 'Failed to delete');
    }
  };

  const handleDeleteVisit = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this site visit appointment?')) return;
    const res = await api.adminDeleteSiteVisit(id);
    if (res.success) {
      setSiteVisits(siteVisits.filter((v) => v._id !== id));
      if (selectedVisit?._id === id) setSelectedVisit(null);
    } else {
      alert(res.message || 'Failed to delete appointment');
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      e.propertyInterest?.toLowerCase().includes(q)
    );
  });

  const filteredVisits = siteVisits.filter((v) => {
    if (!visitSearchQuery.trim()) return true;
    const q = visitSearchQuery.toLowerCase();
    return (
      v.name.toLowerCase().includes(q) ||
      v.phone.toLowerCase().includes(q) ||
      v.propertyInterested?.toLowerCase().includes(q) ||
      v.preferredDate?.toLowerCase().includes(q)
    );
  });

  const enquiryStatusColors: Record<string, { bg: string; text: string }> = {
    new: { bg: '#FEF3C7', text: '#92400E' },
    contacted: { bg: '#DBEAFE', text: '#1E40AF' },
    'follow-up': { bg: '#E0E7FF', text: '#3730A3' },
    closed: { bg: '#D1FAE5', text: '#065F46' },
  };

  const visitStatusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: '#FEF3C7', text: '#92400E' },
    confirmed: { bg: '#DEF7EC', text: '#03543F' },
    completed: { bg: '#E1EFFE', text: '#1E429F' },
    cancelled: { bg: '#FDE8E8', text: '#9B1C1C' },
  };

  const pendingVisitsCount = siteVisits.filter((v) => v.status === 'pending').length;

  return (
    <div>
      {/* Page Title & View Switcher */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '2.4rem',
              color: '#004B3C',
              margin: '0 0 0.35rem',
              fontWeight: 700,
            }}
          >
            Leads & Site Visit Appointments
          </h1>
          <p style={{ color: '#7A756C', fontSize: '0.92rem', margin: 0 }}>
            Manage client inquiries, schedule private tours, coordinate pick-up transport, and track consultation pipelines.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: '#FAF6EF',
            padding: '4px',
            borderRadius: '12px',
            border: '1.5px solid rgba(201, 154, 67, 0.4)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveView('enquiries')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeView === 'enquiries' ? '#064B3B' : 'transparent',
              color: activeView === 'enquiries' ? '#FFFFFF' : '#064B3B',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <MessageSquare size={16} />
            <span>General Inquiries ({enquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('site_visits')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeView === 'site_visits' ? '#064B3B' : 'transparent',
              color: activeView === 'site_visits' ? '#FFFFFF' : '#064B3B',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Car size={16} />
            <span>VIP Site Visits ({siteVisits.length})</span>
            {pendingVisitsCount > 0 && (
              <span
                style={{
                  backgroundColor: '#C99A43',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  fontWeight: 800,
                }}
              >
                {pendingVisitsCount} New
              </span>
            )}
          </button>
        </div>
      </div>

      {/* =================================================================
          VIEW 1: GENERAL INQUIRIES
          ================================================================= */}
      {activeView === 'enquiries' && (
        <>
          {/* Filter and Search Bar */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              border: '1.5px solid #E8E5DE',
              marginBottom: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Status Tabs */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { label: 'All Inquiries', val: 'all' },
                { label: 'New', val: 'new' },
                { label: 'Contacted', val: 'contacted' },
                { label: 'Follow-Up', val: 'follow-up' },
                { label: 'Closed', val: 'closed' },
              ].map((tab) => (
                <button
                  key={tab.val}
                  type="button"
                  onClick={() => setStatusFilter(tab.val)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: statusFilter === tab.val ? '1.5px solid #064B3B' : '1px solid #E8E5DE',
                    backgroundColor: statusFilter === tab.val ? '#064B3B' : '#FAF6EF',
                    color: statusFilter === tab.val ? '#FFFFFF' : '#3E3A34',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Search name, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 38px',
                  borderRadius: '6px',
                  border: '1px solid #D1CDC4',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Enquiries Table */}
          {loadingEnquiries ? (
            <LoadingSpinner message="Loading client enquiries..." />
          ) : filteredEnquiries.length === 0 ? (
            <EmptyState title="No Enquiries Found" description="Try selecting a different status filter or clearing your search query." />
          ) : (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1.5px solid #E8E5DE',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF6EF', borderBottom: '1px solid #E8E5DE' }}>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Client Details</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Interest</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Received</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((item) => (
                    <tr key={item._id} style={{ borderBottom: '1px solid #F3F1EC', transition: 'background-color 0.2s' }}>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#1B2E28', fontSize: '0.94rem' }}>{item.name}</div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px', color: '#6A665E', fontSize: '0.8rem' }}>
                          <a href={`tel:${item.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#064B3B', textDecoration: 'none', fontWeight: 600 }}>
                            <Phone size={12} />
                            <span>{item.phone}</span>
                          </a>
                          {item.email && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Mail size={12} />
                              <span>{item.email}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ backgroundColor: '#FAF6EF', padding: '4px 10px', borderRadius: '6px', color: '#064B3B', fontWeight: 600, fontSize: '0.82rem', border: '1px solid rgba(201,154,67,0.3)' }}>
                          {item.propertyInterest}
                        </span>
                      </td>

                      <td style={{ padding: '16px 18px', color: '#6A665E', fontSize: '0.82rem' }}>
                        {new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <select
                          value={item.status}
                          disabled={updatingId === item._id}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: enquiryStatusColors[item.status]?.bg || '#F3F4F6',
                            color: enquiryStatusColors[item.status]?.text || '#1F2937',
                          }}
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="follow-up">FOLLOW-UP</option>
                          <option value="closed">CLOSED</option>
                        </select>
                      </td>

                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(item)}
                            style={{ padding: '6px', backgroundColor: '#FAF6EF', border: '1px solid #D8D3C8', borderRadius: '6px', color: '#064B3B', cursor: 'pointer' }}
                            title="View Message Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEnquiry(item._id)}
                            style={{ padding: '6px', backgroundColor: '#FDF2F2', border: '1px solid #F8B4B4', borderRadius: '6px', color: '#C4392F', cursor: 'pointer' }}
                            title="Delete Lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* =================================================================
          VIEW 2: VIP SITE VISIT APPOINTMENTS
          ================================================================= */}
      {activeView === 'site_visits' && (
        <>
          {/* Filter and Search Bar */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              border: '1.5px solid #E8E5DE',
              marginBottom: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Status Tabs */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { label: 'All Site Visits', val: 'all' },
                { label: 'Pending', val: 'pending' },
                { label: 'Confirmed', val: 'confirmed' },
                { label: 'Completed', val: 'completed' },
                { label: 'Cancelled', val: 'cancelled' },
              ].map((tab) => (
                <button
                  key={tab.val}
                  type="button"
                  onClick={() => setVisitStatusFilter(tab.val)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: visitStatusFilter === tab.val ? '1.5px solid #064B3B' : '1px solid #E8E5DE',
                    backgroundColor: visitStatusFilter === tab.val ? '#064B3B' : '#FAF6EF',
                    color: visitStatusFilter === tab.val ? '#FFFFFF' : '#3E3A34',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Search visitor, phone, property..."
                value={visitSearchQuery}
                onChange={(e) => setVisitSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 38px',
                  borderRadius: '6px',
                  border: '1px solid #D1CDC4',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Site Visits Table */}
          {loadingVisits ? (
            <LoadingSpinner message="Loading site visit appointments..." />
          ) : filteredVisits.length === 0 ? (
            <EmptyState
              title="No Site Visits Found"
              description="No visitor appointments scheduled matching this filter."
            />
          ) : (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1.5px solid #E8E5DE',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF6EF', borderBottom: '1px solid #E8E5DE' }}>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Visitor Details</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Visit Date & Slot</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Property Option</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Transportation</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '14px 18px', color: '#064B3B', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit) => (
                    <tr key={visit._id} style={{ borderBottom: '1px solid #F3F1EC', transition: 'background-color 0.2s' }}>
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#1B2E28', fontSize: '0.94rem' }}>{visit.name}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px', fontSize: '0.8rem' }}>
                          <a
                            href={`tel:${visit.phone}`}
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#064B3B', textDecoration: 'none', fontWeight: 600 }}
                          >
                            <Phone size={12} />
                            <span>{visit.phone}</span>
                          </a>
                          <span style={{ color: '#8C827A' }}>• {visit.visitorsCount} Person(s)</span>
                        </div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#064B3B' }}>
                          <Calendar size={14} color="#C99A43" />
                          <span>{visit.preferredDate}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#6A665E', marginTop: '2px' }}>
                          {visit.preferredSlot}
                        </div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ backgroundColor: '#FAF6EF', padding: '4px 10px', borderRadius: '6px', color: '#064B3B', fontWeight: 600, fontSize: '0.82rem', border: '1px solid rgba(201,154,67,0.3)' }}>
                          {visit.propertyInterested}
                        </span>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#2B4A3E', fontWeight: 500 }}>
                          <Car size={14} color="#064B3B" />
                          <span>{visit.transportAssistance?.includes('Free Pick') ? 'Free AC Pick & Drop' : 'Self Vehicle'}</span>
                        </div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <select
                          value={visit.status}
                          disabled={updatingId === visit._id}
                          onChange={(e) => handleVisitStatusChange(visit._id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: visitStatusColors[visit.status]?.bg || '#F3F4F6',
                            color: visitStatusColors[visit.status]?.text || '#1F2937',
                          }}
                        >
                          <option value="pending">PENDING</option>
                          <option value="confirmed">CONFIRMED</option>
                          <option value="completed">COMPLETED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      </td>

                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedVisit(visit)}
                            style={{ padding: '6px', backgroundColor: '#FAF6EF', border: '1px solid #D8D3C8', borderRadius: '6px', color: '#064B3B', cursor: 'pointer' }}
                            title="View Tour Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteVisit(visit._id)}
                            style={{ padding: '6px', backgroundColor: '#FDF2F2', border: '1px solid #F8B4B4', borderRadius: '6px', color: '#C4392F', cursor: 'pointer' }}
                            title="Delete Appointment"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100 }}
          onClick={() => setSelectedEnquiry(null)}
        >
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', maxWidth: '500px', width: '100%', padding: '2rem', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedEnquiry(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', color: '#004B3C', margin: '0 0 1rem' }}>
              Enquiry Consultation Detail
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div><strong>Name:</strong> {selectedEnquiry.name}</div>
              <div><strong>Phone:</strong> {selectedEnquiry.phone}</div>
              <div><strong>Email:</strong> {selectedEnquiry.email}</div>
              <div><strong>Interest:</strong> {selectedEnquiry.propertyInterest}</div>
              <div><strong>Date:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString()}</div>
              <div><strong>Message:</strong></div>
              <div style={{ backgroundColor: '#FAF6EF', padding: '1rem', borderRadius: '8px', lineHeight: 1.5, color: '#3E3A34' }}>
                {selectedEnquiry.message || 'No additional message provided.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Site Visit Detail Modal */}
      {selectedVisit && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100 }}
          onClick={() => setSelectedVisit(null)}
        >
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', padding: '2rem', position: 'relative', border: '2px solid #C99A43' }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedVisit(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}
            >
              <X size={20} />
            </button>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C99A43', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              <Car size={14} />
              <span>VIP Tour Appointment</span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#004B3C', margin: '0 0 1rem' }}>
              {selectedVisit.name}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div><strong>Contact Mobile:</strong> <a href={`tel:${selectedVisit.phone}`} style={{ color: '#064B3B', fontWeight: 700 }}>{selectedVisit.phone}</a></div>
              {selectedVisit.email && <div><strong>Email:</strong> {selectedVisit.email}</div>}
              <div><strong>Preferred Date:</strong> {selectedVisit.preferredDate}</div>
              <div><strong>Time Slot:</strong> {selectedVisit.preferredSlot}</div>
              <div><strong>Property To Inspect:</strong> {selectedVisit.propertyInterested}</div>
              <div><strong>Visitors Count:</strong> {selectedVisit.visitorsCount} Person(s)</div>
              <div><strong>Transportation:</strong> {selectedVisit.transportAssistance}</div>
              {selectedVisit.notes && (
                <>
                  <div><strong>Special Requests / Notes:</strong></div>
                  <div style={{ backgroundColor: '#FAF6EF', padding: '0.8rem', borderRadius: '8px', color: '#3E3A34' }}>
                    {selectedVisit.notes}
                  </div>
                </>
              )}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
              {selectedVisit.status !== 'confirmed' && (
                <button
                  type="button"
                  onClick={() => handleVisitStatusChange(selectedVisit._id, 'confirmed')}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#064B3B', color: '#FFFFFF', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Confirm Appointment
                </button>
              )}
              {selectedVisit.status !== 'completed' && (
                <button
                  type="button"
                  onClick={() => handleVisitStatusChange(selectedVisit._id, 'completed')}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#C99A43', color: '#064B3B', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
