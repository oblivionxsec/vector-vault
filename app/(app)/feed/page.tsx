'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MOCK_VISUALIZATIONS, MOCK_CHALLENGES,
  ALL_CATEGORIES, ALL_DIFFICULTIES,
  TIER_COLORS, TIER_LABELS, DIFFICULTY_COLORS, CATEGORY_ICONS,
  type Visualization, type Category, type Difficulty,
} from '@/lib/mockData';

// ─── VIZ CARD ─────────────────────────────────────────────────────────────────

function VizCard({ viz }: { viz: Visualization }) {
  const [liked,  setLiked]  = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [likes,  setLikes]  = useState(viz.likes);
  const [saves,  setSaves]  = useState(viz.saves);

  const tierColor = TIER_COLORS[viz.author.tier];
  const diffColor = DIFFICULTY_COLORS[viz.challenge.difficulty];

  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-default)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'border-color 0.3s, transform 0.2s',
      display: 'flex', flexDirection: 'column',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${tierColor}, transparent)` }} />

      {/* Image placeholder */}
      <Link href={`/challenge/${viz.challengeId}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          height: 180,
          background: `linear-gradient(135deg, var(--bg-surface), var(--bg-overlay))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          cursor: 'pointer',
        }}>
          {/* Pattern bg */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          {/* Category icon */}
          <div style={{
            fontSize: 48,
            color: 'rgba(0,212,255,0.15)',
            fontFamily: 'Share Tech Mono, monospace',
            position: 'relative', zIndex: 1,
          }}>
            {CATEGORY_ICONS[viz.challenge.category]}
          </div>

          {/* Score badge */}
          {viz.score !== null && (
            <div style={{
              position: 'absolute', top: 10, right: 10,
              background: 'rgba(6,10,15,0.9)',
              border: `1px solid ${viz.score >= 90 ? '#10b981' : viz.score >= 75 ? '#00d4ff' : '#f59e0b'}`,
              padding: '4px 10px',
              fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700,
              color: viz.score >= 90 ? '#10b981' : viz.score >= 75 ? '#00d4ff' : '#f59e0b',
            }}>
              {viz.score}
            </div>
          )}

          {/* Rank badge */}
          {viz.rank === 1 && (
            <div style={{
              position: 'absolute', top: 10, left: 10,
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.4)',
              padding: '3px 8px',
              fontFamily: 'Share Tech Mono, monospace', fontSize: 10,
              color: '#f59e0b', letterSpacing: 1,
            }}>
              #1 RANKED
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Challenge ref */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>
            {CATEGORY_ICONS[viz.challenge.category]}
          </span>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 1 }}>
            {viz.challenge.category}
          </span>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: 9,
              color: diffColor,
              background: `${diffColor}15`,
              border: `1px solid ${diffColor}33`,
              padding: '2px 6px',
            }}>
              {viz.challenge.difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/challenge/${viz.challengeId}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700,
            color: '#e2e8f0', lineHeight: 1.4, letterSpacing: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {viz.title}
          </h3>
        </Link>

        {/* Description */}
        <p style={{
          fontFamily: 'Rajdhani, sans-serif', fontSize: 14, color: '#475569', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1,
        }}>
          {viz.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {viz.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: 10,
              color: '#1e293b', background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)', padding: '2px 8px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border-subtle)' }} />

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Author */}
          <div style={{
            width: 24, height: 24,
            background: `${tierColor}22`,
            border: `1px solid ${tierColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Orbitron, monospace', fontSize: 8, color: tierColor,
            flexShrink: 0,
          }}>
            {viz.author.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {viz.author.username}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Likes */}
            <button
              onClick={() => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
                color: liked ? '#ef4444' : '#475569',
                transition: 'color 0.2s', padding: 0,
              }}
            >
              <span style={{ fontSize: 12 }}>{liked ? '♥' : '♡'}</span>
              {likes}
            </button>

            {/* Saves */}
            <button
              onClick={() => { setSaved(!saved); setSaves(s => saved ? s - 1 : s + 1); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
                color: saved ? '#00d4ff' : '#475569',
                transition: 'color 0.2s', padding: 0,
              }}
            >
              <span style={{ fontSize: 12 }}>{saved ? '◈' : '◇'}</span>
              {saves}
            </button>

            {/* Views */}
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#1e293b' }}>
              <span>◎</span>{viz.views.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CHALLENGE CARD ───────────────────────────────────────────────────────────

function ChallengeCard({ challenge }: { challenge: typeof MOCK_CHALLENGES[0] }) {
  const diffColor  = DIFFICULTY_COLORS[challenge.difficulty];
  const tierColor  = TIER_COLORS[challenge.author.tier];
  const statusColor = challenge.status === 'open' ? '#10b981' : challenge.status === 'judging' ? '#f59e0b' : '#475569';

  return (
    <Link href={`/challenge/${challenge.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        padding: 16,
        position: 'relative',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)';
          (e.currentTarget as HTMLElement).style.background = 'var(--bg-overlay)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
          (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
        }}
      >
        {/* Prize badge */}
        {challenge.prize && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 700,
            color: '#f59e0b', background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.3)', padding: '3px 8px',
          }}>
            ₹{challenge.prize.toLocaleString()}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          {/* Category icon */}
          <div style={{
            width: 36, height: 36, flexShrink: 0,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: '#475569',
          }}>
            {CATEGORY_ICONS[challenge.category]}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700,
              color: '#e2e8f0', marginBottom: 6, letterSpacing: 0.5, lineHeight: 1.4,
              paddingRight: challenge.prize ? 80 : 0,
            }}>
              {challenge.title}
            </h3>

            <p style={{
              fontFamily: 'Rajdhani, sans-serif', fontSize: 13, color: '#475569',
              lineHeight: 1.5, marginBottom: 10,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {challenge.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {/* Status */}
              <span style={{
                fontFamily: 'Share Tech Mono, monospace', fontSize: 9,
                color: statusColor, background: `${statusColor}15`,
                border: `1px solid ${statusColor}33`, padding: '2px 6px',
                letterSpacing: 1, textTransform: 'uppercase',
              }}>
                {challenge.status}
              </span>

              {/* Difficulty */}
              <span style={{
                fontFamily: 'Share Tech Mono, monospace', fontSize: 9,
                color: diffColor, background: `${diffColor}15`,
                border: `1px solid ${diffColor}33`, padding: '2px 6px',
              }}>
                {challenge.difficulty}
              </span>

              {/* Stats */}
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b', marginLeft: 'auto' }}>
                {challenge.submissionCount} submissions
              </span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>
                {challenge.viewCount.toLocaleString()} views
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

function Sidebar({
  activeTab, setActiveTab,
  categories, setCategories,
  difficulties, setDifficulties,
  onReset,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
  categories: Category[];
  setCategories: (c: Category[]) => void;
  difficulties: Difficulty[];
  setDifficulties: (d: Difficulty[]) => void;
  onReset: () => void;
}) {
  const toggleCategory = (c: Category) =>
    setCategories(categories.includes(c) ? categories.filter((x) => x !== c) : [...categories, c]);

  const toggleDifficulty = (d: Difficulty) =>
    setDifficulties(difficulties.includes(d) ? difficulties.filter((x) => x !== d) : [...difficulties, d]);

  const hasFilters = categories.length > 0 || difficulties.length > 0;

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      display: 'flex', flexDirection: 'column', gap: 24,
    }}>

      {/* View tabs */}
      <div>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          VIEW
        </div>
        {[
          { id: 'visualizations', label: 'Visualizations', icon: '◈' },
          { id: 'challenges',     label: 'Challenges',     icon: '▸' },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', marginBottom: 2,
            background: activeTab === tab.id ? 'rgba(0,212,255,0.06)' : 'transparent',
            border: `1px solid ${activeTab === tab.id ? 'rgba(0,212,255,0.2)' : 'transparent'}`,
            color: activeTab === tab.id ? '#00d4ff' : '#475569',
            fontFamily: 'Share Tech Mono, monospace', fontSize: 12,
            cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { if (activeTab !== tab.id) (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
            onMouseLeave={e => { if (activeTab !== tab.id) (e.currentTarget as HTMLElement).style.color = '#475569'; }}
          >
            <span style={{ fontSize: 11 }}>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-subtle)' }} />

      {/* Category filter */}
      <div>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          CATEGORY
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ALL_CATEGORIES.map((c) => {
            const active = categories.includes(c);
            return (
              <button key={c} onClick={() => toggleCategory(c)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px',
                background: active ? 'rgba(0,212,255,0.06)' : 'transparent',
                border: `1px solid ${active ? 'rgba(0,212,255,0.2)' : 'transparent'}`,
                color: active ? '#00d4ff' : '#475569',
                fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: 10 }}>{CATEGORY_ICONS[c]}</span>
                <span style={{ flex: 1 }}>{c}</span>
                {active && <span style={{ fontSize: 10 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-subtle)' }} />

      {/* Difficulty filter */}
      <div>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          DIFFICULTY
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ALL_DIFFICULTIES.map((d) => {
            const active = difficulties.includes(d);
            const color  = DIFFICULTY_COLORS[d];
            return (
              <button key={d} onClick={() => toggleDifficulty(d)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px',
                background: active ? `${color}10` : 'transparent',
                border: `1px solid ${active ? `${color}33` : 'transparent'}`,
                color: active ? color : '#475569',
                fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: active ? color : '#1e293b', flexShrink: 0 }} />
                {d}
                {active && <span style={{ marginLeft: 'auto', fontSize: 10, color }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      {hasFilters && (
        <>
          <div style={{ height: 1, background: 'var(--border-subtle)' }} />
          <button onClick={onReset} style={{
            padding: '8px 12px',
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#ef4444',
            fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.05)')}
          >
            ✕ Clear filters
          </button>
        </>
      )}
    </aside>
  );
}

// ─── FEED PAGE ────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const [activeTab,   setActiveTab]   = useState<'visualizations' | 'challenges'>('visualizations');
  const [sort,        setSort]        = useState<'recent' | 'top' | 'trending'>('recent');
  const [categories,  setCategories]  = useState<Category[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

  const resetFilters = () => { setCategories([]); setDifficulties([]); };

  // Filter visualizations
  const filteredViz = useMemo(() => {
    let items = [...MOCK_VISUALIZATIONS];
    if (categories.length)  items = items.filter((v) => categories.includes(v.challenge.category));
    if (difficulties.length) items = items.filter((v) => difficulties.includes(v.challenge.difficulty));
    if (sort === 'top')      items.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    if (sort === 'trending') items.sort((a, b) => b.likes - a.likes);
    return items;
  }, [categories, difficulties, sort]);

  // Filter challenges
  const filteredChallenges = useMemo(() => {
    let items = [...MOCK_CHALLENGES];
    if (categories.length)   items = items.filter((c) => categories.includes(c.category));
    if (difficulties.length) items = items.filter((c) => difficulties.includes(c.difficulty));
    if (sort === 'top')      items.sort((a, b) => b.topScore - a.topScore);
    if (sort === 'trending') items.sort((a, b) => b.viewCount - a.viewCount);
    return items;
  }, [categories, difficulties, sort]);

  const activeCount = categories.length + difficulties.length;

  return (
    <div style={{
      maxWidth: 1440, margin: '0 auto',
      padding: '24px 24px',
      display: 'flex', gap: 28,
    }}>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as any)}
        categories={categories}
        setCategories={setCategories}
        difficulties={difficulties}
        setDifficulties={setDifficulties}
        onReset={resetFilters}
      />

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0 }}>

        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 20, flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, fontWeight: 700, color: '#e2e8f0', letterSpacing: 1 }}>
              {activeTab === 'visualizations' ? 'VISUALIZATIONS' : 'CHALLENGES'}
            </span>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
              color: '#475569', background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)', padding: '2px 8px',
            }}>
              {activeTab === 'visualizations' ? filteredViz.length : filteredChallenges.length}
            </span>
            {activeCount > 0 && (
              <span style={{
                fontFamily: 'Share Tech Mono, monospace', fontSize: 10,
                color: '#00d4ff', background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)', padding: '2px 8px',
              }}>
                {activeCount} filter{activeCount > 1 ? 's' : ''} active
              </span>
            )}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', gap: 4 }}>
            {(['recent', 'top', 'trending'] as const).map((s) => (
              <button key={s} onClick={() => setSort(s)} style={{
                padding: '6px 14px',
                background: sort === s ? 'rgba(0,212,255,0.08)' : 'transparent',
                border: `1px solid ${sort === s ? 'rgba(0,212,255,0.25)' : 'var(--border-subtle)'}`,
                color: sort === s ? '#00d4ff' : '#475569',
                fontFamily: 'Share Tech Mono, monospace', fontSize: 11,
                cursor: 'pointer', transition: 'all 0.15s',
                textTransform: 'capitalize', letterSpacing: 1,
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {activeTab === 'visualizations' ? (
          filteredViz.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 16,
            }}>
              {filteredViz.map((viz) => (
                <VizCard key={viz.id} viz={viz} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={resetFilters} />
          )
        ) : (
          filteredChallenges.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredChallenges.map((c) => (
                <ChallengeCard key={c.id} challenge={c} />
              ))}
            </div>
          ) : (
            <EmptyState onReset={resetFilters} />
          )
        )}
      </main>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{
      padding: '80px 24px', textAlign: 'center',
      border: '1px dashed var(--border-subtle)',
      background: 'var(--bg-surface)',
    }}>
      <div style={{ fontSize: 40, color: '#1e293b', marginBottom: 16 }}>◈</div>
      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#1e293b', letterSpacing: 2, marginBottom: 8 }}>
        NO RESULTS
      </div>
      <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#1e293b', marginBottom: 20 }}>
        No items match your current filters
      </p>
      <button onClick={onReset} className="btn btn-secondary" style={{ fontSize: 11 }}>
        Clear filters
      </button>
    </div>
  );
}