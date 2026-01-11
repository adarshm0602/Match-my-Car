const mongoose = require("mongoose");

/* ---------------- ENGINE SCHEMA ---------------- */
const engineSchema = new mongoose.Schema({
  engineCapacity: {
    type: Number, // in cc
  },
  cylinders: Number,
  maxPower: String, // e.g. "115 bhp"
  maxTorque: String, // e.g. "250 Nm"
});

/* ---------------- SAFETY SCHEMA ---------------- */
const safetySchema = new mongoose.Schema({
  airbags: Number,
  abs: Boolean,
  esc: Boolean,
  rearCamera: Boolean,
  globalNCAPRating: {
    type: Number, // 0–5
    min: 0,
    max: 5,
  },
});

/* ---------------- VARIANT SCHEMA ---------------- */
const variantSchema = new mongoose.Schema({
  name: {
    type: String, // Base, Sport, ZX, etc.
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
    required: true,
  },
  mileage: Number,
});

/* ---------------- MAIN CAR SCHEMA ---------------- */
const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      index: true, // IMPORTANT for filtering
    },

    model: {
      type: String,
      required: true,
      index: true,
    },

    bodyType: {
      type: String,
      enum: ["Hatchback", "Sedan", "SUV", "MUV", "Coupe"],
      index: true,
    },

    seatingCapacity: {
      type: Number,
      index: true,
    },

    launchYear: Number,

    engine: engineSchema,

    safety: safetySchema,

    variants: [variantSchema],

    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
