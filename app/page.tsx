'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    id: 1, label: 'RECRUIT', price: 'FREE', rep: '0',
    color: '#94a3b8', border: 'rgba(148,163,184,0.25)',
    glow: 'rgba(148,163,184,0.08)',
    perks: ['2 submissions/mo', 'View all challenges', 'Basic leaderboard', 'Community access'],
  },
  {
    id: 2, label: 'ANALYST', price: '₹99', rep: '100',
    color: '#60a5fa', border: 'rgba(96,165,250,0.3)',
    glow: 'rgba(96,165,250,0.08)',
    perks: ['8 submissions/mo', 'Cash reward eligible', 'Rep discount system', 'Priority scoring'],
  },
  {
    id: 3, label: 'OPERATOR', price: '₹299', rep: '500',
    color: '#00d4ff', border: 'rgba(0,212,255,0.4)',
    glow: 'rgba(0,212,255,0.1)',
    perks: ['20 submissions/mo', 'Post challenges', 'Ad-reduced feed', 'Analytics dashboard'],
    hot: true,
  },
  {
    id: 4, label: 'SPECIALIST', price: '₹599', rep: '1500',
    color: '#a855f7', border: 'rgba(168,85,247,0.3)',
    glow: 'rgba(168,85,247,0.08)',
    perks: ['40 submissions/mo', 'Ad-free experience', 'API access', 'Priority support'],
  },
  {
    id: 5, label: 'IDOL', price: '₹999', rep: '5000',
    color: '#f59e0b', border: 'rgba(245,158,11,0.3)',
    glow: 'rgba(245,158,11,0.08)',
    perks: ['Unlimited submissions', '20% revenue share', 'Exclusive badge', 'Direct admin line'],
  },
];

const FEATURES = [
  { icon: '⬡', title: 'AI-Scored Visualizations', color: '#00d4ff', desc: 'GPT-4o Vision scores every submission on accuracy, clarity, depth and creativity. Objective. Consistent. No favouritism.' },
  { icon: '◈', title: 'Reputation System', color: '#a855f7', desc: 'Rank top 5 to earn rep. Rep unlocks tiers and earns up to 33% discount on subscriptions. Skill beats money here.' },
  { icon: '▲', title: 'Monthly Prize Pool', color: '#f59e0b', desc: '20% of all ad revenue split equally among top 5 idle earners every month. Admin triggers payout on schedule.' },
  { icon: '◉', title: 'Live Leaderboard', color: '#10b981', desc: 'Socket.io powered rankings update in real-time as submissions get scored and engagement accumulates.' },
  { icon: '⬢', title: 'Challenge System', color: '#00d4ff', desc: 'Tier 3+ users post cybersecurity challenges. Community submits visualizations. Best ranked get rewarded.' },
  { icon: '◆', title: 'Tier Benefits', color: '#a855f7', desc: 'Every tier unlocks new capabilities. But rep is required — you cannot buy your way past the knowledge gate.' },
];

const STATS = [
  { val: '10K+', label: 'OPERATORS' },
  { val: '50K+', label: 'VIZ SCORED' },
  { val: '₹2L+', label: 'DISTRIBUTED' },
  { val: '99.2%', label: 'UPTIME' },
];

// ─── COUNTER ──────────────────────────────────────────────────────────────────

