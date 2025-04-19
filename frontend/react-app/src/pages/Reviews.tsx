import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { reviewsAPI } from '../services/api';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ReviewsContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/reviews-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 6rem 0;

  .section__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .section__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section__subheader {
    color: #ffd700;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .section__title {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .reviews__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .review__card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    backdrop-filter: blur(5px);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
    }
  }

  .review__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .review__image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #ffd700;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .review__info {
    h4 {
      margin: 0;
      color: #333;
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
  }

  .review__content {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-style: italic;
    position: relative;
    padding: 0 1rem;

    &:before {
      content: '"';
      font-size: 4rem;
      color: #ffd700;
      position: absolute;
      left: -1rem;
      top: -1rem;
      opacity: 0.3;
    }
  }

  .review__rating {
    color: #ffd700;
    font-size: 1.2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewForm = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);

  h3 {
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.8rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    color: #333;
    font-weight: 500;
    font-size: 1.1rem;
  }

  input, textarea, select {
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #ffd700;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  button {
    padding: 1rem 2rem;
    background-color: #ffd700;
    color: #333;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
      background-color: #ffed4a;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #ffd700;
  cursor: pointer;

  .star {
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

interface Review {
  _id?: string;
  id?: string;
  name: string;
  type: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState({
    name: '',
    type: 'Leisure Traveler',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Fetch reviews when component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await reviewsAPI.getAll();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Please try again later.');
    }
  };

  const handleStarClick = (rating: number) => {
    setUserReview(prev => ({
      ...prev,
      rating
    }));
  };

  const renderStars = (rating: number, isInteractive = false) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${isInteractive ? 'interactive' : ''}`}
        onClick={() => isInteractive && handleStarClick(index + 1)}
      >
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!userReview.name.trim()) {
        throw new Error('Please enter your name');
      }
      if (!userReview.comment.trim()) {
        throw new Error('Please enter your review');
      }
      if (userReview.rating < 1 || userReview.rating > 5) {
        throw new Error('Please select a valid rating');
      }

      // Submit review to backend
      await reviewsAPI.create(userReview);
      
      // Reset form
      setUserReview({
        name: '',
        type: 'Leisure Traveler',
        rating: 5,
        comment: ''
      });
      
      // Show success message
      setSuccess('Thank you! Your review has been submitted successfully.');
      
      // Refresh reviews list
      fetchReviews();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setError(error.response?.data?.message || error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ReviewsContainer>
      <div className="section__container">
        <div className="section__header">
          <p className="section__subheader">TESTIMONIALS</p>
          <h2 className="section__title">What Our Guests Say</h2>
        </div>

        {error && (
          <div style={{ 
            color: '#ff4444', 
            textAlign: 'center', 
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: 'rgba(255, 68, 68, 0.1)',
            borderRadius: '8px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            color: '#00C851', 
            textAlign: 'center', 
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(0, 200, 81, 0.1)',
            borderRadius: '8px',
            fontSize: '1.2rem',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(0, 200, 81, 0.2)',
            animation: 'fadeIn 0.5s ease-in-out'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span role="img" aria-label="success">✅</span> Success!
            </div>
            {success}
          </div>
        )}

        <div className="reviews__grid">
          {reviews.slice(0, 3).map((review) => (
            <div key={review._id || review.id} className="review__card">
              <div className="review__header">
                <div className="review__image">
                  <img src="/assets/avatar-placeholder.svg" alt={review.name} />
                </div>
                <div className="review__info">
                  <h4>{review.name}</h4>
                  <p>{review.type}</p>
                </div>
              </div>
              <p className="review__content">
                "{review.comment}"
              </p>
              <div className="review__rating">
                {renderStars(review.rating)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => setShowAllReviews(!showAllReviews)}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#ffd700',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            {showAllReviews ? 'Show Less' : 'All Reviews'}
          </button>
        </div>

        {showAllReviews && (
          <div className="reviews__grid" style={{ marginTop: '2rem' }}>
            {reviews.slice(3).map((review) => (
              <div key={review._id || review.id} className="review__card">
                <div className="review__header">
                  <div className="review__image">
                    <img src="/assets/avatar-placeholder.svg" alt={review.name} />
                  </div>
                  <div className="review__info">
                    <h4>{review.name}</h4>
                    <p>{review.type}</p>
                  </div>
                </div>
                <p className="review__content">
                  "{review.comment}"
                </p>
                <div className="review__rating">
                  {renderStars(review.rating)}
                </div>
              </div>
            ))}
          </div>
        )}

        <ReviewForm>
          <h3>Share Your Experience</h3>
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userReview.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form__group">
              <label htmlFor="type">Traveler Type</label>
              <select
                id="type"
                name="type"
                value={userReview.type}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="Leisure Traveler">Leisure Traveler</option>
                <option value="Business Traveler">Business Traveler</option>
                <option value="Family Traveler">Family Traveler</option>
                <option value="Single Traveler">Single Traveler</option>
              </select>
            </div>

            <div className="form__group">
              <label>Your Rating</label>
              <StarRating>
                {renderStars(userReview.rating, true)}
              </StarRating>
            </div>

            <div className="form__group">
              <label htmlFor="comment">Your Review</label>
              <textarea
                id="comment"
                name="comment"
                value={userReview.comment}
                onChange={handleChange}
                required
                placeholder="Tell us about your experience..."
                disabled={isSubmitting}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </ReviewForm>
      </div>
    </ReviewsContainer>
  );
};

export default Reviews; 