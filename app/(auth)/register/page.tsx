'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EXPERTISE_TAGS = [
  'Network Security', 'Malware Analysis', 'Penetration Testing',
  'Cryptography', 'Web Security', 'Reverse Engineering',
  'Forensics', 'Cloud Security', 'OSINT', 'Social Engineering',
  'Exploit Dev', 'Threat Intel',
];

type Step1 = { username: string; email: string; password: string; confirm: string };
type Step2 = { bio: string; tags: string[]; referral: string };

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const [s1, setS1] = useState<Step1>({ username: '', email: '', password: '', confirm: '' });
  const [s2, setS2] = useState<Step2>({ bio: '', tags: [], referral: '' });

  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [errors, setErrors]           = useState<Partial<Step1>>({});
  const [focused, setFocused]         = useState<string | null>(null);

  // ── password strength ───────────────────────────────────────────────────────
  const strength = (() => {
    const p = s1.password;
    let score = 0;
    if (p.length >= 8)  score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score; // 0–5
  })();

  const strengthLabel = ['', 'WEAK', 'WEAK', 'FAIR', 'STRONG', 'STRONG'][strength];
  const strengthColor = ['', '#ef4444', '#ef4444', '#f59e0b', '#10b981', '#10b981'][strength];

  // ── step 1 validation ───────────────────────────────────────────────────────
  const validateStep1 = () => {
    const e: Partial<Step1> = {};
    if (!s1.username || s1.username.length < 3)      e.username = 'Min 3 characters';
    if (/[^a-z0-9_]/.test(s1.username))              e.username = 'Only lowercase, numbers, underscore';
    if (!s1.email || !s1.email.includes('@'))         e.email    = 'Valid email required';
    if (!s1.password || s1.password.length < 8)      e.password = 'Min 8 characters';
    if (s1.password !== s1.confirm)                  e.confirm  = 'Passphrases do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep1()) setStep(2); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // TODO: POST /api/auth/register
    setLoading(false);
    router.push(`/verify-otp?email=${encodeURIComponent(s1.email)}`);
  };

  const toggleTag = (tag: string) => {
    setS2((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : prev.tags.length < 5
          ? [...prev.tags, tag]
          : prev.tags,
    }));
  };

  // ── shared styles ────────────────────────────────────────────────────────────
  const fieldLabel = (name: string) => ({
    color: focused === name ? 'var(--cyan)' : undefined,
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 80px',
    }}>
      <div style={{ width: '100%', maxWidth: 460 }}>

        {/* ── Step indicator ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
          {([1, 2] as const).map((n) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 700,
                background: step >= n ? '#00d4ff' : 'var(--bg-elevated)',
                color: step >= n ? '#020408' : '#475569',
                border: `1px solid ${step >= n ? '#00d4ff' : 'var(--border-default)'}`,
                transition: 'all 0.3s',
              }}>{n}</div>
              <span style={{
                fontFamily: 'Share Tech Mono, monospace', fontSize: 10,
                color: step >= n ? '#94a3b8' : '#1e293b',
                letterSpacing: 1, textTransform: 'uppercase',
              }}>
                {n === 1 ? 'Credentials' : 'Profile'}
              </span>
              {n < 2 && (
                <div style={{ width: 32, height: 1, background: step > n ? '#00d4ff' : 'var(--border-subtle)', margin: '0 4px' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Card ───────────────────────────────────────────────────────── */}
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          padding: 32,
          position: 'relative',
        }}>
          {/* Top glow line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }} />

          {/* Corner marks */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, borderTop: '2px solid #a855f7', borderLeft: '2px solid #a855f7' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderTop: '2px solid #a855f7', borderRight: '2px solid #a855f7' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, borderBottom: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderBottom: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>
              STEP {step} OF 2 — NEW OPERATIVE
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, fontWeight: 700, color: '#e2e8f0', letterSpacing: 2 }}>
              {step === 1 ? 'SET CREDENTIALS' : 'BUILD PROFILE'}
            </h1>
          </div>

          {/* ════════════════ STEP 1 ════════════════ */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* OAuth */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {[
                  { icon: '⬡', label: 'Enlist with GitHub', href: '/api/auth/github' },
                  { icon: '◉', label: 'Enlist with Google', href: '/api/auth/google' },
                ].map((o) => (
                  <a key={o.label} href={o.href} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 16px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    color: '#94a3b8',
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: 15, fontWeight: 600,
                    textDecoration: 'none', transition: 'all 0.2s',
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Username */}
                <div>
                  <label className="label" style={fieldLabel('username')}>Operative Handle</label>
                  <input
                    className={`input ${errors.username ? 'input-error' : ''}`}
                    value={s1.username}
                    onChange={e => setS1({ ...s1, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    onFocus={() => setFocused('username')}
                    onBlur={() => setFocused(null)}
                    placeholder="nx_0x1337"
                    autoComplete="username"
                  />
                  {errors.username && <p className="error-text">{errors.username}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="label" style={fieldLabel('email')}>Email Address</label>
                  <input
                    className={`input ${errors.email ? 'input-error' : ''}`}
                    type="email"
                    value={s1.email}
                    onChange={e => setS1({ ...s1, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="operator@domain.io"
                    autoComplete="email"
                  />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="label" style={fieldLabel('password')}>Passphrase</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className={`input ${errors.password ? 'input-error' : ''}`}
                      type={showPass ? 'text' : 'password'}
                      value={s1.password}
                      onChange={e => setS1({ ...s1, password: e.target.value })}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused(null)}
                      placeholder="Min 8 characters"
                      style={{ paddingRight: 48 }}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'Share Tech Mono, monospace', fontSize: 14,
                      color: showPass ? '#00d4ff' : '#475569', transition: 'color 0.2s',
                    }}>
                      {showPass ? '◉' : '◎'}
                    </button>
                  </div>
                  {errors.password && <p className="error-text">{errors.password}</p>}

                  {/* Strength bar */}
                  {s1.password && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>STRENGTH</span>
                        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: strengthColor }}>{strengthLabel}</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${(strength / 5) * 100}%`, background: strengthColor }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm */}
                <div>
                  <label className="label" style={fieldLabel('confirm')}>Confirm Passphrase</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      className={`input ${errors.confirm ? 'input-error' : ''}`}
                      type={showConfirm ? 'text' : 'password'}
                      value={s1.confirm}
                      onChange={e => setS1({ ...s1, confirm: e.target.value })}
                      onFocus={() => setFocused('confirm')}
                      onBlur={() => setFocused(null)}
                      placeholder="Repeat passphrase"
                      style={{ paddingRight: 48 }}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'Share Tech Mono, monospace', fontSize: 14,
                      color: showConfirm ? '#00d4ff' : '#475569', transition: 'color 0.2s',
                    }}>
                      {showConfirm ? '◉' : '◎'}
                    </button>
                  </div>
                  {errors.confirm && <p className="error-text">{errors.confirm}</p>}
                </div>

                {/* Next button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                >
                  Next: Build Profile →
                </button>
              </div>
            </div>
          )}

          {/* ════════════════ STEP 2 ════════════════ */}
          {step === 2 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Bio */}
              <div>
                <label className="label" style={fieldLabel('bio')}>
                  Operative Bio
                  <span style={{ color: '#1e293b', marginLeft: 6 }}>(optional)</span>
                </label>
                <textarea
                  className="input"
                  value={s2.bio}
                  onChange={e => setS2({ ...s2, bio: e.target.value.slice(0, 280) })}
                  onFocus={() => setFocused('bio')}
                  onBlur={() => setFocused(null)}
                  placeholder="Describe your cybersecurity focus..."
                  rows={3}
                  style={{ resize: 'none', lineHeight: 1.5 }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>
                    {s2.bio.length}/280
                  </span>
                </div>
              </div>

              {/* Expertise tags */}
              <div>
                <label className="label">
                  Expertise Tags
                  <span style={{ color: '#1e293b', marginLeft: 6 }}>(up to 5)</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                  {EXPERTISE_TAGS.map((tag) => {
                    const selected = s2.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        style={{
                          padding: '5px 12px',
                          fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
                          background: selected ? 'rgba(0,212,255,0.1)' : 'var(--bg-surface)',
                          border: `1px solid ${selected ? '#00d4ff' : 'var(--border-default)'}`,
                          color: selected ? '#00d4ff' : '#475569',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        {selected ? '✓ ' : ''}{tag}
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>
                    {s2.tags.length}/5 selected
                  </span>
                </div>
              </div>

              {/* Referral code */}
              <div>
                <label className="label" style={fieldLabel('referral')}>
                  Referral Code
                  <span style={{ color: '#1e293b', marginLeft: 6 }}>(optional)</span>
                </label>
                <input
                  className="input"
                  value={s2.referral}
                  onChange={e => setS2({ ...s2, referral: e.target.value.toUpperCase() })}
                  onFocus={() => setFocused('referral')}
                  onBlur={() => setFocused(null)}
                  placeholder="REF-XXXXXX"
                />
              </div>

              {/* Terms */}
              <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#1e293b', lineHeight: 1.7 }}>
                By enlisting you agree to our{' '}
                <a href="#" style={{ color: '#475569', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                >Terms</a>
                {' '}and{' '}
                <a href="#" style={{ color: '#475569', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                >Privacy Policy</a>.
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ flex: 2, justifyContent: 'center' }}
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
                      Deploying...
                    </span>
                  ) : '// Deploy Profile'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Login link */}
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#475569' }}>
            Already enlisted?{' '}
          </span>
          <Link href="/login" style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#00d4ff', textDecoration: 'none' }}>
            Authenticate →
          </Link>
        </div>
      </div>
    </div>
  );
}