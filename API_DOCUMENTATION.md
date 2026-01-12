# 📡 API Documentation - Match My Car

## Base URL
```
http://localhost:3000/api/cars
```

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars with filters |
| GET | `/api/cars/:id` | Get single car by ID |
| POST | `/api/cars` | Create new car |
| PUT | `/api/cars/:id` | Update car |
| DELETE | `/api/cars/:id` | Delete car |
| GET | `/api/cars/filters/brands` | Get all brands |
| GET | `/api/cars/filters/body-types` | Get all body types |
| GET | `/api/cars/filters/price-range` | Get min/max prices |
| GET | `/api/cars/stats/overview` | Get database statistics |

---

## Detailed Endpoint Documentation

### 1. Get All Cars (with Filters)

**Endpoint:** `GET /api/cars`

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `brand` | string | Filter by brand | `Toyota` |
| `bodyType` | string | Filter by body type | `SUV`, `Sedan`, `Hatchback` |
| `seating` | number | Filter by seating capacity | `5`, `7` |
| `minPrice` | number | Minimum price filter | `1000000` |
| `maxPrice` | number | Maximum price filter | `2000000` |
| `fuelType` | string | Filter by fuel type | `Petrol`, `Diesel`, `Electric` |
| `transmission` | string | Filter by transmission | `Manual`, `Automatic` |
| `page` | number | Page number | `1` (default) |
| `limit` | number | Results per page | `10` (default) |
| `sortBy` | string | Sort field | `price`, `launchYear` |
| `order` | string | Sort order | `asc`, `desc` |

**Example Request:**
```
GET /api/cars?brand=Toyota&bodyType=SUV&minPrice=1000000&maxPrice=3000000&page=1&limit=5
```

**Example Response:**
```json
{
  "success": true,
  "page": 1,
  "limit": 5,
  "totalCars": 2,
  "totalPages": 1,
  "data": [
    {
      "_id": "...",
      "brand": "Toyota",
      "model": "Fortuner",
      "bodyType": "SUV",
      "seatingCapacity": 7,
      "variants": [...],
      ...
    }
  ]
}
```

---

### 2. Get Single Car by ID

**Endpoint:** `GET /api/cars/:id`

**Example Request:**
```
GET /api/cars/507f1f77bcf86cd799439011
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "brand": "Toyota",
    "model": "Camry",
    "bodyType": "Sedan",
    "variants": [
      {
        "name": "Base",
        "price": 3200000,
        "fuelType": "Petrol",
        "transmission": "Automatic"
      }
    ],
    ...
  }
}
```

---

### 3. Create New Car

**Endpoint:** `POST /api/cars`

**Request Body:**
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
  "images": ["https://example.com/car1.jpg"]
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Car created successfully",
  "data": { ... }
}
```

---

### 4. Update Car

**Endpoint:** `PUT /api/cars/:id`

**Request Body:** (Only include fields you want to update)
```json
{
  "launchYear": 2024,
  "variants": [
    {
      "name": "Updated Variant",
      "price": 1600000
    }
  ]
}
```

---

### 5. Delete Car

**Endpoint:** `DELETE /api/cars/:id`

**Example Response:**
```json
{
  "success": true,
  "message": "Car deleted successfully",
  "data": { ... }
}
```

---

### 6. Get All Brands

**Endpoint:** `GET /api/cars/filters/brands`

**Example Response:**
```json
{
  "success": true,
  "data": [
    "Honda",
    "Hyundai",
    "Mahindra",
    "Maruti Suzuki",
    "Tata",
    "Toyota"
  ]
}
```

---

### 7. Get All Body Types

**Endpoint:** `GET /api/cars/filters/body-types`

**Example Response:**
```json
{
  "success": true,
  "data": [
    "Hatchback",
    "MUV",
    "Sedan",
    "SUV"
  ]
}
```

---

### 8. Get Price Range

**Endpoint:** `GET /api/cars/filters/price-range`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "minPrice": 550000,
    "maxPrice": 3800000
  }
}
```

---

### 9. Get Statistics

**Endpoint:** `GET /api/cars/stats/overview`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "totalCars": 10,
    "totalBrands": 6,
    "totalBodyTypes": 4,
    "bodyTypeDistribution": [
      { "_id": "SUV", "count": 5 },
      { "_id": "Sedan", "count": 2 },
      { "_id": "Hatchback", "count": 2 },
      { "_id": "MUV", "count": 1 }
    ]
  }
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid data)
- `404` - Not Found
- `500` - Server Error

---

## Testing Examples

### Using cURL

```bash
# Get all cars
curl http://localhost:3000/api/cars

# Filter by brand
curl "http://localhost:3000/api/cars?brand=Toyota"

# Get price range
curl http://localhost:3000/api/cars/filters/price-range

# Create a car
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Test",
    "model": "Test Model",
    "bodyType": "Sedan",
    "seatingCapacity": 5,
    "variants": [{
      "name": "Base",
      "price": 1000000,
      "fuelType": "Petrol",
      "transmission": "Manual"
    }]
  }'
```

### Using JavaScript (Fetch API)

```javascript
// Get all cars
fetch('http://localhost:3000/api/cars')
  .then(res => res.json())
  .then(data => console.log(data));

// Filter cars
fetch('http://localhost:3000/api/cars?brand=Toyota&bodyType=SUV')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a car
fetch('http://localhost:3000/api/cars', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    brand: 'Test',
    model: 'Test Model',
    // ... other fields
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

**Note:** Make sure your server is running on port 3000 before testing these endpoints!
