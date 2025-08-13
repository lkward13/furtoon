import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const RefundPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <SectionTitle
          eyebrow="Legal"
          title="Refund Policy"
          subtitle="Our commitment to your satisfaction and our refund process"
        />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-500 mb-8">
                <strong>Effective Date:</strong> January 1, 2024<br/>
                <strong>Last Updated:</strong> January 1, 2024
              </p>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our 100% Satisfaction Guarantee</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Money-Back Promise</h3>
                  <p className="text-green-700">
                    We're so confident you'll love your AI pet portrait that we offer a 100% satisfaction 
                    guarantee. If you're not completely happy with your result, we'll make it right or 
                    give you a full refund.
                  </p>
                </div>
                <p className="text-slate-700">
                  At FurToon, we want every customer to be thrilled with their AI-generated pet portraits. 
                  This policy outlines when and how you can request a refund, and what alternatives we offer 
                  to ensure your satisfaction.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Eligibility</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">You Can Request a Refund If:</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• The generated portrait doesn't resemble your pet</li>
                  <li>• The image quality is significantly poor or distorted</li>
                  <li>• Technical issues prevented successful generation</li>
                  <li>• The style doesn't match what was promised</li>
                  <li>• You're unsatisfied with the result for any reason</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Time Limits:</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• <strong>24 Hours:</strong> Full refund guarantee period</li>
                  <li>• <strong>7 Days:</strong> Case-by-case review for extenuating circumstances</li>
                  <li>• <strong>Beyond 7 Days:</strong> Refunds at our discretion</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">💡 Before Requesting a Refund</h4>
                  <p className="text-blue-700">
                    We often can fix issues with a free re-generation! Many problems can be resolved by:
                  </p>
                  <ul className="text-blue-700 mt-3 space-y-1">
                    <li>• Trying a different art style</li>
                    <li>• Adjusting your custom prompt</li>
                    <li>• Using a different source photo</li>
                    <li>• Getting tips from our support team</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Process</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Step 1: Contact Us</h3>
                <p className="text-slate-700 mb-4">
                  Reach out to our support team with your refund request:
                </p>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Email: <strong>refunds@furtoon.com</strong></li>
                  <li>• Subject: "Refund Request - [Your Order ID]"</li>
                  <li>• Include: Reason for dissatisfaction and original photo</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Step 2: Review Process</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• We'll review your request within 24 hours</li>
                  <li>• We may offer a free re-generation first</li>
                  <li>• We'll explain our decision and next steps</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Step 3: Refund Processing</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• Approved refunds are processed within 1-2 business days</li>
                  <li>• Refunds appear in your account within 5-10 business days</li>
                  <li>• You'll receive an email confirmation with tracking details</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Methods</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Payment Method Returns</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• <strong>Credit/Debit Cards:</strong> Refunded to original payment method</li>
                  <li>• <strong>PayPal:</strong> Refunded to your PayPal account</li>
                  <li>• <strong>Bank Transfers:</strong> Processed through Stripe (5-10 days)</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Alternative Solutions</h3>
                <p className="text-slate-700 mb-4">
                  Instead of a refund, we often can offer:
                </p>
                <ul className="text-slate-700 space-y-2">
                  <li>• <strong>Free Re-generation:</strong> Try a different style or approach</li>
                  <li>• <strong>Account Credit:</strong> Credit for future purchases</li>
                  <li>• <strong>Upgrade:</strong> Access to premium styles or features</li>
                  <li>• <strong>Personal Assistance:</strong> One-on-one help from our team</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Subscription Refunds</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Monthly Plans</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Cancel anytime before your next billing cycle</li>
                  <li>• Pro-rated refunds for unused portion (case-by-case)</li>
                  <li>• Access continues until end of current billing period</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Annual Plans</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• Full refund if cancelled within 30 days</li>
                  <li>• Pro-rated refund based on usage after 30 days</li>
                  <li>• Minimum 60-day usage fee may apply</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Special Circumstances</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Technical Issues</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Server downtime during generation: Full refund + credit</li>
                  <li>• Failed uploads due to our systems: Full refund</li>
                  <li>• AI model errors: Free re-generation or refund</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Exceptional Cases</h3>
                <ul className="text-slate-700 space-y-2">
                  <li>• Pet loss during processing period: Full refund + condolences</li>
                  <li>• Medical/financial hardship: Payment plan or refund</li>
                  <li>• Gift recipients unsatisfied: Refund to original purchaser</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What's Not Refundable</h2>
                <ul className="text-slate-700 space-y-3">
                  <li>• <strong>Change of Mind:</strong> After 24 hours without quality issues</li>
                  <li>• <strong>User Error:</strong> Wrong photo uploaded or incorrect style selection</li>
                  <li>• <strong>Abuse:</strong> Repeated refund requests without valid reasons</li>
                  <li>• <strong>Commercial Use:</strong> After images have been used commercially</li>
                  <li>• <strong>Third-Party Issues:</strong> Payment disputes handled by banks/PayPal</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Tips for Success</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-amber-800 mb-3">🎯 Maximize Your Satisfaction</h3>
                  <ul className="text-amber-700 space-y-2">
                    <li>• Use clear, well-lit photos with your pet's face visible</li>
                    <li>• Try multiple styles to find your favorite</li>
                    <li>• Read our photo guidelines before uploading</li>
                    <li>• Contact support if you need help choosing styles</li>
                    <li>• Be specific with custom scene descriptions</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
                <p className="text-slate-700 mb-6">
                  For refund requests or questions about this policy:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Refund Requests</h4>
                    <p className="text-slate-700 text-sm mb-4">
                      <strong>Email:</strong> refunds@furtoon.com<br/>
                      <strong>Response Time:</strong> Within 24 hours<br/>
                      <strong>Processing Time:</strong> 1-2 business days
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-3">General Support</h4>
                    <p className="text-slate-700 text-sm mb-4">
                      <strong>Email:</strong> support@furtoon.com<br/>
                      <strong>Response Time:</strong> Within 24 hours<br/>
                      <strong>Live Chat:</strong> Coming soon
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button as={Link} to="/contact" size="lg">
                    Contact Support Team
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RefundPage;
