module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      customerNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerName: {
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
  
