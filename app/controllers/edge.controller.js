const db = require("../models");
const Edge = db.edge;
const Op = db.Sequelize.Op;

// Create and Save a new Edge
exports.create = (req, res) => {
  // Validate request
  if (req.body.cost === undefined) {
    const error = new Error("cost number cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.sourcenodeid == undefined){
    const error = new Error("sourcenode Id cannot be empty for order");
    error.statusCode = 400;  
  }else if (req.body.targetnodeid == undefined){
    const error = new Error("targetnode Id cannot be empty for order");
    error.statusCode = 400;  
  } else if (req.body.companyId ===  undefined) {
    const error = new Error("companyId cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create a Edge
  const edge = {
    cost: req.body.cost,
    sourcenodeid: req.body.sourcenodeid,
    targetnodeid: req.body.targetnodeid,
    companyId: req.body.companyId,
  };

  // Save Edge in the database
  Edge.create(edge)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Edge.",
      });
    });
};

// Retrieve all Edges from the database.
exports.findAll = (req, res) => {
    const edgeId = req.query.edgeId;
    const condition = edgeId
      ? {
          id: {
            [Op.like]: `%${edgeId}%`,
          },
        }
      : null;
  
    Edge.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving edges.",
        });
      });
};

// Find a single Edge with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Edge.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Edge with id=${id}`,
      });
    });
};

// Update a Edge by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Edge.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Edge was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Edge with id=${id}. Maybe Edge was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Edge with id=${id}`,
      });
    });
};

// Delete a Edge with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Edge.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Edge was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Edge with id=${id}. Maybe Edge was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete Edge with id=${id}`,
      });
    });
};

// Delete all Edges from the database.
exports.deleteAll = (req, res) => {
  Edge.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} Edge were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all edges.",
      });
    });
};
