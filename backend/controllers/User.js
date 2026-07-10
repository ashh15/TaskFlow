const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      return res.json({
        message: "signup failed",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
}

async function handleUserLogin(req, res) {
  try {
    const {email,password}=req.body;
    const existingUser = await User.findOne({
      email
    });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (isMatch) {
      jwt.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5d" },
        (err, token) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to generate token",
            });
          }

          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000,
          });

          res.status(200).json({
            success: true,
            message: "Login successful",
          });
        },
      );
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
}
async function checkAuth(req, res) {
  return res.json({
    success: true,
  });
}

async function handleUserLogout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
}
module.exports = {
  handleUserSignUp,
  handleUserLogin,
  checkAuth,
  handleUserLogout,
};
