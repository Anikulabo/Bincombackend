const express = require('express');
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const {
  getPollingUnitResults,
  addpollingResults
} = require('../controllers/annouced_pu_results.controller');

// Route to get announced polling unit results by unique ID
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/puresults/:polling_unit_uniqueid', getPollingUnitResults);

// Route to add polling results
router.post('/puresults',upload.none(), addpollingResults);

module.exports = router;
