import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Car,
  Users,
  X,
  CheckCircle2,
  Sparkles,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../../services/api';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProperty?: string;
}

export const SiteVisitModal: React.FC<SiteVisitModalProps> = ({
  isOpen,
  onClose,
  defaultProperty = '3 BHK Duplex Villa / Master Plotted Enclave',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyInterested: defaultProperty,
    preferredDate: '',
    preferredSlot: 'Morning Slot (10:00 AM – 12:30 PM)',
    transportAssistance: 'Free Pick & Drop (Balaghat Station / Wainganga Bypass)',
    visitorsCount: 2,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    if (!formData.name.trim() || !formData.phone.trim() || !formData.preferredDate) {
      setErrorMsg('Please enter your name, mobile number, and preferred date.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await api.bookSiteVisit(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.message || 'Failed to book site visit. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  // Get tomorrow's date string YYYY-MM-DD as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <div
      className="vanam-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 34, 26, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
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
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: 'min(92vh, 760px)',
          overflow: 'hidden',
          overscrollBehavior: 'contain',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          border: '2px solid #C99A43',
          position: 'relative',
          animation: 'fadeScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div
          style={{
            flexShrink: 0,
            backgroundColor: '#064B3B',
            backgroundImage: 'radial-gradient(circle at 85% 30%, rgba(201, 154, 67, 0.25) 0%, transparent 60%)',
            padding: '1.75rem 1.75rem 1.5rem',
            color: '#FFFFFF',
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D8AE61', marginBottom: '0.4rem' }}>
            <Sparkles size={16} />
            <span style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Complimentary VIP Experience
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.65rem',
              fontWeight: 700,
              color: '#FFF5E5',
              margin: '0 0 0.4rem',
            }}
          >
            Book Your Guided Site Visit
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'rgba(255, 245, 229, 0.85)', margin: 0, lineHeight: 1.45 }}>
            Experience the panoramic forest views, actual plots, sample duplex villas, and Canopy Club firsthand in Balaghat.
          </p>
        </div>

        {submitted ? (
          <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(6, 75, 59, 0.1)',
                border: '2px solid #064B3B',
                color: '#064B3B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <CheckCircle2 size={38} color="#064B3B" />
            </div>

            <h4
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.5rem',
                color: '#064B3B',
                margin: '0 0 0.5rem',
                fontWeight: 700,
              }}
            >
              VIP Appointment Confirmed!
            </h4>

            <p style={{ color: '#5C574F', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Thank you, <strong>{formData.name}</strong>. Your private tour for{' '}
              <strong>{formData.propertyInterested}</strong> has been scheduled for{' '}
              <span style={{ color: '#064B3B', fontWeight: 700 }}>{formData.preferredDate}</span> ({formData.preferredSlot}).
              Our dedicated estate concierge will call you on <strong>{formData.phone}</strong> shortly to share driver/directions details.
            </p>

            <div
              style={{
                backgroundColor: '#FAF6EF',
                padding: '1rem',
                borderRadius: '12px',
                border: '1.5px solid rgba(201, 154, 67, 0.35)',
                marginBottom: '1.5rem',
                fontSize: '0.84rem',
                color: '#625E56',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#064B3B', fontWeight: 700, marginBottom: '4px' }}>
                <MapPin size={16} color="#C99A43" />
                <span>Site Address:</span>
              </div>
              <div>Vanam Valley, Garra-Lalburra Road, Balaghat, MP (10 Mins from Wainganga Bypass)</div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '12px 32px',
                backgroundColor: '#064B3B',
                color: '#FFFFFF',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.94rem',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(6, 75, 59, 0.25)',
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#FDF2F2',
                  border: '1px solid #F8B4B4',
                  color: '#9B1C1C',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  marginBottom: '1rem',
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Property Interest */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                Property Option To Inspect
              </label>
              <select
                value={formData.propertyInterested}
                onChange={(e) => setFormData({ ...formData, propertyInterested: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '8px',
                  border: '1.5px solid #D8D3C8',
                  fontSize: '0.9rem',
                  backgroundColor: '#FAF6EF',
                  color: '#064B3B',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="3 BHK Duplex Forest Villa (1,551 sq.ft.)">3 BHK Duplex Forest Villa (1,551 sq.ft.)</option>
                <option value="Garra Freehold Residential Plots (1,200 – 3,500 sq.ft.)">Garra Freehold Residential Plots (1,200 – 3,500 sq.ft.)</option>
                <option value="Entire Eco-Township & Canopy Club Facilities">Entire Eco-Township & Canopy Club Facilities</option>
                <option value="The Villa Reserve & Rengatolla Plots">The Villa Reserve & Rengatolla Plots</option>
              </select>
            </div>

            {/* Date & Time Slot Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  <Calendar size={14} color="#C99A43" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  min={minDateStr}
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.8rem',
                    borderRadius: '8px',
                    border: '1.5px solid #D8D3C8',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    backgroundColor: '#FAF6EF',
                    color: '#064B3B',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  <Clock size={14} color="#C99A43" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={formData.preferredSlot}
                  onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.8rem',
                    borderRadius: '8px',
                    border: '1.5px solid #D8D3C8',
                    fontSize: '0.85rem',
                    boxSizing: 'border-box',
                    backgroundColor: '#FAF6EF',
                    color: '#064B3B',
                    outline: 'none',
                  }}
                >
                  <option value="Morning Slot (10:00 AM – 12:30 PM)">Morning (10:00 AM – 12:30 PM)</option>
                  <option value="Afternoon Slot (02:00 PM – 04:30 PM)">Afternoon (02:00 PM – 04:30 PM)</option>
                  <option value="Sunset Golden Hour (04:30 PM – 06:30 PM)">Sunset (04:30 PM – 06:30 PM)</option>
                </select>
              </div>
            </div>

            {/* Transportation Assistance */}
            <div style={{ marginBottom: '1.1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                <Car size={14} color="#C99A43" />
                <span>Transportation Option</span>
              </label>
              <select
                value={formData.transportAssistance}
                onChange={(e) => setFormData({ ...formData, transportAssistance: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.8rem',
                  borderRadius: '8px',
                  border: '1.5px solid #D8D3C8',
                  fontSize: '0.86rem',
                  boxSizing: 'border-box',
                  backgroundColor: '#FAF6EF',
                  color: '#064B3B',
                  outline: 'none',
                }}
              >
                <option value="Free Pick & Drop (Balaghat Station / Wainganga Bypass)">
                  Free AC Pick & Drop (Balaghat Railway Station / Wainganga Bypass)
                </option>
                <option value="Self Vehicle / Personal Transport">Self Vehicle / Personal Transport (We will send Google GPS location)</option>
              </select>
            </div>

            {/* Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.8rem',
                    borderRadius: '8px',
                    border: '1.5px solid #D8D3C8',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.8rem',
                    borderRadius: '8px',
                    border: '1.5px solid #D8D3C8',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Email & Visitors Count */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.8rem',
                    borderRadius: '8px',
                    border: '1.5px solid #D8D3C8',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#064B3B', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                  <Users size={14} color="#C99A43" />
                  <span>Visitors</span>
                </label>
                <select
                  value={formData.visitorsCount}
                  onChange={(e) => setFormData({ ...formData, visitorsCount: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.8rem',
                    borderRadius: '8px',
                    border: '1.5px solid #D8D3C8',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                >
                  <option value={1}>1 Person</option>
                  <option value={2}>2 Persons (Family)</option>
                  <option value={3}>3 Persons</option>
                  <option value={4}>4 Persons</option>
                  <option value={5}>5+ Group</option>
                </select>
              </div>
            </div>

            {/* Trust badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: '#6A665E',
                marginBottom: '1.25rem',
                padding: '8px 12px',
                backgroundColor: '#FAF6EF',
                borderRadius: '8px',
              }}
            >
              <ShieldCheck size={16} color="#064B3B" />
              <span>Complimentary visit with licensed township surveyor. Zero booking charges or obligations.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#064B3B',
                color: '#FFFFFF',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.98rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(6, 75, 59, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.75 : 1,
              }}
            >
              <Calendar size={18} />
              <span>{loading ? 'Confirming Appointment...' : 'Schedule My VIP Site Visit'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

