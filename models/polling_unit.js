const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Polling_unit = sequelize.define(
    "Polling_unit",
    {
      // Define the columns of the 'polling_units' table
      uniqueid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      polling_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ward_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lga_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      uniquewardid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      polling_unit_number: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      polling_unit_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      polling_unit_description: {
        type: DataTypes.STRING(100), 
        allowNull: true,
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      long: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entered_by_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_entered: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      user_ip_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // Other model options
      tableName: "polling_unit", // Name of the table in the database
      timestamps: false, // Include timestamps (createdAt, updatedAt)
    }
  );

  return Polling_unit;
};
