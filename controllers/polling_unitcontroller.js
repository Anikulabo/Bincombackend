// Import the db object from your models folder
const { where } = require("sequelize");
const db = require("../models");

// Access a specific model from the db object
const Polling_unit = db.Polling_unit; // or db['Polling_unit']
// Example function to fetch data using the model
const getPollingUnits = async (req, res) => {
  const { lga_id, uniquewardid } = req.params;
  try {
    const results = await Polling_unit.findAll({
      where: { lga_id, uniquewardid },
      attributes: ["uniqueid",'polling_unit_name'],
    });
    if (results.length > 0) {
      return res.status(200).json({ data: results }); // Use 200 OK for successful data retrieval
    } else {
      return res
        .status(404)
        .json({ message: "No polling unit matches your description" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "There was an error in connection" });
  }
};

module.exports = {
  getPollingUnits,
};
