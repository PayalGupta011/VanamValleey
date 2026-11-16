import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  Calculator,
  Home as HomeIcon,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Car,
  FileCheck,
  MapPin,
} from 'lucide-react';
import type { WebsiteSettings } from '../../types';

interface NavbarProps {
  settings?: WebsiteSettings | null;
  onOpenEnquiry: () => void;
  onOpenSiteVisit?: () => void;
  onOpenChecklist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenEnquiry,
  onOpenSiteVisit,
  onOpenChecklist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const phone = settings?.navbar?.phone || settings?.contact?.phone || '+91 93716 91365';

  useEffect(() => {
    setMobileMenuOpen(false);
    setCalcDropdownOpen(false);
    setMobileCalcOpen(false);
  }, [location.pathname, location.search]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCalcDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && !location.search;
    }
    if (path === '/properties?type=villa') {
      return location.pathname === '/properties' && location.search.includes('type=villa');
    }
    if (path === '/properties') {
      return location.pathname === '/properties' && !location.search.includes('type=villa');
    }
    if (path === '/calculators') {
      return location.pathname === '/calculators';
    }
    if (path === '/locations') {
      return location.pathname.startsWith('/locations');
    }
    if (path === '/about') {
      return location.pathname.startsWith('/about');
    }
    if (path === '/contact') {
      return location.pathname.startsWith('/contact');
    }
    return location.pathname.startsWith(path);
  };

  const getNavLinkStyle = (active: boolean) => ({
    fontSize: 'clamp(0.78rem, 0.84vw, 0.84rem)',
    fontWeight: active ? 600 : 500,
    color: active ? '#FFFFFF' : '#1A1815',
    backgroundColor: active ? '#00382B' : 'transparent',
    padding: active ? '5px clamp(10px, 0.8vw, 14px)' : '5px clamp(6px, 0.6vw, 10px)',
    borderRadius: '9999px',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    boxShadow: active ? '0 3px 12px rgba(0, 56, 43, 0.28)' : 'none',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
  });

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '74px',
          zIndex: 1000,
          backgroundColor: '#FAF6EF',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201, 154, 67, 0.35)',
          boxShadow: '0 4px 25px rgba(6, 75, 59, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
          boxSizing: 'border-box',
          overflow: 'visible',
          fontFamily: "'Poppins', sans-serif",
          transition: 'all 0.3s ease',
        }}
      >
        {/* Subtle Luxury Golden Shine Hairline on Bottom Border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1.5px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(212, 168, 90, 0.35) 15%, rgba(247, 214, 176, 0.85) 50%, rgba(212, 168, 90, 0.35) 85%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div
          style={{
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 clamp(0.75rem, 1.8vw, 1.5rem)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(0.4rem, 0.8vw, 0.75rem)',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {/* Left: Brand Logo & Divider */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.png"
                alt="Vanam Valley — Balaghat M.P."
                style={{
                  height: '42px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: 'transparent',
                }}
              />
            </Link>

            {/* Subtle Vertical Divider */}
            <div
              style={{
                display: 'none',
                height: '22px',
                width: '1px',
                backgroundColor: 'rgba(212, 168, 90, 0.4)',
                margin: '0 1rem',
                flexShrink: 0,
              }}
              className="desktop-divider"
            />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'clamp(0.25rem, 0.8vw, 0.75rem)',
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap',
              flexShrink: 0,
            }}
            className="desktop-nav"
          >
            {/* Home Link */}
            <Link
              to="/"
              style={getNavLinkStyle(isLinkActive('/'))}
              onMouseEnter={(e) => {
                if (!isLinkActive('/')) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.06)';
                  e.currentTarget.style.color = '#00382B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLinkActive('/')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1A1815';
                }
              }}
            >
              Home
            </Link>

            {/* Properties */}
            <Link
              to="/properties"
              style={getNavLinkStyle(isLinkActive('/properties'))}
              onMouseEnter={(e) => {
                if (!isLinkActive('/properties')) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.06)';
                  e.currentTarget.style.color = '#00382B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLinkActive('/properties')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1A1815';
                }
              }}
            >
              Properties
            </Link>

            {/* Projects */}
            <Link
              to="/properties?type=villa"
              style={getNavLinkStyle(isLinkActive('/properties?type=villa'))}
              onMouseEnter={(e) => {
                if (!isLinkActive('/properties?type=villa')) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.06)';
                  e.currentTarget.style.color = '#00382B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLinkActive('/properties?type=villa')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1A1815';
                }
              }}
            >
              Projects
            </Link>

            {/* Locations */}
            <Link
              to="/locations"
              style={getNavLinkStyle(isLinkActive('/locations'))}
              onMouseEnter={(e) => {
                if (!isLinkActive('/locations')) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.06)';
                  e.currentTarget.style.color = '#00382B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLinkActive('/locations')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1A1815';
                }
              }}
            >
              Locations
            </Link>

            {/* Calculators Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0, whiteSpace: 'nowrap' }}>
              <button
                type="button"
                onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
                style={{
                  ...getNavLinkStyle(isLinkActive('/calculators')),
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!isLinkActive('/calculators')) {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.06)';
                    e.currentTarget.style.color = '#00382B';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLinkActive('/calculators')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1A1815';
                  }
                }}
              >
                <span>Calculators</span>
                <ChevronDown
                  size={13}
                  style={{
                    transform: calcDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: isLinkActive('/calculators') ? '#F7D6B0' : '#6B665E',
                  }}
                />
              </button>

              {calcDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '275px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 20px 48px rgba(0, 38, 30, 0.16), 0 4px 12px rgba(0, 0, 0, 0.06)',
                    border: '1.5px solid rgba(212, 168, 90, 0.35)',
                    padding: '8px',
                    zIndex: 1100,
                    whiteSpace: 'normal',
                  }}
                >
                  {/* Decorative Arrow Notch */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#FFFFFF',
                      borderLeft: '1.5px solid rgba(212, 168, 90, 0.35)',
                      borderTop: '1.5px solid rgba(212, 168, 90, 0.35)',
                    }}
                  />

                  {/* EMI Calculator */}
                  <Link
                    to="/calculators?tab=emi"
                    onClick={() => setCalcDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: '#1A1815',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8F3ED';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#EBF4F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#004B3C',
                        flexShrink: 0,
                      }}
                    >
                      <Calculator size={16} />
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.86rem', display: 'block', color: '#00382B' }}>
                        EMI Calculator
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#7A756C' }}>
                        Plan your home loan installment
                      </span>
                    </div>
                  </Link>

                  {/* Investment Growth */}
                  <Link
                    to="/calculators?tab=investment"
                    onClick={() => setCalcDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: '#1A1815',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8F3ED';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#FFF7ED',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B68B45',
                        flexShrink: 0,
                      }}
                    >
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.86rem', display: 'block', color: '#00382B' }}>
                        Investment Growth
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#7A756C' }}>
                        Asset & yield projections
                      </span>
                    </div>
                  </Link>

                  {/* Area Converter */}
                  <Link
                    to="/calculators?tab=area"
                    onClick={() => setCalcDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: '#1A1815',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8F3ED';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#F0EFE9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#655D4E',
                        flexShrink: 0,
                      }}
                    >
                      <Building2 size={16} />
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.86rem', display: 'block', color: '#00382B' }}>
                        Area Converter
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#7A756C' }}>
                        Sq Ft, Sq Mtr, Acres, Gaj
                      </span>
                    </div>
                  </Link>

                  {/* Divider and All Calculators Link */}
                  <div style={{ height: '1px', backgroundColor: '#EFEAE1', margin: '4px 0' }} />
                  <Link
                    to="/calculators"
                    onClick={() => setCalcDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#00382B',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(0, 56, 43, 0.04)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.09)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.04)')}
                  >
                    <span>View All Calculators</span>
                    <ArrowRight size={13} color="#00382B" />
                  </Link>
                </div>
              )}
            </div>

            {/* About Us */}
            <Link
              to="/about"
              style={getNavLinkStyle(isLinkActive('/about'))}
              onMouseEnter={(e) => {
                if (!isLinkActive('/about')) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.06)';
                  e.currentTarget.style.color = '#00382B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLinkActive('/about')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1A1815';
                }
              }}
            >
              About Us
            </Link>

            {/* Contact Us */}
            <Link
              to="/contact"
              style={getNavLinkStyle(isLinkActive('/contact'))}
              onMouseEnter={(e) => {
                if (!isLinkActive('/contact')) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 56, 43, 0.06)';
                  e.currentTarget.style.color = '#00382B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLinkActive('/contact')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1A1815';
                }
              }}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1vw, 0.85rem)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {/* Divider line before phone on desktop */}
            <div
              style={{
                display: 'none',
                height: '20px',
                width: '1px',
                backgroundColor: 'rgba(212, 168, 90, 0.4)',
                margin: '0 0.15rem',
                flexShrink: 0,
              }}
              className="desktop-divider"
            />

            {/* Phone badge with green icon */}
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                color: '#1A1815',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                padding: '5px 4px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                wordBreak: 'keep-all',
              }}
              className="desktop-phone"
              title={`Call ${phone}`}
            >
              <Phone size={14} color="#00382B" style={{ flexShrink: 0 }} />
              <span className="desktop-phone-text" style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>{phone}</span>
            </a>

            {/* Document Checklist Pill */}
            {onOpenChecklist && (
              <button
                type="button"
                onClick={onOpenChecklist}
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  backgroundColor: 'transparent',
                  border: '1.5px solid rgba(201, 154, 67, 0.45)',
                  borderRadius: '9999px',
                  color: '#064B3B',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                className="desktop-checklist-btn"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(201, 154, 67, 0.12)';
                  e.currentTarget.style.borderColor = '#C99A43';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(201, 154, 67, 0.45)';
                }}
              >
                <FileCheck size={13} color="#C99A43" />
                <span>Checklist</span>
              </button>
            )}

            {/* VIP Site Visit Button */}
            {onOpenSiteVisit && (
              <button
                type="button"
                onClick={onOpenSiteVisit}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 15px',
                  backgroundColor: '#FAF6EF',
                  border: '1.5px solid #C99A43',
                  borderRadius: '9999px',
                  color: '#064B3B',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(201, 154, 67, 0.15)',
                }}
                className="desktop-sitevisit-btn"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C99A43';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FAF6EF';
                  e.currentTarget.style.color = '#064B3B';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Car size={13} color="#C99A43" />
                <span>Site Visit</span>
              </button>
            )}

            {/* Dark Forest Green Pill: ENQUIRE NOW BUTTON */}
            <button
              type="button"
              onClick={onOpenEnquiry}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 18px',
                backgroundColor: '#00382B',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 56, 43, 0.28)',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                fontFamily: "'Poppins', sans-serif",
              }}
              className="desktop-enquire-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#00261E';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 56, 43, 0.38)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#00382B';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 56, 43, 0.28)';
              }}
            >
              <Calendar size={14} color="#F7D6B0" style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap' }}>Enquire Now</span>
              <ArrowRight size={13} color="#FFFFFF" style={{ flexShrink: 0 }} />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFFFF',
                border: '1px solid rgba(212, 168, 90, 0.4)',
                borderRadius: '8px',
                color: '#00382B',
                cursor: 'pointer',
                padding: '7px',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Luxury Slide-in Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 24, 18, 0.72)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.25s ease',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: 'min(380px, 88vw)',
              height: '100%',
              backgroundColor: '#FAF7F0',
              borderLeft: '2px solid rgba(201, 154, 67, 0.45)',
              boxShadow: '-10px 0 40px rgba(0, 28, 20, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: "'Poppins', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(201, 154, 67, 0.3)',
                backgroundColor: '#064B3B',
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
              >
                <img
                  src="/logo.png"
                  alt="Vanam Valley"
                  style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(244, 198, 109, 0.4)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Drawer Body (Smooth Scrollable Area) */}
            <div
              className="vanam-checklist-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 18px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {/* Primary Navigation Links */}
              {[
                { to: '/', label: 'Home', icon: HomeIcon, active: isLinkActive('/') },
                { to: '/properties', label: 'Properties & Plots', icon: Building2, active: isLinkActive('/properties') },
                { to: '/properties?type=villa', label: 'Signature Villas', icon: Sparkles, active: isLinkActive('/properties?type=villa') },
                { to: '/locations', label: 'Location & Map', icon: MapPin, active: isLinkActive('/locations') },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '11px 16px',
                      borderRadius: '12px',
                      backgroundColor: item.active ? '#064B3B' : '#FFFFFF',
                      color: item.active ? '#FFFFFF' : '#002B20',
                      fontWeight: item.active ? 700 : 600,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      border: item.active
                        ? '1.5px solid #064B3B'
                        : '1px solid rgba(201, 154, 67, 0.25)',
                      boxShadow: item.active
                        ? '0 4px 14px rgba(6, 75, 59, 0.25)'
                        : '0 2px 6px rgba(0, 0, 0, 0.02)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={18} color={item.active ? '#F4C66D' : '#064B3B'} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Calculators Accordion */}
              <div
                style={{
                  backgroundColor: isLinkActive('/calculators') ? 'rgba(6, 75, 59, 0.05)' : '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(201, 154, 67, 0.25)',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => setMobileCalcOpen(!mobileCalcOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '11px 16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#002B20',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calculator size={18} color="#064B3B" />
                    <span>Calculators</span>
                  </div>
                  <ChevronDown
                    size={16}
                    color="#966122"
                    style={{
                      transform: mobileCalcOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>

                {mobileCalcOpen && (
                  <div
                    style={{
                      padding: '4px 16px 12px 46px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      borderTop: '1px solid rgba(201, 154, 67, 0.15)',
                    }}
                  >
                    <Link
                      to="/calculators?tab=emi"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ fontSize: '0.86rem', color: '#064B3B', fontWeight: 600, textDecoration: 'none' }}
                    >
                      • Home Loan EMI Calculator
                    </Link>
                    <Link
                      to="/calculators?tab=investment"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ fontSize: '0.86rem', color: '#064B3B', fontWeight: 600, textDecoration: 'none' }}
                    >
                      • Investment Appreciation
                    </Link>
                    <Link
                      to="/calculators?tab=area"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ fontSize: '0.86rem', color: '#064B3B', fontWeight: 600, textDecoration: 'none' }}
                    >
                      • Land Area Converter
                    </Link>
                    <Link
                      to="/calculators"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ fontSize: '0.86rem', color: '#966122', fontWeight: 700, textDecoration: 'none' }}
                    >
                      • All Financial Tools →
                    </Link>
                  </div>
                )}
              </div>

              {/* About Us & Contact Us */}
              {[
                { to: '/about', label: 'About Us', active: isLinkActive('/about') },
                { to: '/contact', label: 'Contact Us', active: isLinkActive('/contact') },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    backgroundColor: item.active ? '#064B3B' : '#FFFFFF',
                    color: item.active ? '#FFFFFF' : '#002B20',
                    fontWeight: item.active ? 700 : 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    border: item.active
                      ? '1.5px solid #064B3B'
                      : '1px solid rgba(201, 154, 67, 0.25)',
                    boxShadow: item.active
                      ? '0 4px 14px rgba(6, 75, 59, 0.25)'
                      : '0 2px 6px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ width: '18px', textAlign: 'center', color: '#064B3B', fontWeight: 700 }}>✦</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Golden Accent Divider */}
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(201, 154, 67, 0.35)',
                  margin: '8px 0',
                }}
              />

              {/* Mobile CTA: Book VIP Site Visit */}
              {onOpenSiteVisit && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSiteVisit();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '12px 18px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #064B3B 0%, #03362A 100%)',
                    color: '#FFFFFF',
                    border: '1.5px solid #C99A43',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(6, 75, 59, 0.3)',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Car size={16} color="#F4C66D" />
                  <span>Book Guided Site Visit</span>
                  <span style={{ color: '#F4C66D', fontSize: '1.1rem' }}>→</span>
                </button>
              )}

              {/* Mobile CTA: Document Checklist */}
              {onOpenChecklist && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenChecklist();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '11px 18px',
                    borderRadius: '9999px',
                    backgroundColor: '#FAF6EF',
                    color: '#064B3B',
                    border: '1.5px solid rgba(201, 154, 67, 0.5)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(6, 75, 59, 0.06)',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <FileCheck size={16} color="#C99A43" />
                  <span>Buyer Document Checklist</span>
                </button>
              )}

              {/* Mobile CTA: Enquire Now */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '11px 18px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #C99A43 0%, #B88532 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(201, 154, 67, 0.35)',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <Calendar size={15} color="#FFFFFF" />
                <span>Enquire Now / Request Call</span>
              </button>

              {/* Direct Calling & WhatsApp Helpline Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '14px',
                  border: '1px solid rgba(201, 154, 67, 0.3)',
                  marginTop: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#966122', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Direct Booking Desk
                </span>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#064B3B',
                    fontWeight: 700,
                    fontSize: '0.94rem',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#E6F4EA',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={14} color="#064B3B" />
                  </div>
                  <span>{phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
