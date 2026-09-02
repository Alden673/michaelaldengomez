require('dotenv').config();

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

// Connect MongoDB and start server
async function startServer() {
  try {
    console.log('Starting portfolio server...');
    console.log(
      'MONGODB_URI exists:',
      Boolean(process.env.MONGODB_URI)
    );
    console.log('PORT:', port);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected successfully');

    app.listen(port, '0.0.0.0', () => {
      console.log(
        `Portfolio server running on port ${port}`
      );
    });
  } catch (error) {
    console.error('MongoDB connection failed!');
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    console.error('Error stack:', error.stack);

    process.exit(1);
  }
}

startServer();