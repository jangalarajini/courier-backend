module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costPerBlock: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      timePerBlock: {
        type: Sequelize.FLOAT,
      },
      bonusPercentage: {
        type: Sequelize.FLOAT,
      },
    });
    return Company;
  };
  
