import { Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import UploadPage from './pages/UploadPage';
import PricingPage from './pages/PricingPage';
import PreviewPage from './pages/PreviewPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// Support & Legal Pages
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import RefundPage from './pages/RefundPage';
import StylesPage from './pages/StylesPage';

function App() {
  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ScrollToTop />
        <Navbar />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Protected Routes */}
            <Route path="/create" element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/preview" element={
              <ProtectedRoute>
                <PreviewPage />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            
            {/* Public Routes */}
            <Route path="/styles" element={<StylesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Support Pages */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />
            
            {/* Legal Pages */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refunds" element={<RefundPage />} />
            
            {/* Legacy route redirect */}
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
