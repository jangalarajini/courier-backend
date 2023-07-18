const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Company number cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.address === undefined) {
    const error = new Error("Address name cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.costPerBlock === undefined) {
    const error = new Error("costPerBlock cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.timePerBlock === undefined) {
    const error = new Error("timePerBlock cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.bonusPercentage === undefined) {
    const error = new Error("bonusPercentage cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.companyId ===  undefined) {
    const error = new Error("companyId cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create a Company
  const company = {
    name: req.body.name,
    address: req.body.address,
    costPerBlock: req.body.costPerBlock,
    timePerBlock: req.body.timePerBlock,
    bonusPercentage: req.body.bonusPercentage,
    companyId: req.body.companyId,
  };

  // Save Customer in the database
  Company.create(company)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company.",
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name
    ? {
        name: {
          [Op.like]: `%${name}%`,
        },
      }
    : null;

  Company.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies.",
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Company with id=${id}`,
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Company with id=${id}`,
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Company was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Compnay with id=${id}. Maybe Company was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Company with id=${id}`,
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} Company were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all companies.",
      });
    });
};
