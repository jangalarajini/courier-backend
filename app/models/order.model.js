module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      bill: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      estimatedDropOffTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estimatedPickUpTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estimatedStartTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      requestedPickUpTime: {
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
      actualDropOffTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      actualStartTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      actualPickUpTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    
    return Order;
  };
  
