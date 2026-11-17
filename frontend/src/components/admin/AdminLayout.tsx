import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  Home,
  Building2,
  Mail,
  FileEdit,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
  Shield,
  Key,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { authStorage, api } from '../../services/api';
import type { AdminUser } from '../../types';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(authStorage.getUser());
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [verifying, setVerifying] = useState(true);

  // Password change modal state
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwFeedback, setPwFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!authStorage.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    api.adminGetMe().then((admin) => {
      if (!admin) {
        navigate('/admin/login');
      } else {
        setUser(admin);
        authStorage.setUser(admin);
      }
      setVerifying(false);
    });
  }, [navigate]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authStorage.removeToken();
    navigate('/admin/login');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwFeedback(null);

    if (!currentPw || !newPw) {
      setPwFeedback({ type: 'error', message: 'Please fill in all password fields.' });
      return;
    }

    if (newPw.length < 6) {
      setPwFeedback({ type: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPw !== confirmPw) {
      setPwFeedback({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    setPwLoading(true);
    const res = await api.adminChangePassword(currentPw, newPw);
    setPwLoading(false);

    if (res.success) {
      setPwFeedback({ type: 'success', message: 'Password updated successfully! Please keep it secure.' });
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
      setTimeout(() => {
        setPwModalOpen(false);
        setPwFeedback(null);
      }, 2000);
    } else {
      setPwFeedback({ type: 'error', message: res.message || 'Failed to update password.' });
    }
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: <Home size={18} /> },
    { label: 'Properties', href: '/admin/properties', icon: <Building2 size={18} /> },
    { label: 'Enquiries', href: '/admin/enquiries', icon: <Mail size={18} /> },
    { label: 'Website Content', href: '/admin/content', icon: <FileEdit size={18} /> },
    { label: 'Media Library', href: '/admin/media', icon: <ImageIcon size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  if (verifying) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00281F',
          color: '#FAF6EF',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Shield size={36} color="#E5C37A" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          <p style={{ fontSize: '0.95rem', color: '#E5C37A', margin: 0 }}>
            Verifying Admin Authorization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAF7F0', fontFamily: "'Poppins', sans-serif" }}>
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 20, 15, 0.72)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
          className="admin-mobile-backdrop"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#00281F',
          color: '#FAF6EF',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          borderRight: '1.5px solid rgba(216, 174, 97, 0.25)',
          overflow: 'hidden',
        }}
        className={`admin-sidebar ${mobileSidebarOpen ? 'open' : ''}`}
      >
        {/* Mobile close button inside sidebar */}
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
          className="admin-sidebar-close-btn"
          aria-label="Close sidebar"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FAF6EF',
            borderRadius: '8px',
            padding: '6px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <X size={18} />
        </button>

        {/* Brand header */}
        <div
          style={{
            padding: '1.75rem 1.5rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#004B3B" />
              <path d="M8 8H14V14H8V8Z" fill="#F5DA9A" />
              <path d="M18 8H24V14H18V8Z" fill="#F5DA9A" />
              <path d="M8 18H14V24H8V18Z" fill="#F5DA9A" />
              <path d="M18 18H24V24H18V18Z" fill="#C99A43" />
            </svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em', lineHeight: 1.1 }}>
                VANAM
              </div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#E5C37A', letterSpacing: '0.22em' }}>
                VALLEY
              </div>
              <div style={{ fontSize: '0.48rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.15em' }}>
                BALAGHAT M.P.
              </div>
            </div>
          </div>

          {/* Gold CMS Pill Badge */}
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              background: 'linear-gradient(135deg, #FBE09C 0%, #D4A74F 50%, #C99A43 100%)',
              color: '#00281F',
              padding: '3px 14px',
              borderRadius: '9999px',
              boxShadow: '0 2px 8px rgba(201, 154, 67, 0.35)',
              marginTop: '4px',
            }}
          >
            CMS
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '1rem 1rem 0', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, zIndex: 2 }}>
          <div
            style={{
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(250, 246, 239, 0.55)',
              padding: '0 12px 6px',
              fontWeight: 600,
            }}
          >
            MANAGE PORTAL
          </div>

          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  color: active ? '#00281F' : 'rgba(250, 246, 239, 0.85)',
                  background: active
                    ? 'linear-gradient(135deg, #FBE09C 0%, #D4A74F 50%, #C99A43 100%)'
                    : 'transparent',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: active ? '0 4px 14px rgba(201, 154, 67, 0.4)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(250, 246, 239, 0.85)';
                  }
                }}
              >
                <span style={{ color: active ? '#00281F' : '#E5C37A', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div
            style={{
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(250, 246, 239, 0.55)',
              padding: '1.25rem 12px 6px',
              fontWeight: 600,
            }}
          >
            PUBLIC SITE
          </div>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '12px',
              color: 'rgba(250, 246, 239, 0.85)',
              fontSize: '0.88rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'rgba(250, 246, 239, 0.85)';
            }}
          >
            <ExternalLink size={17} color="#E5C37A" />
            <span>View Live Website</span>
          </Link>
        </nav>

        {/* Forest Ridge Pine Tree Silhouettes at Bottom */}
        <div style={{ position: 'relative', height: '110px', marginTop: 'auto', zIndex: 1, pointerEvents: 'none' }}>
          <svg
            viewBox="0 0 260 110"
            preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: '65px', left: 0, right: 0, width: '100%', height: '80px', opacity: 0.22 }}
          >
            <path d="M 0 50 Q 60 25 130 45 Q 200 65 260 30 L 260 110 L 0 110 Z" fill="#001812" />
            <path d="M 15 110 L 22 55 L 29 110 Z M 40 110 L 48 45 L 56 110 Z M 70 110 L 78 50 L 86 110 Z M 110 110 L 118 38 L 126 110 Z M 150 110 L 157 48 L 164 110 Z M 190 110 L 198 42 L 206 110 Z M 230 110 L 238 52 L 246 110 Z" fill="#00120D" />
          </svg>
        </div>

        {/* User bar & Profile */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid rgba(216, 174, 97, 0.2)',
            backgroundColor: '#001E17',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FBE09C',
                border: '1.5px solid #D4A74F',
                color: '#00281F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.92rem',
                flexShrink: 0,
              }}
            >
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {user?.username || 'admin'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(250, 246, 239, 0.65)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {user?.email || 'admin@vanamvalley.com'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: '6px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'rgba(250, 246, 239, 0.6)',
              cursor: 'pointer',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Sign Out"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F87171';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(250, 246, 239, 0.6)';
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Top Navbar */}
        <header
          style={{
            height: '66px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1.2px solid rgba(216, 174, 97, 0.25)',
            padding: '0 2.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 90,
          }}
          className="admin-top-header"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#00281F',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
              }}
              className="admin-mobile-toggle"
              aria-label="Toggle menu"
            >
              {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#1A1815' }} className="admin-header-title">
              <span style={{ color: '#00382B', fontWeight: 700 }}>Vanam Valley</span>{' '}
              <span style={{ color: '#C99A43', margin: '0 4px' }} className="admin-header-subtitle">•</span>{' '}
              <span style={{ color: '#4A463E' }} className="admin-header-subtitle">Central Administration CMS</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Change Password Pill Button */}
            <button
              type="button"
              onClick={() => setPwModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 18px',
                backgroundColor: '#FFFDF9',
                borderRadius: '9999px',
                border: '1.4px solid #D8AE61',
                fontSize: '0.84rem',
                color: '#00382B',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              }}
              className="admin-change-pw-btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FBF4EA';
                e.currentTarget.style.borderColor = '#C99A43';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFDF9';
                e.currentTarget.style.borderColor = '#D8AE61';
              }}
            >
              <Key size={14} color="#B88532" />
              <span className="admin-header-btn-text">Change Password</span>
            </button>

            {/* superadmin ⌄ User Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                backgroundColor: '#FFFDF9',
                borderRadius: '9999px',
                border: '1.4px solid #D8AE61',
                fontSize: '0.84rem',
                color: '#00382B',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              }}
              className="admin-user-pill"
            >
              <User size={14} color="#B88532" />
              <span className="admin-header-btn-text">{user?.role || 'superadmin'}</span>
              <ChevronDown size={14} color="#7A756C" />
            </div>
          </div>
        </header>

        {/* Render child routes */}
        <main style={{ padding: 'clamp(1rem, 2.5vw, 2.5rem)', flex: 1 }} className="admin-main-content">
          <Outlet />
        </main>
      </div>

      {/* Password Change Modal */}
      {pwModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 30, 24, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 1000,
          }}
          onClick={() => setPwModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '460px',
              width: '100%',
              border: '1.5px solid #D8AE61',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={20} color="#C99A43" />
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', color: '#00382B', margin: 0, fontWeight: 700 }}>
                  Change Master Password
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPwModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#7A756C', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {pwFeedback && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem',
                  backgroundColor: pwFeedback.type === 'success' ? '#DEF7EC' : '#FDE8E8',
                  color: pwFeedback.type === 'success' ? '#03543F' : '#9B1C1C',
                }}
              >
                {pwFeedback.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                <span>{pwFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#4A463E', marginBottom: '0.35rem' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.2px solid #E8E5DE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#4A463E', marginBottom: '0.35rem' }}>
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.2px solid #E8E5DE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#4A463E', marginBottom: '0.35rem' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.2px solid #E8E5DE',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={pwLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #004B3B 0%, #00281F 100%)',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #D8AE61',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: pwLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 75, 59, 0.3)',
                }}
              >
                {pwLoading ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
