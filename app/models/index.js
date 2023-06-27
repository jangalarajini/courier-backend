const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order = require("./order.model.js")(sequelize,Sequelize);
db.customer = require("./customer.model.js")(sequelize,Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign keys for order
db.user.hasMany(
  db.order, 
  { foreignKey: { name: "courierBoyId", allowNull: false }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.user,
   { foreignKey: { name: "courierBoyId", allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.order,
   { foreignKey: { name: "clerkId", allowNull: false }, onDelete: "CASCADE" })
;
db.order.belongsTo(
  db.user, 
  { foreignKey: { name: "clerkId", allowNull: false }, onDelete: "CASCADE" }
);


db.customer.hasMany(
  db.order,
   { foreignKey: { name: "customerId", allowNull: false }, onDelete: "CASCADE" })
;
db.order.belongsTo(
  db.customer, 
  { foreignKey: { name: "customerId", allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
