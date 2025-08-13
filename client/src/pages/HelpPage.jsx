import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';

const HelpPage = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of creating your first AI pet portrait",
      articles: [
        { title: "How to upload your pet's photo", link: "#upload" },
        { title: "Choosing the right art style", link: "#styles" },
        { title: "Creating custom scenes", link: "#custom" },
        { title: "Downloading your portrait", link: "#download" }
      ]
    },
    {
      title: "Photo Guidelines",
      description: "Tips for getting the best results from your pet photos",
      articles: [
        { title: "What makes a good pet photo?", link: "#good-photo" },
        { title: "Lighting and background tips", link: "#lighting" },
        { title: "Supported file formats", link: "#formats" },
        { title: "Photo size and quality requirements", link: "#quality" }
      ]
    },
    {
      title: "Art Styles Guide",
      description: "Explore our 25+ artistic styles and their unique characteristics",
      articles: [
        { title: "Animation styles (Pixar, Disney, Ghibli)", link: "#animation" },
        { title: "Traditional art (Watercolor, Oil, Pencil)", link: "#traditional" },
        { title: "Digital art styles", link: "#digital" },
        { title: "Fantasy and sci-fi themes", link: "#fantasy" }
      ]
    },
    {
      title: "Billing & Plans",
      description: "Information about pricing, payments, and subscriptions",
      articles: [
        { title: "Understanding our pricing plans", link: "#pricing" },
        { title: "How to upgrade or downgrade", link: "#upgrade" },
        { title: "Refund policy and process", link: "#refunds" },
        { title: "Commercial use licensing", link: "#commercial" }
      ]
    },
    {
      title: "Technical Support",
      description: "Troubleshooting common issues and technical problems",
      articles: [
        { title: "Upload errors and solutions", link: "#upload-errors" },
        { title: "Generation taking too long", link: "#slow-generation" },
        { title: "Poor quality results", link: "#quality-issues" },
        { title: "Browser compatibility", link: "#browser" }
      ]
    },
    {
      title: "Account & Privacy",
      description: "Managing your account and understanding our privacy practices",
      articles: [
        { title: "Creating and managing your account", link: "#account" },
        { title: "How we protect your photos", link: "#privacy" },
        { title: "Data deletion and retention", link: "#data" },
        { title: "Account deletion process", link: "#delete-account" }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get personalized help from our team",
      icon: "💬",
      link: "/contact",
      color: "bg-blue-50 text-blue-700"
    },
    {
      title: "View FAQ",
      description: "Quick answers to common questions",
      icon: "❓",
      link: "/faq",
      color: "bg-green-50 text-green-700"
    },
    {
      title: "Report a Bug",
      description: "Found an issue? Let us know",
      icon: "🐛",
      link: "/contact",
      color: "bg-red-50 text-red-700"
    },
    {
      title: "Feature Request",
      description: "Suggest new features or improvements",
      icon: "💡",
      link: "/contact",
      color: "bg-yellow-50 text-yellow-700"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <SectionTitle
          eyebrow="Support"
          title="Help Center"
          subtitle="Find answers, learn tips, and get the most out of FurToon"
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="block bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center text-2xl mb-4`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{action.title}</h3>
              <p className="text-sm text-slate-600">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index} className="h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{category.title}</h3>
                <p className="text-slate-600 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a 
                        href={article.link}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm"
                      >
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Most Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-semibold text-slate-900 mb-2">How to get the best results from your pet photo</h4>
                <p className="text-sm text-slate-600">Learn the key factors that make a great source photo for AI generation.</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-semibold text-slate-900 mb-2">Understanding our pricing plans</h4>
                <p className="text-sm text-slate-600">Compare features and find the right plan for your needs.</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-semibold text-slate-900 mb-2">Creating custom scenes and prompts</h4>
                <p className="text-sm text-slate-600">Master the art of writing effective custom prompts for unique results.</p>
              </a>
            </div>
            <div className="space-y-4">
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-semibold text-slate-900 mb-2">Troubleshooting upload issues</h4>
                <p className="text-sm text-slate-600">Common solutions for file upload problems and errors.</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-semibold text-slate-900 mb-2">Privacy and data security</h4>
                <p className="text-sm text-slate-600">How we protect your photos and personal information.</p>
              </a>
              <a href="#" className="block p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-semibold text-slate-900 mb-2">Commercial use guidelines</h4>
                <p className="text-sm text-slate-600">What you can and can't do with your AI-generated portraits.</p>
              </a>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you get the perfect AI portrait of your pet.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Contact Support Team
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpPage;
