const db = require("../models");
const Path = db.path;
const Op = db.Sequelize.Op;

// Create and Save a new Edge
exports.create = (req, res) => {
  // Validate request
  if (req.body.cost === undefined) {
    const error = new Error("cost number cannot be empty!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.path === undefined){
    const error = new Error("path cannot be empty");
    error.statusCode = 400;
    throw error;
  } else if (req.body.sourceid == undefined){
    const error = new Error("source Id cannot be empty for order");
    error.statusCode = 400;  
  }else if (req.body.targetid == undefined){
    const error = new Error("target Id cannot be empty for order");
    error.statusCode = 400;  
  } else if (req.body.companyId ===  undefined) {
    const error = new Error("companyId cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create a Edge
  const path = {
    path: req.body.path,
    cost: req.body.cost,
    sourceid: req.body.sourceid,
    targetid: req.body.targetid,
    companyId: req.body.companyId,
  };

  // Save Edge in the database
  Path.create(path)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Path.",
      });
    });
};

// Retrieve all Edges from the database.
exports.findAll = (req, res) => {
    const pathId = req.query.pathId;
    const condition = pathId
      ? {
          id: {
            [Op.like]: `%${pathId}%`,
          },
        }
      : null;
  
    Path.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving paths.",
        });
      });
};

// Find a single Edge with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Path.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Path with id=${id}`,
      });
    });
};

// Update a Edge by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Path.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Path was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Path with id=${id}. Maybe Path was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Path with id=${id}`,
      });
    });
};

// Delete a Edge with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Path.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Path was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete path with id=${id}. Maybe Path was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete path with id=${id}`,
      });
    });
};

// Delete all Edges from the database.
exports.deleteAll = (req, res) => {
  Path.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} Path were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all paths.",
      });
    });
};
