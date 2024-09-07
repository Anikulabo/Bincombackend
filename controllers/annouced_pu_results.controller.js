// Import the db object from your models folder
const db = require("../models");
const { format } = require("date-fns");

// Access a specific model from the db object
// Import the db object from your models folder

// Access a specific model from the db object
const Announced_pu_results = db.announced_pu_results; // Ensure this matches the model name exactly

// Function to fetch data using the model

// Function to fetch data using the model
/*const getlgaresult=(req,res)=>{

}*/
const getPollingUnitResults = async (req, res) => {
  const { polling_unit_uniqueid } = req.params;
  try {
    const results = await Announced_pu_results.findAll({
      where: { polling_unit_uniqueid },
      attributes: ["party_abbreviation", "party_score", "entered_by_user"],
    });
    if (results.length > 0) {
      return res.status(200).json({ data: results }); // Use 200 OK for successful data retrieval
    } else {
      return res.status(404).json({
        message: "There is currently no result for the polling unit chosen",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "There was an error in connection" });
  }
};

// Function to add polling results
const addpollingResults = async (req, res) => {
  const {
    entered_by_user,
    polling_unit_uniqueid, // This should remain a string
    party_abbreviation,
    party_score,
  } = req.body;

  try {
    const time = new Date();
    const date_entered = format(time, "yyyy-MM-dd HH:mm:ss");
    const user_ip_address = req.ip;

    // Ensure party_score is parsed as an integer

    console.log("Received party_score:", entered_by_user);
    const submitted_party_score = parseInt(party_score, 10);
    console.log("Parsed party_score:", submitted_party_score);

    await Announced_pu_results.create({
      polling_unit_uniqueid: polling_unit_uniqueid, // Corrected field name
      party_abbreviation: party_abbreviation,
      party_score: submitted_party_score,
      entered_by_user: entered_by_user,
      date_entered: date_entered,
      user_ip_address: user_ip_address,
    });

    return res.status(201).json({ message: "Score added successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPollingUnitResults,
  addpollingResults,
};
