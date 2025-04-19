import { useState } from 'react';
import styled from 'styled-components';
import { tableReservationsAPI } from '../services/api';

const ReservationContainer = styled.div`
  min-height: 100vh;
  background-image: url('/assets/reserved.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const ReservationContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  color: white;
`;

const ReservationHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ReservationTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
`;

const ReservationSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.9);
`;

const ReservationForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 3rem;
  width: 30%;
  margin: 0;
  margin-left: 2%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const FormGroup = styled.div`
  text-align: left;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #ffd700;
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  grid-column: 1 / -1;
  max-width: 200px;
  margin: 0 auto;
  
  &:hover {
    background-color: #ffed4a;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SuccessMessage = styled.div`
  background: rgba(40, 167, 69, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1.5rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  
  i {
    margin-right: 0.5rem;
    color: #28a745;
  }
`;

const Reservation = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    reservationTime: '',
    partySize: '2',
    specialRequests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Combine date and time into a single ISO string
      const [date, time] = formData.reservationTime.split('T');
      const reservationDateTime = new Date(`${date}T${time}`).toISOString();
      
      const response = await tableReservationsAPI.create({
        ...formData,
        reservationTime: reservationDateTime,
        partySize: parseInt(formData.partySize)
      });
      
      console.log('Reservation submitted:', response.data);
      setIsSubmitted(true);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        reservationTime: '',
        partySize: '2',
        specialRequests: ''
      });
      
      // Show success message for 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting reservation:', error);
      setError(error.response?.data?.message || 'Failed to submit reservation');
    }
  };

  return (
    <ReservationContainer>
      <ReservationContent>
        <ReservationHeader>
          <ReservationTitle>Book a Table</ReservationTitle>
          <ReservationSubtitle>
            Reserve your table now to enjoy our delicious Indian cuisine. 
            We recommend booking in advance, especially for weekends and special occasions.
          </ReservationSubtitle>
        </ReservationHeader>

        {isSubmitted ? (
          <SuccessMessage>
            <i className="fas fa-check-circle"></i>
            Your reservation has been submitted successfully!
          </SuccessMessage>
        ) : (
          <ReservationForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="customerName">Name</FormLabel>
              <FormInput
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="customerEmail">Email</FormLabel>
              <FormInput
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="customerPhone">Phone</FormLabel>
              <FormInput
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="reservationTime">Date & Time</FormLabel>
              <FormInput
                type="datetime-local"
                id="reservationTime"
                name="reservationTime"
                value={formData.reservationTime}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="partySize">Number of Guests</FormLabel>
              <FormSelect
                id="partySize"
                name="partySize"
                value={formData.partySize}
                onChange={handleInputChange}
                required
              >
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
                <option value="6">6 people</option>
                <option value="7">7 people</option>
                <option value="8">8 people</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="specialRequests">Special Requests</FormLabel>
              <FormTextarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requests or dietary requirements?"
              />
            </FormGroup>

            {error && (
              <div style={{ color: 'red', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <SubmitButton type="submit">
              Submit Reservation
            </SubmitButton>
          </ReservationForm>
        )}
      </ReservationContent>
    </ReservationContainer>
  );
};

export default Reservation; 