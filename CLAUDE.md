# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Match My Car is a MERN stack car comparison platform. The backend (Express.js + MongoDB) runs from the root directory, and the frontend (React + Vite) lives in the `client/` folder.

## Development Commands

### Backend (run from root)
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Production start
npm run seed         # Populate database with sample cars
```

### Frontend (run from client/)
```bash
npm run dev          # Vite dev server on :5173
npm run build        # Production build
npm run lint         # ESLint check
```

## Architecture

### Backend Structure (MVC)
- `server.js` - Express entry point, CORS config based on NODE_ENV
- `config/db.js` - MongoDB connection with URI validation
- `models/car.js` - Mongoose schema with nested documents (engine, safety, variants)
- `routes/carRoutes.js` - REST endpoints under `/api/cars`
- `controllers/carController.js` - Business logic, filtering with `$elemMatch` for variants
- `scripts/seedCars.js` - Database seeding utility

### Frontend Structure
- `client/src/App.jsx` - React Router setup (`/` and `/car/:id`)
- `client/src/pages/HomePage.jsx` - Main listing with filter state management
- `client/src/pages/CarDetailPage.jsx` - Individual car view
- `client/src/components/` - FilterPanel, SearchBar, SortDropdown, Pagination, CarCard
- `client/src/services/api.js` - Axios client for all API calls

### Data Flow
User filters → HomePage state → api.js (axios) → Express routes → carController → Mongoose query → MongoDB → JSON response → React state → UI render

## Key Patterns

**Variant Filtering**: Cars have multiple variants (different fuel/transmission combos). The backend uses Mongoose `$elemMatch` to filter on variant properties while returning the full car document.

**Debounced Search**: SearchBar uses 500ms debounce to optimize API calls.

**Filter Optimization**: HomePage compares filter objects with JSON.stringify to prevent unnecessary re-fetches.

**CORS Configuration**: Dynamically set in server.js based on NODE_ENV - development allows localhost origins, production checks against FRONTEND_URL whitelist.

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
PORT=3000
NODE_ENV=development|production
FRONTEND_URL=http://localhost:5173
```

### Frontend
Vite proxies `/api` requests to `localhost:3000` in development (configured in vite.config.js).

## API Endpoints

- `GET /api/cars` - Filtered list with pagination (query params: brand, bodyType, minPrice, maxPrice, fuelType, transmission, seatingCapacity, sortBy, sortOrder, page, limit)
- `GET /api/cars/:id` - Single car details
- `GET /api/cars/filters/brands` - All unique brands
- `GET /api/cars/filters/body-types` - All body types
- `GET /api/cars/filters/price-range` - Min/max prices
- `GET /api/cars/stats/overview` - Database statistics

## Database Schema

Car documents contain nested structures:
- `engine`: engineCapacity, cylinders, maxPower, maxTorque
- `safety`: airbags, abs, esc, rearCamera, globalNCAPRating
- `variants[]`: name, price, fuelType (Petrol/Diesel/Electric/Hybrid/CNG), transmission (Manual/Automatic/iMT/CVT/AMT)
- Indexed fields: brand, model, bodyType, seatingCapacity

## Deployment

- Backend: Render.com (see render.yaml)
- Frontend: Vercel (see vercel.json with SPA rewrites)
