"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* ─── All Styles ────────────────────────────── */
const STYLES = `
  @keyframes aa-rise {
    0%   { transform: translateY(0) scale(1); opacity: 0; }
    15%  { opacity: 0.65; }
    85%  { opacity: 0.35; }
    100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
  }
  @keyframes aa-pulse-orb {
    0%,100% { opacity: 0.07; transform: scale(1); }
    50%     { opacity: 0.14; transform: scale(1.07); }
  }
  @keyframes aa-twinkle {
    0%,100% { opacity: 0.12; transform: scale(0.7); }
    50%     { opacity: 0.85; transform: scale(1.25); }
  }
  @keyframes aa-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes aa-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes aa-scan {
    0% { top: -2px; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 0.3; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes aa-logo-glow {
    0%,100% { box-shadow: 0 4px 20px rgba(58,176,255,0.35); }
    50% { box-shadow: 0 4px 32px rgba(58,176,255,0.65), 0 0 0 6px rgba(58,176,255,0.12); }
  }

  .aa-page { font-family: var(--font-outfit, 'Inter', sans-serif); }
  .aa-card-anim { animation: aa-fade-up 0.6s cubic-bezier(0.22,0.68,0,1.15) both; }

  .aa-field {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 10px;
    padding: 12px 16px 12px 42px;
    color: #fff;
    font-size: 14px;
    outline: none;
    transition: all .22s;
    box-sizing: border-box;
  }
  .aa-field::placeholder { color: rgba(255,255,255,0.27); }
  .aa-field:focus {
    border-color: rgba(58,176,255,0.60);
    background: rgba(58,176,255,0.07);
    box-shadow: 0 0 0 3px rgba(58,176,255,0.14);
  }

  .aa-field-wrap { position: relative; }
  .aa-field-icon {
    position: absolute; left: 13px; top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.27);
    pointer-events: none;
  }
  .aa-field-wrap:focus-within .aa-field-icon { color: rgba(58,176,255,0.8); }

  .aa-field-toggle {
    position: absolute; right: 13px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.28);
  }
  .aa-field-toggle:hover { color: rgba(58,176,255,0.8); }

  .aa-btn {
    width: 100%; padding: 13px 0;
    border: none; border-radius: 10px;
    font-size: 14px; font-weight: 700; color: #fff;
    cursor: pointer;
    background: linear-gradient(135deg, #3AB0FF 0%, #1a7fd4 50%, #0b4fa8 100%);
    transition: all .25s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .aa-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(58,176,255,0.45);
  }
  .aa-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .aa-spin {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: aa-spin 0.7s linear infinite;
  }
`;

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const IcoUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IcoLock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IcoEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const IcoEyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

/* ─── Neural Network Background ─────────────────────────────────────────── */
function NeuralNet() {
  const nodes = [[5,10],[20,4],[18,25],[35,15],[30,6],[48,20],[55,8],[52,28],[65,12],[62,32],[72,6],[80,22],[88,12],[95,28],[90,4],[12,42],[26,52],[40,45],[55,55],[68,48],[78,40],[88,52],[95,46],[8,68],[20,75],[35,62],[50,70],[62,60],[75,70],[88,62]];
  const edges = [[0,1],[0,2],[1,4],[2,3],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[10,12],[11,13],[12,14],[13,21],[14,22],[0,3],[1,5],[3,7],[5,9],[7,11],[9,13],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[23,24],[24,25],[25,26],[26,27],[27,28],[28,29],[15,23],[17,25],[19,27],[21,29],[16,24],[18,26]];

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.065 }}
      aria-hidden="true">
      {edges.map(([a, b], i) => {
        const [x1, y1] = nodes[a] || [0, 0];
        const [x2, y2] = nodes[b] || [0, 0];
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3AB0FF" strokeWidth="0.18" strokeLinecap="round" />;
      })}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 4 === 0 ? 0.55 : 0.3} fill="#3AB0FF" />
      ))}
    </svg>
  );
}

