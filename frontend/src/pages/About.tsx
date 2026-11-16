import React from 'react';
import {
  Trees,
  ShieldCheck,
  Building2,
  Car,
  ArrowRight,
  Home,
  Landmark,
  FileText,
  Download,
  PawPrint,
  CheckCircle2,
} from 'lucide-react';
import type { WebsiteSettings } from '../types';

interface AboutProps {
  settings?: WebsiteSettings | null;
  onOpenEnquiry: (interest?: string) => void;
  onOpenSiteVisit?: (property?: string) => void;
}

export const About: React.FC<AboutProps> = ({ settings, onOpenEnquiry, onOpenSiteVisit }) => {
  const customTitle = settings?.about?.title || 'The Sanctuary of Green Elegance';
  const customDescription =
    settings?.about?.description ||
    'Vanam Valley is an exclusive eco-luxury forest living master-planned development in Balaghat, Madhya Pradesh. Designed with nature as its architectural canvas, it encompasses 129 signature 3 BHK luxury villas and premium residential plots, combining undisturbed wilderness with world-class hospitality and recreational amenities.';
  const heroVillaImage = settings?.about?.heroImage || '/about_hero_villa.jpg';
  const entranceImage = settings?.about?.entranceImage || '/about_gate_exact.jpg';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF6EF', fontFamily: "'Poppins', sans-serif" }}>
      {/* =========================================================================
          HERO BANNER: 1:1 MATCH WITH REFERENCE IMAGE
          Sunset forest hills with luxury modern duplex villa on the right
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#01281E',
          color: '#FAF6EF',
          padding: 'clamp(5rem, 8vh, 7rem) 1.5rem clamp(4.5rem, 7vh, 6rem)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          minHeight: 'clamp(460px, 58vh, 560px)',
        }}
      >
        {/* Right Villa & Sunset Landscape Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${heroVillaImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.92,
            zIndex: 1,
          }}
        />

        {/* Emerald Luxury Gradient Overlay (blending left dark green to right transparent) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #01281E 0%, #01281E 36%, rgba(1, 40, 30, 0.88) 55%, rgba(1, 40, 30, 0.42) 78%, rgba(1, 40, 30, 0.12) 100%)',
            zIndex: 2,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            maxWidth: '1240px',
            width: '100%',
            margin: '0 auto',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#D4AF37',
                fontSize: 'clamp(0.72rem, 0.8vw, 0.8rem)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <span>— THE ARCHITECTURAL GENESIS —</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.3rem, 4.4vw, 3.6rem)',
                color: '#FFFFFF',
                margin: '0 0 1.15rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Crafted in Pure Harmony <br />
              <span
                style={{
                  color: '#D4AF37',
                  fontStyle: 'italic',
                  fontWeight: 600,
                }}
              >
                With the Forest
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.05vw, 1.05rem)',
                color: 'rgba(250, 246, 239, 0.88)',
                maxWidth: '540px',
                margin: '0 0 2rem',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Where modern duplex architecture embraces the timeless peace of Balaghat's sal woodlands, offering you a private generational legacy.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              {onOpenSiteVisit && (
                <button
                  type="button"
                  onClick={() => onOpenSiteVisit('Vanam Valley VIP Tour')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #E6BA67 0%, #C99A43 50%, #B88532 100%)',
                    color: '#002E24',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '0.94rem',
                    border: '1.5px solid #F5DA9A',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(201, 154, 67, 0.4), 0 0 16px rgba(245, 218, 154, 0.3)',
                    transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(201, 154, 67, 0.6), 0 0 24px rgba(245, 218, 154, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 154, 67, 0.4), 0 0 16px rgba(245, 218, 154, 0.3)';
                  }}
                >
                  <Car size={17} color="#002E24" />
                  <span>Book VIP Site Tour</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenEnquiry('About Us Masterplan Consultation')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 26px',
                  backgroundColor: 'rgba(0, 48, 38, 0.55)',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  border: '1.5px solid rgba(212, 175, 55, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.28s ease',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.22)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#F5DA9A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 48, 38, 0.55)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.7)';
                }}
              >
                <span>Enquire About Residences</span>
                <ArrowRight size={15} color="#D4AF37" />
              </button>
            </div>
          </div>
        </div>

        {/* Sweeping Metallic Gold Wave Curve at Bottom */}
        <svg
          viewBox="0 0 1440 76"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: 'clamp(44px, 5.5vw, 68px)',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        >
          <defs>
            <linearGradient id="aboutHeroGoldWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C99A43" />
              <stop offset="35%" stopColor="#F5DA9A" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#A6782E" />
            </linearGradient>
          </defs>
          <path
            d="M 0 54 Q 380 20 720 44 Q 1060 68 1440 22 L 1440 76 L 0 76 Z"
            fill="#FAF6EF"
          />
          <path
            d="M 0 54 Q 380 20 720 44 Q 1060 68 1440 22"
            fill="none"
            stroke="url(#aboutHeroGoldWave)"
            strokeWidth="3.5"
            style={{ filter: 'drop-shadow(0 -2px 6px rgba(201, 154, 67, 0.5))' }}
          />
        </svg>
      </section>

      {/* =========================================================================
          TOP METRIC CARDS STRIP: 4 LUXURY FLOATING PILLARS
          27 Acres | 129 Units | 15,000 Sq.Ft. | 100% Freehold
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '-1.5rem',
          padding: '0 1.5rem 2.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {[
            {
              icon: <Trees size={22} color="#004B3B" />,
              value: '27 Acres',
              label: 'Master Forest Territory',
            },
            {
              icon: <Home size={22} color="#004B3B" />,
              value: '129 Units',
              label: '3 BHK Duplex Residences',
            },
            {
              icon: <Landmark size={22} color="#004B3B" />,
              value: '15,000 Sq.Ft.',
              label: 'Canopy Resort Clubhouse',
            },
            {
              icon: <FileText size={22} color="#004B3B" />,
              value: '100% Freehold',
              label: 'Registry-Ready Clear Titles',
            },
          ].map((metric, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.2px solid rgba(216, 174, 97, 0.4)',
                padding: '1.1rem 1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 10px 28px rgba(6, 75, 59, 0.06), 0 2px 8px rgba(201, 154, 67, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow =
                  '0 14px 34px rgba(6, 75, 59, 0.12), 0 0 16px rgba(201, 154, 67, 0.2)';
                e.currentTarget.style.borderColor = '#C99A43';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 10px 28px rgba(6, 75, 59, 0.06), 0 2px 8px rgba(201, 154, 67, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(216, 174, 97, 0.4)';
              }}
            >
              {/* Tan Square Icon Badge */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#F8EFE2',
                  border: '1px solid #E4D5BE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {metric.icon}
              </div>

              {/* Text Info */}
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.28rem',
                    fontWeight: 700,
                    color: '#00382B',
                    lineHeight: 1.15,
                    marginBottom: '3px',
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#5C574F',
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR PHILOSOPHY / THE SANCTUARY OF GREEN ELEGANCE
          Editorial split: Text on left with gold bar, Grand entrance gate photo on right
          ========================================================================= */}
      <section style={{ padding: 'clamp(2.5rem, 5vh, 4.5rem) 1.5rem', backgroundColor: '#FAF6EF' }}>
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Story & Philosophy */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#B88532',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '0.65rem',
              }}
            >
              <span>— OUR PHILOSOPHY —</span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                color: '#00382B',
                fontWeight: 700,
                margin: '0 0 1.5rem',
                lineHeight: 1.18,
                letterSpacing: '-0.01em',
              }}
            >
              {customTitle}
            </h2>

            {/* Editorial Content with Gold Border */}
            <div
              style={{
                borderLeft: '3.5px solid #C99A43',
                paddingLeft: '1.35rem',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  color: '#4A463E',
                  fontSize: 'clamp(0.94rem, 1.05vw, 1.02rem)',
                  lineHeight: 1.82,
                  margin: 0,
                }}
              >
                {customDescription}
              </p>
            </div>

            <p
              style={{
                color: '#656057',
                fontSize: '0.94rem',
                lineHeight: 1.75,
                margin: '0 0 1.75rem',
              }}
            >
              Every duplex villa and residential plot is situated to respect the natural topography and sun paths. Instead of bulldozing nature, we carved our 30-foot avenues around existing trees, maintaining pristine natural air quality (AQI &lt; 25) year-round.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#004B3B', fontSize: '0.88rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="#B88532" />
                <span>TNCP Layout Sanctioned</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#004B3B', fontSize: '0.88rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="#B88532" />
                <span>RERA Registered Project</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#004B3B', fontSize: '0.88rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="#B88532" />
                <span>Clear Freehold Titles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Grand Entrance Gate Photo with Gold Border Frame */}
          <div>
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid #D8AE61',
                boxShadow: '0 20px 50px rgba(6, 75, 59, 0.16), 0 0 24px rgba(201, 154, 67, 0.15)',
                position: 'relative',
                aspectRatio: '16 / 10',
                backgroundColor: '#002E24',
              }}
            >
              <img
                src={entranceImage}
                alt="Vanam Valley Grand Entrance Gate"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ARCHITECTURAL FOUNDATIONS
          The 4 Pillars Defining Vanam Valley (4 Clean Cream Cards with Icons)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(3rem, 6vh, 5rem) 1.5rem',
          backgroundColor: '#FAF6EF',
          borderTop: '1px solid rgba(216, 174, 97, 0.25)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <span
              style={{
                color: '#B88532',
                fontWeight: 700,
                fontSize: '0.76rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              — ARCHITECTURAL FOUNDATIONS —
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                color: '#00382B',
                fontWeight: 700,
                margin: '0.5rem 0 0.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              The 4 Pillars Defining Vanam Valley
            </h2>
            <p style={{ color: '#656057', fontSize: '0.96rem', maxWidth: '620px', margin: '0 auto' }}>
              Guiding every acre of development to balance private luxury with ecological stewardship.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                icon: <Trees size={22} color="#FFFFFF" />,
                title: 'Exceptional Air Quality (AQI)',
                desc: 'Surrounded by evergreen sal woodlands with pristine natural oxygen levels and AQI consistently under 25.',
              },
              {
                icon: <PawPrint size={22} color="#FFFFFF" />,
                title: "India's Densest Tiger Belt",
                desc: 'Strategically positioned in the celebrated wildlife tourism corridor between Kanha and Pench National Parks.',
              },
              {
                icon: <Building2 size={22} color="#FFFFFF" />,
                title: 'Low-Density Living',
                desc: 'Just 129 exclusive duplex villas spread across 27 generous acres of forest greenery for uncompromised privacy.',
              },
              {
                icon: <ShieldCheck size={22} color="#FFFFFF" />,
                title: 'Promising Investment & Security',
                desc: 'Rapidly appreciating corridor with clean freehold titles, TNCP layout sanction, RERA registration, and 24/7 security.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFDF9',
                  padding: '1.85rem 1.6rem',
                  borderRadius: '20px',
                  border: '1.2px solid rgba(216, 174, 97, 0.42)',
                  boxShadow: '0 8px 24px rgba(6, 75, 59, 0.05)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#C99A43';
                  e.currentTarget.style.boxShadow =
                    '0 18px 40px rgba(6, 75, 59, 0.12), 0 0 20px rgba(201, 154, 67, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(216, 174, 97, 0.42)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(6, 75, 59, 0.05)';
                }}
              >
                {/* Circular Green Icon Badge */}
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#004B3B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.15rem',
                    boxShadow: '0 4px 12px rgba(0, 75, 59, 0.25)',
                  }}
                >
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.25rem',
                    color: '#00382B',
                    fontWeight: 700,
                    margin: '0 0 0.65rem',
                    lineHeight: 1.25,
                  }}
                >
                  {pillar.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: '#5C574F',
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: EXPERIENCED STEWARDSHIP
          The Leadership Behind Vanam Valley (4 Executive Shield Cards)
          ========================================================================= */}
      <section
        style={{
          padding: 'clamp(3.5rem, 6vh, 5.5rem) 1.5rem',
          backgroundColor: '#FAF6EF',
          borderTop: '1px solid rgba(216, 174, 97, 0.25)',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              style={{
                color: '#B88532',
                fontWeight: 700,
                fontSize: '0.76rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              — EXPERIENCED STEWARDSHIP —
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                color: '#00382B',
                fontWeight: 700,
                margin: '0.5rem 0 0.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              The Leadership Behind Vanam Valley
            </h2>
            <p style={{ color: '#656057', fontSize: '0.96rem', maxWidth: '620px', margin: '0 auto' }}>
              Decades of infrastructure, real estate development, and project management excellence.
            </p>
          </div>

          {/* 4 Executive Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                letter: 'M',
                name: 'Mr. Shailendra Mankar',
                role: 'DIRECTOR',
                orgLine1: 'Vishwaa Ventures',
                orgLine2: 'Realty Pvt. Ltd.',
              },
              {
                letter: 'K',
                name: 'Mr. Kapil Kumarr',
                role: 'DIRECTOR & PMC',
                orgLine1: 'Project Management',
                orgLine2: 'Consultant, Nagpur',
              },
              {
                letter: 'P',
                name: 'Mr. Gunendra Patle',
                role: 'ASSOCIATE',
                orgLine1: 'Land & Development',
                orgLine2: 'Associate, Balaghat',
              },
              {
                letter: 'P',
                name: 'Mr. Chetan Patle',
                role: 'ASSOCIATE',
                orgLine1: 'Land & Development',
                orgLine2: 'Associate, Balaghat',
              },
            ].map((leader, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  padding: '2.2rem 1.4rem 2.8rem 1.4rem',
                  borderRadius: '24px',
                  background: 'linear-gradient(180deg, #004535 0%, #003125 55%, #001F18 100%)',
                  border: '1.8px solid rgba(216, 174, 97, 0.55)',
                  boxShadow: '0 14px 34px rgba(6, 75, 59, 0.16), 0 0 20px rgba(201, 154, 67, 0.14)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  minHeight: '290px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 24px 50px rgba(6, 75, 59, 0.28), 0 0 32px rgba(244, 198, 109, 0.45)';
                  e.currentTarget.style.borderColor = '#F4C66D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 14px 34px rgba(6, 75, 59, 0.16), 0 0 20px rgba(201, 154, 67, 0.14)';
                  e.currentTarget.style.borderColor = 'rgba(216, 174, 97, 0.55)';
                }}
              >
                {/* Forest Ridge Silhouette at Bottom */}
                <svg
                  viewBox="0 0 280 75"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '70px',
                    opacity: 0.35,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <path d="M 0 45 Q 60 18 130 40 Q 200 58 280 28 L 280 75 L 0 75 Z" fill="#001812" />
                </svg>

                {/* Scalloped Metallic Champagne Gold Wave Footer Bar */}
                <svg
                  viewBox="0 0 280 44"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '40px',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <defs>
                    <linearGradient id={`aboutGoldWaveGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C99A43" />
                      <stop offset="35%" stopColor="#FFE7A8" />
                      <stop offset="70%" stopColor="#D4A74F" />
                      <stop offset="100%" stopColor="#A6782E" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 22 C 45 36, 95 38, 140 24 C 185 10, 235 14, 280 26 L 280 44 L 0 44 Z"
                    fill={`url(#aboutGoldWaveGrad-${idx})`}
                  />
                  <path
                    d="M 0 22 C 45 36, 95 38, 140 24 C 185 10, 235 14, 280 26"
                    fill="none"
                    stroke="#FFF8E0"
                    strokeWidth="2"
                    opacity="0.95"
                    style={{ filter: 'drop-shadow(0 0 4px #F4C66D)' }}
                  />
                </svg>

                {/* Laurel Wreath Crest with Initial Medallion */}
                <div style={{ position: 'relative', width: '92px', height: '64px', margin: '0 auto 1.1rem auto', zIndex: 3 }}>
                  {/* Left Laurel Branch */}
                  <svg
                    width="34"
                    height="58"
                    viewBox="0 0 34 58"
                    fill="none"
                    style={{ position: 'absolute', left: '-5px', top: '1px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
                  >
                    <path d="M 28 52 C 18 44, 6 30, 10 8" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 24 47 C 16 47, 12 42, 16 38 C 20 38, 23 42, 24 47 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 18 36 C 8 35, 6 28, 12 25 C 16 26, 18 31, 18 36 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 13 24 C 3 22, 2 15, 8 13 C 12 15, 14 19, 13 24 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 10 11 C 2 8, 4 2, 9 3 C 12 5, 12 8, 10 11 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                  </svg>

                  {/* Right Laurel Branch */}
                  <svg
                    width="34"
                    height="58"
                    viewBox="0 0 34 58"
                    fill="none"
                    style={{ position: 'absolute', right: '-5px', top: '1px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
                  >
                    <path d="M 6 52 C 16 44, 28 30, 24 8" stroke="#F4C66D" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 10 47 C 18 47, 22 42, 18 38 C 14 38, 11 42, 10 47 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 16 36 C 26 35, 28 28, 22 25 C 18 26, 16 31, 16 36 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 21 24 C 31 22, 32 15, 26 13 C 22 15, 20 19, 21 24 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                    <path d="M 24 11 C 32 8, 30 2, 25 3 C 22 5, 22 8, 24 11 Z" fill="#FFE5A3" stroke="#D8AE61" strokeWidth="1" />
                  </svg>

                  {/* Center Circular Medallion */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '5px',
                      transform: 'translateX(-50%)',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFDF9',
                      border: '2.5px solid #F4C66D',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), 0 0 14px rgba(244, 198, 109, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '1.65rem',
                        fontWeight: 800,
                        color: '#064B3B',
                        lineHeight: 1,
                      }}
                    >
                      {leader.letter}
                    </span>
                  </div>
                </div>

                {/* Leader Name */}
                <h4
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.18rem, 1.35vw, 1.35rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: '0 0 10px 0',
                    lineHeight: 1.2,
                    zIndex: 3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {leader.name}
                </h4>

                {/* Designation Badge */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '4px 18px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFF4DC',
                    border: '1.2px solid #D8AE61',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#00382B',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    zIndex: 3,
                  }}
                >
                  {leader.role}
                </div>

                {/* Organization & City */}
                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'rgba(255, 245, 229, 0.82)',
                    margin: 0,
                    lineHeight: 1.45,
                    fontWeight: 400,
                    zIndex: 3,
                  }}
                >
                  {leader.orgLine1}
                  <br />
                  {leader.orgLine2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BOTTOM CTA BANNER
          "Own a Slice of Central India's Most Exclusive Green Sanctuary"
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #01281E 0%, #004B3B 55%, #01241B 100%)',
          color: '#FAF6EF',
          padding: 'clamp(4rem, 7vh, 5.5rem) 1.5rem',
          textAlign: 'center',
          overflow: 'hidden',
          borderTop: '2.5px solid #C99A43',
        }}
      >
        {/* Subtle Decorative Wave Line */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(201, 154, 67, 0.6) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
              color: '#FFFFFF',
              margin: '0 0 1rem',
              fontWeight: 700,
              lineHeight: 1.22,
              letterSpacing: '-0.01em',
            }}
          >
            Own a Slice of Central India's <br />
            <span style={{ color: '#E5BA67', fontStyle: 'italic' }}>Most Exclusive Green Sanctuary</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              color: 'rgba(250, 246, 239, 0.88)',
              margin: '0 auto 2.2rem',
              lineHeight: 1.7,
              maxWidth: '680px',
            }}
          >
            Book a complimentary VIP site visit with free AC transport from Balaghat station or request an executive project consultation.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {onOpenSiteVisit && (
              <button
                type="button"
                onClick={() => onOpenSiteVisit('Vanam Valley Township')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '13px 30px',
                  background: 'linear-gradient(135deg, #E6BA67 0%, #C99A43 50%, #B88532 100%)',
                  color: '#002E24',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  border: '1.5px solid #F5DA9A',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(201, 154, 67, 0.45)',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 32px rgba(201, 154, 67, 0.65), 0 0 20px rgba(245, 218, 154, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 154, 67, 0.45)';
                }}
              >
                <Car size={17} color="#002E24" />
                <span>Book VIP Site Visit</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenEnquiry('Download Brochure & Pricing')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 28px',
                backgroundColor: 'rgba(0, 48, 38, 0.6)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '0.94rem',
                border: '1.5px solid rgba(212, 175, 55, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.28s ease',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#F5DA9A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 48, 38, 0.6)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.6)';
              }}
            >
              <Download size={16} color="#E5BA67" />
              <span>Download Brochure & Pricing</span>
              <span style={{ color: '#E5BA67' }}>→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
