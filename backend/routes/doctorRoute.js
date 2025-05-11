import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  doctorAppointments,
  doctorList,
  doctorLogin,
  getDoctorDashboard,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/appointments", authDoctor, doctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, getDoctorDashboard);

export default doctorRouter;
