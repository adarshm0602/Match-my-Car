const express = require("express");
const {
  getFilteredCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getAllBrands,
  getAllBodyTypes,
  getPriceRange,
  getCarStats,
} = require("../controllers/carController");

const router = express.Router();

// Filter/utility routes (must come before /:id route to avoid conflicts)
router.get("/filters/brands", getAllBrands);
router.get("/filters/body-types", getAllBodyTypes);
router.get("/filters/price-range", getPriceRange);
router.get("/stats/overview", getCarStats);

// Main CRUD routes
router.get("/", getFilteredCars); // Get all cars with filters
router.get("/:id", getCarById); // Get single car by ID
router.post("/", createCar); // Create new car
router.put("/:id", updateCar); // Update car by ID
router.delete("/:id", deleteCar); // Delete car by ID

module.exports = router;
