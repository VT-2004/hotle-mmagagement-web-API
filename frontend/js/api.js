const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Auth API calls
export const auth = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        'x-auth-token': token
      }
    });
    return handleResponse(response);
  }
};

// Room API functions
async function getAvailableRooms() {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/available`);
        if (!response.ok) throw new Error('Failed to fetch rooms');
        return await response.json();
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
}

async function getRoomById(roomId) {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`);
        if (!response.ok) throw new Error('Failed to fetch room');
        return await response.json();
    } catch (error) {
        console.error('Error fetching room:', error);
        throw error;
    }
}

// Booking API functions
async function createBooking(bookingData) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        if (!response.ok) throw new Error('Failed to create booking');
        return await response.json();
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}

async function getBookingById(bookingId) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
        if (!response.ok) throw new Error('Failed to fetch booking');
        return await response.json();
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
}

async function checkoutBooking(bookingId) {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/checkout`, {
            method: 'PATCH'
        });
        if (!response.ok) throw new Error('Failed to checkout booking');
        return await response.json();
    } catch (error) {
        console.error('Error checking out booking:', error);
        throw error;
    }
}

// Bookings API calls
export const bookings = {
  create: async (bookingData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(bookingData)
    });
    return handleResponse(response);
  },

  getAll: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: {
        'x-auth-token': token
      }
    });
    return handleResponse(response);
  },

  getMine: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/bookings/me`, {
      headers: {
        'x-auth-token': token
      }
    });
    return handleResponse(response);
  },

  checkAvailability: async (checkIn, checkOut, roomType) => {
    const response = await fetch(
      `${API_BASE_URL}/bookings/check-availability?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${roomType}`
    );
    return handleResponse(response);
  }
};

// Menu API calls
export const menu = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/menu`);
    return handleResponse(response);
  },

  getByCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/menu/category/${category}`);
    return handleResponse(response);
  }
};

// Orders API calls
export const orders = {
  create: async (orderData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },

  getAll: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        'x-auth-token': token
      }
    });
    return handleResponse(response);
  },

  getMine: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/orders/me`, {
      headers: {
        'x-auth-token': token
      }
    });
    return handleResponse(response);
  }
};

// Contact API calls
export const contact = {
  sendMessage: async (messageData) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    return handleResponse(response);
  }
}; 