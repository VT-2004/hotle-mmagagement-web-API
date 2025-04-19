# Travel Heaven - Hotel Booking System

A modern hotel booking web application built with React, TypeScript, and Node.js.

## Features

- User authentication
- Hotel browsing and searching
- Room booking and management
- Payment processing
- User dashboard for bookings

## Tech Stack

- Frontend: React, TypeScript, Styled Components
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VT-2004/hotle-mmagagement-web-API.git
cd hotle-mmagagement-web-API
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend/react-app
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development servers:
```bash
# Start backend server (from root directory)
npm run dev

# Start frontend server (from frontend/react-app directory)
npm start
```

## Project Structure

```
├── frontend/
│   └── react-app/          # React frontend application
├── backend/                # Node.js backend server
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 