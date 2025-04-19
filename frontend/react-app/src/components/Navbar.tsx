import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 1rem;
  margin-right: 2rem;
  
  img {
    height: 60px;
  }
  
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000000;
    white-space: nowrap;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  margin-left: auto;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? '#ffd700' : '#333'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  position: relative;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.$isActive ? '#ffd700' : 'transparent'};
    transform: ${props => props.$isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ffd700;
    text-shadow: ${props => props.$isActive ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  padding: 2rem;
  z-index: 1001;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 2rem;
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffd700;
  color: #333;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 200px;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const UserInfo = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;

  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #333;
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const AuthLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 400;
  position: relative;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: transparent;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ffd700;
    text-shadow: none;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update active section based on current path
    const path = location.pathname;
    setActiveSection(path === '/' ? 'home' : path.slice(1));
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsUserMenuOpen(false);
  };

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <NavLink to="/login" $isActive={activeSection === 'login'}>Login</NavLink>
          <NavLink to="/register" $isActive={activeSection === 'register'}>Register</NavLink>
        </>
      );
    }

    return (
      <>
        <NavLink to="/" $isActive={activeSection === 'home'}>Home</NavLink>
        <NavLink to="/about" $isActive={activeSection === 'about'}>About</NavLink>
        <NavLink to="/services" $isActive={activeSection === 'services'}>Services</NavLink>
        <NavLink to="/menu" $isActive={activeSection === 'menu'}>Menu</NavLink>
        <NavLink to="/rooms" $isActive={activeSection === 'rooms'}>Rooms</NavLink>
        <NavLink to="/reviews" $isActive={activeSection === 'reviews'}>Reviews</NavLink>
        <NavLink to="/destinations" $isActive={activeSection === 'destinations'}>Destinations</NavLink>
        <NavLink to="/contact" $isActive={activeSection === 'contact'}>Contact</NavLink>
        <NavLink to="/my-bookings" $isActive={activeSection === 'my-bookings'}>My Bookings</NavLink>
        <UserMenu ref={userMenuRef}>
          <UserName onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </UserName>
          {isUserMenuOpen && (
            <UserDropdown>
              <UserInfo>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </UserInfo>
              <DropdownButton onClick={() => handleNavigation('/dashboard')}>
                Dashboard
              </DropdownButton>
              <DropdownButton onClick={() => handleNavigation('/my-bookings')}>
                My Bookings
              </DropdownButton>
              <DropdownButton onClick={handleLogout}>
                Logout
              </DropdownButton>
            </UserDropdown>
          )}
        </UserMenu>
      </>
    );
  };

  const renderMobileLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</MobileNavLink>
          <MobileNavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</MobileNavLink>
        </>
      );
    }

    return (
      <>
        <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
        <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
        <MobileNavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</MobileNavLink>
        <MobileNavLink to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</MobileNavLink>
        <MobileNavLink to="/rooms" onClick={() => setIsMobileMenuOpen(false)}>Rooms</MobileNavLink>
        <MobileNavLink to="/reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</MobileNavLink>
        <MobileNavLink to="/destinations" onClick={() => setIsMobileMenuOpen(false)}>Destinations</MobileNavLink>
        <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
        <MobileNavLink to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)}>My Bookings</MobileNavLink>
        <MobileNavLink to="#" onClick={() => {
          handleLogout();
          setIsMobileMenuOpen(false);
        }}>Logout</MobileNavLink>
      </>
    );
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to={isAuthenticated ? "/" : "/login"}>
          <img src="/assets/logo.png" alt="Hotel Logo" />
          <span>Traveller's Heaven</span>
        </Logo>

        <NavLinks>
          {renderNavLinks()}
        </NavLinks>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
          <i className="ri-menu-line"></i>
        </MobileMenuButton>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
            <i className="ri-close-line"></i>
          </CloseButton>
          {renderMobileLinks()}
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 