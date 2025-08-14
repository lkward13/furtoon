import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Container from '../components/Container';
import SaveImageButton from '../components/SaveImageButton';
import SocialShareButton from '../components/SocialShareButton';

const DashboardPage = () => {
  const { user, logout, apiCall, isAdmin, refreshUser } = useAuth();
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetchGenerations();
    refreshUser(); // Refresh user data to ensure credit balance is current
    
    // Check for payment success in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setPaymentSuccess(true);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setPaymentSuccess(false), 5000);
    }
  }, []);

  const fetchGenerations = async () => {
    try {
      const data = await apiCall('/user/generations?limit=10');
      setGenerations(data);
    } catch (error) {
      setError('Failed to load generation history');
      console.error('Error fetching generations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen py-20">
        <Container>
          <div className="text-center">
            <p className="text-slate-600">Please log in to view your dashboard.</p>
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Sign In
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Payment Success Message */}
          {paymentSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="text-green-600 text-xl mr-3">🎉</span>
                <div>
                  <h3 className="font-semibold text-green-800">Payment Successful!</h3>
                  <p className="text-green-700">Your credits have been added to your account. Start creating amazing art!</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Welcome back!
                </h1>
                <p className="text-slate-600 mb-4">{user.email}</p>
                
                {/* Credit Balance */}
                <div className="flex items-center gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <div className="text-sm text-green-600 font-medium">Available Credits</div>
                    <div className="text-2xl font-bold text-green-700">
                      {isAdmin() ? "∞ Unlimited" : user.credits_remaining}
                    </div>
                    {isAdmin() && (
                      <div className="text-xs text-green-600 font-medium">Admin Account</div>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                    <div className="text-sm text-blue-600 font-medium">Total Purchased</div>
                    <div className="text-2xl font-bold text-blue-700">
                      {user.total_credits_purchased}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button as={Link} to="/create" className="block">
                  Create Portrait
                </Button>
                <Button as={Link} to="/pricing" variant="secondary" className="block">
                  Buy Credits
                </Button>
                <button
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-slate-700 text-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {user.credits_remaining === 0 && !isAdmin() && (
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-amber-600">
                    <span className="font-medium">No credits remaining.</span>{' '}
                    <Link to="/pricing" className="underline hover:no-underline">
                      Purchase more credits
                    </Link>{' '}
                    to continue creating portraits.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Generation History */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Creations</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="text-slate-600">Loading your creations...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-600">{error}</div>
              </div>
            ) : generations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-600 mb-4">
                  You haven't created any portraits yet.
                </div>
                <Button as={Link} to="/create">
                  Create Your First Portrait
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generations.map((generation) => (
                  <div key={generation.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    {generation.result_base64 ? (
                      <img
                        src={`data:image/png;base64,${generation.result_base64}`}
                        alt={`${generation.style} artwork`}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-slate-400 text-sm">No image data</div>
                          <div className="text-slate-300 text-xs">Generation ID: {generation.id}</div>
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {generation.style}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {new Date(generation.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500 mb-2">
                        Credits used: {generation.credits_used}
                      </p>
                      {generation.result_base64 ? (
                        <div className="flex gap-2 justify-center">
                          <SaveImageButton
                            imageBase64={`data:image/png;base64,${generation.result_base64}`}
                            filename={`furtoon-${generation.style.toLowerCase().replace(/\s+/g, '-')}.png`}
                            variant="minimal"
                            className="text-xs"
                          />
                          <SocialShareButton
                            imageBase64={`data:image/png;base64,${generation.result_base64}`}
                            filename={`furtoon-${generation.style.toLowerCase().replace(/\s+/g, '-')}.png`}
                            shareText={`Amazing ${generation.style} pet portrait created with FurToon AI! 🎨`}
                            shareUrl="https://furtoonai.com"
                            className="scale-90"
                          />
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">Image data not available</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage; 