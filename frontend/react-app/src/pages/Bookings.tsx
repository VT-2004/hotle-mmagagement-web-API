import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { bookingsAPI } from '../services/api';
import PaymentForm from '../components/PaymentForm';

interface Booking {
  id: string;
  roomNumber: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'active' | 'checked-out';
}

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const BookingCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const RoomNumber = styled.h3`
  color: #333;
  margin: 0;
`;

const Status = styled.span<{ $status: 'active' | 'checked-out' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  background: ${props => props.$status === 'active' ? '#e3f2fd' : '#f5f5f5'};
  color: ${props => props.$status === 'active' ? '#1976d2' : '#666'};
`;

const BookingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: #ffd700;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ffed4a;
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAllBookings();
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowPaymentForm(true);
  };

  const handlePaymentComplete = async () => {
    if (selectedBooking) {
      try {
        await bookingsAPI.checkout(selectedBooking.id);
        setBookings(bookings.map(booking => 
          booking.id === selectedBooking.id 
            ? { ...booking, status: 'checked-out' }
            : booking
        ));
        setShowPaymentForm(false);
        setSelectedBooking(null);
      } catch (err) {
        setError('Failed to process checkout');
        console.error('Error processing checkout:', err);
      }
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <Title>Current Bookings</Title>
      <BookingGrid>
        {bookings.map(booking => (
          <BookingCard key={booking.id}>
            <BookingHeader>
              <RoomNumber>Room {booking.roomNumber}</RoomNumber>
              <Status $status={booking.status}>
                {booking.status === 'active' ? 'Active' : 'Checked Out'}
              </Status>
            </BookingHeader>
            <BookingDetails>
              <Detail>
                <span>Guest:</span>
                <span>{booking.guestName}</span>
              </Detail>
              <Detail>
                <span>Check-in:</span>
                <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
              </Detail>
              <Detail>
                <span>Check-out:</span>
                <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
              </Detail>
              <Detail>
                <span>Total Amount:</span>
                <span>${booking.totalAmount.toFixed(2)}</span>
              </Detail>
            </BookingDetails>
            {booking.status === 'active' && (
              <Button onClick={() => handleCheckout(booking)}>
                Checkout Guest
              </Button>
            )}
          </BookingCard>
        ))}
      </BookingGrid>

      {showPaymentForm && selectedBooking && (
        <Modal>
          <PaymentForm
            bookingId={selectedBooking.id}
            totalAmount={selectedBooking.totalAmount}
            onPaymentComplete={handlePaymentComplete}
            onCancel={handlePaymentCancel}
          />
        </Modal>
      )}
    </Container>
  );
};

export default Bookings; 