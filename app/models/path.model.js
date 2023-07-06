module.exports = (sequelize, Sequelize) => {
    const Path = sequelize.define("path", {
      path :{
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      cost :{
        type: Sequelize.FLOAT,
        allowNull: true,
      }
    });
    return Path;
  };
  
