import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;

  &:hover {
    background: #357abd;
  }
`;

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Just call login with any values since validation is bypassed
    login('any@email.com', 'anypassword');
  };

  return (
    <LoginContainer>
      <Title>Welcome to Travel Heaven</Title>
      <Button onClick={handleLogin}>
        Click to Login
      </Button>
    </LoginContainer>
  );
};

export default Login; 