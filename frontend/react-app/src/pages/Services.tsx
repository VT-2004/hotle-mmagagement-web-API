import styled from 'styled-components';

const ServicesContainer = styled.div`
  .section__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .section__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section__subheader {
    color: #007bff;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .section__title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  .services__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .service__card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .service__image {
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .service__content {
    padding: 1.5rem;
  }

  .service__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .service__description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .service__features {
    list-style: none;
    padding: 0;
  }

  .service__feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #555;

    i {
      color: #007bff;
    }
  }
`;

const Services = () => {
  return (
    <ServicesContainer>
      <div className="section__container">
        <div className="section__header">
          <p className="section__subheader">OUR SERVICES</p>
          <h2 className="section__title">What We Offer</h2>
        </div>

        <div className="services__grid">
          <div className="service__card">
            <div className="service__image">
              <img src="/assets/service.jpg" alt="Spa & Wellness" />
            </div>
            <div className="service__content">
              <h3 className="service__title">Spa & Wellness</h3>
              <p className="service__description">
                Indulge in our luxurious spa treatments and wellness programs designed
                to rejuvenate your body and mind.
              </p>
              <ul className="service__features">
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Massage Therapy</span>
                </li>
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Facial Treatments</span>
                </li>
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Body Treatments</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="service__card">
            <div className="service__image">
              <img src="/assets/explore.jpg" alt="Restaurant & Dining" />
            </div>
            <div className="service__content">
              <h3 className="service__title">Restaurant & Dining</h3>
              <p className="service__description">
                Experience culinary excellence with our world-class chefs and
                diverse menu options.
              </p>
              <ul className="service__features">
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Fine Dining</span>
                </li>
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Room Service</span>
                </li>
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Special Events</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="service__card">
            <div className="service__image">
              <img src="/assets/room-1.jpg" alt="Conference & Events" />
            </div>
            <div className="service__content">
              <h3 className="service__title">Conference & Events</h3>
              <p className="service__description">
                Host your business meetings and special events in our
                state-of-the-art facilities.
              </p>
              <ul className="service__features">
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Meeting Rooms</span>
                </li>
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Event Planning</span>
                </li>
                <li className="service__feature">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Technical Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ServicesContainer>
  );
};

export default Services; 