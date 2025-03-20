import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js";
import UserRoutes from "./routes/User.js";
import FoodRoutes from "./routes/Food.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", UserRoutes);
app.use("/api/food/", FoodRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ success: false, status, message });
});

// Default route
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello developers from GFG" });
});

// Start the server after connecting to MongoDB Atlas
const startServer = async () => {
  try {
    await dbConnect();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
