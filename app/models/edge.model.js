module.exports = (sequelize, Sequelize) => {
  const Edge = sequelize.define("edge", {
    cost: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });

  return Edge;
};
