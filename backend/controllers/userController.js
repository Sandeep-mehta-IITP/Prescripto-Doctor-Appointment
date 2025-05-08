import validator from "validator";
import { isStrongPassword } from "../utils/passwordStrength.js";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid eamil address.",
      });
    }

    // cheking for user already exist or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists. Please log in or use a different email.",
      });
    }

    // check password strength
    const passwordCheck = isStrongPassword(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({
        success: false,
        message: passwordCheck.message,
      });
    }

    //hashing user  password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "No user found, Please check your email or sign up to create a new account.",
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (isPassMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        token,
        message: "Login successful",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "The provided credentials are incorrect. Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get user profile data
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;

    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully.",
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (phone) updatedFields.phone = phone;
    if (address) {
      try {
        updatedFields.address = JSON.parse(address);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid address format. It should be a JSON string.",
        });
      }
    }
    if (dob) updatedFields.dob = dob;
    if (gender) updatedFields.gender = gender;

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      updatedFields.image = imageUpload.secure_url;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update.",
      });
    }

    await userModel.findByIdAndUpdate(userId, updatedFields);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// API to book appointmet


export { registerUser, loginUser, getUserProfile, updateUserProfile };
