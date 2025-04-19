import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/assets/hotel-lobby.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 4rem 2rem;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  margin: 0 auto;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffd700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: white;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(0, 0, 0, 0.5);
  }

  i {
    color: #ffd700;
    font-size: 1.5rem;
  }

  span {
    font-size: 1.1rem;
  }
`;

const ContactText = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ddd;
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Contact Us</SectionTitle>
        </SectionHeader>

        <ContactInfo>
          <InfoTitle>How to Reach Us</InfoTitle>
          
          <InfoItem>
            <i className="ri-map-pin-fill"></i>
            <span>123 Luxury Avenue, City Center</span>
          </InfoItem>
          
          <InfoItem>
            <i className="ri-phone-fill"></i>
            <span>+1 234 567 8900</span>
          </InfoItem>
          
          <InfoItem>
            <i className="ri-mail-fill"></i>
            <span>info@travelheaven.com</span>
          </InfoItem>
          
          <InfoItem>
            <i className="ri-time-fill"></i>
            <span>24/7 Front Desk Service</span>
          </InfoItem>
          
          <InfoItem>
            <i className="ri-whatsapp-fill"></i>
            <span>+1 234 567 8901 (WhatsApp)</span>
          </InfoItem>
          
          <InfoItem>
            <i className="ri-facebook-fill"></i>
            <span>facebook.com/travelheaven</span>
          </InfoItem>
          
          <InfoItem>
            <i className="ri-instagram-fill"></i>
            <span>instagram.com/travelheaven</span>
          </InfoItem>
          
          <ContactText>
            We're here to help! Feel free to reach out to us through any of the above channels. 
            Our team is available 24/7 to assist you with any inquiries, reservations, or special requests.
          </ContactText>
        </ContactInfo>
      </SectionContainer>
    </ContactContainer>
  );
};

export default Contact; 