/**
 * SEED SCRIPT - Populates the database with sample car data
 * 
 * This script creates sample cars in the database so you can test the API.
 * Run it with: npm run seed
 * 
 * Make sure your .env file has MONGODB_URI set before running!
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("../models/car");

// Load environment variables
dotenv.config();

// Sample car data - Real-world car specifications
const sampleCars = [
  {
    brand: "Toyota",
    model: "Camry",
    bodyType: "Sedan",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 2487,
      cylinders: 4,
      maxPower: "203 bhp",
      maxTorque: "247 Nm",
    },
    safety: {
      airbags: 7,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 5,
    },
    variants: [
      {
        name: "Base",
        price: 3200000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 16.5,
      },
      {
        name: "Hybrid",
        price: 3800000,
        fuelType: "Hybrid",
        transmission: "Automatic",
        mileage: 23.3,
      },
    ],
    images: [
      "https://example.com/toyota-camry-1.jpg",
      "https://example.com/toyota-camry-2.jpg",
    ],
  },
  {
    brand: "Honda",
    model: "City",
    bodyType: "Sedan",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 1498,
      cylinders: 4,
      maxPower: "121 bhp",
      maxTorque: "145 Nm",
    },
    safety: {
      airbags: 6,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 5,
    },
    variants: [
      {
        name: "V",
        price: 1150000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 17.8,
      },
      {
        name: "VX",
        price: 1450000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 17.4,
      },
      {
        name: "ZX",
        price: 1650000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 17.4,
      },
    ],
    images: [
      "https://example.com/honda-city-1.jpg",
      "https://example.com/honda-city-2.jpg",
    ],
  },
  {
    brand: "Maruti Suzuki",
    model: "Swift",
    bodyType: "Hatchback",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 1197,
      cylinders: 4,
      maxPower: "82 bhp",
      maxTorque: "113 Nm",
    },
    safety: {
      airbags: 2,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 2,
    },
    variants: [
      {
        name: "LXI",
        price: 550000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 23.2,
      },
      {
        name: "VXI",
        price: 650000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 23.2,
      },
      {
        name: "ZXI",
        price: 750000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 23.2,
      },
    ],
    images: [
      "https://example.com/maruti-swift-1.jpg",
      "https://example.com/maruti-swift-2.jpg",
    ],
  },
  {
    brand: "Hyundai",
    model: "Creta",
    bodyType: "SUV",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 1497,
      cylinders: 4,
      maxPower: "115 bhp",
      maxTorque: "144 Nm",
    },
    safety: {
      airbags: 6,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 4,
    },
    variants: [
      {
        name: "E",
        price: 1050000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 16.8,
      },
      {
        name: "S",
        price: 1250000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 16.8,
      },
      {
        name: "SX",
        price: 1650000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 16.5,
      },
      {
        name: "SX(O)",
        price: 1950000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 16.5,
      },
    ],
    images: [
      "https://example.com/hyundai-creta-1.jpg",
      "https://example.com/hyundai-creta-2.jpg",
    ],
  },
  {
    brand: "Tata",
    model: "Nexon",
    bodyType: "SUV",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 1199,
      cylinders: 3,
      maxPower: "120 bhp",
      maxTorque: "170 Nm",
    },
    safety: {
      airbags: 6,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 5,
    },
    variants: [
      {
        name: "XE",
        price: 750000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 17.4,
      },
      {
        name: "XM",
        price: 850000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 17.4,
      },
      {
        name: "XZ+",
        price: 1150000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 17.0,
      },
      {
        name: "Electric",
        price: 1450000,
        fuelType: "Electric",
        transmission: "Automatic",
        mileage: 312, // km per charge
      },
    ],
    images: [
      "https://example.com/tata-nexon-1.jpg",
      "https://example.com/tata-nexon-2.jpg",
    ],
  },
  {
    brand: "Mahindra",
    model: "XUV700",
    bodyType: "SUV",
    seatingCapacity: 7,
    launchYear: 2023,
    engine: {
      engineCapacity: 1997,
      cylinders: 4,
      maxPower: "200 bhp",
      maxTorque: "380 Nm",
    },
    safety: {
      airbags: 7,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 5,
    },
    variants: [
      {
        name: "MX",
        price: 1350000,
        fuelType: "Diesel",
        transmission: "Manual",
        mileage: 15.0,
      },
      {
        name: "AX5",
        price: 1850000,
        fuelType: "Diesel",
        transmission: "Automatic",
        mileage: 14.5,
      },
      {
        name: "AX7",
        price: 2250000,
        fuelType: "Diesel",
        transmission: "Automatic",
        mileage: 14.5,
      },
    ],
    images: [
      "https://example.com/mahindra-xuv700-1.jpg",
      "https://example.com/mahindra-xuv700-2.jpg",
    ],
  },
  {
    brand: "Toyota",
    model: "Innova Crysta",
    bodyType: "MUV",
    seatingCapacity: 7,
    launchYear: 2023,
    engine: {
      engineCapacity: 2393,
      cylinders: 4,
      maxPower: "150 bhp",
      maxTorque: "343 Nm",
    },
    safety: {
      airbags: 7,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 4,
    },
    variants: [
      {
        name: "G",
        price: 1850000,
        fuelType: "Diesel",
        transmission: "Manual",
        mileage: 11.4,
      },
      {
        name: "VX",
        price: 2250000,
        fuelType: "Diesel",
        transmission: "Automatic",
        mileage: 11.0,
      },
      {
        name: "ZX",
        price: 2650000,
        fuelType: "Diesel",
        transmission: "Automatic",
        mileage: 11.0,
      },
    ],
    images: [
      "https://example.com/toyota-innova-1.jpg",
      "https://example.com/toyota-innova-2.jpg",
    ],
  },
  {
    brand: "Hyundai",
    model: "i20",
    bodyType: "Hatchback",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 1197,
      cylinders: 4,
      maxPower: "83 bhp",
      maxTorque: "115 Nm",
    },
    safety: {
      airbags: 6,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 4,
    },
    variants: [
      {
        name: "Magna",
        price: 750000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 20.35,
      },
      {
        name: "Sportz",
        price: 850000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 20.35,
      },
      {
        name: "Asta",
        price: 1050000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 20.0,
      },
    ],
    images: [
      "https://example.com/hyundai-i20-1.jpg",
      "https://example.com/hyundai-i20-2.jpg",
    ],
  },
  {
    brand: "Tata",
    model: "Punch",
    bodyType: "SUV",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 1199,
      cylinders: 3,
      maxPower: "86 bhp",
      maxTorque: "113 Nm",
    },
    safety: {
      airbags: 2,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 4,
    },
    variants: [
      {
        name: "Pure",
        price: 600000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 18.8,
      },
      {
        name: "Adventure",
        price: 750000,
        fuelType: "Petrol",
        transmission: "Manual",
        mileage: 18.8,
      },
      {
        name: "Creative",
        price: 850000,
        fuelType: "Petrol",
        transmission: "Automatic",
        mileage: 18.5,
      },
    ],
    images: [
      "https://example.com/tata-punch-1.jpg",
      "https://example.com/tata-punch-2.jpg",
    ],
  },
  {
    brand: "Maruti Suzuki",
    model: "Brezza",
    bodyType: "SUV",
    seatingCapacity: 5,
    launchYear: 2023,
    engine: {
      engineCapacity: 1462,
      cylinders: 4,
      maxPower: "103 bhp",
      maxTorque: "137 Nm",
    },
    safety: {
      airbags: 6,
      abs: true,
      esc: true,
      rearCamera: true,
      globalNCAPRating: 4,
    },
    variants: [
      {
        name: "LDI",
        price: 850000,
        fuelType: "Diesel",
        transmission: "Manual",
        mileage: 24.3,
      },
      {
        name: "VDI",
        price: 1050000,
        fuelType: "Diesel",
        transmission: "Manual",
        mileage: 24.3,
      },
      {
        name: "ZDI+",
        price: 1250000,
        fuelType: "Diesel",
        transmission: "Automatic",
        mileage: 24.0,
      },
    ],
    images: [
      "https://example.com/maruti-brezza-1.jpg",
      "https://example.com/maruti-brezza-2.jpg",
    ],
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing cars (optional - comment out if you want to keep existing data)
    await Car.deleteMany({});
    console.log("🗑️  Cleared existing cars");

    // Insert sample cars
    const createdCars = await Car.insertMany(sampleCars);
    console.log(`✅ Created ${createdCars.length} cars in the database`);

    // Display summary
    console.log("\n📊 Database Summary:");
    const brands = await Car.distinct("brand");
    console.log(`   Brands: ${brands.join(", ")}`);
    console.log(`   Total Cars: ${await Car.countDocuments()}`);

    // Close connection
    await mongoose.connection.close();
    console.log("\n✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
