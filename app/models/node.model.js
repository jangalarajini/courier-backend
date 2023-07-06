module.exports = (sequelize, Sequelize) => {
    const Node = sequelize.define("node", {
      name :{
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Node;
  };
  
