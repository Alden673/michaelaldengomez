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
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected successfully');

    app.listen(port, () => {
      console.log(
        `Portfolio server running at http://localhost:${port}`
      );
    });
  } catch (error) {
    console.error(
      'MongoDB connection failed:',
      error.message
    );

    process.exit(1);
  }
}

startServer();