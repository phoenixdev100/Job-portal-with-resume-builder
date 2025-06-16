const express = require('express');
const app = express();

// Root route
app.get('/', (req, res) => {
  const html = `
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
              <li>GET <code>/api/health</code> - Health check</li>
              <li>GET <code>/api/test</code> - Test endpoint</li>
            </ul>
          </div>
          <p>Deployed on Vercel at ${new Date().toLocaleString()}</p>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export the app for Vercel
module.exports = app;
