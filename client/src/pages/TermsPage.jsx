import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const TermsPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <SectionTitle
          eyebrow="Legal"
          title="Terms of Service"
          subtitle="The terms and conditions for using FurToon"
        />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-500 mb-8">
                <strong>Effective Date:</strong> January 1, 2024<br/>
                <strong>Last Updated:</strong> January 1, 2024
              </p>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-700 mb-4">
                  By accessing or using FurToon ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, you may not access the Service.
                </p>
                <p className="text-slate-700">
                  These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
                <p className="text-slate-700 mb-4">
                  FurToon is an AI-powered service that transforms pet photos into artistic portraits using various styles. 
                  The Service includes:
                </p>
                <ul className="text-slate-700 space-y-2">
                  <li>• AI-generated pet portraits in 25+ artistic styles</li>
                  <li>• Custom scene generation based on user prompts</li>
                  <li>• High-resolution image downloads</li>
                  <li>• Account management and billing features</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Account Creation</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• You must provide accurate and complete information</li>
                  <li>• You are responsible for maintaining account security</li>
                  <li>• You must be at least 13 years old to create an account</li>
                  <li>• One account per person or entity</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Account Responsibilities</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• Keep your password secure and confidential</li>
                  <li>• Notify us immediately of any unauthorized access</li>
                  <li>• You are liable for all activities under your account</li>
                  <li>• Provide accurate billing information</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Acceptable Use</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">You May:</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Upload photos of your own pets or pets you have permission to use</li>
                  <li>• Generate portraits for personal or commercial use (per your plan)</li>
                  <li>• Download and share your generated portraits</li>
                  <li>• Use the Service in compliance with applicable laws</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">You May Not:</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• Upload photos you don't have rights to use</li>
                  <li>• Upload inappropriate, offensive, or illegal content</li>
                  <li>• Attempt to reverse engineer or copy our AI models</li>
                  <li>• Use automated tools to abuse the Service</li>
                  <li>• Share account credentials with others</li>
                  <li>• Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Content and Intellectual Property</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Your Content</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• You retain ownership of photos you upload</li>
                  <li>• You grant us license to process your photos for Service delivery</li>
                  <li>• You represent that you have rights to all uploaded content</li>
                  <li>• We delete uploaded photos within 24 hours</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Generated Content</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• You own the AI-generated portraits we create for you</li>
                  <li>• Commercial use rights depend on your subscription plan</li>
                  <li>• You may not claim the underlying AI technology as your own</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Our Intellectual Property</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• FurToon name, logo, and branding are our trademarks</li>
                  <li>• The AI models and technology are proprietary</li>
                  <li>• The website design and code are protected by copyright</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Payment and Billing</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Pricing and Plans</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Current pricing is displayed on our Pricing page</li>
                  <li>• Prices may change with 30 days notice</li>
                  <li>• All payments are processed securely through Stripe</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Billing Terms</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Payments are charged when you make a purchase</li>
                  <li>• Subscription plans renew automatically</li>
                  <li>• Failed payments may result in service suspension</li>
                  <li>• All sales are final unless covered by our refund policy</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Refunds</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• 100% satisfaction guarantee within 24 hours of purchase</li>
                  <li>• Refund requests must include reason for dissatisfaction</li>
                  <li>• Processing time: 5-10 business days</li>
                  <li>• Abuse of refund policy may result in account termination</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Service Availability</h2>
                <ul className="text-slate-700 space-y-3">
                  <li>• <strong>Uptime:</strong> We strive for 99.9% service availability</li>
                  <li>• <strong>Maintenance:</strong> Scheduled maintenance will be announced in advance</li>
                  <li>• <strong>Force Majeure:</strong> We're not liable for outages beyond our control</li>
                  <li>• <strong>AI Generation:</strong> Processing times may vary based on demand</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ Important Legal Notice
                  </p>
                </div>
                <p className="text-slate-700 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="text-slate-700 space-y-2">
                  <li>• The Service is provided "as is" without warranties</li>
                  <li>• We are not liable for indirect or consequential damages</li>
                  <li>• Our total liability is limited to the amount you paid us</li>
                  <li>• We do not guarantee specific AI generation results</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Termination</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Termination by You</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• You may cancel your account at any time</li>
                  <li>• Contact support for account deletion</li>
                  <li>• Download your content before cancellation</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Termination by Us</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• We may terminate accounts for Terms violations</li>
                  <li>• We may suspend Service for non-payment</li>
                  <li>• We will provide notice when reasonably possible</li>
                  <li>• You remain liable for charges incurred before termination</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to Terms</h2>
                <p className="text-slate-700">
                  We reserve the right to modify these Terms at any time. We will notify users of 
                  material changes by posting the updated Terms on our website and updating the 
                  "Last Updated" date. Continued use of the Service after changes constitutes 
                  acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law</h2>
                <p className="text-slate-700">
                  These Terms are governed by the laws of the State of California, United States, 
                  without regard to conflict of law principles. Any disputes will be resolved in 
                  the courts of California.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Information</h2>
                <p className="text-slate-700 mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                <div className="bg-slate-50 rounded-lg p-6">
                  <p className="text-slate-700">
                    <strong>Email:</strong> legal@furtoon.com<br/>
                    <strong>Subject:</strong> Terms of Service Inquiry<br/>
                    <strong>Response Time:</strong> Within 72 hours
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;
