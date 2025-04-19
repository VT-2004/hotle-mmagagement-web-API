import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/checkout-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 4rem 2rem;
  color: white;
`;

const CheckoutContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CheckoutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ffd700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;

const CheckoutForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: #ffd700;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.75rem;
    color: #ffd700;
    font-weight: 500;
    font-size: 1rem;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;

    &:focus {
      outline: none;
      border-color: #ffd700;
      box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #ffd700;
  cursor: pointer;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  min-height: 2.5rem;
  align-items: center;

  .star {
    transition: transform 0.2s;
    display: inline-block;
    width: 1.5rem;
    text-align: center;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 1rem 2rem;
  background-color: ${props => props.primary ? '#ffd700' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.primary ? '#333' : 'white'};
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? '#ffed4a' : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const RatingSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const RatingGroup = styled(FormGroup)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    overallRating: 5,
    cleanlinessRating: 5,
    serviceRating: 5,
    amenitiesRating: 5,
    valueRating: 5,
    feedback: '',
    wouldRecommend: 'yes',
    additionalComments: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating: number, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: rating
    }));
  };

  const renderStars = (rating: number, field: string, isInteractive = false) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className="star"
        onClick={() => isInteractive && handleStarClick(index + 1, field)}
      >
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Checkout form submitted:', formData);
    // Show success message and redirect
    alert('Thank you for your feedback! We hope to see you again soon.');
    navigate('/');
  };

  return (
    <CheckoutContainer>
      <CheckoutContent>
        <CheckoutHeader>
          <h1>Checkout & Feedback</h1>
          <p>We hope you enjoyed your stay with us. Please take a moment to share your experience.</p>
        </CheckoutHeader>

        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <h2>Guest Information</h2>
            <FormGrid>
              <FormGroup>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="roomNumber">Room Number</label>
                <input
                  type="text"
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="checkInDate">Check-in Date</label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="checkOutDate">Check-out Date</label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormGrid>
          </FormSection>

          <FormSection>
            <h2>Rate Your Experience</h2>
            <RatingSection>
              <RatingGroup>
                <label>Overall Experience</label>
                <StarRating>
                  {renderStars(formData.overallRating, 'overallRating', true)}
                </StarRating>
              </RatingGroup>
              <RatingGroup>
                <label>Cleanliness</label>
                <StarRating>
                  {renderStars(formData.cleanlinessRating, 'cleanlinessRating', true)}
                </StarRating>
              </RatingGroup>
              <RatingGroup>
                <label>Service</label>
                <StarRating>
                  {renderStars(formData.serviceRating, 'serviceRating', true)}
                </StarRating>
              </RatingGroup>
              <RatingGroup>
                <label>Amenities</label>
                <StarRating>
                  {renderStars(formData.amenitiesRating, 'amenitiesRating', true)}
                </StarRating>
              </RatingGroup>
              <RatingGroup>
                <label>Value for Money</label>
                <StarRating>
                  {renderStars(formData.valueRating, 'valueRating', true)}
                </StarRating>
              </RatingGroup>
            </RatingSection>
          </FormSection>

          <FormSection>
            <h2>Additional Feedback</h2>
            <FormGroup>
              <label htmlFor="feedback">What did you enjoy most about your stay?</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="wouldRecommend">Would you recommend us to friends and family?</label>
              <select
                id="wouldRecommend"
                name="wouldRecommend"
                value={formData.wouldRecommend}
                onChange={handleChange}
              >
                <option value="yes">Yes</option>
                <option value="maybe">Maybe</option>
                <option value="no">No</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label htmlFor="additionalComments">Any additional comments or suggestions?</label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
              />
            </FormGroup>
          </FormSection>

          <ButtonGroup>
            <Button type="button" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" primary>
              Submit Feedback & Checkout
            </Button>
          </ButtonGroup>
        </CheckoutForm>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default Checkout; 