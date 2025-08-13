import React, { useState } from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Message Sent Successfully!
              </h2>
              <p className="text-slate-600 mb-8">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <SectionTitle
          eyebrow="Support"
          title="Get in Touch"
          subtitle="Have questions about FurToon? We're here to help! Send us a message and we'll respond within 24 hours."
        />

        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-indigo-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-slate-900">Email</p>
                      <p className="text-slate-600">support@furtoon.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-indigo-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-slate-900">Response Time</p>
                      <p className="text-slate-600">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 text-indigo-600 mt-1">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-slate-900">Support Hours</p>
                      <p className="text-slate-600">Monday - Friday, 9 AM - 6 PM PST</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    For urgent issues or technical problems, please include as much detail as possible in your message.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Question</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="refund">Refund Request</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="partnership">Partnership Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="form-textarea"
                      placeholder="Please describe your question or issue in detail..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      size="lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
