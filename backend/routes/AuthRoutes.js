// import express
import express from "express";
// import middleware
import protectedRoute from "../middleware/protectedRoute.js";
// import all controller file
import { signup, login, logout } from "../controllers/authcontroller.js";

// router setup
const router = express.Router();

// router api
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectedRoute, logout);

export default router;
