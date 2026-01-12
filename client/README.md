# Match My Car - Frontend

React frontend application for browsing and filtering cars.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

### Build for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── CarCard.jsx
│   │   ├── CarList.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortDropdown.jsx
│   │   └── Pagination.jsx
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   └── CarDetailPage.jsx
│   ├── services/         # API service layer
│   │   └── api.js
│   ├── App.jsx           # Main app with routing
│   └── main.jsx          # React entry point
└── package.json
```

## Features

- **Car Listing**: Browse all cars in a responsive grid
- **Advanced Filtering**: Filter by brand, body type, price, fuel type, transmission, and seating
- **Search**: Search cars by brand or model
- **Sorting**: Sort by price or launch year
- **Pagination**: Navigate through multiple pages of results
- **Car Details**: View detailed specifications for each car
- **Responsive Design**: Works on desktop, tablet, and mobile

## API Integration

The frontend connects to the backend API at `http://localhost:3000/api/cars`.

All API calls are handled through the `services/api.js` file.

## Technologies Used

- **React 19**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Vite**: Build tool and dev server
- **CSS**: Styling (no framework)

## Notes

- Make sure the backend server is running before starting the frontend
- The app uses Vite's proxy to forward `/api` requests to the backend
- All components are functional components using React Hooks