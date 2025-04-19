import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tableReservationsAPI } from '../services/api';
import CurrentTableBooking from '../components/CurrentTableBooking';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ReservationForm = styled.form`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const TableReservation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    reservationTime: '',
    partySize: '2',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await tableReservationsAPI.create({
        reservationTime: new Date(formData.reservationTime).toISOString(),
        partySize: parseInt(formData.partySize),
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        specialRequests: formData.specialRequests
      });
      console.log('Reservation response:', response);
      setSuccessMessage('Table reserved successfully!');
      setFormData({
        reservationTime: '',
        partySize: '2',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        specialRequests: ''
      });
    } catch (error: any) {
      console.error('Reservation error:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to reserve table');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <h1>Table Reservation</h1>
      
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      
      <ReservationForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="reservationTime">Reservation Time</Label>
          <Input
            type="datetime-local"
            id="reservationTime"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="partySize">Party Size</Label>
          <Select
            id="partySize"
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
          >
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="4">4 people</option>
            <option value="6">6 people</option>
            <option value="8">8 people</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="customerName">Your Name</Label>
          <Input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="customerEmail">Email</Label>
          <Input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="customerPhone">Phone Number</Label>
          <Input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
          <Input
            type="text"
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any special requests or dietary requirements?"
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Reserving...' : 'Reserve Table'}
        </SubmitButton>
      </ReservationForm>

      <CurrentTableBooking />
    </PageContainer>
  );
};

export default TableReservation; 