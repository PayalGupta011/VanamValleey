import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Send, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPropertyInterest?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultPropertyInterest = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyInterest: defaultPropertyInterest || 'General Enquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
      return () => {
        document.body.style.overflow = originalBodyOverflow || 'unset';
        document.documentElement.style.overflow = originalHtmlOverflow || 'unset';
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError('Please fill in your name, phone number, and email.');
      return;
    }

    setLoading(true);
    const result = await api.submitEnquiry(formData);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          propertyInterest: 'General Enquiry',
          message: '',
        });
        onClose();
      }, 2500);
    } else {
      setError(result.message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div
      className="vanam-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 25, 20, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.75rem, 2vh, 1.5rem)',
        zIndex: 9999,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="vanam-modal-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px solid rgba(201, 154, 67, 0.4)',
          width: '100%',
          maxWidth: '520px',
          maxHeight: 'min(92vh, 700px)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(201, 154, 67, 0.15)',
          overflow: 'hidden',
          overscrollBehavior: 'contain',
          position: 'relative',
          animation: 'fadeInUp 0.3s ease-out',
          margin: 'auto',
        }}
      >
        {/* Header (Pinned at top) */}
        <div
          style={{
            flexShrink: 0,
            background: 'linear-gradient(135deg, #032C22 0%, #064B3B 100%)',
            padding: '1.25rem 1.75rem',
            color: '#F8F6F0',
            position: 'relative',
            borderBottom: '1px solid rgba(201, 154, 67, 0.3)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(201, 154, 67, 0.3)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFE5B4',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(201, 154, 67, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <X size={18} />
          </button>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#FFE5B4',
              marginBottom: '0.2rem',
            }}
          >
            <Sparkles size={12} color="#FFE5B4" />
            <span>Connect With Vanam Valley</span>
          </div>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.35rem, 2vw, 1.6rem)',
              fontWeight: 600,
              margin: 0,
              color: '#FFFFFF',
            }}
          >
            Enquire About Forest Living
          </h3>
          <p
            style={{
              margin: '0.2rem 0 0',
              fontSize: '0.8rem',
              color: 'rgba(250, 246, 239, 0.75)',
            }}
          >
            Balaghat, Madhya Pradesh • 129 Signature Villas & Plots
          </p>
        </div>

        {/* Content (Scrollable if height exceeds screen) */}
        <div
          style={{
            padding: 'clamp(1.2rem, 2vh, 1.5rem) clamp(1.25rem, 2.5vw, 1.75rem)',
            overflowY: 'auto',
            flex: 1,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {success ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                color: '#004B3C',
              }}
            >
              <CheckCircle size={56} color="#004B3C" style={{ margin: '0 auto 1rem' }} />
              <h4
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Thank You for Your Interest
              </h4>
              <p style={{ color: '#5C574F', fontSize: '0.95rem' }}>
                Your enquiry has been received. Our luxury property advisor will connect with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    backgroundColor: '#FDF2F2',
                    border: '1px solid #F8B4B4',
                    color: '#9B1C1C',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#3E3A34',
                    marginBottom: '0.35rem',
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Payal Gupta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    fontSize: '0.9rem',
                    border: '1.5px solid #E8E5DE',
                    borderRadius: '6px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#3E3A34',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      fontSize: '0.9rem',
                      border: '1.5px solid #E8E5DE',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#3E3A34',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      fontSize: '0.9rem',
                      border: '1.5px solid #E8E5DE',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#3E3A34',
                    marginBottom: '0.35rem',
                  }}
                >
                  Property / Interest
                </label>
                <input
                  type="text"
                  placeholder="3 BHK Villa / Residential Plot / General"
                  value={formData.propertyInterest}
                  onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    fontSize: '0.9rem',
                    border: '1.5px solid #E8E5DE',
                    borderRadius: '6px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#3E3A34',
                    marginBottom: '0.35rem',
                  }}
                >
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your requirements or preferred time for a site visit..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    fontSize: '0.9rem',
                    border: '1.5px solid #E8E5DE',
                    borderRadius: '6px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  backgroundColor: '#004B3C',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background-color 0.2s',
                }}
              >
                <Send size={16} />
                <span>{loading ? 'Submitting...' : 'Request Private Consultation'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

