import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  color: white;
`;

const QuickLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const QuickLinkCard = styled(Link)`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #1a1a1a;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardContainer>
      <WelcomeSection>
        <h1>Welcome, {user?.name || 'Guest'}!</h1>
        <p>Manage your bookings and explore our services</p>
      </WelcomeSection>

      <QuickLinks>
        <QuickLinkCard to="/my-bookings">
          <h3>My Bookings</h3>
          <p>View and manage your room bookings</p>
        </QuickLinkCard>

        <QuickLinkCard to="/menu">
          <h3>Menu</h3>
          <p>Browse our restaurant menu and place orders</p>
        </QuickLinkCard>

        <QuickLinkCard to="/services">
          <h3>Services</h3>
          <p>Explore our hotel services and amenities</p>
        </QuickLinkCard>

        <QuickLinkCard to="/contact">
          <h3>Contact</h3>
          <p>Get in touch with our support team</p>
        </QuickLinkCard>
      </QuickLinks>
    </DashboardContainer>
  );
};

export default Dashboard; 