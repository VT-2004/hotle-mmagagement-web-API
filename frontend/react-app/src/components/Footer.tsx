import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: white;
  padding: 4rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: white;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: white;
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
      color: #007bff;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
  color: #ccc;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>
            Experience luxury and comfort at its finest. Our hotel offers world-class
            amenities and exceptional service for an unforgettable stay.
          </p>
          <SocialLinks>
            <a href="#"><i className="ri-facebook-fill"></i></a>
            <a href="#"><i className="ri-twitter-fill"></i></a>
            <a href="#"><i className="ri-instagram-fill"></i></a>
            <a href="#"><i className="ri-youtube-fill"></i></a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ul>
            <li>
              <i className="ri-map-pin-fill"></i>
              Majestic, Bangalore, India
            </li>
            <li>
              <i className="ri-phone-fill"></i>
              +91 6360681710
            </li>
            <li>
              <i className="ri-mail-fill"></i>
              talawarh316@gmail.com
            </li>
          </ul>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; 2024 Hotel Name. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 