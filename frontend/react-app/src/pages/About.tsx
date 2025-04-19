import React from 'react';
import styled from 'styled-components';
import SectionObserver from '../components/SectionObserver';

const AboutContainer = styled.div`
  .section__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .about__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .about__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .about__image {
    position: relative;
    height: 400px;
    overflow: hidden;
    border-radius: 8px;
  }

  .about__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .about__content {
    padding: 2rem;
  }

  .about__content h2 {
    margin-bottom: 1rem;
  }

  .about__content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .about__list {
    list-style: none;
    padding: 0;
  }

  .about__list li {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .about__list i {
    color: #007bff;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <SectionObserver id="about-section">
        <div className="section__container">
          <div className="about__header">
            <p className="section__subheader">ABOUT US</p>
            <h2 className="section__header">Your Home Away From Home</h2>
          </div>

          <div className="about__grid">
            <div className="about__image">
              <img src="/assets/about.jpg" alt="Hotel Exterior" />
            </div>
            <div className="about__content">
              <h2>Welcome to Our Luxury Hotel</h2>
              <p>
                Nestled in the heart of the city, our hotel offers a perfect blend of comfort,
                luxury, and exceptional service. With our prime location and world-class amenities,
                we ensure your stay is nothing short of extraordinary.
              </p>
              <p>
                Our dedicated team of professionals is committed to providing you with an
                unforgettable experience, whether you're here for business or leisure.
              </p>
              <ul className="about__list">
                <li>
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>24/7 Room Service</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Free High-Speed WiFi</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Fitness Center Access</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Swimming Pool</span>
                </li>
                <li>
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Spa & Wellness Center</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SectionObserver>
    </AboutContainer>
  );
};

export default About; 