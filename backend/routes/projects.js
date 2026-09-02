const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Get all projects
router.get('/', async (request, response) => {
  try {
    const projects = await Project.find()
      .sort({ featured: -1, createdAt: -1 });

    response.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    response.status(500).json({
      error: 'Failed to fetch projects'
    });
  }
});

// Add a project
router.post('/', async (request, response) => {
  try {
    const {
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      featured
    } = request.body || {};

    if (!title || !description || !githubUrl) {
      return response.status(400).json({
        error: 'title, description, and githubUrl are required'
      });
    }

    const project = await Project.create({
      title: String(title).trim(),
      description: String(description).trim(),
      technologies: Array.isArray(technologies) ? technologies : [],
      githubUrl: String(githubUrl).trim(),
      liveUrl: liveUrl ? String(liveUrl).trim() : '',
      featured: featured !== false
    });

    response.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error.message);

    response.status(500).json({
      error: 'Failed to create project'
    });
  }
});

module.exports = router;