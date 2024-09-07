const express = require('express');
const router = express.Router();
const { viewlgresultbasedonpu } = require('../controllers/lgaresulscontroller');

// Route to get all wards in a specific LGA with optional search
router.get('/:lga_id', viewlgresultbasedonpu); // '?' makes `searchitem` optional


module.exports = router;
