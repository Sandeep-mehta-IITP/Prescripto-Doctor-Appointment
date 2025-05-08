import express from "express";
import { bookAppointment, getUserProfile, loginUser, registerUser, updateUserProfile } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getUserProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateUserProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)

export default userRouter;