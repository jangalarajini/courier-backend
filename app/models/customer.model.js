module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryInstructions: {
        type: Sequelize.STRING,
      },
    });
  
    return Customer;
  };
  
