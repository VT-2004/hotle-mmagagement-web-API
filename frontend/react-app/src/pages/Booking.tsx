import { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { bookingsAPI, roomsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

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

const BookingHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .room-info {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    h2 {
      color: #fff;
      margin-bottom: 0.5rem;
      font-size: 1.8rem;
    }
    
    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4CAF50;
    }
  }
`;

const BookingForm = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input, select, textarea {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const PaymentSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
  }

  input[type="radio"] {
    margin: 0;
  }

  label {
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const roomName = searchParams.get('room') || 'Selected Room';
  const roomPrice = searchParams.get('price') || '0';
  const roomId = searchParams.get('roomId');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    room: roomName,
    specialRequests: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create booking first
      const bookingData = {
        roomId: roomId || '',
        roomName: roomName,
        guestName: formData.name,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        totalPrice: parseInt(roomPrice) * Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24)),
        contactNumber: formData.phone,
        email: formData.email,
        numberOfGuests: Number(formData.guests),
        specialRequests: formData.specialRequests,
        status: 'pending'
      };

      const bookingResponse = await bookingsAPI.createBooking(bookingData);
      const bookingId = bookingResponse.data._id;

      // Process payment
      const paymentData = {
        bookingId,
        amount: bookingData.totalPrice,
        paymentMethod: formData.paymentMethod,
        cardDetails: formData.paymentMethod !== 'upi' ? {
          cardNumber: formData.cardNumber,
          cardName: formData.cardName,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        } : undefined,
        upiId: formData.paymentMethod === 'upi' ? formData.upiId : undefined
      };

      await bookingsAPI.processPayment(paymentData);

      // Update booking status to confirmed after successful payment
      await bookingsAPI.updateBookingStatus(bookingId, 'confirmed');

      alert('Booking and payment successful!');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to complete booking. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <BookingHeader>
          <h1>Book Your Stay</h1>
          <div className="room-info">
            <h2>{roomName}</h2>
            <p className="price">₹{parseInt(roomPrice).toLocaleString('en-IN')}/night</p>
          </div>
        </BookingHeader>
        
        <BookingForm onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="checkIn">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="checkOut">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="guests">Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </InputGroup>
          <InputGroup>
            <label htmlFor="specialRequests">Special Requests</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
            />
          </InputGroup>

          <PaymentSection>
            <h3>Payment Details</h3>
            <PaymentOptions>
              <PaymentOption>
                <input
                  type="radio"
                  id="credit_card"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === 'credit_card'}
                  onChange={handleChange}
                />
                <label htmlFor="credit_card">Credit Card</label>
              </PaymentOption>
              <PaymentOption>
                <input
                  type="radio"
                  id="debit_card"
                  name="paymentMethod"
                  value="debit_card"
                  checked={formData.paymentMethod === 'debit_card'}
                  onChange={handleChange}
                />
                <label htmlFor="debit_card">Debit Card</label>
              </PaymentOption>
              <PaymentOption>
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                />
                <label htmlFor="upi">UPI</label>
              </PaymentOption>
            </PaymentOptions>

            {formData.paymentMethod !== 'upi' && (
              <>
                <InputGroup>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <InputGroup style={{ flex: 1 }}>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </InputGroup>
                  <InputGroup style={{ flex: 1 }}>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                    />
                  </InputGroup>
                </div>
              </>
            )}

            {formData.paymentMethod === 'upi' && (
              <InputGroup>
                <label htmlFor="upiId">UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={formData.upiId || ''}
                  onChange={handleChange}
                  placeholder="username@upi"
                  required
                />
              </InputGroup>
            )}
          </PaymentSection>

          <Button type="submit">Complete Booking</Button>
        </BookingForm>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Booking; 