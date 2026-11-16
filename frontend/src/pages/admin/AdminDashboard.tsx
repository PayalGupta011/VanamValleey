import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Inbox,
  FileCheck2,
  AlertCircle,
  Plus,
  ArrowRight,
  Clock,
  Phone,
  Mail,
} from 'lucide-react';
import { api } from '../../services/api';
import type { Property, EnquiryItem } from '../../types';
import { LoadingSpinner } from '../../components/shared/StateStates';

export const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      api.adminGetProperties({ limit: 50 }),
      api.adminGetEnquiries({ limit: 10 }),
    ]).then(([propsRes, enqRes]) => {
      if (isMounted) {
        setProperties(propsRes.properties);
        setEnquiries(enqRes.enquiries);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading executive analytics..." />;
  }

  const publishedCount = properties.filter((p) => p.isPublished).length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '2.4rem',
            color: '#004B3C',
            margin: '0 0 0.25rem',
            fontWeight: 600,
          }}
        >
          Overview Dashboard
        </h1>
        <p style={{ color: '#7A756C', fontSize: '0.92rem', margin: 0 }}>
          Real-time summary of Vanam Valley properties, client inquiries, and published assets.
        </p>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #E8E5DE',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#7A756C', textTransform: 'uppercase' }}>
              Total Residences
            </span>
            <Building2 size={20} color="#004B3C" />
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '2.4rem', fontWeight: 700, color: '#004B3C' }}>
            {properties.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#7A756C' }}>Villas and forest estate plots</span>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #E8E5DE',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#7A756C', textTransform: 'uppercase' }}>
              Published Live
            </span>
            <FileCheck2 size={20} color="#2D7A4F" />
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '2.4rem', fontWeight: 700, color: '#2D7A4F' }}>
            {publishedCount}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#7A756C' }}>Visible on public website</span>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #E8E5DE',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#7A756C', textTransform: 'uppercase' }}>
              New Enquiries
            </span>
            <AlertCircle size={20} color="#C47F2F" />
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '2.4rem', fontWeight: 700, color: '#C47F2F' }}>
            {newEnquiriesCount}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#7A756C' }}>Awaiting initial response</span>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #E8E5DE',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#7A756C', textTransform: 'uppercase' }}>
              Total Inquiries
            </span>
            <Inbox size={20} color="#B68B45" />
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '2.4rem', fontWeight: 700, color: '#004B3C' }}>
            {enquiries.length}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#7A756C' }}>Lifetime client contacts</span>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        <Link
          to="/admin/properties"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            backgroundColor: '#004B3C',
            color: '#FFFFFF',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'background-color 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Plus size={18} />
            <span>Manage Properties</span>
          </div>
          <ArrowRight size={16} />
        </Link>

        <Link
          to="/admin/enquiries"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            backgroundColor: '#FFFFFF',
            color: '#004B3C',
            borderRadius: '10px',
            border: '1px solid #E8E5DE',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Inbox size={18} color="#B68B45" />
            <span>Process Client Inquiries</span>
          </div>
          <ArrowRight size={16} />
        </Link>

        <Link
          to="/admin/content"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            backgroundColor: '#FFFFFF',
            color: '#004B3C',
            borderRadius: '10px',
            border: '1px solid #E8E5DE',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCheck2 size={18} color="#B68B45" />
            <span>Edit Website Content</span>
          </div>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Recent Enquiries Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E8E5DE',
          padding: '1.75rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.5rem',
                color: '#004B3C',
                margin: '0 0 0.25rem',
              }}
            >
              Recent Client Enquiries
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#7A756C', margin: 0 }}>
              Latest leads submitted via website consultation forms
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            style={{
              fontSize: '0.84rem',
              color: '#004B3C',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <p style={{ color: '#7A756C', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>
            No inquiries recorded yet.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #F0EEE9', color: '#7A756C', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 12px' }}>Client Name</th>
                  <th style={{ padding: '10px 12px' }}>Contact</th>
                  <th style={{ padding: '10px 12px' }}>Unit Interest</th>
                  <th style={{ padding: '10px 12px' }}>Date</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 5).map((enq) => {
                  const statusColors: Record<string, { bg: string; text: string }> = {
                    new: { bg: '#FEF3C7', text: '#92400E' },
                    contacted: { bg: '#DBEAFE', text: '#1E40AF' },
                    'follow-up': { bg: '#E0E7FF', text: '#3730A3' },
                    closed: { bg: '#D1FAE5', text: '#065F46' },
                  };
                  const colors = statusColors[enq.status] || { bg: '#F3F4F6', text: '#374151' };

                  return (
                    <tr key={enq._id} style={{ borderBottom: '1px solid #F5F3EF' }}>
                      <td style={{ padding: '14px 12px', fontWeight: 600, color: '#3E3A34' }}>
                        {enq.name}
                      </td>
                      <td style={{ padding: '14px 12px', color: '#5C574F' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
                          <Phone size={12} color="#7A756C" />
                          <span>{enq.phone}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', marginTop: '2px' }}>
                          <Mail size={12} color="#7A756C" />
                          <span>{enq.email}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 12px', color: '#004B3C', fontWeight: 500 }}>
                        {enq.propertyInterest || 'General Inquiry'}
                      </td>
                      <td style={{ padding: '14px 12px', color: '#7A756C', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} />
                          <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            backgroundColor: colors.bg,
                            color: colors.text,
                          }}
                        >
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

