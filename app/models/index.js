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
db.path = require("./path.model.js")(sequelize, Sequelize);
db.edge = require("./edge.model.js")(sequelize, Sequelize);
db.node = require("./node.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);

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

// foreign key for user
db.company.hasMany(
  db.user,
  { foreignKey: {name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);
db.user.belongsTo(
  db.company,
  { foreignKey: { name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);


// foreign keys for order
db.company.hasMany(
  db.order,
  { foreignKey: { name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.company,
  { as: "company" },
  { foreignKey: { name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.order, 
  { foreignKey: { name: "courierId", allowNull: true }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.user,
  { as: "courier" },
   { foreignKey: { name: "courierId", allowNull: true }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.order,
   { foreignKey: { name: "clerkId", allowNull: false }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.user, 
  { as: "clerk" },
  { foreignKey: { name: "clerkId", allowNull: false }, onDelete: "CASCADE" }
);

db.customer.hasMany(
  db.order,
   { foreignKey: { name: "pickUpCustomerId", allowNull: false }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.customer, 
  { as: "pickUpCustomer" },
  { foreignKey: { name: "pickUpCustomerId", allowNull: false }, onDelete: "CASCADE" }
);

db.customer.hasMany(
  db.order,
   { foreignKey: { name: "dropOffCustomerId", allowNull: false }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.customer, 
  { as: "dropOffCustomer" },
  { foreignKey: { name: "dropOffCustomerId", allowNull: false }, onDelete: "CASCADE" }
);

db.path.hasOne(
  db.order,
  { foreignKey: { name: "pathId", allowNull: true }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.path,
  { as: "path" },
  { foreignKey: { name: "pathId", allowNull: true }, onDelete: "CASCADE" }
);

// foreign keys for path

db.company.hasMany(
  db.path,
  { foreignKey: {name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);
db.path.belongsTo(
  db.company,
  { foreignKey: {name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);


db.node.hasMany(
  db.path, 
  { foreignKey: { name: "sourceid", allowNull: false }, onDelete: "CASCADE" }
);
db.path.belongsTo(
  db.node,
   { foreignKey: { name: "sourceid", allowNull: false }, onDelete: "CASCADE" }
);

db.node.hasMany(
  db.path,
   { foreignKey: { name: "targetid", allowNull: false }, onDelete: "CASCADE" })
;
db.path.belongsTo(
  db.node,
  { foreignKey: { name: "targetid", allowNull: false }, onDelete: "CASCADE" }
);


// foreign keys for edge

db.company.hasMany(
  db.edge,
  { foreignKey: { name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);
db.edge.belongsTo(
  db.company,
  { foreignKey: { name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);


db.node.hasMany(
  db.edge, 
  { foreignKey: { name: "sourcenodeid", allowNull: false }, onDelete: "CASCADE" }
);
db.edge.belongsTo(
  db.node,
   { foreignKey: { name: "sourcenodeid", allowNull: false }, onDelete: "CASCADE" }
);

db.node.hasMany(
  db.edge,
   { foreignKey: { name: "targetnodeid", allowNull: false }, onDelete: "CASCADE" })
;
db.edge.belongsTo(
  db.node,
  { foreignKey: { name: "targetnodeid", allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for node

db.company.hasMany(
  db.node,
  { foreignKey: { name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);
db.node.belongsTo(
  db.company,
  { foreignKey: { name:"companyId", allowNull: false }, onDelete: "CASCADE" }
);


module.exports = db;
