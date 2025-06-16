const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Simple in-memory user store (replace with MongoDB in production)
const users = [
  {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'test1234',
    createdAt: new Date().toISOString()
  }
];

// Create a router for API routes
const apiRouter = express.Router();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
      'https://job-portal-frontend-orcin.vercel.app',
      'https://job-portal-frontend-orcin.vercel.app/api'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn('Blocked request from origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-auth-token',
    'x-requested-with',
    'accept',
    'origin'
  ],
  exposedHeaders: ['x-auth-token'],
  optionsSuccessStatus: 200
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`\n=== New Request ===`);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Path:', req.path);
  console.log('Base URL:', req.baseUrl);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// Log all registered routes
const printRoutes = () => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
      routes.push(`${methods.padEnd(7)} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Routes added as router
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          const methods = Object.keys(route.methods).join(',').toUpperCase();
          routes.push(`${methods.padEnd(7)} ${route.path}`);
        }
      });
    }
  });
  console.log('\n=== Registered Routes ===');
  console.log(routes.join('\n'));
  console.log('=========================\n');
};

// Print routes when server starts
app.on('listening', printRoutes);

// API Routes
apiRouter.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to the Job Portal API',
    endpoints: [
      'POST /api/users/register',
      'POST /api/users/login',
      'GET /api/users/me',
      'GET /api/health'
    ]
  });
});

// Health check
apiRouter.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// User registration
apiRouter.post('/users/register', async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    const { firstName, lastName, email, password } = req.body;
    
    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // In a real app, you would hash the password here
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password, // In production, hash this password!
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    console.log('New user registered:', { ...newUser, password: '[HIDDEN]' });
    
    // Don't send password back in response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now()
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// User login
apiRouter.post('/users/login', (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = users.find(u => u.email === email);
    
    // In a real app, you would verify the hashed password
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // In a real app, you would generate a JWT token here
    const token = 'mock-jwt-token-' + Date.now();
    
    // Don't send password back in response
    const { password: _, ...userWithoutPassword } = user;
    
    console.log('User logged in:', { email, token });
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user profile
apiRouter.get('/users/me', (req, res) => {
  console.log('\n=== /api/users/me Handler ===');
  console.log('Request URL:', req.originalUrl);
  console.log('Request path:', req.path);
  console.log('Request base URL:', req.baseUrl);
  console.log('Incoming request to /api/users/me');
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  try {
    console.log('Get user profile headers:', req.headers);
    
    // Get token from headers
    const token = req.headers['x-auth-token'] || 
                 (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
                  ? req.headers.authorization.split(' ')[1] 
                  : null);
    
    console.log('Extracted token:', token);
    
    if (!token) {
      console.log('No token provided in headers');
      return res.status(401).json({ 
        success: false,
        error: 'No token, authorization denied' 
      });
    }
    
    console.log('Token received:', token);
    
    // In a real app, decode the token and get the user from the database
    // This is just a mock implementation
    const user = users[0]; // Get first user for demo
    
    if (!user) {
      console.log('No users found');
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Don't send password back in response
    const { password, ...userWithoutPassword } = user;
    console.log('Returning user profile:', userWithoutPassword);
    
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error('Error in /api/users/me:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mount the API router at /api
app.use('/api', apiRouter);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  console.log('\n=== 404 Handler ===');
  console.log(`[${new Date().toISOString()}] 404 - ${req.method} ${req.originalUrl} not found`);
  console.log('Request path:', req.path);
  console.log('Request base URL:', req.baseUrl);
  console.log('Request params:', req.params);
  console.log('Request query:', req.query);
  res.status(404).json({ 
    success: false,
    error: 'API endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Job Portal Backend</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #4a6cf7;
          }
          .status {
            color: #10b981;
            font-weight: bold;
          }
          .endpoints {
            margin-top: 2rem;
            text-align: left;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Job Portal Backend</h1>
          <p class="status">✅ Backend is running successfully!</p>
          <div class="endpoints">
            <p>Available endpoints:</p>
            <ul>
              <li>POST <code>/api/users/register</code> - Register a new user</li>
              <li>POST <code>/api/users/login</code> - User login</li>
              <li>GET <code>/api/users/me</code> - Get current user profile</li>
              <li>GET <code>/api/health</code> - Health check</li>
            </ul>
          </div>
          <p>Server time: ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS allowed origin: ${process.env.FRONTEND_URL || '*'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Export for Vercel
module.exports = app;
