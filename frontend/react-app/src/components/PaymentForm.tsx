import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { bookingsAPI } from '../services/api';

interface PaymentFormProps {
  bookingId: string;
  totalAmount: number;
  onPaymentComplete: (paymentData: any) => void;
  onCancel: () => void;
}

const PaymentContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #666;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ffd700;
  }
`;

const CardDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const ExpiryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const CVVContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;

  ${props => props.$variant === 'primary' ? `
    background: #ffd700;
    color: #333;
    &:hover {
      background: #ffed4a;
    }
  ` : `
    background: #f5f5f5;
    color: #666;
    &:hover {
      background: #e5e5e5;
    }
  `}
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ProcessingBar = styled.div`
  width: 100%;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProcessingProgress = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: #ffd700;
  transition: width 0.5s ease-in-out;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 1.1rem;
  text-align: center;
  margin: 1rem 0;
  padding: 1rem;
  background: #d4edda;
  border-radius: 4px;
`;

const OkButton = styled.button`
  background: #28a745;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  
  &:hover {
    background: #218838;
  }
`;

const PaymentForm: React.FC<PaymentFormProps> = ({ bookingId, totalAmount, onPaymentComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 1000);

    try {
      // Save payment data to localStorage
      const paymentData = {
        bookingId,
        totalAmount,
        timestamp: new Date().toISOString(),
        cardDetails: {
          cardNumber: formData.cardNumber,
          cardName: formData.cardName,
          expiryDate: `${formData.expiryMonth}/${formData.expiryYear}`,
          cvv: formData.cvv
        }
      };
      
      // Save to localStorage
      localStorage.setItem(`payment_${bookingId}`, JSON.stringify(paymentData, null, 2));

      // Wait for 5 seconds to show the processing animation
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Complete the checkout
      onPaymentComplete(paymentData);
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
      clearInterval(interval);
    }
  };

  return (
    <PaymentContainer>
      <Title>Payment Details</Title>
      {!showSuccess ? (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Card Number</Label>
            <Input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </FormGroup>

          <FormGroup>
            <Label>Cardholder Name</Label>
            <Input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </FormGroup>

          <CardDetails>
            <ExpiryContainer>
              <FormGroup>
                <Label>Expiry Month</Label>
                <Input
                  type="text"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  placeholder="MM"
                  maxLength={2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Expiry Year</Label>
                <Input
                  type="text"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  placeholder="YY"
                  maxLength={2}
                />
              </FormGroup>
            </ExpiryContainer>
            <CVVContainer>
              <FormGroup>
                <Label>CVV</Label>
                <Input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={4}
                />
              </FormGroup>
            </CVVContainer>
          </CardDetails>

          {isProcessing && (
            <ProcessingBar>
              <ProcessingProgress $progress={progress} />
            </ProcessingBar>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <ButtonGroup>
            <Button type="submit" $variant="primary" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
            </Button>
            <Button type="button" $variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      ) : (
        <SuccessMessage>
          Guest checked out successfully
        </SuccessMessage>
      )}
    </PaymentContainer>
  );
};

export default PaymentForm; 