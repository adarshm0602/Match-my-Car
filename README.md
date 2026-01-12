# 🚗 Match My Car - Backend API

A MERN stack application that helps users find cars matching their preferences by filtering through a comprehensive database of cars and their specifications.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Understanding the Code](#understanding-the-code)

## 🎯 Project Overview

**Match My Car** is a full-stack application where:
- Users can browse a database of cars with detailed specifications
- Users can filter cars by various criteria (brand, price, fuel type, body type, etc.)
- Users can view detailed information about each car including variants, engine specs, and safety features

## 🛠 Tech Stack

- **MongoDB**: Database to store car information
- **Express.js**: Web framework for Node.js (handles HTTP requests)
- **Node.js**: JavaScript runtime environment
- **Mongoose**: MongoDB object modeling tool

## 📁 Project Structure

```
Match-my-Car/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   └── carController.js   # Business logic for car operations
├── models/
│   └── car.js             # Database schema/model for cars
├── routes/
│   └── carRoutes.js       # API route definitions
├── scripts/
│   └── seedCars.js        # Script to populate database with sample data
├── server.js              # Main server file
├── package.json           # Project dependencies
└── .env                   # Environment variables (create this)
```

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages (Express, Mongoose, etc.)

### Step 2: Set Up MongoDB

You have two options:

**Option A: MongoDB Atlas (Cloud - Recommended for beginners)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Get your connection string
5. Replace `<password>` with your database password

**Option B: Local MongoDB**
1. Install MongoDB on your computer
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/match-my-car`

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=3000
   ```

### Step 4: Seed the Database

Populate your database with sample car data:

```bash
npm run seed
```

This will create 10 sample cars with various specifications.

### Step 5: Start the Server

```bash
# Development mode (auto-restarts on file changes)
npm run dev

# Or production mode
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### Base URL
All endpoints start with: `http://localhost:3000/api/cars`

### 1. Get All Cars (with Filters)
**GET** `/api/cars`

Query Parameters (all optional):
- `brand` - Filter by brand name (e.g., "Toyota")
- `bodyType` - Filter by body type (Hatchback, Sedan, SUV, MUV, Coupe)
- `seating` - Filter by seating capacity (5, 7)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `fuelType` - Filter by fuel (Petrol, Diesel, Electric, Hybrid, CNG)
- `transmission` - Filter by transmission (Manual, Automatic)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)
- `sortBy` - Sort field (price, launchYear)
- `order` - Sort order (asc, desc)

**Example:**
```
GET /api/cars?brand=Toyota&bodyType=SUV&minPrice=1000000&maxPrice=2000000
```

**Response:**
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "totalCars": 5,
  "totalPages": 1,
  "data": [...]
}
```

### 2. Get Single Car by ID
**GET** `/api/cars/:id`

**Example:**
```
GET /api/cars/507f1f77bcf86cd799439011
```

### 3. Create New Car
**POST** `/api/cars`

**Body:** (JSON)
```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "bodyType": "Sedan",
  "seatingCapacity": 5,
  "launchYear": 2023,
  "engine": {
    "engineCapacity": 1800,
    "cylinders": 4,
    "maxPower": "140 bhp",
    "maxTorque": "175 Nm"
  },
  "safety": {
    "airbags": 6,
    "abs": true,
    "esc": true,
    "rearCamera": true,
    "globalNCAPRating": 5
  },
  "variants": [
    {
      "name": "Base",
      "price": 1500000,
      "fuelType": "Petrol",
      "transmission": "Manual",
      "mileage": 18.5
    }
  ],
  "images": ["url1", "url2"]
}
```

### 4. Update Car
**PUT** `/api/cars/:id`

**Body:** (JSON with fields to update)

### 5. Delete Car
**DELETE** `/api/cars/:id`

### 6. Get All Brands
**GET** `/api/cars/filters/brands`

Returns array of all unique brand names.

### 7. Get All Body Types
**GET** `/api/cars/filters/body-types`

Returns array of all unique body types.

### 8. Get Price Range
**GET** `/api/cars/filters/price-range`

Returns minimum and maximum prices from all variants.

### 9. Get Statistics
**GET** `/api/cars/stats/overview`

Returns database statistics (total cars, brands, body type distribution).

## 🧠 Understanding the Code

### What is a Model?
A **model** (`models/car.js`) defines the structure of data in your database. It's like a blueprint that says "every car must have a brand, model, and variants."

### What is a Controller?
A **controller** (`controllers/carController.js`) contains the business logic. When someone requests data, the controller:
1. Receives the request
2. Queries the database
3. Processes the data
4. Sends back a response

### What is a Route?
A **route** (`routes/carRoutes.js`) maps URLs to controller functions. For example:
- When someone visits `/api/cars`, it calls `getFilteredCars` function
- When someone visits `/api/cars/:id`, it calls `getCarById` function

### How Filtering Works

When a user filters cars, here's what happens:

1. **User sends request:** `GET /api/cars?brand=Toyota&minPrice=1000000`

2. **Route receives it:** The route in `carRoutes.js` catches this request

3. **Controller processes:** `getFilteredCars` function:
   - Reads query parameters (`brand`, `minPrice`)
   - Builds a MongoDB query object
   - Searches database with filters
   - Returns matching cars

4. **Response sent:** JSON data with filtered cars

### Database Schema Explained

Each car document has:
- **Basic Info:** brand, model, bodyType, seatingCapacity
- **Engine:** capacity, cylinders, power, torque
- **Safety:** airbags, ABS, ESC, NCAP rating
- **Variants:** Array of different versions (Base, Sport, etc.) with different prices and features

## 🧪 Testing the API

You can test the API using:
- **Postman** (recommended GUI tool)
- **curl** (command line)
- **Browser** (for GET requests)

**Example curl commands:**

```bash
# Get all cars
curl http://localhost:3000/api/cars

# Get cars by brand
curl http://localhost:3000/api/cars?brand=Toyota

# Get price range
curl http://localhost:3000/api/cars/filters/price-range

# Create a car (POST)
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{"brand":"Test","model":"Test Model",...}'
```

## 🐛 Troubleshooting

**Problem:** "MongoDB connection failed"
- **Solution:** Check your `.env` file has the correct `MONGODB_URI`

**Problem:** "Cannot find module"
- **Solution:** Run `npm install` to install dependencies

**Problem:** Port already in use
- **Solution:** Change `PORT` in `.env` or stop the other process using port 3000

## 📝 Next Steps

After the backend is complete:
1. Create React frontend
2. Connect frontend to these APIs
3. Build filtering UI
4. Add car detail pages
5. Deploy to production

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

**Happy Coding! 🚀** 
