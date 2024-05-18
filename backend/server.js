// import all npm file
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// app
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// import MongoConnect
import MongoConnect from "./database/MongoConnect.js";

// import all coding file
import AuthRoutes from "./routes/AuthRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";

// server setup
const PORT = process.env.PORT || 5000;
dotenv.config();

// setup
app.use(express.json());
app.use(cookieParser());
app.use("/public/images", express.static("public/images"));

// api
app.use("/api/auth", AuthRoutes);
app.use("/api/product", ProductRoutes);

// server listen
app.listen(PORT, () => {
  MongoConnect();
  console.log(`Server Running On Port ${PORT}`);
});
