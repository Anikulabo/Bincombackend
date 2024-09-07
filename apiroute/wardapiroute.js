const express = require('express');
const router = express.Router();
const { getAllWardInLga } = require('../controllers/wardcontroller');

// Route to get all wards in a specific LGA with optional search
router.get('/:lga_id/:searchitem?', getAllWardInLga); // '?' makes `searchitem` optional


module.exports = router;
