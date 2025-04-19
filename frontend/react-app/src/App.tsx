import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Destinations from './pages/Destinations';
import Checkout from './pages/Checkout';
import Rooms from './pages/Rooms';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppContainer>
          <Navbar />
          <MainContent>
            <Routes>
              {/* Public Routes - Only accessible when not authenticated */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes - Require authentication */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/reservation" element={<Reservation />} />
              </Route>

              {/* Redirect root to login if not authenticated */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </AuthProvider>
    </Router>
  );
};

export default App;
