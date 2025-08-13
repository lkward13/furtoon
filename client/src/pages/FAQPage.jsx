import React, { useState } from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const FAQPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How long does it take to generate a portrait?",
      answer: "Our AI generates your pet's portrait in under 30 seconds! You'll see the result almost instantly after uploading and selecting a style."
    },
    {
      question: "What kind of photos work best?",
      answer: "For the best results, upload a clear, well-lit photo of your pet where their face is clearly visible. Front-facing photos usually work best, but we can work with side profiles too."
    },
    {
      question: "Can I use a custom style or scene?",
      answer: "Yes! We offer a 'Custom Scene' option where you can describe exactly what you want, like 'my dog on a skateboard' or 'my cat in a chef's hat'. Be as detailed as possible for the best results."
    },
    {
      question: "What if I don't like the generated portrait?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with your portrait, contact us within 24 hours for a full refund or a free re-generation."
    },
    {
      question: "Is my photo private and secure?",
      answer: "Absolutely. Your uploaded photos are processed securely and automatically deleted from our servers within 24 hours. We never store or share your personal images."
    },
    {
      question: "What file formats are supported?",
      answer: "We support JPG and PNG image formats, up to 10MB in size. Most smartphone photos work perfectly."
    },
    {
      question: "Can I use the portraits commercially?",
      answer: "Our Unlimited plan includes a commercial use license. Basic and Pro plans are for personal use only. Check our pricing page for more details."
    },
    {
      question: "Do you work with all types of pets?",
      answer: "Yes! Our AI works great with dogs, cats, birds, rabbits, hamsters, and most other pets. The clearer the photo, the better the result."
    },
    {
      question: "Can I get multiple styles of the same pet?",
      answer: "Absolutely! You can generate as many different styles as you want. Each generation counts toward your plan limit."
    },
    {
      question: "What resolution are the final images?",
      answer: "All portraits are generated in high resolution (1024x1024 pixels) and delivered as PNG files for the best quality."
    },
    {
      question: "Can I print the portraits?",
      answer: "Yes! The high-resolution files are perfect for printing. They look great as 8x10 prints or larger."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team through the Contact page or email us directly at support@furtoon.com. We typically respond within 24 hours."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <SectionTitle
          eyebrow="Support"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about creating AI pet portraits"
        />
        
        <div className="max-w-4xl mx-auto mt-16">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 mb-4 overflow-hidden">
              <button
                className="w-full py-6 px-8 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-semibold text-lg text-slate-900 pr-4">{faq.question}</span>
                <span className="text-2xl text-slate-400 flex-shrink-0">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>
              {openFaq === index && (
                <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6">
              Our friendly support team is here to help! Get in touch and we'll respond within 24 hours.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;
