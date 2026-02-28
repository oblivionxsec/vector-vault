'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type DocId = 'aadhaar' | 'pan' | 'selfie';

interface DocConfig {
  id: DocId;
  label: string;
  desc: string;
  hint: string;
  icon: string;
  required: boolean;
}

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const DOCS: DocConfig[] = [
  {
    id: 'aadhaar', label: 'Aadhaar Card', required: true,
    desc: 'Front side — name, DOB, address visible',
    hint: 'JPG, PNG or PDF · Max 5MB',
    icon: '◈',
  },
  {
    id: 'pan', label: 'PAN Card', required: true,
    desc: 'Clear scan — name and PAN number visible',
    hint: 'JPG, PNG or PDF · Max 5MB',
    icon: '◆',
  },
  {
    id: 'selfie', label: 'Selfie with ID', required: true,
    desc: 'Hold your Aadhaar/PAN next to your face',
    hint: 'JPG or PNG · Max 5MB · Good lighting',
    icon: '◉',
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function KYCPage() {
  const router = useRouter();

  const [files,    setFiles]    = useState<Partial<Record<DocId, File>>>({});
  const [previews, setPreviews] = useState<Partial<Record<DocId, string>>>({});
  const [dragging, setDragging] = useState<DocId | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [errors,   setErrors]   = useState<Partial<Record<DocId, string>>>({});

  // ── file handler ─────────────────────────────────────────────────────────────
  const handleFile = useCallback((id: DocId, file: File) => {
    // validate
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      setErrors((e) => ({ ...e, [id]: 'Invalid file type. Use JPG, PNG or PDF.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, [id]: 'File too large. Max 5MB.' }));
      return;
    }
    setErrors((e) => ({ ...e, [id]: undefined }));
    setFiles((f) => ({ ...f, [id]: file }));

    // preview for images only
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviews((p) => ({ ...p, [id]: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      // PDF — show placeholder
      setPreviews((p) => ({ ...p, [id]: 'pdf' }));
    }
  }, []);

  const removeFile = (id: DocId) => {
    setFiles((f)    => { const n = { ...f };    delete n[id]; return n; });
    setPreviews((p) => { const n = { ...p };    delete n[id]; return n; });
    setErrors((e)   => ({ ...e, [id]: undefined }));
  };

  // ── drag handlers ─────────────────────────────────────────────────────────────
  const onDragOver  = (id: DocId, e: React.DragEvent) => { e.preventDefault(); setDragging(id); };
  const onDragLeave = () => setDragging(null);
  const onDrop      = (id: DocId, e: React.DragEvent) => {
    e.preventDefault();
    setDragging(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(id, file);
  };

  // ── submit ────────────────────────────────────────────────────────────────────
  const allUploaded = DOCS.filter((d) => d.required).every((d) => files[d.id]);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000)); // TODO: POST /api/kyc/upload
    setLoading(false);
    setDone(true);
  };

  const uploadedCount = DOCS.filter((d) => files[d.id]).length;
  const progress = (uploadedCount / DOCS.length) * 100;

  // ── success screen ────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 80px',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          {/* Success icon */}
          <div style={{
            width: 80, height: 80, margin: '0 auto 32px',
            border: '2px solid #10b981',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, color: '#10b981',
            background: 'rgba(16,185,129,0.05)',
            boxShadow: '0 0 40px rgba(16,185,129,0.2)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}>✓</div>

          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#10b981', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
            KYC SUBMITTED
          </div>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 16, letterSpacing: 2 }}>
            VERIFICATION<br />PENDING
          </h1>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
            Your documents are under review. You'll be notified within 24–48 hours.
            You can access basic features while verification is in progress.
          </p>

          {/* Info box */}
          <div style={{
            padding: '14px 18px', marginBottom: 28,
            background: 'rgba(0,212,255,0.04)',
            border: '1px solid rgba(0,212,255,0.12)',
            textAlign: 'left',
          }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#00d4ff', marginBottom: 8, letterSpacing: 1 }}>
              WHILE YOU WAIT
            </div>
            {[
              'Explore challenges on the feed',
              'Submit visualizations (Tier 1 limit)',
              'Build your reputation score',
              'Set up your profile',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#00d4ff', fontSize: 12 }}>→</span>
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 14, color: '#475569' }}>{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/feed')}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            // Enter Platform
          </button>
        </div>
      </div>
    );
  }

  // ── main upload screen ────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px 80px',
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        {/* Card */}
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
              IDENTITY CLEARANCE — STEP 3 OF 3
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, fontWeight: 700, color: '#e2e8f0', letterSpacing: 2, marginBottom: 6 }}>
              KYC VERIFICATION
            </h1>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#475569' }}>
              Required for cash reward eligibility and withdrawals.
            </p>
          </div>

          {/* Upload areas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {DOCS.map((doc) => {
              const uploaded  = !!files[doc.id];
              const isDragging = dragging === doc.id;
              const preview   = previews[doc.id];
              const err       = errors[doc.id];

              return (
                <div key={doc.id}>
                  <label
                    style={{
                      display: 'block',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: isDragging
                        ? 'rgba(0,212,255,0.06)'
                        : uploaded
                          ? 'rgba(16,185,129,0.04)'
                          : 'var(--bg-surface)',
                      border: `1px ${uploaded ? 'solid' : 'dashed'} ${
                        isDragging ? '#00d4ff' : uploaded ? '#10b981' : err ? '#ef4444' : 'var(--border-default)'
                      }`,
                    }}
                    onDragOver={(e) => onDragOver(doc.id, e)}
                    onDragLeave={onDragLeave}
                    onDrop={(e) => onDrop(doc.id, e)}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(doc.id, f);
                      }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
                      {/* Preview / icon */}
                      <div style={{
                        width: 64, height: 64, flexShrink: 0,
                        background: 'var(--bg-elevated)',
                        border: `1px solid ${uploaded ? '#10b981' : 'var(--border-subtle)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', position: 'relative',
                      }}>
                        {preview && preview !== 'pdf' ? (
                          <img src={preview} alt={doc.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : preview === 'pdf' ? (
                          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#10b981' }}>PDF</span>
                        ) : (
                          <span style={{ color: 'var(--text-ghost)', fontSize: 22 }}>{doc.icon}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                          <span style={{
                            fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 700,
                            color: uploaded ? '#10b981' : '#94a3b8',
                            letterSpacing: 1, textTransform: 'uppercase',
                          }}>
                            {doc.label}
                          </span>
                          {doc.required && (
                            <span className="badge badge-red" style={{ fontSize: 9 }}>REQUIRED</span>
                          )}
                          {uploaded && (
                            <span className="badge badge-green" style={{ fontSize: 9 }}>✓ UPLOADED</span>
                          )}
                        </div>
                        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#475569', marginBottom: 2 }}>
                          {uploaded ? files[doc.id]?.name : doc.desc}
                        </div>
                        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b' }}>
                          {uploaded
                            ? `${((files[doc.id]?.size ?? 0) / 1024).toFixed(0)} KB`
                            : doc.hint}
                        </div>
                      </div>

                      {/* Remove button */}
                      {uploaded && (
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); removeFile(doc.id); }}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#ef4444', fontSize: 16, padding: '4px 8px',
                            flexShrink: 0, transition: 'opacity 0.2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </label>

                  {/* File error */}
                  {err && (
                    <p className="error-text" style={{ marginTop: 4, paddingLeft: 4 }}>✕ {err}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#475569', letterSpacing: 1 }}>
                UPLOAD PROGRESS
              </span>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#00d4ff' }}>
                {uploadedCount}/{DOCS.length}
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Security note */}
          <div style={{
            padding: '12px 16px', marginBottom: 24,
            background: 'rgba(0,212,255,0.03)',
            border: '1px solid rgba(0,212,255,0.08)',
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ color: '#00d4ff', fontSize: 14, marginTop: 1, flexShrink: 0 }}>◈</span>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#475569', lineHeight: 1.6 }}>
              Documents encrypted with AES-256 and stored in Azure Blob Storage.
              Used only for identity verification. Never shared with third parties.
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={() => router.push('/feed')}
              className="btn btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allUploaded || loading}
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
                  Uploading...
                </span>
              ) : '// Submit KYC'}
            </button>
          </div>
        </div>

        {/* Encryption badge */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10, color: '#1e293b', letterSpacing: 2 }}>
            SECURE UPLOAD — TLS 1.3 + AES-256
          </span>
        </div>
      </div>
    </div>
  );
}