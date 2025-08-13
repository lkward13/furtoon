import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Container from '../components/Container';

const PricingPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
            Choose Your 
            <span className="gradient-text block mt-2">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transform your pet photos into stunning artwork. 
            One-time purchases, no subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Pack */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Starter Pack</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-900">$9</span>
              <span className="text-slate-600">.99</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                10 high-resolution portraits
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Basic styles only (10 popular styles)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Standard quality (1024x1024)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Instant download
              </li>
            </ul>
            <Button as={Link} to="/create" className="w-full">
              Get Started
            </Button>
          </div>

          {/* Pro Pack */}
          <div className="bg-white rounded-2xl border-2 border-indigo-500 shadow-xl p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Pro Pack</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-900">$14</span>
              <span className="text-slate-600">.99</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                20 high-resolution portraits
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                All 25 artistic styles (Basic + Custom)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Standard quality (1024x1024)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Instant download
              </li>

            </ul>
            <Button as={Link} to="/create" className="w-full">
              Get Started
            </Button>
          </div>

          {/* Ultimate Pack */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                👑 Best Value
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ultimate Pack</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-900">$19</span>
              <span className="text-slate-600">.99</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                50 high-resolution portraits
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                All 25 artistic styles (Basic + Custom)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <strong>🎨 Style Mixing:</strong> Create unique hybrid styles
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <strong>📱 High-Res Downloads:</strong> 2048x2048 premium quality
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <strong>⚡ Priority Processing:</strong> 2x faster generation
              </li>

            </ul>
            <Button as={Link} to="/create" className="w-full">
              Get Started
            </Button>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            🔒 Secure payment processing. Your photos are processed securely and 
            automatically deleted within 24 hours. No subscriptions, no hidden fees.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default PricingPage;
