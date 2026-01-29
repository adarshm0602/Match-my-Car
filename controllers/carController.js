const Car = require("../models/car");

/**
 * GET /api/cars
 * Get all cars with filtering, sorting, and pagination
 * Query parameters:
 *   - brand: Filter by brand name (e.g., "Toyota", "Honda")
 *   - bodyType: Filter by body type (Hatchback, Sedan, SUV, MUV, Coupe)
 *   - seating: Filter by seating capacity (e.g., 5, 7)
 *   - minPrice: Minimum price filter
 *   - maxPrice: Maximum price filter
 *   - fuelType: Filter by fuel type (Petrol, Diesel, Electric, Hybrid, CNG)
 *   - transmission: Filter by transmission (Manual, Automatic)
 *   - page: Page number for pagination (default: 1)
 *   - limit: Number of results per page (default: 10)
 *   - sortBy: Sort field (price, launchYear)
 *   - order: Sort order (asc, desc)
 */
const getFilteredCars = async (req, res) => {
  try {
    const {
      brand,
      model,
      bodyType,
      seating,
      minPrice,
      maxPrice,
      fuelType,
      transmission,
      page = 1,
      limit = 10,
      sortBy,
      order = "asc",
    } = req.query;

    // Build the query object for filtering
    let query = {};

    // Top-level filters (directly on car document)
    if (brand) query.brand = new RegExp(brand, "i"); // Case-insensitive search
    if (model) query.model = new RegExp(model, "i"); // Case-insensitive model search
    if (bodyType) query.bodyType = bodyType;
    if (seating) query.seatingCapacity = Number(seating);

    // Variant-level filters (nested in variants array)
    let variantFilters = {};

    if (minPrice || maxPrice) {
      variantFilters.price = {};
      if (minPrice) variantFilters.price.$gte = Number(minPrice);
      if (maxPrice) variantFilters.price.$lte = Number(maxPrice);
    }

    if (fuelType) variantFilters.fuelType = fuelType;
    if (transmission) variantFilters.transmission = transmission;

    // If we have variant filters, use $elemMatch to find cars with matching variants
    if (Object.keys(variantFilters).length > 0) {
      query.variants = { $elemMatch: variantFilters };
    }

    // Sorting options
    let sortOptions = {};

    if (sortBy === "price") {
      sortOptions["variants.price"] = order === "desc" ? -1 : 1;
    } else if (sortBy === "launchYear") {
      sortOptions.launchYear = order === "desc" ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default: newest first
    }

    // Pagination: Calculate how many documents to skip
    const skip = (Number(page) - 1) * Number(limit);

    // Get total count for pagination info
    const totalCars = await Car.countDocuments(query);

    // Fetch cars with filters, sorting, and pagination
    const cars = await Car.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      totalCars,
      totalPages: Math.ceil(totalCars / limit),
      data: cars,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching cars", 
      error: error.message 
    });
  }
};

/**
 * GET /api/cars/:id
 * Get a single car by its ID
 */
const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid car ID",
      error: error.message,
    });
  }
};

/**
 * POST /api/cars
 * Create a new car in the database
 * Body should contain all car details including variants
 */
const createCar = async (req, res) => {
  try {
    const carData = req.body;

    // Validate required fields
    if (!carData.brand || !carData.model) {
      return res.status(400).json({
        success: false,
        message: "Brand and model are required",
      });
    }

    if (!carData.variants || carData.variants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one variant is required",
      });
    }

    const newCar = new Car(carData);
    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: savedCar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating car",
      error: error.message,
    });
  }
};

/**
 * PUT /api/cars/:id
 * Update an existing car by ID
 */
const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const updateData = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      updateData,
      { new: true, runValidators: true } // Return updated doc and run validators
    );

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating car",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/cars/:id
 * Delete a car by ID
 */
const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
      data: deletedCar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting car",
      error: error.message,
    });
  }
};

/**
 * GET /api/cars/filters/brands
 * Get all unique brand names from the database
 */
const getAllBrands = async (req, res) => {
  try {
    const brands = await Car.distinct("brand");
    res.status(200).json({
      success: true,
      data: brands.sort(), // Sort alphabetically
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching brands",
      error: error.message,
    });
  }
};

/**
 * GET /api/cars/filters/body-types
 * Get all unique body types from the database
 */
const getAllBodyTypes = async (req, res) => {
  try {
    const bodyTypes = await Car.distinct("bodyType");
    res.status(200).json({
      success: true,
      data: bodyTypes.filter(Boolean).sort(), // Remove null/undefined and sort
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching body types",
      error: error.message,
    });
  }
};

/**
 * GET /api/cars/filters/price-range
 * Get the minimum and maximum price range from all variants
 */
const getPriceRange = async (req, res) => {
  try {
    const cars = await Car.find({}, "variants.price");
    
    let minPrice = Infinity;
    let maxPrice = 0;

    // Loop through all cars and their variants to find min/max
    cars.forEach((car) => {
      car.variants.forEach((variant) => {
        if (variant.price < minPrice) minPrice = variant.price;
        if (variant.price > maxPrice) maxPrice = variant.price;
      });
    });

    res.status(200).json({
      success: true,
      data: {
        minPrice: minPrice === Infinity ? 0 : minPrice,
        maxPrice: maxPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching price range",
      error: error.message,
    });
  }
};

/**
 * GET /api/cars/stats/overview
 * Get statistics about the car database
 */
const getCarStats = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const brands = await Car.distinct("brand");
    const bodyTypes = await Car.distinct("bodyType");
    
    // Count cars by body type
    const bodyTypeCounts = await Car.aggregate([
      { $group: { _id: "$bodyType", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCars,
        totalBrands: brands.length,
        totalBodyTypes: bodyTypes.length,
        bodyTypeDistribution: bodyTypeCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getFilteredCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getAllBrands,
  getAllBodyTypes,
  getPriceRange,
  getCarStats,
};

