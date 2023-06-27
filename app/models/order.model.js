module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      bill: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      orderType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      startAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      bonus: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });
    
    return Order;
  };
  
