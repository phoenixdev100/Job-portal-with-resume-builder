<div align="center">

# 🚀 Job Portal Application

</div>

<div align="center">

![Job Portal](https://img.shields.io/badge/Job-Portal-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-purple)

</div>

<div align="center">

## 📋 **Overview**

</div>

A modern job portal application that connects job seekers with employers. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with TailwindCSS.

<div align="center">

## ✨ **Features**

</div>

- 🔐 **User Authentication**
  - Secure login and registration
  - Role-based access (Job Seekers & Employers)
  - JWT authentication

- 👥 **Job Seeker Features**
  - Profile creation and management
  - Job search and filtering
  - Application tracking
  - Resume upload and management

- 💼 **Employer Features**
  - Company profile management
  - Job posting and management
  - Applicant tracking
  - Candidate screening

- 🔍 **Search & Filter**
  - Advanced job search
  - Location-based filtering
  - Category-wise filtering
  - Salary range filtering

<div align="center">

## 🛠️ **Tech Stack**

</div>

### Frontend
- React.js
- TailwindCSS
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File Upload)

<div align="center">

## 🚀 **Getting Started**

</div>

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/phoenixdev100/job-portal-with-resume-builder.git
   cd job-portal-with-resume-builder
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Setup**
   - Create `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the Application**
   ```bash
   # Start Backend Server
   cd server
   npm start

   # Start Frontend Development Server
   cd client
   npm start
   ```

<div align="center">

## 📁 **Project Structure**

</div>

```
job-portal/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
│
└── server/                # Backend Node.js application
    ├── routes/           # API routes
    ├── models/           # Database models
    ├── middleware/       # Custom middleware
    └── uploads/          # File uploads
```

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Authors**

- Your Name - [Deepak](https://phoenixdev100.tech)

## 🙏 **Acknowledgments**

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community

---

<div align="center">

Made with ❤️ by Deepak

</div>
