const db = require("../models");

// Access the Lga model from the db object
const { Lga } = db;

// Function to fetch data with conditional pagination
const getAllLgaInState = async (req, res) => {
  const { state_id } = req.params;
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit, 10) || 25; // Default to 25 items per page if not provided
  const offset = (page - 1) * limit; // Calculate the offset

  try {
    // First, get the total count of results
    const totalCount = await Lga.count({ where: { state_id } });

    // Determine if pagination is needed
    if (totalCount > 25) {
      // If there are more than 25 items, apply pagination
      const { rows } = await Lga.findAll({
        where: { state_id },
        attributes: ["uniqueid", "lga_name", "lga_description"],
        limit,
        offset,
      });

      return res.status(200).json({
        data: rows,
        pagination: {
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          pageSize: limit,
        },
      });
    } else {
      // If there are 25 or fewer items, return all results
      const results = await Lga.findAll({
        where: { state_id },
        attributes: ["lga_id", "lga_name", "lga_description"],
      });

      return res.status(200).json({
        data: results,
        pagination: {
          totalItems: totalCount,
          totalPages: 1, // Only one page if less than or equal to 25 items
          currentPage: 1,
          pageSize: totalCount,
        },
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "There was an error in connection" });
  }
};

module.exports = {
  getAllLgaInState,
};
