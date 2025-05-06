import express from 'express';
import { addDoctor, adminLogin, checkEmail } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', adminLogin);
adminRouter.post('/check-email', checkEmail);


export default adminRouter;


//localhost:4000/api/admin/add-doctor