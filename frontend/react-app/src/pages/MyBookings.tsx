import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';
import PaymentForm from '../components/PaymentForm';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  background-color: #f8f9fa;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BookingCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const BookingTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const BookingInfo = styled.div`
  margin-bottom: 1rem;

  p {
    margin: 0.5rem 0;
    color: #666;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'confirmed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
  color: white;
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  margin-right: 1rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface Booking {
  _id: string;
  roomId: string;
  roomName: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: 'active' | 'completed' | 'cancelled';
  contactNumber: string;
  email: string;
  numberOfGuests: number;
  specialRequests?: string;
}

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

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await bookingsAPI.getAllBookings();
        console.log('Fetched bookings:', response.data);
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          console.error('Invalid bookings data:', response.data);
          setError('Failed to fetch bookings: Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCheckout = async (booking: Booking) => {
    setSelectedBooking(booking);
    setShowPaymentForm(true);
  };

  const handlePaymentComplete = async (paymentData: any) => {
    try {
      // Update booking status to completed
      await bookingsAPI.updateBookingStatus(selectedBooking?._id || '', 'completed');
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking._id === selectedBooking?._id 
          ? { ...booking, status: 'completed' }
          : booking
      ));
      
      // Show success message
      setAlert({
        type: 'success',
        message: 'Guest checked out successfully'
      });
      
      // Close payment form
      setShowPaymentForm(false);
      setSelectedBooking(null);

      // Refresh the page to show updated bookings
      navigate('/my-bookings');
    } catch (err) {
      console.error('Checkout error:', err);
      setAlert({
        type: 'error',
        message: 'Failed to checkout guest. Please try again.'
      });
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Header>
            <h1>Loading bookings...</h1>
          </Header>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Header>
            <h1>Error</h1>
            <p>{error}</p>
          </Header>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <h1>My Bookings</h1>
          <p>Manage your hotel bookings</p>
        </Header>

        {alert && (
          <div style={{ 
            padding: '1rem', 
            marginBottom: '1rem', 
            backgroundColor: alert.type === 'success' ? '#d4edda' : '#f8d7da',
            color: alert.type === 'success' ? '#155724' : '#721c24',
            borderRadius: '4px'
          }}>
            {alert.message}
          </div>
        )}

        <BookingsGrid>
          {bookings.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p>No bookings found. Book a room to get started!</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <BookingCard key={booking._id}>
                <BookingTitle>{booking.roomName}</BookingTitle>
                <BookingInfo>
                  <p><strong>Guest:</strong> {booking.guestName}</p>
                  <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                  <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                  <p><strong>Total Price:</strong> ₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                  <p><strong>Status:</strong> <StatusBadge status={booking.status}>{booking.status}</StatusBadge></p>
                </BookingInfo>
                {booking.status === 'active' && (
                  <Button onClick={() => handleCheckout(booking)}>
                    Checkout
                  </Button>
                )}
              </BookingCard>
            ))
          )}
        </BookingsGrid>

        {showPaymentForm && selectedBooking && (
          <Modal>
            <ModalContent>
              <PaymentForm
                bookingId={selectedBooking._id}
                totalAmount={selectedBooking.totalPrice}
                onPaymentComplete={handlePaymentComplete}
                onCancel={() => {
                  setShowPaymentForm(false);
                  setSelectedBooking(null);
                }}
              />
            </ModalContent>
          </Modal>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default MyBookings; 
