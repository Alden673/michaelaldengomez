const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    technologies: {
      type: [String],
      default: []
    },

    githubUrl: {
      type: String,
      required: true,
      trim: true
    },

    liveUrl: {
      type: String,
      default: '',
      trim: true
    },

    featured: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);