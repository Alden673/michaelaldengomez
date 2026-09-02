const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    const { name, email, message } = request.body || {};

    if (!name || !email || !message) {
      return response.status(400).json({
        error: 'name, email, and message are required'
      });
    }

    const contactMessage = new Contact({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim()
    });

    if (!contactMessage.name || !contactMessage.email || !contactMessage.message) {
      return response.status(400).json({
        error: 'Fields cannot be empty'
      });
    }

    const savedMessage = await contactMessage.save();

    return response.status(201).json({
      message: 'Your message was received',
      id: savedMessage._id
    });

  } catch (error) {
    console.error('Contact message error:', error);

    return response.status(500).json({
      error: 'Failed to save your message'
    });
  }
});

module.exports = router;