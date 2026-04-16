"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  Loader2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "student" | "teacher";
type Mode = "signin" | "signup";

interface FormState {
  name: string;
  email: string;
  password: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState, mode: Mode): FieldErrors {
  const errors: FieldErrors = {};

  if (mode === "signup" && !form.name.trim()) {
    errors.name = "Full name is required.";
  }
  if (mode === "signup" && !EMAIL_RE.test(form.email)) {
    // Sign-up uses email; sign-in uses Moodle username (no email format required)
    errors.email = "Enter a valid email address.";
  }
  if (mode === "signin" && !form.email.trim()) {
    errors.email = "Moodle username is required.";
  }
  if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated background blobs */
function GlassBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-2xl" />
    </div>
  );
}

/** Role card */
function RoleCard({
  role,
  selected,
  onClick,
}: {
  role: Role;
  selected: boolean;
  onClick: () => void;
}) {
  const isStudent = role === "student";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-2 rounded-xl border-2 px-4 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        selected
          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-100"
          : "border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600"
      }`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          selected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
        }`}
      >
        {isStudent ? (
          <GraduationCap className="h-5 w-5" />
        ) : (
          <BookOpen className="h-5 w-5" />
        )}
      </span>
      {isStudent ? "Student" : "Teacher"}
    </button>
  );
}

/** Single input field with icon, error, and optional password toggle */
function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  showToggle,
  onToggle,
  showPassword,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ElementType;
  error?: string;
  showToggle?: boolean;
  onToggle?: () => void;
  showPassword?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="h-4 w-4" />
        </span>
        <input
          id={id}
          type={showToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={id}
          className={`w-full rounded-xl border py-3 pl-10 pr-${showToggle ? "10" : "4"} text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
            error
              ? "border-red-400 bg-red-50/40 focus:ring-red-300"
              : "border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-blue-200"
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[12px] text-red-500">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AuthForm({
  defaultRole = "student",
}: {
  defaultRole?: Role;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [role, setRole] = useState<Role>(defaultRole);
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = useCallback(
    (field: keyof FormState) => (value: string) => {
      setForm((f) => ({ ...f, [field]: value }));
      // Clear error on change
      setErrors((e) => ({ ...e, [field]: undefined }));
    },
    []
  );

  const switchMode = (next: Mode) => {
    setMode(next);
    setForm({ name: "", email: "", password: "" });
    setErrors({});
    setApiError(null);
    setSubmitted(false);
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const fieldErrors = validate(form, mode);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Moodle uses 'username', not 'email' — the email field value is sent as username
        body: JSON.stringify({ username: form.email, password: form.password }),
      });

      const result = await res.json();

      if (!result.success) {
        setApiError(result.message || "Login failed. Check your credentials.");
        return;
      }

      // ✅ Real login succeeded — persist session and redirect
      localStorage.setItem("aalgorix_userId",    String(result.data.userId));
      localStorage.setItem("aalgorix_role",      role);
      localStorage.setItem("aalgorix_token",     result.data.token);          // JWT
      localStorage.setItem("aalgorix_firstname", result.data.firstname ?? "");
      localStorage.setItem("aalgorix_fullname",  result.data.fullname  ?? "");
      setSubmitted(true);
      router.push(`/student?userId=${result.data.userId}`);
    } catch {
      setApiError("Cannot reach the backend server. Is it running on port 3000?");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl bg-white px-8 py-12 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            {mode === "signup" ? "Account Created!" : "Welcome back!"}
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            {mode === "signup"
              ? `Your ${role} account is ready. Redirecting to your dashboard…`
              : `Signed in as ${role}. Redirecting…`}
          </p>
          <button
            onClick={() => switchMode("signin")}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-14">

      {/* ── Glassmorphism gradient background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900" />
      <GlassBackground />

      {/* ── Auth card ── */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl bg-white px-8 py-9 shadow-[0_32px_80px_rgba(0,0,0,0.35)]">

          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
            <p className="mt-1 text-[13px] text-gray-500">
              {mode === "signin"
                ? "Sign in to continue your learning journey"
                : "Join Aalgorix Academy today"}
            </p>
          </div>

          {/* Mode tabs */}
          <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 rounded-lg py-2 text-[13px] font-semibold transition-all duration-200 ${
                  mode === m
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Role selector */}
            <div>
              <p className="mb-2 text-[13px] font-semibold text-gray-700">
                I am a…
              </p>
              <div className="flex gap-3">
                <RoleCard
                  role="student"
                  selected={role === "student"}
                  onClick={() => setRole("student")}
                />
                <RoleCard
                  role="teacher"
                  selected={role === "teacher"}
                  onClick={() => setRole("teacher")}
                />
              </div>
            </div>

            {/* Full Name — Sign Up only */}
            {mode === "signup" && (
              <InputField
                id="name"
                label="Full Name"
                type="text"
                value={form.name}
                onChange={setField("name")}
                placeholder="Jane Smith"
                icon={User}
                error={errors.name}
              />
            )}

            <InputField
              id="email"
              label={mode === "signin" ? "Moodle Username" : "Email Address"}
              type={mode === "signin" ? "text" : "email"}
              value={form.email}
              onChange={setField("email")}
              placeholder={mode === "signin" ? "your_moodle_username" : "you@example.com"}
              icon={Mail}
              error={errors.email}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={setField("password")}
              placeholder={mode === "signup" ? "Min. 8 characters" : "Enter your password"}
              icon={Lock}
              error={errors.password}
              showToggle
              onToggle={() => setShowPassword((v) => !v)}
              showPassword={showPassword}
            />

            {/* Forgot password (Sign In only) */}
            {mode === "signin" && (
              <div className="-mt-1 text-right">
                <button
                  type="button"
                  className="text-[12px] font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* API-level error (wrong credentials, server down, etc.) */}
            {apiError && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {apiError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === "signin" ? "Signing in…" : "Creating account…"}
                </>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Switch mode helper */}
          <p className="mt-5 text-center text-[13px] text-gray-500">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
              Secure Login
            </span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* AI badge */}
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[11px] font-semibold tracking-wide text-indigo-500">
              Powered by Professors AI
            </span>
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          </div>
        </div>

        {/* Below-card caption */}
        <p className="mt-4 text-center text-[12px] text-white/50">
          By continuing, you agree to Aalgorix Academy&apos;s{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/80">
            Terms
          </span>{" "}
          &amp;{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/80">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </section>
  );
}
