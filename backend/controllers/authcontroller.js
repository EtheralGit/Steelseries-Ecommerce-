// import bcrypt
import bcrypt from "bcryptjs";
// import mongoose model
import User from "../models/usermodel.js";
// import jsonwebtoken
import { GenerateToken } from "../utils/GenerateTokenAndCookie.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // all mongodb error
    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    }
    if (username.length > 28) {
      return res
        .status(400)
        .json({ error: "Username must be less than 28 characters" });
    }

    if (password.length < 3) {
      return res
        .status(400)
        .json({ error: "Password must be at least 3 characters" });
    }
    if (password.length > 28) {
      return res
        .status(400)
        .json({ error: "Password must be less than 28 characters" });
    }

    // check if the password is match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }

    // check if email || username already exists
    const user = await User.findOne({ username });
    const Email = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Username already exists!" });
    }
    if (Email) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // presave signup data
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const isEmailValid = await User.findOne({ email });
    if (isEmailValid) {
      const isPasswordValid = await bcrypt.compare(
        password,
        isEmailValid?.password || ""
      );

      if (isPasswordValid) {
        // Generate JWT Token and Set Cookies
        GenerateToken(isEmailValid._id, res);

        res.status(200).json({
          _id: isEmailValid._id,
          username: isEmailValid.username,
          email: isEmailValid.email,
          profilePic: isEmailValid.profilePic,
        });
      } else {
        return res.status(400).json({ error: "Invalid email or password" });
      }
    } else {
      return res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("Error in logout controller :", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
