import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Container from '../components/Container';

const HomePage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const styles = [
    { name: 'Pixar Animation', preview: '/images/pixar-animation-example.png' },
    { name: 'Watercolor Painting', preview: '/images/watercolor-painting-example.png' },
    { name: 'Oil Painting', preview: '/images/oil-painting-example.png' },
    { name: 'Anime Portrait', preview: '/images/anime-portrait-example.png' },
    { name: 'Comic Book Art', preview: '/images/comic-book-art-example.png' },
    { name: 'Studio Ghibli', preview: '/images/studio-ghibli-animation-example.png' },
    { name: 'Cyberpunk City', preview: '/images/cyberpunk-city-example.png' },
    { name: 'Fantasy Art', preview: '/images/fantasy-art-example.png' },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Absolutely incredible! Turned my golden retriever into a beautiful Disney-style portrait. The quality is amazing!",
      pet: "Golden Retriever",
      image: "/sarahmreview.png"
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "My cat looks like a Studio Ghibli character now! The AI perfectly captured her personality.",
      pet: "Maine Coon Cat",
      image: "/michaelcreview.png"
    },
    {
      name: "Emily R.",
      rating: 5,
      text: "Used the custom scene feature to put my dog on a surfboard. The result exceeded all expectations!",
      pet: "Border Collie",
      image: "/emilyrreview.png"
    }
  ];

  const faqs = [
    {
      question: "How does the AI image generation work?",
      answer: "Our AI analyzes your pet's photo and applies the artistic style you choose, maintaining your pet's unique features while transforming them into stunning artwork."
    },
    {
      question: "What image formats are supported?",
      answer: "We support PNG and JPG formats. Images should be clear, well-lit photos of your pet for best results. Maximum file size is 10MB."
    },
    {
      question: "How long does it take to generate a portrait?",
      answer: "Most portraits are generated within 30 seconds. During high demand periods, it may take up to 2 minutes."
    },
    {
      question: "Can I use the same photo for multiple styles?",
      answer: "Absolutely! You can generate multiple portraits using the same photo with different artistic styles."
    },
    {
      question: "What if I'm not satisfied with the result?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with your portrait, contact us for a full refund within 24 hours."
    },
    {
      question: "Are my photos stored or shared?",
      answer: "No. Your photos are processed securely and automatically deleted within 24 hours. We never store or share your personal images."
    }
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <Container>
        <div className="py-20 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Over 10,000 happy pet parents
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Transform Your Pet Into
            <span className="gradient-text block mt-2">
              Stunning AI Artwork
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Choose from 25+ artistic styles or create custom scenes. 
            Turn your pet photos into masterpieces in seconds with our advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button as={Link} to="/create" size="lg" className="text-lg px-8 py-4">
              ✨ Create Portrait - Starting $9.99
            </Button>
            <Button as={Link} to="/pricing" variant="secondary" size="lg" className="text-lg px-8 py-4">
              View Examples
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>30-second generation</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>100% secure & private</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💾</span>
              <span>High-resolution downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span>Money-back guarantee</span>
            </div>
          </div>
        </div>
      </Container>

      {/* How It Works */}
      <Container>
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              From Pet Photo to Art in 3 Steps
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI-powered process makes it incredibly easy to create beautiful artwork of your pet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Upload Photo</h3>
              <p className="text-slate-600 mb-4">Upload a clear, well-lit photo of your pet. Our AI works best with front-facing shots.</p>
              <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Choose Style</h3>
              <p className="text-slate-600 mb-4">Pick from 25+ artistic styles or describe a custom scene like "my dog on a beach".</p>
              <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Get Your Art</h3>
              <p className="text-slate-600 mb-4">Download your high-resolution artwork in seconds. Perfect for printing or sharing!</p>
              <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🖼️</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Style Gallery */}
      <div className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose from 25+ Artistic Styles
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From Disney animation to classical oil paintings, find the perfect style for your pet
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {styles.map((style, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  <img 
                    src={style.preview} 
                    alt={`${style.name} example`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-900 text-sm">{style.name}</h4>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button as={Link} to="/styles" size="lg">
              See All 25+ Styles
            </Button>
          </div>
        </Container>
      </div>

      {/* Testimonials */}
      <Container>
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Loved by Pet Parents Everywhere
            </h2>
            <p className="text-lg text-slate-600">
              Join thousands of happy customers who've transformed their pets into art
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name}'s ${testimonial.pet}`}
                    className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-slate-200"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.pet} parent</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about creating AI pet portraits
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-200 last:border-b-0">
                <button
                  className="w-full py-6 text-left flex justify-between items-center hover:text-blue-600 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className="text-2xl">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Final CTA */}
      <Container>
        <div className="py-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Create Your Pet's Masterpiece?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of pet parents who've already transformed their pets into stunning artwork
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as={Link} to="/create" size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                🎨 Start Creating Now
              </Button>
              <Button as={Link} to="/pricing" variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Pricing Plans
              </Button>
            </div>
            
            <div className="mt-8 text-sm opacity-75">
              🔒 Secure payment • 💰 Money-back guarantee • ⚡ 30-second generation
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;