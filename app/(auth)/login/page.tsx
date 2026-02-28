'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]  = useState(false);
  const [error, setError]      = useState('');
  const [focused, setFocused]  = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('All fields required'); return; }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1500)); // TODO: POST /api/auth/login
    setLoading(false);
    setError('Invalid credentials — access denied.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 80px',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Card */}
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          padding: 32,
          position: 'relative',
        }}>
          {/* Top glow line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }} />

          {/* Card corner marks */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, borderTop: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderTop: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, borderBottom: '2px solid #7c3aed', borderLeft: '2px solid #7c3aed' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderBottom: '2px solid #7c3aed', borderRight: '2px solid #7c3aed' }} />

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>
              AUTHENTICATION REQUIRED
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 24, fontWeight: 700, color: '#e2e8f0', letterSpacing: 2 }}>
              SIGN IN
            </h1>
          </div>

          {/* OAuth */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { icon: '⬡', label: 'Continue with GitHub', href: '/api/auth/github' },
              { icon: '◉', label: 'Continue with Google', href: '/api/auth/google' },
            ].map((o) => (
              <a key={o.label} href={o.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 16px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: '#94a3b8',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: 15, fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.35)';
                  (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                }}
              >
                <span style={{ color: '#00d4ff', fontSize: 16 }}>{o.icon}</span>
                {o.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: 20, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(239,68,68,0.07)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              fontFamily: 'Share Tech Mono, monospace', fontSize: 12,
            }}>
              <span>✕</span><span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Email */}
            <div>
              <label className="label" style={{ color: focused === 'email' ? 'var(--cyan)' : undefined }}>
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="operator@vectorvault.io"
                className="input"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label" style={{ color: focused === 'password' ? 'var(--cyan)' : undefined }}>
                Passphrase
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••••••"
                  className="input"
                  style={{ paddingRight: 48 }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Share Tech Mono, monospace', fontSize: 14,
                    color: showPass ? '#00d4ff' : '#475569',
                    transition: 'color 0.2s',
                  }}
                >
                  {showPass ? '◉' : '◎'}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/forgot-password" style={{
                fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
                color: '#475569', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >
                Forgot passphrase?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 12, height: 12,
                    border: '1.5px solid transparent',
                    borderTopColor: '#00d4ff',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin-slow 0.8s linear infinite',
                  }} />
                  Authenticating...
                </span>
              ) : '// Authenticate'}
            </button>
          </form>

          {/* Register link */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#475569' }}>
              No credentials?{' '}
            </span>
            <Link href="/register" style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: 12,
              color: '#00d4ff', textDecoration: 'none',
            }}>
              Request access →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}