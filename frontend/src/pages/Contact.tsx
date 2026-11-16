import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Home,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Send,
  CheckCircle2,
  Headphones,
  Leaf,
  Navigation,
  Zap,
  Users,
} from 'lucide-react';
import type { WebsiteSettings } from '../types';
import { api } from '../services/api';

interface ContactProps {
  settings?: WebsiteSettings | null;
}

export const Contact: React.FC<ContactProps> = ({ settings }) => {
  const phone = settings?.contact?.phone || '+91 93716 91365';
  const email = settings?.contact?.email || 'info@vanamvalley.com';
  const address =
    settings?.contact?.address ||
    'Vanam Valley Development, Balaghat, Madhya Pradesh 481001, India';

  const [activeFormTab, setActiveFormTab] = useState<'enquiry' | 'visit'>('enquiry');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyInterest: '3 BHK Signature Forest Villa',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError('Please fill in your name, phone number, and email address.');
      return;
    }

    setLoading(true);
    const result = await api.submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyInterest: formData.propertyInterest,
      message: `[Tab: ${activeFormTab === 'enquiry' ? 'Official Enquiry' : 'Site Visit Request'}] ${formData.message || 'No additional message provided.'}`,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        propertyInterest: '3 BHK Signature Forest Villa',
        message: '',
      });
    } else {
      setError(result.message || 'Unable to submit enquiry. Please check your network.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', fontFamily: "'Poppins', sans-serif" }}>
      {/* =========================================================================
          HERO BANNER: CONNECT WITH VANAM VALLEY
          Exact Match to Reference Design (media_1794832671278_de676a48.jpg)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '480px',
          backgroundColor: '#00261E',
          backgroundImage: "url('/curved_villa_hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(4.5rem, 8vh, 6rem) 1.5rem 5rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Deep Forest Sunset Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0, 38, 30, 0.82) 0%, rgba(0, 24, 18, 0.68) 50%, rgba(0, 18, 14, 0.94) 100%)',
            zIndex: 1,
          }}
        />

        {/* Ambient Warm Golden Sunlight Radial Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '650px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(244, 198, 109, 0.25) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '0.8rem',
            }}
          >
            <div style={{ width: '30px', height: '1.5px', backgroundColor: '#C99A43' }} />
            <span
              style={{
                fontSize: 'clamp(0.74rem, 0.9vw, 0.82rem)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#F7D6B0',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              DIRECT INQUIRIES &amp; SITE VISITS
            </span>
            <div style={{ width: '30px', height: '1.5px', backgroundColor: '#C99A43' }} />
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              lineHeight: 1.12,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            }}
          >
            Connect With{' '}
            <span
              style={{
                color: '#F7D6B0',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              Vanam Valley
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '720px',
              margin: '0 auto 2.25rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Plan your site visit, get expert guidance, or enquire about our forest villas and plots in Balaghat, Madhya Pradesh.
          </p>

          {/* 4 Mini Feature Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.75rem)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#F7D6B0', fontSize: '0.84rem', fontWeight: 600 }}>
              <Headphones size={16} color="#F4C66D" />
              <span>Expert Guidance</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#F7D6B0', fontSize: '0.84rem', fontWeight: 600 }}>
              <Calendar size={16} color="#F4C66D" />
              <span>Site Visit Support</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#F7D6B0', fontSize: '0.84rem', fontWeight: 600 }}>
              <Leaf size={16} color="#F4C66D" />
              <span>Tailored Solutions</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#F7D6B0', fontSize: '0.84rem', fontWeight: 600 }}>
              <ShieldCheck size={16} color="#F4C66D" />
              <span>Trusted &amp; Verified</span>
            </div>
          </div>
        </div>

        {/* Sweeping Golden Wave Separator */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45px',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path d="M 0,35 Q 360,65 720,25 Q 1080,-15 1440,35 L 1440,60 L 0,60 Z" fill="#FAF7F2" />
            <path d="M 0,35 Q 360,65 720,25 Q 1080,-15 1440,35" fill="none" stroke="#C99A43" strokeWidth="2.5" opacity="0.85" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: GET IN TOUCH (2 COLUMNS: CONTACT DETAILS + LUXURY FORM)
          Exact Match to Reference Design (media_1794832671278_de676a48.jpg)
          ========================================================================= */}
      <section style={{ padding: 'clamp(3.5rem, 6vh, 5.5rem) clamp(1.2rem, 3.5vw, 3.5rem)', backgroundColor: '#FAF7F2' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'start',
            }}
          >
            {/* -------------------------------------------------------------
                LEFT COLUMN: 4 INFO CARDS + FIND US ON MAP CARD
                ------------------------------------------------------------- */}
            <div>
              {/* Heading */}
              <div style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                    fontWeight: 800,
                    color: '#00382B',
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1.15,
                  }}
                >
                  Get in Touch
                </h2>
                <div style={{ width: '60px', height: '3px', backgroundColor: '#C99A43', borderRadius: '2px', marginBottom: '1rem' }} />
                <p style={{ color: '#5C574F', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
                  Reach out to our real-estate team for enquiries, site visits, or personalized property guidance in Balaghat.
                </p>
              </div>

              {/* 4 Contact Cards Grid (2x2) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                {/* Card 1: Site & Experience Center */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    padding: '1.4rem',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#FFE6BD',
                      border: '1px solid #C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <MapPin size={20} color="#00382B" />
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', margin: '0 0 4px' }}>
                    Site &amp; Experience Center
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#6B665E', lineHeight: 1.5, margin: 0 }}>
                    {address}
                  </p>
                </div>

                {/* Card 2: Telephone */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    padding: '1.4rem',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#FFE6BD',
                      border: '1px solid #C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <Phone size={20} color="#00382B" />
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', margin: '0 0 4px' }}>
                    Telephone
                  </h4>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#002B20', marginBottom: '10px' }}>
                    {phone}
                  </div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#FAF7F2',
                      border: '1px solid #C99A43',
                      color: '#00382B',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={12} />
                    <span>Call Now</span>
                  </a>
                </div>

                {/* Card 3: Email Inquiries */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    padding: '1.4rem',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#FFE6BD',
                      border: '1px solid #C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <Mail size={20} color="#00382B" />
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', margin: '0 0 4px' }}>
                    Email Inquiries
                  </h4>
                  <div style={{ fontSize: '0.86rem', color: '#5C574F', marginBottom: '10px', wordBreak: 'break-all' }}>
                    {email}
                  </div>
                  <a
                    href={`mailto:${email}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#FAF7F2',
                      border: '1px solid #C99A43',
                      color: '#00382B',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <Mail size={12} />
                    <span>Send Email →</span>
                  </a>
                </div>

                {/* Card 4: Site Visit Timings */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1.5px solid rgba(201, 154, 67, 0.4)',
                    padding: '1.4rem',
                    boxShadow: '0 8px 24px rgba(6, 75, 59, 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#FFE6BD',
                      border: '1px solid #C99A43',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <Clock size={20} color="#00382B" />
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#002B20', margin: '0 0 4px' }}>
                    Site Visit Timings
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#6B665E', lineHeight: 1.5, margin: 0 }}>
                    Monday – Sunday<br />
                    9:30 AM to 6:00 PM<br />
                    <em>(By Appointment)</em>
                  </p>
                </div>
              </div>

              {/* Bottom Card: Find Us on Map */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(201, 154, 67, 0.4)',
                  padding: '1.25rem 1.75rem',
                  boxShadow: '0 8px 24px rgba(6, 75, 59, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src="/connectivity_3d_map_clean.png"
                    alt="Map Location"
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#002B20', margin: '0 0 2px' }}>
                      Find Us on Map
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#6B665E', margin: 0 }}>
                      Get directions to our site &amp; experience center in Balaghat.
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=21.8129,80.1838"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #FFE7CE 0%, #F7D6B0 100%)',
                    color: '#00261E',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(201, 154, 67, 0.25)',
                  }}
                >
                  <Navigation size={14} color="#00261E" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT COLUMN: LUXURY FLOATING INQUIRY / SITE VISIT FORM CARD
                ------------------------------------------------------------- */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                border: '1.8px solid rgba(201, 154, 67, 0.45)',
                padding: 'clamp(2rem, 3.5vw, 2.75rem)',
                boxShadow: '0 24px 60px rgba(6, 75, 59, 0.1), 0 0 30px rgba(201, 154, 67, 0.15)',
              }}
            >
              {/* Form Segmented Tabs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  backgroundColor: '#FAF7F2',
                  padding: '6px',
                  borderRadius: '16px',
                  marginBottom: '1.75rem',
                  border: '1px solid rgba(201, 154, 67, 0.3)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveFormTab('enquiry')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    backgroundColor: activeFormTab === 'enquiry' ? '#00382B' : 'transparent',
                    color: activeFormTab === 'enquiry' ? '#FFFFFF' : '#4A463F',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: activeFormTab === 'enquiry' ? '0 4px 14px rgba(0, 56, 43, 0.25)' : 'none',
                  }}
                >
                  <Send size={15} color={activeFormTab === 'enquiry' ? '#F4C66D' : '#6B665E'} />
                  <span>Send an Enquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFormTab('visit')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    backgroundColor: activeFormTab === 'visit' ? '#00382B' : 'transparent',
                    color: activeFormTab === 'visit' ? '#FFFFFF' : '#4A463F',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: activeFormTab === 'visit' ? '0 4px 14px rgba(0, 56, 43, 0.25)' : 'none',
                  }}
                >
                  <Calendar size={15} color={activeFormTab === 'visit' ? '#F4C66D' : '#6B665E'} />
                  <span>Book a Site Visit</span>
                </button>
              </div>

              {/* Form State Messages */}
              {success ? (
                <div
                  style={{
                    padding: '2.5rem 1.5rem',
                    borderRadius: '18px',
                    backgroundColor: '#EBF8F2',
                    border: '1.5px solid #22c55e',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 700, color: '#00382B', marginBottom: '6px' }}>
                    Thank You! Request Received
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#4A463F', margin: '0 auto 1.25rem', maxWidth: '380px', lineHeight: 1.5 }}>
                    Our VIP real estate consultant will connect with you within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    style={{
                      padding: '8px 22px',
                      backgroundColor: '#00382B',
                      color: '#FFFFFF',
                      borderRadius: '9999px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {error && (
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FCA5A5',
                        color: '#991B1B',
                        fontSize: '0.84rem',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#002B20', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        border: '1.2px solid rgba(201, 154, 67, 0.45)',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <User size={18} color="#966122" style={{ flexShrink: 0 }} />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Mahindra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#1A1815' }}
                      />
                    </div>
                  </div>

                  {/* Phone & Email Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#002B20', marginBottom: '6px' }}>
                        Phone Number *
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '11px 14px',
                          borderRadius: '12px',
                          border: '1.2px solid rgba(201, 154, 67, 0.45)',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <Phone size={17} color="#966122" style={{ flexShrink: 0 }} />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#1A1815' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#002B20', marginBottom: '6px' }}>
                        Email Address *
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '11px 14px',
                          borderRadius: '12px',
                          border: '1.2px solid rgba(201, 154, 67, 0.45)',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <Mail size={17} color="#966122" style={{ flexShrink: 0 }} />
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#1A1815' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interested Property */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#002B20', marginBottom: '6px' }}>
                      Interested Property / Unit Type
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        border: '1.2px solid rgba(201, 154, 67, 0.45)',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <Home size={17} color="#966122" style={{ flexShrink: 0 }} />
                      <select
                        value={formData.propertyInterest}
                        onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.88rem', color: '#1A1815', backgroundColor: 'transparent', cursor: 'pointer' }}
                      >
                        <option value="3 BHK Signature Forest Villa">3 BHK Signature Forest Villa (1,551 sq.ft.)</option>
                        <option value="Phase 1 Garra Residential Plots">Phase 1 Garra Residential Plots (1.76 Acres)</option>
                        <option value="Custom Villa Master Plot">Custom Villa Master Plot (1,200 – 3,500 sq.ft.)</option>
                        <option value="The Canopy Club Membership">The Canopy Club Membership</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#002B20', marginBottom: '6px' }}>
                      Message or Specific Inquiries
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '11px 14px',
                        borderRadius: '12px',
                        border: '1.2px solid rgba(201, 154, 67, 0.45)',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <MessageSquare size={17} color="#966122" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <textarea
                        rows={3}
                        placeholder="Specify any questions regarding plot dimensions, site visit availability, or pricing..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.88rem', color: '#1A1815', resize: 'vertical' }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px 28px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(135deg, #004B3C 0%, #00261E 100%)',
                      color: '#FFFFFF',
                      border: '1.5px solid #C99A43',
                      fontWeight: 700,
                      fontSize: '0.94rem',
                      letterSpacing: '0.04em',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 8px 24px rgba(0, 56, 43, 0.35)',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginTop: '6px',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 56, 43, 0.45), 0 0 20px rgba(201, 154, 67, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 56, 43, 0.35)';
                      }
                    }}
                  >
                    <Send size={16} color="#F4C66D" />
                    <span>{loading ? 'Submitting...' : 'SUBMIT OFFICIAL ENQUIRY →'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM FEATURE RIBBON (4 PILL ITEMS)
          Exact Match to Reference Design (media_1794832671278_de676a48.jpg)
          ========================================================================= */}
      <section style={{ padding: '0 clamp(1.2rem, 3.5vw, 3.5rem) 4rem', backgroundColor: '#FAF7F2' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid rgba(201, 154, 67, 0.4)',
              padding: 'clamp(1.25rem, 2vw, 1.75rem) clamp(1.5rem, 2.5vw, 2.5rem)',
              boxShadow: '0 10px 30px rgba(6, 75, 59, 0.05)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Item 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE6BD',
                  border: '1.2px solid #C99A43',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Zap size={20} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#002B20' }}>Quick Response</div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C' }}>Within 24 Hours</div>
              </div>
            </div>

            {/* Item 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE6BD',
                  border: '1.2px solid #C99A43',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Users size={20} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#002B20' }}>Dedicated Support</div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C' }}>From Our Property Experts</div>
              </div>
            </div>

            {/* Item 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE6BD',
                  border: '1.2px solid #C99A43',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Calendar size={20} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#002B20' }}>Hassle-Free Site Visit</div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C' }}>Plan at Your Convenience</div>
              </div>
            </div>

            {/* Item 4 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE6BD',
                  border: '1.2px solid #C99A43',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={20} color="#00382B" />
              </div>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#002B20' }}>Verified Project</div>
                <div style={{ fontSize: '0.78rem', color: '#7A756C' }}>RERA &amp; TNCP Approved</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
