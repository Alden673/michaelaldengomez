require('dotenv').config();

const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: 'Instagram Business Intelligence',
    description:
      'AI-powered Instagram analytics and content strategy assistant that analyzes post performance, engagement, reach, content trends, and generates evidence-based strategy insights.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express',
      'Google Gemini',
      'Google ADK',
      'RAG'
    ],
    githubUrl:
      'https://github.com/Alden673/Instagram-Business-Intelligence',
    liveUrl: '',
    featured: true
  },

  {
    title: 'Python Weather App',
    description:
      'A command-line weather application that fetches real-time weather information for cities around the world using the OpenWeatherMap API.',
    technologies: [
      'Python',
      'Requests',
      'OpenWeatherMap API'
    ],
    githubUrl:
      'https://github.com/Alden673/python-weather-app',
    liveUrl: '',
    featured: true
  }
];

async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');

    for (const project of projects) {
      await Project.findOneAndUpdate(
        { githubUrl: project.githubUrl },
        project,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }
      );

      console.log(`Added/updated: ${project.title}`);
    }

    console.log('Projects seeded successfully');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seedProjects();