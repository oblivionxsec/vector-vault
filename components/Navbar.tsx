'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CURRENT_USER, TIER_COLORS, TIER_LABELS } from '@/lib/mockData';

export default function Navbar() {
  const path = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const tierColor = TIER_COLORS[CURRENT_USER.tier];

  const NAV_LINKS = [
    { href: '/feed',        label: 'Feed',        icon: '⬡' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '▲' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 56,
      background: 'rgba(6,10,15,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,212,255,0.1)',
      zIndex: 100,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        width: '100%', maxWidth: 1440,
        margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', gap: 24,
      }}>

        {/* Logo */}
        <Link href="/feed" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 26, height: 26,
            border: '1px solid #00d4ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#00d4ff', fontSize: 11,
            boxShadow: '0 0 8px rgba(0,212,255,0.3)',
          }}>◈</div>
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700, color: '#e2e8f0', letterSpacing: 2 }}>
            Vector<span style={{ color: '#00d4ff' }}>Vault</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map((l) => {
            const active = path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px',
                fontFamily: 'Share Tech Mono, monospace', fontSize: 12,
                color: active ? '#00d4ff' : '#475569',
                textDecoration: 'none',
                background: active ? 'rgba(0,212,255,0.06)' : 'transparent',
                border: `1px solid ${active ? 'rgba(0,212,255,0.2)' : 'transparent'}`,
                transition: 'all 0.2s', letterSpacing: 1,
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#475569'; }}
              >
                <span style={{ fontSize: 10 }}>{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 360, position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#1e293b',
          }}>⌕</span>
          <input
            placeholder="Search challenges, tags, operators..."
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: '#94a3b8',
              fontFamily: 'Share Tech Mono, monospace', fontSize: 12,
              padding: '7px 12px 7px 32px',
              outline: 'none',
              transition: 'border-color 0.2s',
              caretColor: '#00d4ff',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
          />
        </div>

        {/* Right side */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* New submission CTA */}
          <Link href="/submit" className="btn btn-primary" style={{ padding: '7px 16px', fontSize: 11 }}>
            + Submit
          </Link>

          {/* Notifications */}
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              position: 'relative',
              background: 'none', border: 'none', cursor: 'pointer',
              width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#475569', fontSize: 16,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
          >
            ◎
            {/* Unread dot */}
            <div style={{
              position: 'absolute', top: 4, right: 4,
              width: 6, height: 6, borderRadius: '50%',
              background: '#ef4444',
              border: '1px solid var(--bg-base)',
            }} />
          </button>

          {/* Avatar */}
          <Link href="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32,
              background: `linear-gradient(135deg, ${tierColor}22, ${tierColor}44)`,
              border: `1px solid ${tierColor}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Orbitron, monospace', fontSize: 10, fontWeight: 700,
              color: tierColor,
            }}>
              {CURRENT_USER.avatar}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#94a3b8', lineHeight: 1 }}>
                {CURRENT_USER.username}
              </span>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 9, color: tierColor, letterSpacing: 1 }}>
                {TIER_LABELS[CURRENT_USER.tier]}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}