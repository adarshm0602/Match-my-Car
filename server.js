const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

const app = express();

app.use(express.json());

const carRoutes = require("./routes/carRoutes");
app.use("/cars", carRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

