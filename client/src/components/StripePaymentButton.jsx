import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const StripePaymentButton = ({ 
  tier = 'starter', 
  price = '$9.99',
  credits = '10',
  className = '',
  children
}) => {
  const { apiCall } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Call our backend to create Stripe checkout session
      const response = await apiCall('/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier: tier,
          success_url: `${window.location.origin}/dashboard?payment=success`,
          cancel_url: `${window.location.origin}/pricing?payment=cancelled`
        }),
      });

      // Redirect to Stripe checkout
      if (response.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to start payment process');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          children || `Buy ${credits} Credits for ${price}`
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}
      
      {/* Test mode indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-1">
          🧪 Test Mode: Use card 4242424242424242 with any future date and CVC
        </div>
      )}
    </div>
  );
};

export default StripePaymentButton;
