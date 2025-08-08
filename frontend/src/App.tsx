import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, CSSReset, Spinner, Box, Text, Center } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// Import all components directly instead of lazy loading to avoid chunk errors
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import CreateCampaign from './pages/CreateCampaign';
import AuthCallbackPage from './pages/AuthCallback';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

// Loading component for authentication state
const LoadingFallback = ({ componentName = "component" }) => (
  <Center height="100vh">
    <Box textAlign="center">
      <Spinner size="xl" color="teal.500" mb={4} />
      <Text>Loading {componentName}...</Text>
    </Box>
  </Center>
);

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback componentName="authentication" />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <CSSReset />
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public pages with Navbar/Footer */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/auth/success" element={<AuthCallbackPage />} />
              
              {/* Dashboard (protected) */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Customer routes */}
              <Route path="/customers" element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              } />
              
              {/* Order routes */}
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              
              {/* Campaign routes */}
              <Route path="/campaigns" element={
                <ProtectedRoute>
                  <Campaigns />
                </ProtectedRoute>
              } />
              
              <Route path="/campaigns/create" element={
                <ProtectedRoute>
                  <CreateCampaign />
                </ProtectedRoute>
              } />
              
              <Route path="/campaigns/:id" element={
                <ProtectedRoute>
                  <CampaignDetail />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default App;
