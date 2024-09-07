const express = require('express');
const router = express.Router();
const { getAllLgaInState } = require('../controllers/lgacontroller');

// Route to get all LGAs in a state
router.get('/state/:state_id', getAllLgaInState);

module.exports = router;
