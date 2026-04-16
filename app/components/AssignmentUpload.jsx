'use client';

/**
 * AssignmentUpload
 * ─────────────────────────────────────────────────────────────────────────────
 * Drag-and-drop file upload modal that submits to:
 *   POST http://localhost:5000/api/v1/submit-assignment
 *
 * Props:
 *   course   { id, fullname }   — the course being submitted to
 *   userId   string | number    — Moodle user ID
 *   onClose  () => void         — called when the modal should close
 *
 * Palette matches StudentDashboard dark theme:
 *   Background  #0a192f
 *   Card        #112240
 *   Accent      #007bff
 *   Text        #ccd6f6
 *   Muted       #8892b0
 */

import { useState, useRef, useCallback } from 'react';

const BACKEND = 'http://localhost:3000';
const accent  = '#007bff';

// Allowed extensions shown to the user (mirrors backend ALLOWED_MIMES)
const ALLOWED_EXTENSIONS = '.pdf, .doc, .docx, .ppt, .pptx, .zip, .txt, .png, .jpg';
const MAX_MB              = 20;
const MAX_BYTES           = MAX_MB * 1024 * 1024;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 ** 2)   return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
}

function FileTypeIcon({ name }) {
  const ext = name.split('.').pop().toLowerCase();
  const map = { pdf: '📄', doc: '📝', docx: '📝', ppt: '📊', pptx: '📊',
                zip: '🗜️', txt: '📃', png: '🖼️', jpg: '🖼️', jpeg: '🖼️' };
  return <span className="text-2xl">{map[ext] ?? '📎'}</span>;
}

// ─── Drag-and-drop zone ───────────────────────────────────────────────────────

