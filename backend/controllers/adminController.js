import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// validating strong password
function isStrongPassword(password) {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one uppercase letter.",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one lowercase letter.",
    };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one digit.",
    };
  }

  if (!/[@$!%*?#&_]/.test(password)) {
    return {
      valid: false,
      message:
        "Password must include at least one special character (@$!%*?#&_).",
    };
  }

  return { valid: true, message: "Password is strong." };
}

// Api for  adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;
    const imageFile = req.file;

    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    // Check for all required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address, Please enter a valid email id.",
      });
    }

    // Check password strength
    const passwordCheck = isStrongPassword(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({
        success: false,
        message: passwordCheck.message,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check for image
    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // Upload image to Cloudinary
    console.log("Uploading to Cloudinary...");
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    console.log("Cloudinary Response:", imageUpload);
    const imageUrl = imageUpload.secure_url;

    // Parse address
    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: parsedAddress,
      date: Date.now(),
    };

    console.log("Saving doctor data:", doctorData);
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.error("Error in addDoctor:", error.stack); // Log full error stack
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API for the Admin Login
const adminLogin = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {

      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.status(200).json({
        success: true,
        token
      })

    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please check your email and password.",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export { addDoctor, adminLogin };
