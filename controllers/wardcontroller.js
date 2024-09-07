const db = require("../models");
const { Op } = require("sequelize");
const { Ward } = db;

// Function to fetch data with conditional pagination
const getAllWardInLga = async (req, res) => {
  const { lga_id, searchitem } = req.params;
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit, 10) || 25; // Default to 25 items per page if not provided
  const offset = (page - 1) * limit; // Calculate the offset

  if (page <= 0 || limit <= 0) {
    return res.status(400).json({ message: "Invalid page or limit value" });
  }

  try {
    // Build the query condition
    const queryCondition = { lga_id };
    if (searchitem) {
      queryCondition.ward_name = { [Op.like]: `%${searchitem}%` }; // Adjust field for search
    }

    // First, get the total count of results
    const totalCount = await Ward.count({ where: queryCondition });

    // Fetch results with or without pagination
    const results = totalCount > 25
      ? await Ward.findAll({
          where: queryCondition,
          attributes: ["uniqueid", "ward_name", "ward_description"],
          limit,
          offset,
        })
      : await Ward.findAll({
          where: queryCondition,
          attributes: ["uniqueid", "ward_name", "ward_description"],
        });

    return res.status(200).json({
      data: results,
      pagination: {
        totalItems: totalCount,
        totalPages: totalCount > 25 ? Math.ceil(totalCount / limit) : 1,
        currentPage: page,
        pageSize: results.length,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "There was an error in connection" });
  }
};

module.exports = {
  getAllWardInLga,
};
