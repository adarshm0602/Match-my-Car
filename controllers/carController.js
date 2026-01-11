const Car = require("../models/car");

const getFilteredCars = async (req, res) => {
  try {
    const {
      brand,
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

    let query = {};

    /* ---------- TOP LEVEL FILTERS ---------- */
    if (brand) query.brand = brand;
    if (bodyType) query.bodyType = bodyType;
    if (seating) query.seatingCapacity = Number(seating);

    /* ---------- VARIANT FILTERS ---------- */
    let variantFilters = {};

    if (minPrice || maxPrice) {
      variantFilters.price = {};
      if (minPrice) variantFilters.price.$gte = Number(minPrice);
      if (maxPrice) variantFilters.price.$lte = Number(maxPrice);
    }

    if (fuelType) variantFilters.fuelType = fuelType;
    if (transmission) variantFilters.transmission = transmission;

    if (Object.keys(variantFilters).length > 0) {
      query.variants = { $elemMatch: variantFilters };
    }

    /* ---------- SORTING ---------- */
    let sortOptions = {};

    if (sortBy === "price") {
      sortOptions["variants.price"] = order === "desc" ? -1 : 1;
    }

    if (sortBy === "launchYear") {
      sortOptions.launchYear = order === "desc" ? -1 : 1;
    }

    /* ---------- PAGINATION ---------- */
    const skip = (Number(page) - 1) * Number(limit);

    const totalCars = await Car.countDocuments(query);

    const cars = await Car.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalCars,
      totalPages: Math.ceil(totalCars / limit),
      data: cars,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
GET /cars/:id
Fetch single car by ID
*/
const getCarById = async (req, res) => {
    try {
      const carId = req.params.id;
  
      const car = await Car.findById(carId);
  
      if (!car) {
        return res.status(404).json({
          message: "Car not found",
        });
      }
  
      res.status(200).json(car);
    } catch (error) {
      res.status(400).json({
        message: "Invalid car ID",
      });
    }
  };
  

  module.exports = { getFilteredCars, getCarById };