/* ─── Main Login Component ──────────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/student";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stars,   setStars  ] = useState([]);

  // Generate random star positions client-side only to avoid SSR hydration mismatch
  useEffect(() => {
    setStars(
      Array.from({ length: 45 }, (_, i) => ({
        id:   i,
        top:  `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
      }))
    );
  }, []);

  // Session check — redirect if a real JWT session already exists
  useEffect(() => {
    try {
      const raw = localStorage.getItem("aalgorix_session");
      if (raw) {
        const s = JSON.parse(raw);
        // Only redirect for real tokens, not the old fake placeholder
        if (s?.token && s.token !== "aalgorix-local-auth") {
          router.replace(redirectTo);
        }
      }
    } catch {
      localStorage.removeItem("aalgorix_session");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setAlert("Please enter your username and password.");
      return;
    }

    setAlert(null);
    setLoading(true);

    try {
      // Calls the Next.js middleman API route — no CORS, no backend dependency
      const res = await fetch("/api/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username: username.trim(), password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setAlert(json.message ?? "Invalid username or password.");
        return;
      }

      const { token, userId, username: mUser, firstname, lastname, fullname } = json.data;

      localStorage.setItem(
        "aalgorix_session",
        JSON.stringify({
          token,
          userId,
          username:  mUser,
          firstname,
          lastname,
          fullname,
          timestamp: Date.now(),
        })
      );

      router.push(redirectTo);
    } catch (err) {
      console.error("Login error:", err);
      setAlert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="aa-page"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse 130% 85% at 55% -5%, #0d2a50 0%, #060f1f 50%, #020810 100%)",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <NeuralNet />

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: "#fff",
            borderRadius: "50%",
            opacity: 0.18,
            animation: "aa-twinkle 2.5s infinite",
          }}
        />
      ))}

      {/* Orbs */}
      <div className="aa-orb" style={{ width: 520, height: 520, background: "rgba(58,176,255,0.09)", top: "-140px", left: "-130px", animationDuration: "9s" }} />
      <div className="aa-orb" style={{ width: 380, height: 380, background: "rgba(11,30,60,0.92)", bottom: "-100px", right: "-100px", animationDuration: "12s" }} />

      {/* Login Card */}
      <div
        className="aa-card-anim"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "400px",
          margin: "20px",
          padding: "40px 36px 34px",
          background: "rgba(5,16,35,0.82)",
          backdropFilter: "blur(30px)",
          borderRadius: "20px",
          border: "1px solid rgba(58,176,255,0.18)",
          boxShadow: "0 28px 60px rgba(0,0,0,0.65), 0 0 70px rgba(58,176,255,0.06)",
        }}
      >
        {/* Scan Line */}
        <div
          className="aa-scan"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(58,176,255,0.55), transparent)",
            animation: "aa-scan 7s ease-in-out infinite",
          }}
        />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "16px",
              background: "linear-gradient(135deg,#1a7fd4 0%,#3AB0FF 100%)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>

          <h1 style={{ margin: 0, fontSize: "23px", fontWeight: 800, color: "#fff" }}>
            Aalgorix{" "}
            <span style={{ background: "linear-gradient(90deg,#3AB0FF,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Academy
            </span>
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", textTransform: "uppercase" }}>
            Your AI Campus Portal
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div
            style={{
              marginBottom: "16px",
              padding: "11px 14px",
              borderRadius: "10px",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.35)",
              color: "#fca5a5",
              fontSize: "13.5px",
            }}
          >
            {alert}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
              Username
            </label>
            <div className="aa-field-wrap">
              <span className="aa-field-icon"><IcoUser /></span>
              <input
                className="aa-field"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
              Password
            </label>
            <div className="aa-field-wrap">
              <span className="aa-field-icon"><IcoLock /></span>
              <input
                className="aa-field"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ paddingRight: "42px" }}
              />
              <button
                type="button"
                className="aa-field-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <IcoEyeOff /> : <IcoEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="aa-btn" disabled={loading} style={{ marginTop: "8px" }}>
            {loading && <span className="aa-spin" />}
            {loading ? "Signing in…" : "Sign In to Campus"}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: "center", marginTop: "26px", fontSize: "11px", color: "rgba(255,255,255,0.22)" }}>
          Powered by <span style={{ color: "rgba(58,176,255,0.6)" }}>Professors AI</span>
        </p>

        {/* Loading Overlay */}
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(5,16,35,0.94)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div className="aa-spin" style={{ width: "36px", height: "36px", margin: "0 auto 14px" }} />
              <p style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>Connecting to Campus...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}