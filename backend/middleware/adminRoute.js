// import jsonwebtoken
import jwt from "jsonwebtoken";
// import usermodel
import User from "../models/usermodel.js";

const adminRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "You are not an admin!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "You are not an admin!" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.email !== "admin@gmail.com") {
      return res.status(401).json({ error: "You are not an admin!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in adminRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default adminRoute;
