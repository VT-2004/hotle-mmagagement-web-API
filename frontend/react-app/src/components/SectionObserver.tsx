import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HighlightedSection = styled.section<{ $isActive: boolean }>`
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isActive ? 'rgba(255, 215, 0, 0.1)' : 'transparent'};
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.$isActive ? '#ffd700' : 'transparent'};
    transition: all 0.3s ease;
  }
`;

interface SectionObserverProps {
  children: React.ReactNode;
  id: string;
}

const SectionObserver: React.FC<SectionObserverProps> = ({ children, id }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
          } else {
            setIsActive(false);
          }
        });
      },
      {
        threshold: 0.3, // Section is considered active when 30% visible
        rootMargin: '-50px 0px -50px 0px' // Adds some margin to the viewport
      }
    );

    const section = document.getElementById(id);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [id]);

  return (
    <HighlightedSection id={id} $isActive={isActive}>
      {children}
    </HighlightedSection>
  );
};

export default SectionObserver; 