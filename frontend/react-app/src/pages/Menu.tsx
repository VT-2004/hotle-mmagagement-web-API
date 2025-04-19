import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { menuAPI } from '../services/api';
import CurrentTableBooking from '../components/CurrentTableBooking';

const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url('/assets/R.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  padding: 4rem 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MenuItem = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MenuImage = styled.div`
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MenuContent = styled.div`
  padding: 1.5rem;
`;

const MenuTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const MenuDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const MenuPrice = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const MenuTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  background: #f5f5f5;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
`;

const SideView = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-100%'};
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  overflow-y: auto;
  padding: 2rem;
`;

const SideViewImage = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SideViewTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const SideViewDescription = styled.p`
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const SideViewPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 1.5rem;
`;

const SideViewIngredients = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    color: #666;
  }
`;

const SideViewClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
  z-index: 999;
`;

const ReservationLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 3rem;
  padding: 1rem 2rem;
  background-color: #ffd700;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    background-color: #ffed4a;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.$variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Menu item data
const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken pieces in a rich, creamy tomato sauce with Indian spices. Served with butter naan.",
    price: "₹450",
    image: "/assets/menu/butter-chicken.jpg",
    tag: "Chef's Special",
    tagIcon: "ri-fire-line",
    fullDescription: "Our signature Butter Chicken is prepared using a time-honored recipe that has been perfected over generations. Tender pieces of chicken are marinated in a blend of yogurt and spices, then cooked to perfection in a rich, creamy tomato sauce. The dish is finished with a touch of butter and cream, creating a luxurious texture and flavor that melts in your mouth. Served with freshly baked butter naan bread.",
    ingredients: ["Chicken", "Tomato", "Cream", "Butter", "Ginger", "Garlic", "Indian Spices", "Naan Bread"]
  },
  {
    id: 2,
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice layered with spiced meat/vegetables, aromatic spices, and caramelized onions.",
    price: "₹380",
    image: "/assets/menu/biryani.jpg",
    tag: "Signature Dish",
    tagIcon: "ri-star-line",
    fullDescription: "Our Hyderabadi Biryani is a masterpiece of Indian cuisine, featuring fragrant basmati rice layered with perfectly spiced meat or vegetables. Each grain of rice is infused with aromatic spices, creating a symphony of flavors in every bite. The dish is garnished with caramelized onions, fresh mint leaves, and a touch of saffron, elevating it to a truly royal experience. Served with raita and a side of papad.",
    ingredients: ["Basmati Rice", "Meat/Vegetables", "Onions", "Saffron", "Cardamom", "Cinnamon", "Mint Leaves", "Raita"]
  },
  {
    id: 3,
    name: "Gajar Ka Halwa",
    description: "Traditional Indian dessert made with grated carrots, milk, sugar, and ghee, garnished with nuts and cardamom.",
    price: "₹200",
    image: "/assets/menu/gajar-halwa.jpg",
    tag: "Dessert",
    tagIcon: "ri-star-line",
    fullDescription: "Our Gajar Ka Halwa is a traditional Indian dessert that brings warmth and comfort with every spoonful. Fresh carrots are grated and slow-cooked with milk until they absorb all the creamy goodness. The mixture is then sweetened with sugar and enriched with pure ghee, creating a rich and decadent texture. Finished with a sprinkle of cardamom and garnished with chopped nuts, this dessert is a perfect ending to any meal.",
    ingredients: ["Carrots", "Milk", "Sugar", "Ghee", "Cardamom", "Almonds", "Pistachios", "Raisins"]
  },
  {
    id: 4,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling, served with sambar and coconut chutney.",
    price: "₹180",
    image: "/assets/menu/masala-dosa.jpg",
    tag: "South Indian",
    tagIcon: "ri-leaf-line",
    fullDescription: "Our Masala Dosa is a crispy, golden-brown rice crepe that's a staple of South Indian cuisine. The outer layer is perfectly crisp, while the inside is filled with a flavorful spiced potato mixture. Each bite offers a perfect balance of textures and flavors. Served with a side of tangy sambar and refreshing coconut chutney, this dish is a complete meal in itself.",
    ingredients: ["Rice Batter", "Urad Dal", "Potatoes", "Onions", "Mustard Seeds", "Curry Leaves", "Sambar", "Coconut Chutney"]
  },
  {
    id: 5,
    name: "Gulab Jamun",
    description: "Soft milk dumplings soaked in sweet rose-flavored syrup, served warm with a scoop of vanilla ice cream.",
    price: "₹150",
    image: "/assets/menu/gulab-jamun.jpg",
    tag: "Dessert",
    tagIcon: "ri-star-line",
    fullDescription: "Our Gulab Jamun is a beloved Indian dessert that delights with its soft, melt-in-the-mouth texture and sweet, fragrant flavor. Each dumpling is made from a mixture of milk solids and flour, deep-fried to a perfect golden brown, then soaked in a sweet syrup infused with the delicate aroma of rose water. Served warm with a scoop of vanilla ice cream, this dessert offers a perfect contrast of temperatures and textures.",
    ingredients: ["Milk Solids", "Flour", "Ghee", "Sugar", "Rose Water", "Cardamom", "Vanilla Ice Cream"]
  },
  {
    id: 6,
    name: "Rasmalai",
    description: "Soft cottage cheese dumplings soaked in sweet, creamy milk flavored with cardamom and saffron, garnished with pistachios.",
    price: "₹180",
    image: "/assets/menu/rasmalai.jpg",
    tag: "Premium Dessert",
    tagIcon: "ri-star-line",
    fullDescription: "Our Rasmalai is a premium Indian dessert that epitomizes elegance and indulgence. Soft, spongy cottage cheese dumplings are soaked in sweet, creamy milk that has been infused with the aromatic flavors of cardamom and saffron. Each bite is a perfect balance of textures and flavors, with the creamy milk complementing the delicate dumplings. Garnished with finely chopped pistachios, this dessert is a true celebration of Indian sweets.",
    ingredients: ["Cottage Cheese", "Milk", "Sugar", "Cardamom", "Saffron", "Pistachios", "Rose Water"]
  }
];

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const reservationLinkRef = useRef<HTMLAnchorElement>(null);

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const scrollToReservation = () => {
    if (reservationLinkRef.current) {
      // Get the element's position
      const element = reservationLinkRef.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (element.offsetHeight / 2);
      
      // Scroll to the element with the calculated offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const selectedMenuItem = menuItems.find(item => item.id === selectedItem);

  return (
    <PageContainer>
      <ContentWrapper>
        <MenuHeader>
          <h1>Our Menu</h1>
          <p>Explore our delicious selection of Indian cuisine</p>
        </MenuHeader>
        
        <CurrentTableBooking onNewReservation={scrollToReservation} />
        
        <MenuGrid>
          {menuItems.map(item => (
            <MenuItem key={item.id} onClick={() => handleItemClick(item.id)}>
              <MenuImage>
                <img src={item.image} alt={item.name} />
              </MenuImage>
              <MenuContent>
                <MenuTitle>{item.name}</MenuTitle>
                <MenuDescription>{item.description}</MenuDescription>
                <MenuPrice>{item.price}</MenuPrice>
                <MenuTag>
                  <i className={item.tagIcon}></i>
                  {item.tag}
                </MenuTag>
              </MenuContent>
            </MenuItem>
          ))}
        </MenuGrid>
        
        <SideView isOpen={selectedItem !== null}>
          {selectedMenuItem && (
            <>
              <SideViewClose onClick={handleClose}>
                <i className="ri-close-line"></i>
              </SideViewClose>
              <SideViewImage>
                <img src={selectedMenuItem.image} alt={selectedMenuItem.name} />
              </SideViewImage>
              <SideViewTitle>{selectedMenuItem.name}</SideViewTitle>
              <SideViewDescription>{selectedMenuItem.fullDescription}</SideViewDescription>
              <SideViewPrice>{selectedMenuItem.price}</SideViewPrice>
              
              <SideViewIngredients>
                <h3>Ingredients</h3>
                <ul>
                  {selectedMenuItem.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </SideViewIngredients>
            </>
          )}
        </SideView>

        <ReservationLink to="/reservation" ref={reservationLinkRef}>
          Book a Table
        </ReservationLink>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Menu; 