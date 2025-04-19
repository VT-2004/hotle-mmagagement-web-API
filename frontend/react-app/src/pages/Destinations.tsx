import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 6rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DestinationCard = styled.div`
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
    height: 250px;
    object-fit: cover;
  }
`;

const DestinationContent = styled.div`
  padding: 1.5rem;

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Bali',
      image: '/assets/destination-1.jpg',
      description: 'Experience the tropical paradise of Bali with its stunning beaches, lush rice terraces, and rich cultural heritage. Perfect for both relaxation and adventure.',
      link: 'https://www.bali.com/'
    },
    {
      id: 2,
      name: 'Paris',
      image: '/assets/destination-2.jpg',
      description: 'Discover the City of Light with its iconic landmarks, world-class cuisine, and romantic atmosphere. A perfect blend of history, art, and modern culture.',
      link: 'https://en.parisinfo.com/'
    },
    {
      id: 3,
      name: 'Tokyo',
      image: '/assets/destination-3.jpg',
      description: 'Immerse yourself in the vibrant energy of Tokyo, where traditional Japanese culture meets cutting-edge technology. Experience unique cuisine, fashion, and entertainment.',
      link: 'https://www.gotokyo.org/en/'
    }
  ];

  return (
    <PageContainer>
      <Header>
        <h1>Explore Our Destinations</h1>
        <p>Discover amazing places around the world with our curated selection of premium destinations.</p>
      </Header>

      <DestinationsGrid>
        {destinations.map(destination => (
          <DestinationCard key={destination.id}>
            <img src={destination.image} alt={destination.name} />
            <DestinationContent>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <Button 
                href={destination.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Explore {destination.name}
              </Button>
            </DestinationContent>
          </DestinationCard>
        ))}
      </DestinationsGrid>
    </PageContainer>
  );
};

export default Destinations; 