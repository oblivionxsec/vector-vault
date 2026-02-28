'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyOTPPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email  = params.get('email') ?? 'operator@vectorvault.io';

  const [otp, setOtp]           = useState(['', '', '', '', '', '']);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);
  const [timer, setTimer]       = useState(60);
  const [resending, setResending] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // ── countdown ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // ── focus first input on mount ───────────────────────────────────────────────
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // ── handle single digit input ────────────────────────────────────────────────
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError('');
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ── backspace jumps to previous ──────────────────────────────────────────────
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0)  inputs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) inputs.current[index + 1]?.focus();
  };

  // ── paste support ────────────────────────────────────────────────────────────
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split('').forEach((char, i) => { next[i] = char; });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, 5);
    inputs.current[lastFilled]?.focus();
  };

  // ── verify ───────────────────────────────────────────────────────────────────
  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Enter all 6 digits'); return; }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 1500)); // TODO: POST /api/auth/verify-otp
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push('/kyc'), 1000);
  };

  // ── resend ───────────────────────────────────────────────────────────────────
  const handleResend = async () => {
    setResending(true);
    setOtp(['', '', '', '', '', '']);
    setError('');
    await new Promise((r) => setTimeout(r, 1000)); // TODO: POST /api/auth/resend-otp
    setResending(false);
    setTimer(60);
    inputs.current[0]?.focus();
  };

  const filled = otp.filter(Boolean).length;
  const isComplete = filled === 6;

  // ── success state ─────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 80px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, margin: '0 auto 24px',
            border: '2px solid #10b981',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: '#10b981',
            boxShadow: '0 0 30px rgba(16,185,129,0.3)',
            animation: 'pulse-glow 1s ease-in-out infinite',
          }}>✓</div>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#10b981', letterSpacing: 3, marginBottom: 8 }}>
            IDENTITY CONFIRMED
          </div>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 24, fontWeight: 700, color: '#e2e8f0', letterSpacing: 2 }}>
            ACCESS GRANTED
          </h2>
          <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#475569', marginTop: 8 }}>
            Redirecting to KYC...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 80px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Card */}
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          padding: 32,
          position: 'relative',
        }}>
          {/* Top glow line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }} />

          {/* Corner marks */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, borderTop: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderTop: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, borderBottom: '2px solid #7c3aed', borderLeft: '2px solid #7c3aed' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderBottom: '2px solid #7c3aed', borderRight: '2px solid #7c3aed' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            {/* Icon */}
            <div style={{
              width: 56, height: 56, margin: '0 auto 20px',
              border: '1px solid rgba(0,212,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: '#00d4ff',
              background: 'rgba(0,212,255,0.05)',
            }}>◈</div>

            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
              IDENTITY VERIFICATION
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, fontWeight: 700, color: '#e2e8f0', letterSpacing: 2, marginBottom: 12 }}>
              VERIFY OTP
            </h1>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#475569', lineHeight: 1.7 }}>
              6-digit code sent to<br />
              <span style={{ color: '#00d4ff' }}>{email}</span>
            </p>
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

          {/* OTP inputs */}
          <div
            style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 12 }}
            onPaste={handlePaste}
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  width: 48, height: 56,
                  textAlign: 'center',
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 20, fontWeight: 700,
                  background: digit ? 'rgba(0,212,255,0.08)' : 'var(--bg-surface)',
                  border: `1px solid ${digit ? '#00d4ff' : 'var(--border-default)'}`,
                  color: '#00d4ff',
                  outline: 'none',
                  caretColor: '#00d4ff',
                  transition: 'all 0.2s',
                  boxShadow: digit ? '0 0 12px rgba(0,212,255,0.2)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
            {otp.map((d, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: '50%',
                background: d ? '#00d4ff' : 'var(--bg-overlay)',
                transition: 'background 0.2s',
                boxShadow: d ? '0 0 6px rgba(0,212,255,0.5)' : 'none',
              }} />
            ))}
          </div>

          {/* Verify button */}
          <button
            onClick={handleVerify}
            disabled={loading || !isComplete}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }}
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
                Verifying...
              </span>
            ) : `// Verify Identity ${isComplete ? '' : `(${filled}/6)`}`}
          </button>

          {/* Resend */}
          <div style={{ textAlign: 'center' }}>
            {timer > 0 ? (
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#1e293b' }}>
                Resend in{' '}
                <span style={{
                  fontFamily: 'Orbitron, monospace', fontSize: 12,
                  color: '#475569',
                }}>
                  {String(Math.floor(timer / 60)).padStart(2, '0')}:
                  {String(timer % 60).padStart(2, '0')}
                </span>
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Share Tech Mono, monospace', fontSize: 12,
                  color: resending ? '#475569' : '#00d4ff',
                  transition: 'color 0.2s',
                }}
              >
                {resending ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      width: 10, height: 10,
                      border: '1.5px solid transparent',
                      borderTopColor: '#475569',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin-slow 0.8s linear infinite',
                    }} />
                    Sending...
                  </span>
                ) : 'Resend code →'}
              </button>
            )}
          </div>
        </div>

        {/* Back link */}
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <a
            href="/register"
            style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: 12,
              color: '#475569', textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
          >
            ← Back to registration
          </a>
        </div>
      </div>
    </div>
  );
}