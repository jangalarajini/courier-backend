const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
 if (req.body.orderType === undefined) {
    const error = new Error("Order type cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.clerkId === undefined) {
    const error = new Error("Clerk Id cannot be empty for order");
    error.statusCode = 400;
    throw error;
  } else if (req.body.customerId == undefined){
    const error = new Error("customer Id cannot be empty for order");
    error.statusCode = 400;  
  }else if (req.body.courierBoyId == undefined){
    const error = new Error("courierBoy Id cannot be empty for order");
    error.statusCode = 400;  
  }else if(req.body.pathId == undefined){
   const error = new Error("pathId cannot be empty for order");
   error.statusCode = 400;
 }
  // Create an Order
  const order = {
    bill: req.body.bill,
    orderType: req.body.orderType,
    estimatedTime: req.body.estimatedTime,
    startAddress: req.body.startAddress,
    status: req.body.status,
    bonus: req.body.bonus,
    clerkId : req.body.clerkId,
    customerId : req.body.customerId,
    courierBoyId : req.body.courierBoyId,
    pathId : req.body.pathId,
  };

  // Save Order in the database
  Order.create(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const orderId = req.query.orderId;
  const condition = orderId
    ? {
        id: {
          [Op.like]: `%${orderId}%`,
        },
      }
    : null;

  Order.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Order with id=${id}`,
      });
    });
};

// Update an Order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Order with id=${id}`,
      });
    });
};

// Delete an Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Order with id=${id}`,
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} Orders were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders.",
      });
    });
};
