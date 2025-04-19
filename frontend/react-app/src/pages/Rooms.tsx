import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import SectionObserver from '../components/SectionObserver';

const RoomsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/header.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 8px;
  margin-top: 1rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const RoomCard = styled.div`
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
`;

const RoomContent = styled.div`
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
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  .section__subheader {
    color: #007bff;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  .section__header {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const OffersSection = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const OffersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const OfferCard = styled.div<{ $isSelected: boolean }>`
  padding: 1.5rem;
  background: ${props => props.$isSelected ? '#e3f2fd' : 'white'};
  border: 2px solid ${props => props.$isSelected ? '#2196f3' : '#e0e0e0'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  .discount {
    color: #e53935;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .validity {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Rooms = () => {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const offers = [
    {
      id: 1,
      title: 'Summer Special',
      discount: 20,
      validity: 'Valid till August 31, 2024',
      description: 'Get 20% off on all room bookings'
    },
    {
      id: 2,
      title: 'Weekend Getaway',
      discount: 15,
      validity: 'Valid for weekend stays',
      description: '15% off on weekend bookings'
    },
    {
      id: 3,
      title: 'Early Bird',
      discount: 25,
      validity: 'Book 30 days in advance',
      description: '25% off on advance bookings'
    }
  ];

  const rooms = [
    {
      id: 1,
      title: 'Deluxe Ocean View',
      description: 'Spacious room with stunning ocean views and modern amenities.',
      image: '/assets/room-1.jpg',
      price: 6249
    },
    {
      id: 2,
      title: 'Executive Cityscape Room',
      description: 'Luxury suite with panoramic city views and premium services.',
      image: '/assets/room-2.jpg',
      price: 6999
    },
    {
      id: 3,
      title: 'Family Garden Retreat',
      description: 'Perfect for families with garden access and extra space.',
      image: '/assets/room-3.jpg',
      price: 7499
    }
  ];

  const calculateDiscountedPrice = (originalPrice: number) => {
    if (!selectedOffer) return originalPrice;
    const offer = offers.find(o => o.id === selectedOffer);
    if (!offer) return originalPrice;
    return originalPrice * (1 - offer.discount / 100);
  };

  return (
    <RoomsContainer>
      <GlobalStyles />
      <SectionObserver id="rooms-header">
        <PageHeader>
          <h1>Our Rooms</h1>
          <p>Discover our luxurious accommodations designed for your comfort and relaxation</p>
        </PageHeader>
      </SectionObserver>

      <SectionObserver id="offers-section">
        <SectionHeader>
          <p className="section__subheader">SPECIAL OFFERS</p>
          <h2 className="section__header">Exclusive Deals</h2>
          <p>Take advantage of our limited-time offers for an even more luxurious stay</p>
        </SectionHeader>

        <OffersSection>
          <OffersGrid>
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                $isSelected={selectedOffer === offer.id}
                onClick={() => setSelectedOffer(selectedOffer === offer.id ? null : offer.id)}
              >
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <p className="discount">{offer.discount}% OFF</p>
                <p className="validity">{offer.validity}</p>
              </OfferCard>
            ))}
          </OffersGrid>
        </OffersSection>
      </SectionObserver>

      <SectionObserver id="rooms-content">
        <SectionHeader>
          <p className="section__subheader">OUR ROOMS</p>
          <h2 className="section__header">Luxury Accommodations</h2>
          <p>Experience unparalleled comfort and elegance in our carefully designed rooms</p>
        </SectionHeader>

        <RoomsGrid>
          {rooms.map((room) => {
            const discountedPrice = calculateDiscountedPrice(room.price);
            return (
              <RoomCard key={room.id}>
                <img src={room.image} alt={room.title} />
                <RoomContent>
                  <h3>{room.title}</h3>
                  <p>{room.description}</p>
                  <p className="price">
                    From ₹{discountedPrice.toLocaleString()}/night
                    {selectedOffer && (
                      <span style={{ color: '#e53935', marginLeft: '0.5rem' }}>
                        (Save ₹{(room.price - discountedPrice).toLocaleString()})
                      </span>
                    )}
                  </p>
                  <Button to={`/booking?room=${encodeURIComponent(room.title)}&price=${discountedPrice}&offer=${selectedOffer}`}>
                    Book Now
                  </Button>
                </RoomContent>
              </RoomCard>
            );
          })}
        </RoomsGrid>
      </SectionObserver>
    </RoomsContainer>
  );
};

export default Rooms; 