import doctorModel from "../models/doctorModel.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";

const changeAvailablity = async (req, res) => {
  try {

    const { docId } = req.body;

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, {
        available: !docData.available 
    })

    res.status(200).json({
        success: true,
        message: "Doctor availability updated successfully."
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// frontend ke liye doctors ka data fetch krna 

const doctorList = async (req, res) => {

  try {
    
    const doctors = await doctorModel.find({}).select(['-password', '-email'])

    res.status(200).json({
      success: true,
      doctors
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}

// API for doctor login 
const doctorLogin = async (req, res) => {

try {

  const { email, password } = req.body
  const doctor = await doctorModel.findOne({email})

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor not found. Please check your email and password and try again."
    })
  }

  const isMatch = await bcrpyt.compare(password, doctor.password)

  if (isMatch) {
    const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)

    res.status(200).json({
      success: true,
      token,
    })
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials. Please check your email and password."
    })
  }
  
} catch (error) {
  console.log(error);
  res.status(500).json({
      success: false,
      message: error.message,
  });
}

}

export { changeAvailablity, doctorList, doctorLogin }
