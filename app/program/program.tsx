// app/programs/page.tsx   (or components/Programs.tsx)

import React from 'react';
import Link from 'next/link';

const Programs = () => {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-[#0A1428]/95 backdrop-blur-md z-50 border-b border-sky-900">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-2xl font-bold">A</div>
            <h1 className="text-2xl font-bold tracking-tight">Aalgorix Academy</h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-lg">
            <Link href="/" className="hover:text-sky-400 transition">Home</Link>
            <Link href="/about" className="hover:text-sky-400 transition">About Us</Link>
            <Link href="/programs" className="text-sky-400 font-semibold">Programs</Link>
            <Link href="/upskilling" className="hover:text-sky-400 transition">Upskilling</Link>
            <Link href="/admissions" className="hover:text-sky-400 transition">Admissions</Link>
            <Link href="/contact" className="hover:text-sky-400 transition">Contact Us</Link>
          </div>

          <Link 
            href="/admissions" 
            className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            Enroll Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#0A1428] to-[#11223d] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your Learning Journey
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Hybrid Schooling and Future-Ready Programs for Ages 8–18
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#hybrid-school" 
              className="bg-sky-500 hover:bg-sky-600 px-10 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Explore Hybrid School
            </Link>
            <Link 
              href="/upskilling" 
              className="border border-sky-500 hover:bg-sky-500/10 px-10 py-4 rounded-2xl text-lg font-semibold transition"
            >
              Browse Upskilling
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 - Hybrid School */}
          <div id="hybrid-school" className="bg-[#11223d] rounded-3xl p-10 hover:scale-105 transition-all duration-300 group">
            <div className="text-sky-400 text-5xl mb-6">🏫</div>
            <h2 className="text-3xl font-bold mb-4">Hybrid School Program</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Grades 3–12 • 50% Offline Campus Experience + 50% Live Online Classes<br/><br/>
              Small focused batches (max 15 students) with personalized attention and strong academic foundation.
            </p>
            <Link 
              href="/programs/hybrid-school" 
              className="inline-block bg-sky-500 hover:bg-sky-600 px-8 py-3.5 rounded-2xl font-semibold transition group-hover:scale-105"
            >
              Learn More →
            </Link>
          </div>

          {/* Card 2 - Blended Learning */}
          <div className="bg-[#11223d] rounded-3xl p-10 hover:scale-105 transition-all duration-300 group">
            <div className="text-sky-400 text-5xl mb-6">🌐</div>
            <h2 className="text-3xl font-bold mb-4">Online + Offline Learning</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Flexible blended model with recorded lectures, interactive live sessions, 
              and regular campus activities for best of both worlds.
            </p>
            <Link 
              href="/programs/blended-learning" 
              className="inline-block bg-sky-500 hover:bg-sky-600 px-8 py-3.5 rounded-2xl font-semibold transition group-hover:scale-105"
            >
              Learn More →
            </Link>
          </div>

          {/* Card 3 - Curriculum */}
          <div className="bg-[#11223d] rounded-3xl p-10 hover:scale-105 transition-all duration-300 group">
            <div className="text-sky-400 text-5xl mb-6">📚</div>
            <h2 className="text-3xl font-bold mb-4">Curriculum Details</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Strong academics integrated with Coding, Robotics, AI, Drone Technology, 
              Quantum Knowledge and Entrepreneurship skills.
            </p>
            <Link 
              href="/programs/curriculum" 
              className="inline-block bg-sky-500 hover:bg-sky-600 px-8 py-3.5 rounded-2xl font-semibold transition group-hover:scale-105"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-600 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-10">Join Aalgorix Academy and give your child the perfect blend of academics and future skills.</p>
          <Link 
            href="/admissions" 
            className="inline-block bg-white text-[#0A1428] hover:bg-gray-100 px-12 py-4 rounded-2xl text-xl font-bold transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;