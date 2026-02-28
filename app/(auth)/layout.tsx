'use client';

import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6, zIndex: 0 }} />

      {/* Glow orbs */}
      <div className="orb-cyan"   style={{ width: 500, height: 500, top: -120, right: -120, zIndex: 0 }} />
      <div className="orb-purple" style={{ width: 400, height: 400, bottom: -120, left: -80, zIndex: 0 }} />

      {/* Corner marks */}
      <div style={{ position: 'absolute', top: 20, left: 20, width: 36, height: 36, borderTop: '1px solid rgba(0,212,255,0.25)', borderLeft: '1px solid rgba(0,212,255,0.25)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderTop: '1px solid rgba(0,212,255,0.25)', borderRight: '1px solid rgba(0,212,255,0.25)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 20, left: 20, width: 36, height: 36, borderBottom: '1px solid rgba(124,58,237,0.25)', borderLeft: '1px solid rgba(124,58,237,0.25)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 20, right: 20, width: 36, height: 36, borderBottom: '1px solid rgba(124,58,237,0.25)', borderRight: '1px solid rgba(124,58,237,0.25)', zIndex: 1 }} />

      {/* Top nav */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 30, height: 30,
            border: '1px solid #00d4ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#00d4ff', fontSize: 13,
            boxShadow: '0 0 10px rgba(0,212,255,0.25)',
          }}>◈</div>
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 15, fontWeight: 700, color: '#e2e8f0', letterSpacing: 3 }}>
            Vector<span style={{ color: '#00d4ff' }}>Vault</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b', letterSpacing: 2 }}>
            SYSTEMS ONLINE
          </span>
        </div>
      </header>

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Footer */}
      <footer style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 10,
        borderTop: '1px solid rgba(0,212,255,0.05)',
      }}>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>
          © 2025 VectorVault
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Terms', 'Privacy', 'Support'].map((l) => (
            <a key={l} href="#" style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: 10, color: '#1e293b',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1e293b')}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
