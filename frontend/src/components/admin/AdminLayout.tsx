import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Inbox,
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
    // Check if token exists
    if (!authStorage.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    // Verify token with backend
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

  // Close mobile sidebar on route change
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
    { label: 'Overview', href: '/admin', icon: <LayoutDashboard size={18} /> },
    { label: 'Properties', href: '/admin/properties', icon: <Building2 size={18} /> },
    { label: 'Enquiries', href: '/admin/enquiries', icon: <Inbox size={18} /> },
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
          backgroundColor: '#003329',
          color: '#F8F6F0',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Shield size={36} color="#F7D6B0" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          <p style={{ fontSize: '0.95rem', color: '#F7D6B0', margin: 0 }}>
            Verifying Admin Authorization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F0' }}>
      {/* Sidebar Desktop */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#003329',
          color: '#F8F6F0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          borderRight: '1px solid rgba(248, 246, 240, 0.1)',
        }}
        className="admin-sidebar"
      >
        {/* Brand header */}
        <div
          style={{
            padding: '1.75rem 1.5rem',
            borderBottom: '1px solid rgba(248, 246, 240, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '6px',
            }}
          >
            <img
              src="/logo.png"
              alt="Vanam Valley"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              color: '#F7D6B0',
              fontWeight: 700,
              letterSpacing: '0.1em',
              backgroundColor: 'rgba(247, 214, 176, 0.15)',
              padding: '3px 8px',
              borderRadius: '4px',
            }}
          >
            CMS
          </span>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(248, 246, 240, 0.5)',
              padding: '0 12px 8px',
              fontWeight: 600,
            }}
          >
            Manage Portal
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
                  padding: '10px 14px',
                  borderRadius: '6px',
                  color: active ? '#F7D6B0' : 'rgba(248, 246, 240, 0.8)',
                  backgroundColor: active ? 'rgba(0, 75, 60, 0.8)' : 'transparent',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  borderLeft: active ? '3px solid #B68B45' : '3px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(248, 246, 240, 0.5)',
              padding: '1.5rem 12px 8px',
              fontWeight: 600,
            }}
          >
            Public Site
          </div>
          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '6px',
              color: 'rgba(248, 246, 240, 0.75)',
              fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            <ExternalLink size={17} />
            <span>View Live Website</span>
          </Link>
        </nav>

        {/* User bar & Logout */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid rgba(248, 246, 240, 0.1)',
            backgroundColor: '#00261E',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#F7D6B0',
                color: '#004B3C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F8F6F0', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {user?.username || 'Administrator'}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'rgba(248, 246, 240, 0.6)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {user?.email || 'admin@vanamvalley.com'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setPwModalOpen(true)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px',
                backgroundColor: 'rgba(248, 246, 240, 0.1)',
                border: '1px solid rgba(248, 246, 240, 0.2)',
                color: '#F7D6B0',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Key size={13} />
              <span>Password</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                backgroundColor: 'rgba(196, 57, 47, 0.15)',
                border: '1px solid rgba(196, 57, 47, 0.4)',
                color: '#F8A9A3',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Top Navbar */}
        <header
          style={{
            height: '70px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E8E5DE',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 90,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#004B3C',
                cursor: 'pointer',
                padding: '4px',
              }}
              className="admin-mobile-toggle"
            >
              {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div style={{ fontSize: '0.92rem', color: '#5C574F' }}>
              Vanam Valley <span style={{ color: '#B68B45' }}>•</span> Central Administration CMS
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setPwModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid #E8E5DE',
                fontSize: '0.8rem',
                color: '#004B3C',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Key size={14} color="#B68B45" />
              <span>Change Password</span>
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: '#F8F6F0',
                borderRadius: '9999px',
                border: '1px solid #E8E5DE',
                fontSize: '0.82rem',
                color: '#004B3C',
                fontWeight: 600,
              }}
            >
              <User size={14} color="#B68B45" />
              <span>{user?.role || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Render child routes */}
        <main style={{ padding: '2.5rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>

      {/* Password Change Modal */}
      {pwModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 30, 24, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 9999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setPwModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '460px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            }}
          >
            <div
              style={{
                backgroundColor: '#004B3C',
                padding: '1.5rem 2rem',
                color: '#F8F6F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.6rem', margin: 0, color: '#F8F6F0' }}>
                Change Admin Password
              </h3>
              <button
                type="button"
                onClick={() => setPwModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#F8F6F0', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} style={{ padding: '2rem' }}>
              {pwFeedback && (
                <div
                  style={{
                    backgroundColor: pwFeedback.type === 'success' ? '#DEF7EC' : '#FDF2F2',
                    color: pwFeedback.type === 'success' ? '#03543F' : '#9B1C1C',
                    border: pwFeedback.type === 'success' ? '1px solid #BCF0DA' : '1px solid #F8B4B4',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {pwFeedback.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span>{pwFeedback.message}</span>
                </div>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                  New Password (Min. 6 chars)
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#3E3A34', marginBottom: '0.35rem' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1CDC4', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPwModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#F8F6F0',
                    border: '1px solid #E8E5DE',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pwLoading}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: '#004B3C',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: pwLoading ? 'not-allowed' : 'pointer',
                    opacity: pwLoading ? 0.7 : 1,
                  }}
                >
                  {pwLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 991px) {
          .admin-sidebar {
            display: ${mobileSidebarOpen ? 'flex' : 'none'} !important;
            width: 260px !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          .admin-main {
            margin-left: 0 !important;
          }
          .admin-mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};
