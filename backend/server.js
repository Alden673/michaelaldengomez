require('dotenv').config({
  path: require('path').join(__dirname, '.env')
});

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const profileRoutes = require('./routes/profile');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');

const app = express();

const port = process.env.PORT || 3000;
const projectRoot = path.resolve(__dirname, '..');

app.use(cors());

app.use(express.json({
  limit: '10kb'
}));

// Serve portfolio frontend
app.use(express.static(projectRoot));

// Reuse MongoDB connection on Vercel
let dbConnectionPromise = null;

async function connectDatabase() {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // Make sure MongoDB URI exists
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  // Create connection only once
  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose.connect(
      process.env.MONGODB_URI
    );
  }

  try {
    await dbConnectionPromise;
  } catch (error) {
    dbConnectionPromise = null;
    throw error;
  }
}

// Connect to MongoDB for API requests
app.use('/api', async (request, response, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error(
      'MongoDB connection failed:',
      error.message
    );

    response.status(503).json({
      error: 'Database connection failed'
    });
  }
});

// Health check
app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    database:
      mongoose.connection.readyState === 1
        ? 'connected'
        : 'disconnected'
  });
});

// API routes
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// Frontend fallback
app.get('*splat', (request, response) => {
  response.sendFile(
    path.join(projectRoot, 'index.html')
  );
});

// Local development server
// Vercel handles the server automatically.
if (!process.env.VERCEL) {
  app.listen(port, '0.0.0.0', () => {
    console.log(
      `Portfolio server running on http://localhost:${port}`
    );
  });
}

// Export Express app for Vercel
module.exports = app;