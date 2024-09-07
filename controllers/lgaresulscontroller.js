const db = require("../models");
const { Polling_unit, Party, announced_pu_results } = db;
const { sequelize } = require("../models");

exports.viewlgresultbasedonpu = (req, res) => {
  const { lga_id } = req.params;

  sequelize.transaction().then(async (transaction) => {
    try {
      const mainresult = [];

      // Fetch all parties
      const allparties = await Party.findAll({
        transaction,
        attributes: ["partyid"],
      });

      if (allparties.length === 0) {
        throw new Error("No parties found");
      }

      // Fetch all polling units under the given LGA
      const polling_units = await Polling_unit.findAll({
        where: { lga_id },
        attributes: ["uniqueid"],
        transaction,
      });

      if (polling_units.length === 0) {
        throw new Error("No polling units found for the given LGA");
      }

      // Process each party and polling unit
      const votePromises = allparties.map((party) =>
        Promise.all(
          polling_units.map(async (pu) => {
            const result = await announced_pu_results.findOne({
              where: {
                polling_unit_uniqueid: pu.uniqueid,
                party_abbreviation: party.partyid,
              },
              attributes: ["party_score"],
              transaction,
            });

            const partyScore = result ? parseInt(result.party_score, 10) : 0;
            const existingEntry = mainresult.find(
              (item) => item.party === party.partyid
            );

            if (existingEntry) {
              existingEntry.score += partyScore;
            } else {
              mainresult.push({ party: party.partyid, score: partyScore });
            }
          })
        )
      );

      await Promise.all(votePromises);

      // Commit the transaction
      await transaction.commit();
      console.log(mainresult);
      res.status(200).json({ data: mainresult });
    } catch (error) {
      await transaction.rollback();
      console.error("Error:", error.message);
      if (
        error.message.includes("No parties") ||
        error.message.includes("No polling units")
      ) {
        res.status(404).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Internal server error during transaction" });
      }
    }
  });
};
