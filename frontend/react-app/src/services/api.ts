import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Clear token and redirect to login on authentication error
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(new Error(errorMessage));
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/users/login', credentials),
    
  getCurrentUser: () => 
    api.get('/users/me')
};

// Bookings API
export const bookingsAPI = {
  createBooking: (bookingData: {
    roomId: string;
    roomName: string;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    contactNumber: string;
    email: string;
    numberOfGuests: number;
    specialRequests?: string;
  }) => api.post('/bookings', bookingData),
    
  getAllBookings: () => api.get('/bookings'),
  
  getCurrentBookings: () => api.get('/bookings/current'),
  
  checkout: (bookingId: string) => api.patch(`/bookings/${bookingId}/checkout`),
  
  checkAvailability: (dates: { checkInDate: string; checkOutDate: string; roomType: string }) =>
    api.post('/bookings/check-availability', dates),

  processPayment: (paymentData: {
    bookingId: string;
    amount: number;
    paymentMethod: string;
    cardDetails?: {
      cardNumber: string;
      cardName: string;
      expiryDate: string;
      cvv: string;
    };
    upiId?: string;
  }) => api.post('/bookings/payment', paymentData),

  updateBookingStatus: (bookingId: string, status: string) =>
    api.patch(`/bookings/${bookingId}/status`, { status })
};

// Menu API
export const menuAPI = {
  getAll: () => 
    api.get('/menu'),
    
  getItem: (id: string) => 
    api.get(`/menu/${id}`),
    
  create: (itemData: any) => 
    api.post('/menu', itemData),
    
  update: (id: string, itemData: any) => 
    api.put(`/menu/${id}`, itemData),
    
  delete: (id: string) => 
    api.delete(`/menu/${id}`)
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) => 
    api.post('/orders', orderData),
    
  getMine: () => 
    api.get('/orders/me'),
    
  update: (id: string, orderData: any) => 
    api.put(`/orders/${id}`, orderData),
    
  cancel: (id: string) => 
    api.delete(`/orders/${id}`)
};

// Rooms API
export const roomsAPI = {
  getAll: () => 
    api.get('/rooms'),
    
  getAvailable: (checkIn: string, checkOut: string) => 
    api.get(`/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`),
    
  getById: (id: string) => 
    api.get(`/rooms/${id}`),

  getByType: (type: string) => 
    api.get(`/rooms/type/${type}`)
};

// Table Reservations API
export const tableReservationsAPI = {
  create: (data: {
    reservationTime: string;
    partySize: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    specialRequests?: string;
  }) => api.post('/table-reservations', data),
  
  getCurrent: () => api.get('/table-reservations'),
  
  cancel: (id: string) => api.post(`/table-reservations/${id}/cancel`),
  
  updateStatus: (id: string, status: 'active' | 'cancelled' | 'completed' | 'cleared') => 
    api.patch(`/table-reservations/${id}/status`, { status })
};

// Reviews API
export const reviewsAPI = {
  getAll: () => 
    api.get('/reviews'),
    
  create: (reviewData: {
    name: string;
    type: string;
    rating: number;
    comment: string;
  }) => api.post('/reviews', reviewData)
};

// Contact API
export const contactAPI = {
  submitMessage: async (messageData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      console.log('Sending message to:', '/contact');
      const response = await api.post('/contact', messageData);
      console.log('Server response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error sending message:', error);
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  }
};

export default api; 