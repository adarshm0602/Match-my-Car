# 🚗 Match My Car - Full Stack Application

A complete MERN stack application that helps users find cars matching their preferences by filtering through a comprehensive database of cars and their specifications. The application features a modern React frontend with advanced filtering capabilities and a robust Express.js backend API.

## 🌐 Live Demo

| | URL |
|--|-----|
| **Live App** | [match-my-car.vercel.app](https://match-my-car.vercel.app) |
| **API** | [match-my-car-api.onrender.com](https://match-my-car-api.onrender.com) |
| **Source Code** | [github.com/adarshm0602/Match-my-Car](https://github.com/adarshm0602/Match-my-Car) |

> **Note**: The backend is hosted on Render's free tier, so the first request may take 30-60 seconds while the server wakes up.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Deployment](#deployment)
- [Understanding the Code](#understanding-the-code)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

> **Quick Start**: For a faster setup, see [QUICK_START.md](./QUICK_START.md)  
> **Deployment Guide**: For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎯 Project Overview

**Match My Car** is a full-stack web application that provides:

- **Backend API**: RESTful API built with Express.js and MongoDB for managing car data
- **Frontend Application**: Modern React application with Vite for fast development and optimized builds
- **Advanced Filtering**: Multi-criteria filtering system (brand, body type, price, fuel type, transmission, seating)
- **Search Functionality**: Smart search that parses brand and model from search queries
- **Car Details**: Comprehensive car detail pages with specifications, variants, and safety features
- **Pagination**: Efficient pagination for large datasets
- **Responsive Design**: Mobile-friendly UI with modern CSS styling

## ✨ Features

### Backend Features
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Advanced filtering and search capabilities
- ✅ Pagination and sorting
- ✅ Filter endpoints (brands, body types, price ranges)
- ✅ Statistics endpoint for database overview
- ✅ CORS configuration for frontend integration
- ✅ Error handling middleware
- ✅ Database seeding script with sample data

### Frontend Features
- ✅ **Home Page** with car listings
- ✅ **Advanced Filter Panel** with:
  - Brand dropdown (dynamically loaded)
  - Body type checkboxes (multiple selection)
  - Price range sliders (min/max)
  - Fuel type checkboxes (Petrol, Diesel, Electric, Hybrid, CNG)
  - Transmission radio buttons (Manual/Automatic)
  - Seating capacity checkboxes (5/7 seater)
- ✅ **Search Bar** with smart parsing (brand + model)
- ✅ **Sorting** by price and launch year (ascending/descending)
- ✅ **Car Cards** displaying key information
- ✅ **Car Detail Page** with:
  - Full car specifications
  - Engine details
  - Safety features
  - All variants with prices
  - Images support
- ✅ **Pagination** for browsing through results
- ✅ **Loading States** and error handling
- ✅ **Responsive Design** for all screen sizes
- ✅ **React Router** for navigation

## 🛠 Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing car information
- **Mongoose**: MongoDB object modeling tool
- **CORS**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management

### Frontend
- **React 19**: Modern UI library
- **React Router DOM**: Client-side routing
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API requests
- **CSS3**: Modern styling with custom components

## 📁 Project Structure

```
Match-my-Car/
├── client/                          # React frontend application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── CarCard.jsx          # Individual car card component
│   │   │   ├── CarList.jsx          # Car list container
│   │   │   ├── FilterPanel.jsx      # Filter sidebar component
│   │   │   ├── Pagination.jsx       # Pagination controls
│   │   │   ├── SearchBar.jsx        # Search input component
│   │   │   └── SortDropdown.jsx     # Sorting dropdown
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx         # Main listing page
│   │   │   └── CarDetailPage.jsx    # Car detail page
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── App.jsx                  # Main app component with routing
│   │   └── main.jsx                 # React entry point
│   ├── package.json
│   └── vite.config.js
│
├── config/
│   └── db.js                        # MongoDB connection configuration
│
├── controllers/
│   └── carController.js             # Business logic for car operations
│
├── models/
│   └── car.js                       # Database schema/model for cars
│
├── routes/
│   └── carRoutes.js                 # API route definitions
│
├── scripts/
│   └── seedCars.js                  # Database seeding script
│
├── server.js                        # Main server file
├── package.json                     # Backend dependencies
├── render.yaml                      # Render.com deployment config
├── API_DOCUMENTATION.md             # Detailed API documentation
└── README.md                        # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Backend Setup

1. **Install Backend Dependencies**
   ```bash
   npm install
   ```

2. **Set Up MongoDB**
   
   **Option A: MongoDB Atlas (Cloud - Recommended)**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a new cluster (free tier is fine)
   - Get your connection string
   - Replace `<password>` with your database password

   **Option B: Local MongoDB**
   - Install MongoDB on your computer
   - Start MongoDB service
   - Use connection string: `mongodb://localhost:27017/match-my-car`

3. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Seed the Database**
   ```bash
   npm run seed
   ```
   This will populate your database with sample car data.

5. **Start the Backend Server**
   ```bash
   # Development mode (auto-restarts on file changes)
   npm run dev

   # Or production mode
   npm start
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to Client Directory**
   ```bash
   cd client
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL (Optional)**
   
   Create a `.env` or `.env.local` file in the `client` directory if you need to change the API URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   > **Note**: `.env.local` is gitignored and recommended for local development. `.env` can be committed for shared defaults.
   
   By default, it uses `http://localhost:3000` for development. For production, set `VITE_API_URL` to your backend URL.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   ```
   The optimized build will be in the `dist` directory.

### Running Both Servers

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` in your browser to see the application.

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/cars
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars with filters, pagination, and sorting |
| GET | `/api/cars/:id` | Get single car by ID |
| POST | `/api/cars` | Create new car |
| PUT | `/api/cars/:id` | Update car |
| DELETE | `/api/cars/:id` | Delete car |
| GET | `/api/cars/filters/brands` | Get all unique brands |
| GET | `/api/cars/filters/body-types` | Get all unique body types |
| GET | `/api/cars/filters/price-range` | Get min/max prices |
| GET | `/api/cars/stats/overview` | Get database statistics |

### Query Parameters for GET /api/cars

- `brand` - Filter by brand name (e.g., "Toyota")
- `model` - Filter by model name
- `bodyType` - Filter by body type (Hatchback, Sedan, SUV, MUV, Coupe)
- `seating` - Filter by seating capacity (5, 7)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `fuelType` - Filter by fuel type (Petrol, Diesel, Electric, Hybrid, CNG)
- `transmission` - Filter by transmission (Manual, Automatic)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)
- `sortBy` - Sort field (price, launchYear)
- `order` - Sort order (asc, desc)

**Example Request:**
```
GET /api/cars?brand=Toyota&bodyType=SUV&minPrice=1000000&maxPrice=3000000&page=1&limit=5
```

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🎨 Frontend Features

### Home Page (`/`)
- **Car Listings**: Grid display of car cards with key information
- **Filter Sidebar**: Comprehensive filtering options
- **Search Bar**: Smart search that parses brand and model
- **Sort Dropdown**: Sort by price or launch year
- **Pagination**: Navigate through multiple pages of results
- **Results Count**: Display total number of matching cars

### Car Detail Page (`/car/:id`)
- **Car Images**: Display car images (with placeholder fallback)
- **Basic Information**: Brand, model, body type, seating, launch year
- **Engine Specifications**: Capacity, cylinders, power, torque
- **Safety Features**: Airbags, ABS, ESC, rear camera, NCAP rating
- **Variants Table**: All available variants with prices, fuel type, transmission, and mileage
- **Navigation**: Back button to return to search results

### Components

- **CarCard**: Displays car thumbnail with brand, model, price, and key specs
- **CarList**: Container for car cards with loading and error states
- **FilterPanel**: Sidebar with all filter options
- **SearchBar**: Search input with debouncing
- **SortDropdown**: Dropdown for sorting options
- **Pagination**: Page navigation controls

## 🚢 Deployment

The project includes deployment configuration files:
- `render.yaml` - Render.com backend deployment configuration
- `vercel.json` - Vercel frontend deployment configuration (if needed)

> **📖 For detailed step-by-step deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Deployment Summary

**Backend Deployment (Render.com)**
1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` configuration
3. Set environment variables in Render dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your frontend URL (update after frontend deployment)

**Frontend Deployment (Vercel/Netlify)**
1. Build the frontend: `cd client && npm run build`
2. Deploy the `dist` folder to Vercel or Netlify
3. Set environment variable `VITE_API_URL` to your backend API URL
4. Update `FRONTEND_URL` in Render backend after frontend is deployed

## 🧠 Understanding the Code

### Backend Architecture

**Model (`models/car.js`)**
- Defines the database schema for cars
- Includes nested objects for engine, safety, and variants
- Validates required fields and data types

**Controller (`controllers/carController.js`)**
- Contains business logic for all car operations
- Handles filtering, sorting, and pagination
- Processes query parameters and builds MongoDB queries
- Returns standardized JSON responses

**Routes (`routes/carRoutes.js`)**
- Maps HTTP endpoints to controller functions
- Defines URL patterns and HTTP methods
- Handles route parameters (e.g., `:id`)

**Server (`server.js`)**
- Initializes Express application
- Connects to MongoDB database
- Configures middleware (CORS, JSON parsing)
- Sets up routes and error handling
- Starts the HTTP server

### Frontend Architecture

**Service Layer (`services/api.js`)**
- Centralized API communication
- Builds query strings from filter objects
- Handles HTTP requests with Axios
- Provides reusable functions for all API endpoints

**Components**
- **Presentational Components**: Display UI (CarCard, SearchBar)
- **Container Components**: Manage state and logic (HomePage, FilterPanel)
- **Page Components**: Full page views (HomePage, CarDetailPage)

**State Management**
- Uses React hooks (useState, useEffect, useCallback)
- Filter state managed in HomePage component
- Props passed down to child components
- Callbacks for updating parent state

### How Filtering Works

1. **User Interaction**: User selects filters in FilterPanel or uses SearchBar
2. **State Update**: Filter state updates in HomePage component
3. **Query Building**: Filters converted to query parameters
4. **API Request**: Axios sends GET request to backend with query params
5. **Backend Processing**: Controller builds MongoDB query from params
6. **Database Query**: Mongoose queries MongoDB with filters
7. **Response**: Filtered cars returned as JSON
8. **UI Update**: React re-renders with new car data

## 🧪 Testing

### Testing the API

**Using cURL:**
```bash
# Get all cars
curl http://localhost:3000/api/cars

# Filter by brand
curl "http://localhost:3000/api/cars?brand=Toyota"

# Get price range
curl http://localhost:3000/api/cars/filters/price-range
```

**Using Postman:**
- Import the API endpoints
- Test GET requests with query parameters
- Test POST/PUT requests with JSON bodies

### Testing the Frontend

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Test filtering, searching, sorting, and pagination
4. Click on car cards to view detail pages
5. Test responsive design on different screen sizes

## 🐛 Troubleshooting

### Backend Issues

**Problem:** "MongoDB connection failed"
- **Solution:** Check your `.env` file has the correct `MONGODB_URI`
- Verify MongoDB is running (if local) or Atlas cluster is active

**Problem:** "Cannot find module"
- **Solution:** Run `npm install` in the root directory

**Problem:** Port already in use
- **Solution:** Change `PORT` in `.env` or stop the other process using port 3000

**Problem:** CORS errors
- **Solution:** Check `FRONTEND_URL` in `.env` matches your frontend URL

### Frontend Issues

**Problem:** "Network Error" or "Failed to fetch"
- **Solution:** Ensure backend server is running on port 3000
- Check `VITE_API_URL` in `client/.env` or `client/.env.local` points to correct backend URL

**Problem:** Filters not working
- **Solution:** Check browser console for errors
- Verify API endpoints are responding correctly

**Problem:** Build errors
- **Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install` again
- For frontend: Make sure you're in the `client` directory when running commands

## 📝 Project Status

✅ **Completed Features:**
- Backend API with full CRUD operations
- Advanced filtering and search
- React frontend with all components
- Car detail pages
- Pagination and sorting
- Responsive design
- Database seeding script
- Deployment configuration (Render + Vercel)
- Comprehensive documentation (README, API docs, Quick Start, Deployment guide)

## 🚀 Future Roadmap

### AI-Powered Features (Planned)

**1. AI Car Recommendation Engine**
- Natural language car search (e.g., "Find me a family SUV under 20 lakhs with good mileage")
- Personalized recommendations based on user preferences and browsing history
- Smart comparison suggestions between similar cars

**2. AI Chatbot Assistant**
- Interactive chatbot to help users find the perfect car
- Answer questions about car specifications, comparisons, and features
- Provide buying advice based on user requirements

**3. Intelligent Price Prediction**
- ML-based price prediction for used cars
- Market trend analysis and price forecasting
- Best time to buy recommendations

**4. Image Recognition Features**
- Upload a car image to identify make and model
- Visual similarity search to find cars with similar styling
- Damage assessment for used car evaluation

**5. Sentiment Analysis**
- Aggregate and analyze car reviews from multiple sources
- Provide sentiment scores for different aspects (comfort, performance, reliability)
- Highlight common praise and complaints for each model

### Other Planned Enhancements
- User authentication and saved preferences
- Car comparison tool (side-by-side comparison)
- Dealer locator with map integration
- EMI calculator and financing options
- Test drive booking system
- Push notifications for price drops

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 License

ISC

## 👤 Author

Adarsh M

## 🔗 Repository

[GitHub Repository](https://github.com/adarshm0602/Match-my-Car)

---

**Happy Coding! 🚀**
