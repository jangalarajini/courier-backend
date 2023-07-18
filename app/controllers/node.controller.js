const db = require("../models");
const Node = db.node;
const Op = db.Sequelize.Op;

// Create and Save a new Edge
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("name  cannot be empty!");
    error.statusCode = 400;
    throw error;
  }  else if (req.body.companyId ===  undefined) {
    const error = new Error("companyId cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create a Edge
  const node = {
    name: req.body.name,
    companyId: req.body.companyId,
  };

  // Save Edge in the database
  Node.create(node)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Node.",
      });
    });
};

// Retrieve all Edges from the database.
exports.findAll = (req, res) => {
    const nodeId = req.query.nodeId;
    const condition = nodeId
      ? {
          id: {
            [Op.like]: `%${nodeId}%`,
          },
        }
      : null;
  
    Node.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving nodes.",
        });
      });
};

// Find a single Edge with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Node.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Node with id=${id}`,
      });
    });
};

// Update a Edge by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Node.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Node was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Node with id=${id}. Maybe Node was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Node with id=${id}`,
      });
    });
};

// Delete a Edge with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Node.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Node was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Node with id=${id}. Maybe Node was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Node with id=${id}`,
      });
    });
};

// Delete all Edges from the database.
exports.deleteAll = (req, res) => {
  Node.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} Node were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all nodes.",
      });
    });
};
