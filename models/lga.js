const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Lga = sequelize.define(
    "Lga",
    {
      // Define the columns of the 'polling_units' table
      uniqueid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      lga_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lga_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lga_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lga_description: {
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
      tableName: "lga", // Name of the table in the database
      timestamps: false, // Include timestamps (createdAt, updatedAt)
    }
  );

  return Lga;
};
