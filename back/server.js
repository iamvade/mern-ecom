import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";

config();
connectDB();
const app = express();

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.nextTick.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
