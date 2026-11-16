import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { api, authStorage } from '../../services/api';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    if (authStorage.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your admin email and password.');
      return;
    }

    setLoading(true);
    const res = await api.adminLogin(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid credentials. Please verify your email and password.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#003329',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        color: '#F8F6F0',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          color: '#1A1815',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#004B3C',
            padding: '2.5rem 2rem 2rem',
            textAlign: 'center',
            borderBottom: '3px solid #B68B45',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#FFFFFF',
              padding: '10px 16px',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          >
            <img
              src="/logo.png"
              alt="Vanam Valley"
              style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.75rem',
              color: '#F8F6F0',
              margin: '0 0 0.25rem',
              fontWeight: 600,
            }}
          >
            Executive CMS Portal
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#F7D6B0', margin: 0, letterSpacing: '0.05em' }}>
            Vanam Valley Management Console
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '2.25rem 2rem' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#FDF2F2',
                border: '1px solid #F8B4B4',
                color: '#9B1C1C',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#3E3A34',
                  marginBottom: '0.4rem',
                }}
              >
                Admin Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={16}
                  color="#7A756C"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="email"
                  required
                  placeholder="admin@vanamvalley.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 36px',
                    border: '1.5px solid #E8E5DE',
                    borderRadius: '6px',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#3E3A34',
                  marginBottom: '0.4rem',
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  color="#7A756C"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 36px',
                    border: '1.5px solid #E8E5DE',
                    borderRadius: '6px',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.95rem',
                backgroundColor: '#004B3C',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 15px rgba(0, 75, 60, 0.25)',
                transition: 'background-color 0.2s',
              }}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid #F0EEE9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: '#7A756C',
            }}
          >
            <ShieldCheck size={14} color="#004B3C" />
            <span>End-to-End JWT Session Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

