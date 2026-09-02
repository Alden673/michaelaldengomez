const express = require('express');
const profile = require('../models/profile');

const router = express.Router();

router.get('/', (request, response) => {
  response.json(profile);
});

router.get('/certifications', (request, response) => {
  response.json(profile.certifications);
});

module.exports = router;
