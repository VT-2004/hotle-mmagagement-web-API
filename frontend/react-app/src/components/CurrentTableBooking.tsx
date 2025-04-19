import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tableReservationsAPI } from '../services/api';

const BookingContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    color: #333;
  }
`;

const RefreshButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const BookingDetails = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  
  p {
    margin: 0.5rem 0;
    color: #333;
  }
`;

const NoReservations = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ReservationForm = styled.form`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  
  &:hover {
    background-color: #c82333;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CancelModalButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const ConfirmButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #c82333;
  }
`;

const CheckoutButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  
  &:hover {
    background-color: #218838;
  }
`;

interface Table {
  _id: string;
  tableNumber: string;
  reservationTime: string;
  capacity: number;
  customerPhone: string;
  status: string;
}

interface CurrentTableBookingProps {
  onNewReservation?: () => void;
}

const CurrentTableBooking: React.FC<CurrentTableBookingProps> = ({ onNewReservation }) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelConfirmation, setCancelConfirmation] = useState({
    tableId: '',
    phoneNumber: '',
    expectedPhone: ''
  });
  const [formData, setFormData] = useState({
    reservationTime: '',
    partySize: '2',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      setRefreshing(true);
      const response = await tableReservationsAPI.getCurrent();
      console.log('Fetched tables:', response.data);
      setTables(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error fetching tables:', err);
      setError('Failed to fetch table reservations');
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await tableReservationsAPI.create({
        reservationTime: new Date(formData.reservationTime).toISOString(),
        partySize: parseInt(formData.partySize),
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        specialRequests: formData.specialRequests
      });
      console.log('Created reservation:', response.data);
      setTables([...tables, response.data]);
      setShowForm(false);
      setFormData({
        reservationTime: '',
        partySize: '2',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        specialRequests: ''
      });
    } catch (err: any) {
      console.error('Error creating reservation:', err);
      setError('Failed to create table reservation');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (tableId: string, phoneNumber: string) => {
    setCancelConfirmation({
      tableId,
      phoneNumber: '',
      expectedPhone: phoneNumber
    });
    setShowCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    try {
      setLoading(true);
      
      // Check if the entered phone number matches the expected one
      if (cancelConfirmation.phoneNumber !== cancelConfirmation.expectedPhone) {
        setError('Phone number does not match. Cancellation unsuccessful.');
        setShowCancelModal(false);
        return;
      }
      
      // Cancel the reservation
      await tableReservationsAPI.cancel(cancelConfirmation.tableId);
      // Refresh the table list
      await fetchTables();
      setError('');
      setShowCancelModal(false);
    } catch (err: any) {
      console.error('Error cancelling reservation:', err);
      setError('Failed to cancel reservation');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClose = () => {
    setShowCancelModal(false);
  };

  const handleNewReservationClick = () => {
    if (onNewReservation) {
      onNewReservation();
    } else {
      setShowForm(!showForm);
    }
  };

  const handleCheckout = async (tableId: string) => {
    try {
      setLoading(true);
      await tableReservationsAPI.updateStatus(tableId, 'completed');
      // Refresh the table list
      await fetchTables();
      setError('');
    } catch (err: any) {
      console.error('Error checking out reservation:', err);
      setError('Failed to checkout reservation');
    } finally {
      setLoading(false);
    }
  };

  if (loading && tables.length === 0) {
    return <BookingContainer>Loading...</BookingContainer>;
  }

  return (
    <BookingContainer>
      <BookingHeader>
        <h3>Current Table Reservations</h3>
        <div>
          <RefreshButton 
            onClick={fetchTables} 
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </RefreshButton>
          <SubmitButton 
            onClick={handleNewReservationClick}
            style={{ marginLeft: '1rem' }}
          >
            {showForm ? 'Cancel' : 'New Reservation'}
          </SubmitButton>
        </div>
      </BookingHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {showForm && (
        <ReservationForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="reservationTime">Reservation Time</Label>
            <Input
              type="datetime-local"
              id="reservationTime"
              value={formData.reservationTime}
              onChange={(e) => setFormData({...formData, reservationTime: e.target.value})}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="partySize">Party Size</Label>
            <Select
              id="partySize"
              value={formData.partySize}
              onChange={(e) => setFormData({...formData, partySize: e.target.value})}
            >
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="4">4 people</option>
              <option value="6">6 people</option>
              <option value="8">8 people</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              type="text"
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              type="email"
              id="customerEmail"
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="customerPhone">Phone Number</Label>
            <Input
              type="tel"
              id="customerPhone"
              value={formData.customerPhone}
              onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Input
              type="text"
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              placeholder="Any special requests or dietary requirements?"
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Reservation'}
          </SubmitButton>
        </ReservationForm>
      )}

      {tables.length === 0 ? (
        <NoReservations>
          <p>No active table reservations.</p>
        </NoReservations>
      ) : (
        tables.map((table) => (
          <BookingDetails key={table._id}>
            <p><strong>Table:</strong> {table.tableNumber}</p>
            <p><strong>Capacity:</strong> {table.capacity} people</p>
            <p><strong>Reserved at:</strong> {new Date(table.reservationTime).toLocaleString()}</p>
            <p><strong>Phone:</strong> {table.customerPhone}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CancelButton onClick={() => handleCancelClick(table._id, table.customerPhone)}>
                Cancel Reservation
              </CancelButton>
              <CheckoutButton onClick={() => handleCheckout(table._id)}>
                Checkout
              </CheckoutButton>
            </div>
          </BookingDetails>
        ))
      )}

      {showCancelModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>Confirm Cancellation</ModalTitle>
            <p>Please enter the guest's phone number to confirm cancellation:</p>
            <FormGroup>
              <Label htmlFor="confirmPhone">Phone Number</Label>
              <Input
                type="text"
                id="confirmPhone"
                value={cancelConfirmation.phoneNumber}
                onChange={(e) => setCancelConfirmation({
                  ...cancelConfirmation,
                  phoneNumber: e.target.value
                })}
                placeholder="Enter phone number"
              />
            </FormGroup>
            <ModalButtons>
              <CancelModalButton onClick={handleCancelClose}>
                Close
              </CancelModalButton>
              <ConfirmButton onClick={handleCancelConfirm}>
                Confirm Cancellation
              </ConfirmButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </BookingContainer>
  );
};

export default CurrentTableBooking; 