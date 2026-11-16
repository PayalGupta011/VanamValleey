import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { Property } from '../types';
import { api } from '../services/api';
import { LoadingSpinner, EmptyState } from '../components/shared/StateStates';

interface PropertyDetailProps {
  onOpenEnquiry?: (propertyTitle: string) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form state for inline enquiry
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);
    api
      .getPropertyBySlug(slug)
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    setFormError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError('Please enter your name, phone number, and email.');
      return;
    }

    setSubmitting(true);
    const res = await api.submitEnquiry({
      ...formData,
      propertyInterest: `${property.title} (${property.configuration || property.propertyType})`,
    });
    setSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } else {
      setFormError(res.message || 'Submission failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <LoadingSpinner message="Fetching residence details..." />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
        <EmptyState
          title="Residence Not Found"
          description="The property you requested does not exist or has been relocated."
          action={
            <Link
              to="/properties"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                backgroundColor: '#004B3C',
                color: '#FFFFFF',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Properties</span>
            </Link>
          }
        />
      </div>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images
    : [
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          alt: property.title,
        },
      ];

  const activeImage = images[activeImageIndex] || images[0];

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Top Breadcrumb Bar */}
      <div
        style={{
          backgroundColor: '#F8F6F0',
          borderBottom: '1px solid #E8E5DE',
          padding: '1rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.86rem',
            color: '#7A756C',
          }}
        >
          <Link
            to="/properties"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#004B3C',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            <span>All Residences</span>
          </Link>
          <div>
            <span>Balaghat, M.P.</span> &gt; <strong style={{ color: '#004B3C' }}>{property.title}</strong>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        {/* Header Title + Price Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#004B3C',
                  color: '#F8F6F0',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                }}
              >
                {property.propertyType}
              </span>
              {property.status && (
                <span
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#F7D6B0',
                    color: '#004B3C',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                  }}
                >
                  {property.status}
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#004B3C',
                margin: '0 0 0.5rem',
                lineHeight: 1.15,
              }}
            >
              {property.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B68B45', fontSize: '0.92rem' }}>
              <MapPin size={16} />
              <span>
                {property.location.area ? `${property.location.area}, ` : ''}
                {property.location.city}, {property.location.state}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#7A756C', letterSpacing: '0.08em' }}>
              Price
            </span>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '2.2rem',
                fontWeight: 700,
                color: '#004B3C',
                lineHeight: 1.1,
              }}
            >
              {property.priceDisplay || 'Price on Request'}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          {/* Main Large Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '520px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#F5F3EF',
              marginBottom: '1rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            }}
          >
            <img
              loading="lazy"
              decoding="async"
              src={activeImage.url}
              alt={activeImage.alt || property.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.3s ease',
              }}
            />
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '100px',
                    height: '70px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid #004B3C' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                    opacity: activeImageIndex === idx ? 1 : 0.7,
                    transition: 'all 0.2s',
                  }}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={img.url}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout (2 Cols: Specs + Enquiry Form) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3.5rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Details & Amenities */}
          <div>
            {/* Quick Specs Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                backgroundColor: '#F8F6F0',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #E8E5DE',
                marginBottom: '2.5rem',
              }}
            >
              {property.configuration && (
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#7A756C', display: 'block' }}>
                    Configuration
                  </span>
                  <strong style={{ fontSize: '1rem', color: '#004B3C' }}>{property.configuration}</strong>
                </div>
              )}

              {property.plotArea?.value > 0 && (
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#7A756C', display: 'block' }}>
                    Plot Area
                  </span>
                  <strong style={{ fontSize: '1rem', color: '#004B3C' }}>
                    {property.plotArea.value} {property.plotArea.unit}
                  </strong>
                </div>
              )}

              {property.builtUpArea?.value > 0 && (
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#7A756C', display: 'block' }}>
                    Built-up Area
                  </span>
                  <strong style={{ fontSize: '1rem', color: '#004B3C' }}>
                    {property.builtUpArea.value} {property.builtUpArea.unit}
                  </strong>
                </div>
              )}

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#7A756C', display: 'block' }}>
                  Tenure
                </span>
                <strong style={{ fontSize: '1rem', color: '#004B3C' }}>Freehold Clear Title</strong>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.85rem',
                  color: '#004B3C',
                  marginBottom: '1rem',
                }}
              >
                About This Residence
              </h2>
              <p style={{ color: '#5C574F', fontSize: '1.02rem', lineHeight: 1.8 }}>
                {property.description}
              </p>
            </div>

            {/* Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.5rem',
                    color: '#004B3C',
                    marginBottom: '1rem',
                  }}
                >
                  Architectural Highlights
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {property.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle size={18} color="#004B3C" />
                      <span style={{ fontSize: '0.92rem', color: '#3E3A34' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.5rem',
                    color: '#004B3C',
                    marginBottom: '1rem',
                  }}
                >
                  Exclusive Amenities
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                  }}
                >
                  {property.amenities.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#F8F6F0',
                        borderRadius: '6px',
                        border: '1px solid #E8E5DE',
                        fontSize: '0.88rem',
                        color: '#004B3C',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Sparkles size={14} color="#B68B45" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dedicated Enquiry Form Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E8E5DE',
              boxShadow: '0 12px 35px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              position: 'sticky',
              top: '100px',
            }}
          >
            <div
              style={{
                backgroundColor: '#004B3C',
                color: '#F8F6F0',
                padding: '1.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#F7D6B0',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                Inquire For This Unit
              </span>
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.6rem',
                  color: '#F8F6F0',
                  margin: 0,
                }}
              >
                Schedule Residence Consultation
              </h3>
            </div>

            <div style={{ padding: '2rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={52} color="#004B3C" style={{ margin: '0 auto 1rem' }} />
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.6rem',
                      color: '#004B3C',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Enquiry Received
                  </h4>
                  <p style={{ color: '#5C574F', fontSize: '0.9rem' }}>
                    Our sales advisor will connect with you with the official floor plans and pricing schedule.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit}>
                  {formError && (
                    <div
                      style={{
                        backgroundColor: '#FDF2F2',
                        color: '#9B1C1C',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.84rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <AlertCircle size={15} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1CDC4',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
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
                        padding: '0.75rem',
                        border: '1px solid #D1CDC4',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
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
                        padding: '0.75rem',
                        border: '1px solid #D1CDC4',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                      Message or Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`I am interested in learning more about ${property.title}...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #D1CDC4',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: '#004B3C',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    <Send size={16} />
                    <span>{submitting ? 'Sending Enquiry...' : 'Enquire About This Residence'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
