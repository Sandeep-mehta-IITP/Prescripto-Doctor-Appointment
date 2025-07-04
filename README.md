<h1 align="center"> 🩺 Prescripto </h1>

<p align="center"> Doctor Appointment Booking Platform • Built with MERN Stack</p>

<p align="center">
  <a href="https://imagify-frontend-qope.onrender.com" target="_blank"><strong>🌐 Live Demo</strong></a> |
  <strong>Solo Project</strong> • <strong>Responsive Design</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-informational" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-blue" />
  <img src="https://img.shields.io/badge/Status-Demo%20Mode-yellow" />
  <img src="https://img.shields.io/badge/Made%20By-Sandeep%20Mehta-success" />
</p>
---

## ✨ Overview

**Prescripto** is a complete doctor appointment booking web application that allows patients to search and consult doctors online, make payments, and manage appointments. Doctors can manage their bookings and view revenue. Admins get full control over the platform, from managing doctors to monitoring appointments.

---

## 🔗 Live URLs

- 🧑‍⚕️ **Patient Website:** [https://prescripto-gh4r.onrender.com](https://prescripto-gh4r.onrender.com)
- 🛠️ **Admin Panel:** [https://prescripto-admin-7qhm.onrender.com](https://prescripto-admin-7qhm.onrender.com)

---

## 🚀 Features

### 👨‍👩‍👧‍👦 Patient Panel

- 🔐 **Secure Authentication** (JWT)
- 🩺 **Search Doctors** via filters (specialization, city, availability)
- 📅 **Book Appointments** with real-time date & time slot selection
- 💳 **Online Payments** via Razorpay
- 📜 **View Appointments & Booking History**

### 👨‍⚕️ Doctor Panel

- 📆 View all upcoming appointments
- ❌ Cancel appointments when unavailable
- 💰 Track total revenue generated from consultations
- 🔐 Doctor-specific login system

### 🛠️ Admin Panel

- ➕ **Add / Remove Doctors**
- 🕓 **Update Doctor Availability**
- ❌ **Cancel Appointments**
- 📊 (Future Scope) Analytics & Reports

---

## 💳 Payment Demo (Razorpay – Test Mode)

You can easily test the **payment flow** without using any real card or mobile number. Follow these simple steps:

---

### 1️⃣ Fill Dummy Mobile Number
- Enter this **test mobile number**:  
  **`8635426155`**

---

### 2️⃣ Skip OTP Verification
- Click on "**Skip OTP**" option when prompted.
- If needed, **enter any random 6-digit OTP**, for example:  
  **`123456`** or **`654321`**

---

### 3️⃣ Enter Test Card Details
Use the following dummy card details provided by Razorpay for testing:

| Field              | Value                          |
|--------------------|--------------------------------|
| **Card Number**    | `4386 2894 0766 0153`           |
| **Expiry Date**    | `12/27`                        |
| **CVV**            | `123`                          |
| **Cardholder Name** | (You can write any name)       |

---

> ⚡ **Note:**  
> - This is a **Demo Mode** payment.  
> - **No real transaction** will happen.  
> - Feel free to experiment safely.

---

✅ Now you are ready to **successfully simulate a payment** and experience the full flow of Prescripto!
---

## 📸 Screenshots

> [Upload screenshots for homepage, doctor listing, admin panel, etc.]

---

## 🧰 Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React + Tailwind CSS |
| Backend      | Node.js + Express  |
| Database     | MongoDB            |
| Auth         | JWT + Role-based login |
| Payments     | Razorpay Gateway   |
| Deployment   | Render.com         |

---

## 📂 Folder Structure
prescripto/
├── admin/              # React frontend for Admin & Doctor panel
│   ├── public/         
│   ├── src/            
│   │   ├── assets/     
│   │   ├── components/ 
│   │   ├── context/    
│   │   ├── pages/      
│   │   └── utils/     
│   ├── .env            
│   ├── vite.config.js  
│   ├── package.json    
│   └── ...other config files
│
├── backend/            # Node.js + Express backend API
│   ├── config/         
│   ├── controllers/    
│   ├── middlewares/    
│   ├── models/        
│   ├── routes/        
│   ├── utils/          
│   ├── server.js       
│   ├── package.json    
│   └── .env            
│
├── client/             # React frontend for Patient side
│   ├── public/         
│   ├── src/           
│   │   ├── assets/    
│   │   ├── components/
│   │   ├── context/    
│   │   ├── pages/      
│   │   └── ...other folders/files
│   ├── vite.config.js  
│   ├── package.json    
│   └── README.md       

---

## ⚙️ Local Setup

```bash
# Clone the repo
git clone https://github.com/your-username/prescripto.git
cd prescripto

# Install frontend (patient)
cd client
npm install
npm run dev

# Install backend
cd ../backend
npm install
npm run start

# Install admin panel
cd ../admin
npm install
npm run dev

