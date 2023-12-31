const db = require("../models");
const Customer = db.customer;
const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (req.body.number === undefined) {
    const error = new Error("Customer number cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.name === undefined) {
    const error = new Error("Customer name cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.location === undefined) {
    const error = new Error("Location cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.deliveryInstructions === undefined) {
    const error = new Error("Delivery Instructions cannot be empty!");
    error.statusCode = 400;
    throw error;
  }  else if (req.body.companyId ===  undefined) {
    const error = new Error("companyId cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create a Customer
  const customer = {
    number: req.body.number,
    name: req.body.name,
    location: req.body.location,
    deliveryInstructions: req.body.deliveryInstructions,
    companyId: req.body.companyId,
  };

  // Save Customer in the database
  Customer.create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const number = req.query.number;
  const condition = number
    ? {
        number: {
          [Op.like]: `%${number}%`,
        },
      }
    : null;

  Customer.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Customer with id=${id}`,
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Customer with id=${id}`,
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Customer with id=${id}`,
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} Customers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    });
};
