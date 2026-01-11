const express = require("express");
const {
  getFilteredCars,
  getCarById,
} = require("../controllers/carController");

const router = express.Router();

router.get("/", getFilteredCars);
router.get("/:id", getCarById);

module.exports = router;
