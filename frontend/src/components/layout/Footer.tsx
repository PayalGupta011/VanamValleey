import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import type { WebsiteSettings } from '../../types';

interface FooterProps {
  settings?: WebsiteSettings | null;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const email = settings?.contact?.email || 'vishwaangp2@gmail.com';
  const description =
    settings?.footer?.description ||
    'A Project by Vishwaa Ventures Reality Pvt. Ltd. & M/S Opal Resorts & Farms. A rare 27-acre forest territory in Balaghat featuring 129 signature 3 BHK luxury villas, Phase 1 Rengatolla Gara plots, and The Canopy Club.';
  const copyright =
    settings?.footer?.copyright || '© 2026 Vanam Valley — Vishwaa Ventures Reality Pvt. Ltd. All rights reserved.';

  return (
    <footer
      style={{
        backgroundColor: '#003329',
        color: '#F8F6F0',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        borderTop: '3px solid #B68B45',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Col */}
          <div>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#FFFFFF',
                padding: '10px 16px',
                borderRadius: '8px',
                marginBottom: '1.25rem',
              }}
            >
              <img
                loading="lazy"
                decoding="async"
                src="/logo.png"
                alt="Vanam Valley"
                style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'rgba(248, 246, 240, 0.75)',
                marginBottom: '1.5rem',
              }}
            >
              {description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(248, 246, 240, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F7D6B0',
                  textDecoration: 'none',
                }}
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(248, 246, 240, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F7D6B0',
                  textDecoration: 'none',
                }}
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* Youtube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(248, 246, 240, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F7D6B0',
                  textDecoration: 'none',
                }}
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.35rem',
                color: '#F7D6B0',
                marginBottom: '1.25rem',
                letterSpacing: '0.02em',
              }}
            >
              Explore Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <li>
                <Link
                  to="/"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Villas & Plots Showcase
                </Link>
              </li>
              <li>
                <Link
                  to="/locations"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Balaghat & Nearby Sanctuaries
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Financial & Land Calculators
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  About the Master Plan
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Architectural & Forest Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Contact & Site Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators & Utilities */}
          <div>
            <h4
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.35rem',
                color: '#F7D6B0',
                marginBottom: '1.25rem',
                letterSpacing: '0.02em',
              }}
            >
              Buyer Utilities
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <li>
                <Link
                  to="/calculators?tab=emi"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Home Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators?tab=investment"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Property Growth & Appreciation
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators?tab=area"
                  style={{ color: 'rgba(248, 246, 240, 0.8)', textDecoration: 'none', fontSize: '0.92rem' }}
                >
                  Land Unit Area Converter
                </Link>
              </li>
              <li style={{ marginTop: '0.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#B68B45',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Freehold Clear Title Land</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.2rem',
                color: '#F7D6B0',
                marginBottom: '1.25rem',
                letterSpacing: '0.02em',
                fontWeight: 700,
              }}
            >
              Offices & Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="#F7D6B0" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div style={{ fontSize: '0.86rem', color: 'rgba(248, 246, 240, 0.85)', lineHeight: 1.5 }}>
                  <strong style={{ color: '#F7D6B0' }}>Balaghat Office:</strong> Sen Chowk, Gayekhuri Road, Ward 32, Balaghat - 481001<br />
                  <strong style={{ color: '#F7D6B0' }}>Site Address:</strong> Kaspur Village, Teh. Waraseoni, Balaghat - 481331<br />
                  <strong style={{ color: '#F7D6B0' }}>Nagpur Office:</strong> Lokmat Building, Lokmat Sq, Nagpur - 440012
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="#F7D6B0" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.86rem', color: 'rgba(248, 246, 240, 0.85)' }}>
                  <a href="tel:+919371691365" style={{ color: 'inherit', textDecoration: 'none' }}>+91 93716 91365</a> /{' '}
                  <a href="tel:+918605328655" style={{ color: 'inherit', textDecoration: 'none' }}>86053 28655</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="#F7D6B0" style={{ flexShrink: 0 }} />
                <a
                  href={`mailto:${email}`}
                  style={{ fontSize: '0.86rem', color: 'rgba(248, 246, 240, 0.85)', textDecoration: 'none' }}
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(248, 246, 240, 0.12)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'rgba(248, 246, 240, 0.6)',
          }}
        >
          <div>{copyright}</div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span>Kaspur & Rengatolla Gara, Balaghat, M.P.</span>
            <span>•</span>
            <span>27 Acres • 129 Forest Villas</span>
            <span>•</span>
            <span>RERA & T&CP Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
