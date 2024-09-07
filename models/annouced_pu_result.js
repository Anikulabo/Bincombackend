const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Announced_pu_results = sequelize.define(
    "announced_pu_results",
    {
      result_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      polling_unit_uniqueid: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      party_abbreviation: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      party_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, entered_by_user: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      date_entered: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_ip_address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    },
    {
      tableName: "announced_pu_results",
      timestamps: false,
    }
  );

  return Announced_pu_results;
};
