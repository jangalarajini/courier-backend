module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      bill: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bonus: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });
    
    return Order;
  };
  
