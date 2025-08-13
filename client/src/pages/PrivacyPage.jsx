import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const PrivacyPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <SectionTitle
          eyebrow="Legal"
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your personal information"
        />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 lg:p-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-500 mb-8">
                <strong>Effective Date:</strong> January 1, 2024<br/>
                <strong>Last Updated:</strong> January 1, 2024
              </p>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Pet Photos and Images</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Photos you upload for AI portrait generation</li>
                  <li>• Generated AI portraits and artwork</li>
                  <li>• Image metadata (file size, format, upload timestamp)</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Account Information</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• Email address and name (when you create an account)</li>
                  <li>• Payment information (processed securely through Stripe)</li>
                  <li>• Usage history and preferences</li>
                </ul>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">Technical Information</h3>
                <ul className="text-slate-700 mb-6 space-y-2">
                  <li>• IP address and browser information</li>
                  <li>• Device type and operating system</li>
                  <li>• Usage analytics and performance data</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                <ul className="text-slate-700 space-y-3">
                  <li>• <strong>Service Delivery:</strong> Process your photos and generate AI portraits</li>
                  <li>• <strong>Account Management:</strong> Maintain your account and provide customer support</li>
                  <li>• <strong>Payment Processing:</strong> Handle billing and subscription management</li>
                  <li>• <strong>Service Improvement:</strong> Analyze usage patterns to enhance our AI models</li>
                  <li>• <strong>Communication:</strong> Send important updates about our service</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security and Storage</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">🔒 Your Photos Are Safe</h3>
                  <p className="text-green-700">
                    All uploaded photos are automatically deleted from our servers within 24 hours. 
                    We never store your personal images permanently.
                  </p>
                </div>

                <ul className="text-slate-700 space-y-3">
                  <li>• <strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                  <li>• <strong>Secure Servers:</strong> We use industry-standard cloud infrastructure</li>
                  <li>• <strong>Limited Access:</strong> Only authorized personnel can access user data</li>
                  <li>• <strong>Regular Audits:</strong> We conduct security reviews and updates regularly</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
                <p className="text-slate-700 mb-4">
                  We do not sell, rent, or share your personal information with third parties, except in these limited circumstances:
                </p>
                <ul className="text-slate-700 space-y-3">
                  <li>• <strong>Service Providers:</strong> Trusted partners who help us operate our service (OpenAI for AI processing, Stripe for payments)</li>
                  <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li>• <strong>Business Transfers:</strong> In the event of a merger or acquisition (with notice to users)</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights and Choices</h2>
                <ul className="text-slate-700 space-y-3">
                  <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong>Correction:</strong> Update or correct your account information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li>• <strong>Portability:</strong> Download your generated portraits</li>
                  <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  To exercise these rights, contact us at privacy@furtoon.com
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies and Tracking</h2>
                <p className="text-slate-700 mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="text-slate-700 space-y-2">
                  <li>• Remember your preferences and settings</li>
                  <li>• Analyze how our service is used</li>
                  <li>• Improve security and prevent fraud</li>
                  <li>• Provide personalized experiences</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  You can control cookies through your browser settings.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Children's Privacy</h2>
                <p className="text-slate-700">
                  Our service is not intended for children under 13. We do not knowingly collect 
                  personal information from children under 13. If we discover that we have collected 
                  information from a child under 13, we will delete it immediately.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. International Users</h2>
                <p className="text-slate-700">
                  Our services are operated from the United States. If you are accessing our service 
                  from outside the US, please be aware that your information may be transferred to, 
                  stored, and processed in the United States where our servers are located.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Changes to This Policy</h2>
                <p className="text-slate-700">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on our website and updating the 
                  "Last Updated" date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                <p className="text-slate-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-slate-50 rounded-lg p-6">
                  <p className="text-slate-700">
                    <strong>Email:</strong> privacy@furtoon.com<br/>
                    <strong>Subject:</strong> Privacy Policy Inquiry<br/>
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

export default PrivacyPage;
