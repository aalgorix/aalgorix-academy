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
  'Expert Faculties From Aalgorix Academy',
];

const inputCls =
  'w-full px-3 py-2 text-[13px] border border-[#E5E7EB] rounded-lg bg-white text-[#0B1E3C] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1F3A5F] focus:ring-2 focus:ring-[#1F3A5F]/10 transition-all';

const selectCls =
  'w-full px-3 py-2 text-[13px] border border-[#E5E7EB] rounded-lg bg-white text-[#0B1E3C] focus:outline-none focus:border-[#1F3A5F] focus:ring-2 focus:ring-[#1F3A5F]/10 transition-all appearance-none cursor-pointer';

const labelCls = 'block text-[12px] font-semibold text-[#0B1E3C] mb-1';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you! Your enquiry has been submitted successfully.\n\nOur team will contact you soon.');
      setFormData({ name: '', grade: '', email: '', country: 'India', city: '', countryCode: '+91', mobile: '' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B1E3C] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0B1E3C] tracking-tight">
            Inquire Now
          </h1>
          <p className="text-sm font-bold text-white mt-1">
            Join Aalgorix Academy – Where Learning Meets Future
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Form Card ── */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
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
                      <option value="Grade 6-8">Grade 6–8</option>
                      <option value="Grade 9-10">Grade 9–10</option>
                      <option value="Grade 11-12">Grade 11–12</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-xs">▾</span>
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
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-xs">▾</span>
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
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-xs">▾</span>
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
                  className="w-full mt-1 py-2.5 px-6 text-[13px] font-semibold text-white bg-[#0B1E3C] rounded-lg hover:bg-[#1F3A5F] focus:outline-none focus:ring-2 focus:ring-[#0B1E3C]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
                </button>
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
                  className="bg-white border border-[#E5E7EB] rounded-lg p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <p className="text-[13px] font-semibold text-[#0B1E3C]">
                    {icon} {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlight Banners */}
            {highlights.map((text, i) => (
              <div
                key={text}
                className={`rounded-lg px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border ${
                  i === 1
                    ? 'bg-white border-[#E5E7EB] text-[#0B1E3C]'
                    : 'bg-white border-[#E5E7EB] text-[#0B1E3C]'
                }`}
              >
                <p className="text-[13px] font-semibold text-[#0B1E3C]">
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
