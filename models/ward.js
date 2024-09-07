const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Ward = sequelize.define(
    "Ward",
    {
      // Define the columns of the 'polling_units' table
      uniqueid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ward_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ward_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lga_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ward_description: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      entered_by_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_entered: {
        type: DataTypes.DATE, 
        allowNull: false,
      },
      user_ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options
      tableName: "ward", // Name of the table in the database
      timestamps: false, // Include timestamps (createdAt, updatedAt)
    }
  );

  return Ward;
};