function DropZone({ onFile, disabled }) {
  const inputRef    = useRef(null);
  const [over, setOver] = useState(false);

  const processFile = useCallback((file) => {
    if (!file) return;
    onFile(file);
  }, [onFile]);

  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    if (disabled) return;
    processFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); if (!disabled) setOver(true); };
  const onDragLeave = () => setOver(false);
  const onInputChange = (e) => processFile(e.target.files[0]);

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-10 px-6 text-center transition-all duration-200"
      style={{
        borderColor:     over ? accent : 'rgba(255,255,255,0.15)',
        background:      over ? `${accent}12` : 'rgba(255,255,255,0.03)',
        cursor:          disabled ? 'not-allowed' : 'pointer',
        opacity:         disabled ? 0.5 : 1,
      }}
    >
      {/* Cloud icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl"
           style={{ background: `${accent}22` }}>
        <svg className="h-7 w-7" style={{ color: accent }} viewBox="0 0 24 24"
             fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
        </svg>
      </div>

      <div>
        <p className="font-semibold text-white">
          {over ? 'Drop to upload' : 'Drag & drop your file here'}
        </p>
        <p className="mt-1 text-sm" style={{ color: '#8892b0' }}>
          or <span className="font-semibold" style={{ color: accent }}>browse</span> to choose
        </p>
        <p className="mt-2 text-xs" style={{ color: '#8892b0' }}>
          {ALLOWED_EXTENSIONS} · Max {MAX_MB} MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={ALLOWED_EXTENSIONS}
        onChange={onInputChange}
        disabled={disabled}
      />
    </div>
  );
}

// ─── Upload progress bar ──────────────────────────────────────────────────────

function UploadProgress({ percent }) {
  const color = percent === 100 ? '#10b981' : accent;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold"
           style={{ color: '#ccd6f6' }}>
        <span>{percent < 100 ? 'Uploading…' : 'Processing…'}</span>
        <span style={{ color }}>{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full"
           style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssignmentUpload({ course, userId, onClose }) {
  const [file, setFile]         = useState(null);
  const [title, setTitle]       = useState('');
  const [fileError, setFileError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]  = useState(0);
  const [result, setResult]      = useState(null); // { success, message, data }

  // ── File validation ────────────────────────────────────────────────────────
  const handleFile = (f) => {
    setFileError('');
    setResult(null);
    if (f.size > MAX_BYTES) {
      setFileError(`File is too large (${formatBytes(f.size)}). Maximum is ${MAX_MB} MB.`);
      return;
    }
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[^/.]+$/, '')); // pre-fill title
  };

  const removeFile = () => { setFile(null); setTitle(''); setFileError(''); setResult(null); };

  // ── Upload via XMLHttpRequest (gives real progress events) ────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) { setFileError('Please attach a file before submitting.'); return; }

    setUploading(true);
    setProgress(0);
    setResult(null);

    const formData = new FormData();
    formData.append('file',     file);
    formData.append('userId',   String(userId));
    formData.append('courseId', String(course?.id ?? ''));
    formData.append('title',    title || file.name);

    const xhr = new XMLHttpRequest();

    // Real upload progress
    xhr.upload.addEventListener('progress', (evt) => {
      if (evt.lengthComputable) {
        setProgress(Math.round((evt.loaded / evt.total) * 95)); // cap at 95 until response
      }
    });

    xhr.addEventListener('load', () => {
      setProgress(100);
      try {
        const json = JSON.parse(xhr.responseText);
        setResult(json);
      } catch {
        setResult({ success: false, message: 'Unexpected server response.' });
      }
      setUploading(false);
    });

    xhr.addEventListener('error', () => {
      setResult({ success: false, message: 'Network error — is the backend running on port 5000?' });
      setUploading(false);
    });

    xhr.open('POST', `${BACKEND}/api/v1/submit-assignment`);

    // Attach JWT if present
    const token = localStorage.getItem('aalgorix_token');
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.send(formData);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => !uploading && e.target === e.currentTarget && onClose()}
    >
      {/* Modal panel */}
      <div
        className="flex w-full max-w-lg flex-col rounded-t-3xl shadow-2xl sm:rounded-2xl"
        style={{ background: '#0a192f', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between rounded-t-3xl px-6 py-4 sm:rounded-t-2xl"
          style={{ background: '#112240', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>
              📎 Assignment Submission
            </p>
            <h3 className="font-bold text-white">Upload Assignment</h3>
            {course && (
              <p className="mt-0.5 max-w-[280px] truncate text-xs" style={{ color: '#8892b0' }}>
                {course.fullname}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            disabled={uploading}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors disabled:opacity-40"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#8892b0' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">

          {/* Success state */}
          {result?.success ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                   style={{ background: 'rgba(16,185,129,0.15)' }}>✅</div>
              <div>
                <h4 className="font-bold text-white">Submitted Successfully!</h4>
                <p className="mt-1 text-sm" style={{ color: '#8892b0' }}>
                  {result.data?.originalName} has been received.
                </p>
                <p className="mt-0.5 text-xs" style={{ color: '#8892b0' }}>
                  Submission ID: <span className="font-mono" style={{ color: '#ccd6f6' }}>
                    {result.data?.submissionId}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: accent }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Assignment title */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold" style={{ color: '#8892b0' }}>
                  Assignment Title <span style={{ color: '#8892b0' }}>(optional)</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Unit 3 – Data Structures Assignment"
                  disabled={uploading}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all disabled:opacity-50"
                  style={{
                    background: '#112240',
                    color: '#ccd6f6',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = accent}
                  onBlur={(e)  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {/* Drop zone or selected file preview */}
              {file ? (
                <div
                  className="flex items-center gap-4 rounded-2xl p-4"
                  style={{ background: '#112240', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <FileTypeIcon name={file.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{file.name}</p>
                    <p className="text-xs" style={{ color: '#8892b0' }}>{formatBytes(file.size)}</p>
                  </div>
                  {!uploading && (
                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition-colors"
                      style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ) : (
                <DropZone onFile={handleFile} disabled={uploading} />
              )}

              {/* File validation error */}
              {fileError && (
                <p className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
                   style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                            border: '1px solid rgba(239,68,68,0.2)' }}>
                  ⚠️ {fileError}
                </p>
              )}

              {/* API error */}
              {result && !result.success && (
                <p className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
                   style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                            border: '1px solid rgba(239,68,68,0.2)' }}>
                  ⚠️ {result.message}
                </p>
              )}

              {/* Progress bar */}
              {uploading && <UploadProgress percent={progress} />}

              {/* Submit button */}
              <button
                type="submit"
                disabled={!file || uploading}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: accent }}
              >
                {uploading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Uploading… {progress}%
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Submit Assignment
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
