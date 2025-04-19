import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import SectionObserver from '../components/SectionObserver';

const HomeContainer = styled.div`
  .header {
    height: 100vh;
    background-image: url('/assets/header.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 0 2rem;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
  }

  .header__content {
    position: relative;
    z-index: 2;
    max-width: 800px;
  }

  .header__title {
    font-size: 4rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 700;
  }

  .header__subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    font-weight: 500;
  }

  .booking__section {
    padding: 6rem 2rem;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/booking-bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: white;
  }

  .booking__container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .booking__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .booking__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ffd700;
  }

  .booking__subtitle {
    font-size: 1.2rem;
    color: #fff;
    opacity: 0.9;
  }

  .booking__form {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .form__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .form__group {
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #ffd700;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #ffd700;
        box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
      }
    }
  }

  .booking__button {
    margin-top: 2rem;
    text-align: center;
  }

  .btn {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #ffd700;
    color: #333;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #ffed4a;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
  }

  .rooms__section {
    padding: 6rem 2rem;
    background: #f9f9f9;
  }

  .rooms__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .room__card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .room__content {
    padding: 1.5rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #333;
    }

    p {
      color: #666;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 1.25rem;
      color: #007bff;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }

  .offers__info {
    margin-top: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;

    p {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: #ffd700;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin: 0.5rem 0;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &:before {
          content: '✓';
          color: #4CAF50;
        }
      }
    }
  }

  .payment__section {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: none;

    &.active {
      display: block;
    }

    h3 {
      color: #ffd700;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .payment__options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .payment__option {
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }

      &.selected {
        background: rgba(76, 175, 80, 0.2);
        border-color: #4CAF50;
      }

      img {
        width: 40px;
        height: 40px;
        margin-bottom: 0.5rem;
      }

      p {
        color: white;
        font-size: 0.9rem;
        margin: 0;
      }
    }

    .payment__button {
      width: 100%;
      padding: 1rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;

      &:hover {
        background: #45a049;
        transform: translateY(-2px);
      }
    }
  }

  .payment__modal {
    .qr__section {
      margin: 1.5rem 0;
      text-align: center;
      padding: 1rem;
      background: #f9f9f9;
      border-radius: 8px;

      h4 {
        margin-bottom: 1rem;
        color: #333;
      }

      .qr__code {
        width: 200px;
        height: 200px;
        margin: 0 auto 1rem;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      p {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      .upi__id {
        font-weight: 600;
        color: #333;
        background: #f0f0f0;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        display: inline-block;
        margin: 0.5rem 0;
      }
    }
  }
`;

const AvailableRoomsInfo = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: none;

  &.active {
    display: block;
  }

  h3 {
    color: #ffd700;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .rooms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .room-info {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);

    h4 {
      color: #ffd700;
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    .availability {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .price {
      color: #4CAF50;
      font-weight: bold;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [showAvailableRooms, setShowAvailableRooms] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    guests: '1'
  });

  const availableRooms = {
    'Deluxe Ocean View': {
      total: 10,
      available: 7,
      price: 6249
    },
    'Executive Cityscape Room': {
      total: 8,
      available: 5,
      price: 6999
    },
    'Family Garden Retreat': {
      total: 6,
      available: 4,
      price: 7499
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAvailableRooms(true);
  };

  return (
    <HomeContainer>
      <GlobalStyles />
      <SectionObserver id="header-section">
        <header className="header">
          <div className="header__content">
            <h1 className="header__title">Welcome to Traveller's Heaven</h1>
            <p className="header__subtitle">Experience Luxury Like Never Before</p>
          </div>
        </header>
      </SectionObserver>

      <SectionObserver id="booking-section">
        <section className="booking__section" id="booking">
          <div className="booking__container">
            <div className="booking__header">
              <h2 className="booking__title">Book Your Stay</h2>
              <p className="booking__subtitle">Find the perfect room for your next adventure</p>
            </div>
            <div className="booking__form">
              <form onSubmit={handleBookingSubmit}>
                <div className="form__grid">
                  <div className="form__group">
                    <label htmlFor="guests">Guests</label>
                    <select 
                      id="guests" 
                      name="guests"
                      value={bookingDetails.guests}
                      onChange={handleInputChange}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>
                <div className="booking__button">
                  <button 
                    type="submit" 
                    className="btn"
                  >
                    View Available Rooms
                  </button>
                </div>
              </form>

              <AvailableRoomsInfo className={showAvailableRooms ? 'active' : ''}>
                <h3>Available Rooms</h3>
                <div className="rooms-grid">
                  {Object.entries(availableRooms).map(([roomType, info]) => (
                    <div key={roomType} className="room-info">
                      <h4>{roomType}</h4>
                      <p className="availability">
                        {info.available} of {info.total} rooms available
                      </p>
                      <p className="price">From ₹{info.price.toLocaleString()}/night</p>
                      <Link 
                        to={`/booking?room=${encodeURIComponent(roomType)}&price=${info.price}`}
                        className="btn"
                        style={{ marginTop: '1rem', display: 'inline-block' }}
                      >
                        Book Now
                      </Link>
                    </div>
                  ))}
                </div>
              </AvailableRoomsInfo>
            </div>
          </div>
        </section>
      </SectionObserver>
    </HomeContainer>
  );
};

export default Home; 