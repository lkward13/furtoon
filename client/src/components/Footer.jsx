import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-100 border-t border-surface-200 mt-16">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="text-xl font-bold gradient-text tracking-tight">
                FurToon
              </Link>
              <p className="mt-4 text-sm text-surface-600">
                Transform your pet photos into stunning AI artwork with 25+ styles and custom scenes.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-surface-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/create" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Create Portrait
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/styles" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Art Styles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-surface-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/#faq" className="text-surface-600 hover:text-surface-900 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-surface-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/privacy" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refunds" className="text-surface-600 hover:text-surface-900 transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-surface-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-surface-600">
              © {currentYear} FurToon. All rights reserved.
            </p>
            
            {/* Social Links - Placeholder for future */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-surface-500">
                🔒 Your photos are processed securely and deleted within 24 hours
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 