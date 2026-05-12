'use client';

import React, { useState } from 'react';

const featureCards = [
  { icon: '🎮', label: 'Playway Methods' },
  { icon: '🤖', label: 'AI-Powered Learning' },
  { icon: '✨', label: 'Smart Curriculum' },
  { icon: '🎯', label: 'Experiential Learning' },
];

const highlights = [
  'Expert Mentors & Trainers',
  'Personalised and Fun Based Learning',
  'Expert Faculties From Aalgorix World Academy',
];

const inputCls =
  'w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg bg-white text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/15 transition-all';

const selectCls =
  'w-full px-3 py-2 text-[13px] border border-slate-200 rounded-lg bg-white text-[#0F172A] focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/15 transition-all appearance-none cursor-pointer';

const labelCls = 'block text-[12px] font-semibold text-[#1E3A8A] mb-1';

const InquiryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    email: '',
    country: 'India',
    city: '',
    countryCode: '+91',
    mobile: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to submit enquiry');
      }

      alert('Thank you! Your enquiry has been submitted successfully.\n\nOur team will contact you soon.');
      setFormData({ name: '', grade: '', email: '', country: 'India', city: '', countryCode: '+91', mobile: '' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
            Inquire Now
          </h1>
          <p className="text-sm font-semibold text-[#1E3A8A]/70 mt-1">
            Join Aalgorix World Academy – Where Learning Meets Future
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Form Card ── */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.08)] p-6">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                  <label className={labelCls}>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className={inputCls}
                  />
                </div>

                {/* Grade */}
                <div>
                  <label className={labelCls}>Grade *</label>
                  <div className="relative">
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                      className={selectCls}
                    >
                      <option value="">Select Grade</option>
                      <option value="Pre Primary">Pre Primary</option>
                      <option value="Primary">Primary</option>
                      <option value="Upper Primary">Upper Primary</option>
                      <option value="Secondary">Secondary</option>
                      <option value="Senior Secondary">Senior Secondary</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputCls}
                  />
                </div>

                {/* Country + City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Country *</label>
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className={selectCls}
                      >
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="UAE">UAE</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Gurugram"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Country Code + Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Country Code *</label>
                    <div className="relative">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        required
                        className={selectCls}
                      >
                        <option value="+91">India (+91)</option>
                        <option value="+1">USA (+1)</option>
                        <option value="+44">UK (+44)</option>
                        <option value="+971">UAE (+971)</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="98765 43210"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 py-2.5 px-6 text-[13px] font-semibold text-white rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(15,23,42,0.4)]"
                  style={{ background: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)" }}
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
                </button>
                {submitError && (
                  <p className="text-[12px] font-semibold text-red-600">
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* ── Right Side ── */}
          <div className="lg:col-span-5 space-y-3">

            {/* 2×2 Feature Grid */}
            <div className="grid grid-cols-2 gap-3">
              {featureCards.map(({ icon, label }) => (
                <div
                  key={label}
                  className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm hover:shadow-[0_4px_16px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <p className="text-[25px] font-semibold text-[#1E3A8A]">
                    {icon} {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlight Banners */}
            {highlights.map((text) => (
              <div
                key={text}
                className="rounded-xl px-4 py-3 shadow-sm hover:shadow-[0_4px_16px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-200 bg-white border border-slate-200"
              >
                <p className="text-[22px] font-semibold text-[#1E3A8A]">
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