function Counter({ value }: { value: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animated.current) return;
      animated.current = true;
      const num = parseFloat(value.replace(/[^0-9.]/g, ''));
      const suffix = value.replace(/[0-9.]/g, '');
      const start = Date.now();
      const duration = 1800;
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay((num * eased).toFixed(0) + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

// ─── DATASTREAM ───────────────────────────────────────────────────────────────

function DataStream() {
  const [cols, setCols] = useState<string[]>([]);
  const CHARS = '01アイウエオカキクケコ</>{}[]#@$%^&*'.split('');

  useEffect(() => {
    setCols(
      Array.from({ length: 18 }, () =>
        Array.from({ length: 25 }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('\n')
      )
    );
  }, []);

  if (!cols.length) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {cols.map((text, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: `${(i / 18) * 100}%`,
            color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#7c3aed' : '#10b981',
            fontSize: 11,
            lineHeight: 1.8,
            whiteSpace: 'pre',
            opacity: 0.05,
            animation: `data-stream ${5 + (i % 4)}s linear ${i * 0.4}s infinite`,
            fontFamily: 'Share Tech Mono, monospace',
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(6,10,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, border: '1px solid #00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d4ff', fontSize: 14, boxShadow: '0 0 10px rgba(0,212,255,0.3)' }}>◈</div>
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, fontWeight: 700, color: '#e2e8f0', letterSpacing: 3 }}>
            Vector<span style={{ color: '#00d4ff' }}>Vault</span>
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Features', 'Tiers', 'Prize Pool'].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}
              style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#475569', letterSpacing: 2, textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >{l}</a>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/login" className="btn btn-ghost" style={{ fontSize: 12 }}>Login</Link>
          <Link href="/register" className="btn btn-primary" style={{ padding: '10px 20px' }}>Enlist</Link>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [typed, setTyped] = useState('');
  const full = 'VISUALIZE. ANALYZE. DOMINATE.';

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < full.length) { setTyped(full.slice(0, ++i)); }
      else clearInterval(t);
    }, 55);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg-base)' }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
      <div className="orb-cyan" style={{ width: 600, height: 600, top: -100, right: -100 }} />
      <div className="orb-purple" style={{ width: 500, height: 500, bottom: -100, left: -100 }} />

      {/* Corner marks */}
      {[
        { top: 80, left: 24 },
        { top: 80, right: 24 },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', width: 40, height: 40, ...pos, borderTop: '1px solid rgba(0,212,255,0.3)', ...(i === 0 ? { borderLeft: '1px solid rgba(0,212,255,0.3)' } : { borderRight: '1px solid rgba(0,212,255,0.3)' }) }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 900, margin: '0 auto' }}>
        {/* Status badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#10b981', letterSpacing: 3, textTransform: 'uppercase' }}>System Online — v2.0.4</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, lineHeight: 1, marginBottom: 24, fontSize: 'clamp(40px, 8vw, 96px)' }}>
          <span style={{ color: '#e2e8f0' }}>CYBER</span><br />
          <span style={{ color: '#00d4ff', textShadow: '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.3)' }}>VECTOR</span>
          <span style={{ color: '#e2e8f0' }}>VAULT</span>
        </h1>

        {/* Typewriter */}
        <div style={{ height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 'clamp(12px, 2vw, 16px)', color: '#475569', letterSpacing: 4 }}>
            {typed}
            <span className="animate-blink" style={{ color: '#00d4ff' }}>█</span>
          </span>
        </div>

        {/* Description */}
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 18, color: '#475569', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          The premier platform for cybersecurity professionals to visualize attack vectors,
          defense strategies, and secure architectures. AI-scored. Reputation-gated. Rewarded.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
          <Link href="/register" className="btn btn-primary">// Initialize Access</Link>
          <a href="#features" className="btn btn-secondary">View Architecture</a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, maxWidth: 640, margin: '0 auto', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.15)' }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ padding: '16px 12px', background: 'var(--bg-elevated)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, fontWeight: 700, color: '#00d4ff', marginBottom: 4 }}>
                <Counter value={s.val} />
              </div>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 9, color: '#475569', letterSpacing: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b', letterSpacing: 3 }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #1e293b, transparent)' }} />
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section id="features" style={{ padding: '120px 0', background: 'var(--bg-void)', position: 'relative' }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#7c3aed', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>// SYSTEM CAPABILITIES</div>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#e2e8f0' }}>
            PLATFORM <span style={{ color: '#00d4ff', textShadow: '0 0 30px rgba(0,212,255,0.5)' }}>FEATURES</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: 'rgba(0,212,255,0.05)' }}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{ padding: 32, background: 'var(--bg-base)', transition: 'background 0.3s', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-base)')}
            >
              <div style={{ fontSize: 28, color: f.color, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, color: '#e2e8f0', letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>{f.title}</h3>
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 15, color: '#475569', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TIERS ────────────────────────────────────────────────────────────────────

function Tiers() {
  return (
    <section id="tiers" style={{ padding: '120px 0', background: 'var(--bg-base)', position: 'relative' }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
      <div className="orb-purple" style={{ width: 600, height: 600, top: '20%', left: '50%', transform: 'translateX(-50%)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#00d4ff', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>// CLEARANCE LEVELS</div>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#e2e8f0', marginBottom: 12 }}>
            ACCESS <span style={{ color: '#a855f7', textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>TIERS</span>
          </h2>
          <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#475569', marginBottom: 24 }}>
            Reputation gates every tier. Pay for benefits — but you can't skip the knowledge wall.
          </p>
          <div style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)', marginBottom: 48 }}>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#f59e0b', letterSpacing: 2 }}>
              ◈ Earn up to 33% discount by building reputation
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {TIERS.map((t) => (
            <div
              key={t.id}
              style={{
                padding: 24,
                background: t.hot ? 'var(--bg-overlay)' : 'var(--bg-surface)',
                border: `1px solid ${t.border}`,
                boxShadow: t.hot ? `0 0 30px ${t.glow}` : 'none',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              {t.hot && (
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#00d4ff', color: '#020408', fontFamily: 'Share Tech Mono, monospace', fontSize: 10, padding: '3px 10px', letterSpacing: 2, whiteSpace: 'nowrap' }}>
                  POPULAR
                </div>
              )}

              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b', letterSpacing: 2, marginBottom: 8 }}>TIER-0{t.id}</div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 700, color: t.color, letterSpacing: 3, marginBottom: 8, textShadow: `0 0 10px ${t.glow}` }}>{t.label}</div>

              <div style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 28, fontWeight: 900, color: '#e2e8f0' }}>{t.price}</span>
                {t.id > 1 && <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#475569', marginLeft: 4 }}>/mo</span>}
              </div>

              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#475569', paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${t.border}` }}>
                {t.rep} REP required
              </div>

              <ul style={{ listStyle: 'none', marginBottom: 20 }}>
                {t.perks.map((p) => (
                  <li key={p} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 13, color: '#64748b', padding: '3px 0', display: 'flex', gap: 6 }}>
                    <span style={{ color: t.color }}>→</span>{p}
                  </li>
                ))}
              </ul>

              <Link href="/register" style={{
                display: 'block', textAlign: 'center', padding: '8px 0',
                border: `1px solid ${t.border}`, color: t.color,
                fontFamily: 'Orbitron, monospace', fontSize: 10, letterSpacing: 2,
                textDecoration: 'none', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = t.glow)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                {t.id === 1 ? 'START FREE' : 'UNLOCK'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRIZE POOL ───────────────────────────────────────────────────────────────

function PrizePool() {
  return (
    <section id="prize-pool" style={{ padding: '120px 0', background: 'var(--bg-void)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-grid-dense" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div className="orb-cyan" style={{ width: 700, height: 400, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#f59e0b', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>// MONTHLY REWARD PROTOCOL</div>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: '#e2e8f0', marginBottom: 40 }}>
          PRIZE <span style={{ color: '#f59e0b', textShadow: '0 0 40px rgba(245,158,11,0.6)' }}>POOL</span>
        </h2>

        {/* Formula box */}
        <div style={{ display: 'inline-block', padding: 32, marginBottom: 48, border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.04)', position: 'relative' }}>
          {/* Corners */}
          {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', width: 12, height: 12, ...pos, borderColor: '#f59e0b', borderStyle: 'solid', borderWidth: i < 2 ? '2px 0 0' : '0 0 2px', ...(i % 2 === 0 ? { borderLeftWidth: 2 } : { borderRightWidth: 2 }) }} />
          ))}
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 'clamp(16px, 3vw, 28px)', color: '#f59e0b', marginBottom: 8 }}>
            Monthly Ad Revenue × 20%
          </div>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 14, color: '#475569', marginBottom: 12 }}>
            ÷ top 5 idle users = equal share
          </div>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#64748b' }}>
            Example: ₹50,000 revenue → ₹10,000 pool → ₹2,000 each
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: 'rgba(245,158,11,0.08)', marginBottom: 48 }}>
          {[
            { n: '01', t: 'Stay Idle', d: 'Run idle sessions. Watch ads. Accumulate monthly score.' },
            { n: '02', t: 'Top 5 Rank', d: 'Your idle score vs other users determines your rank.' },
            { n: '03', t: 'Admin Triggers', d: 'On the scheduled date, admin distributes the pool.' },
            { n: '04', t: 'Equal Split', d: 'Each of the top 5 receives an equal 20% share.' },
          ].map((s) => (
            <div key={s.n} style={{ padding: 24, background: 'var(--bg-void)' }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 36, fontWeight: 900, color: '#f59e0b', opacity: 0.15, marginBottom: 8 }}>{s.n}</div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 700, color: '#f59e0b', letterSpacing: 2, marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{s.d}</div>
            </div>
          ))}
        </div>

        {/* Leaderboard preview */}
        <div style={{ maxWidth: 440, margin: '0 auto', border: '1px solid rgba(245,158,11,0.2)', background: 'var(--bg-elevated)' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(245,158,11,0.15)' }}>
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#f59e0b', letterSpacing: 2 }}>LIVE LEADERBOARD</span>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          </div>
          {[
            { r: 1, u: 'nx_0x1337', s: '48,291 pts', p: '₹2,000' },
            { r: 2, u: 'cypher_iv', s: '41,847 pts', p: '₹2,000' },
            { r: 3, u: 'v01d_sec',  s: '38,102 pts', p: '₹2,000' },
            { r: 4, u: 'gr4y_h4t',  s: '29,774 pts', p: '₹2,000' },
            { r: 5, u: 'zer0_day',  s: '21,903 pts', p: '₹2,000' },
          ].map((row) => (
            <div key={row.r} style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: row.r === 1 ? '#f59e0b' : '#1e293b', width: 24, textAlign: 'center' }}>#{row.r}</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 13, color: '#64748b', flex: 1, textAlign: 'left' }}>{row.u}</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#475569' }}>{row.s}</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>{row.p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-grid" style={{ position: 'absolute', inset: 0 }} />
      <div className="orb-cyan" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#00d4ff', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>// BEGIN SEQUENCE</div>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: '#e2e8f0', marginBottom: 16 }}>
          READY TO <span style={{ color: '#00d4ff', textShadow: '0 0 40px rgba(0,212,255,0.6)' }}>BREACH</span>?
        </h2>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 18, color: '#475569', marginBottom: 40, lineHeight: 1.7 }}>
          Join thousands of operators visualizing the future of cybersecurity. Start free. Earn rep. Unlock everything.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn btn-primary">// Deploy Profile</Link>
          <Link href="/login" className="btn btn-secondary">Auth Token Login</Link>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ padding: '40px 0', background: 'var(--bg-void)', borderTop: '1px solid rgba(0,212,255,0.07)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 24, height: 24, border: '1px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d4ff', fontSize: 12 }}>◈</div>
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#1e293b', letterSpacing: 3 }}>VECTORVAULT</span>
        </div>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#1e293b' }}>© 2025 VectorVault — v2.0.4</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Terms', 'Privacy', 'Contact'].map((l) => (
            <a key={l} href="#" style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#1e293b', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1e293b')}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <DataStream />
      <Nav />
      <Hero />
      <Features />
      <Tiers />
      <PrizePool />
      <CTA />
      <Footer />
    </main>
  );
}