const express = require('express');
const router = express.Router();
const { getPollingUnits } = require('../controllers/polling_unitcontroller');

// Route to get all polling units in a specific LGA and ward
router.get('/:lga_id/:uniquewardid', getPollingUnits);

module.exports = router;
