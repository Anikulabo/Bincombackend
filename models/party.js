const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Party = sequelize.define(
    "Party", // Sequelize model name
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      partyid: {
        type: DataTypes.STRING(4), // The party ID limited to 4 characters
        allowNull: false,
      },
      partyname: {
        type: DataTypes.STRING(4), // The party name limited to 4 characters
        allowNull: false,
      },
    },
    {
      tableName: "party", // The table name in the database
      timestamps: false, // No `createdAt` and `updatedAt` fields
    }
  );

  return Party;
};
