const { saltSize, keySize } = require("../authentication/crypto");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "courier",
    },
    isOccupied: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    salt: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
  });

  return User;
};
