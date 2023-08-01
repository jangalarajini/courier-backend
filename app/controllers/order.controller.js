const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;
const User = db.user;
const Customer = db.customer;
const Path = db.path;
const { Sequelize } = require("sequelize");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (req.body.pickUpCustomerId == undefined) {
    const error = new Error("pick up customer Id cannot be empty for order");
    error.statusCode = 400;
  } else if (req.body.dropOffCustomerId == undefined) {
    const error = new Error("drop off customer Id cannot be empty for order");
    error.statusCode = 400;
  } else if (req.body.companyId === undefined) {
    const error = new Error("companyId cannot be empty");
    error.statusCode = 400;
    throw error;
  }
  // Create an Order
  const order = {
    bill: req.body.bill,
    estimatedDropOffTime: req.body.estimatedDropOffTime,
    estimatedPickUpTime: req.body.estimatedPickUpTime,
    estimatedStartTime: req.body.estimatedStartTime,
    requestedPickUpTime: req.body.requestedPickUpTime,
    actualDropOffTime: req.body.actualDropOffTime,
    actualStartTime: req.body.actualStartTime,
    actualPickUpTime: req.body.actualPickUpTime,
    status: req.body.status,
    bonus: req.body.bonus,
    clerkId: req.body.clerkId,
    adminId: req.body.adminId,
    pickUpCustomerId: req.body.pickUpCustomerId,
    dropOffCustomerId: req.body.dropOffCustomerId,
    courierId: req.body.courierId,
    officeToPickUpCustomerPathId: req.body.officeToPickUpCustomerPathId,
    pickUpCustomerToDropOffCustomerPathId: req.body.pickUpCustomerToDropOffCustomerPathId,
    dropOffCustomerToOfficePathId: req.body.dropOffCustomerToOfficePathId,
    companyId: req.body.companyId,
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

// Find all Orders for a user
exports.findAllForCustomer = (req, res) => {
  const customerId = req.params.customerId;
  const status = 'Delivered';
  const condition = {
    status: status,
  };
  Order.findAll({
    where: condition,
    include: [
      {
        model: Customer,
        as: 'pickUpCustomer',
        where: { id: customerId }
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "clerk",
        required: false,
      },
      {
        model: User,
        as: "courier",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
    order: [
      ["createdAt", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Orders for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Orders for user with id=" + userId,
      });
    });
};

// Find all Orders for a cusatomer
exports.findAllForClerk = (req, res) => {
  const clerkId = req.params.clerkId;
  Order.findAll({
    include: [
      {
        model: User,
        as: 'clerk',
        where: { id: clerkId }
      },
      {
        model: Customer,
        as: "pickUpCustomer",
        required: true,
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "courier",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
    order: [
      [Sequelize.literal(`CASE 
      WHEN status = 'Created' THEN 1
      WHEN status = 'Pending' THEN 2
      WHEN status = 'PickedUp' THEN 3
      WHEN status = 'Delivered' THEN 4
      ELSE 5
   END`), 'ASC'],
      ["createdAt", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Orders for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Orders for user with id=" + userId,
      });
    });
};

exports.findAllForAdmin = (req, res) => {
  const adminId = req.params.adminId;
  Order.findAll({
    include: [
      {
        model: User,
        as: 'admin',
        where: { id: adminId }
      },
      {
        model: Customer,
        as: "pickUpCustomer",
        required: true,
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "courier",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
    order: [
      ["createdAt", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Orders for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Orders for user with id=" + userId,
      });
    });
};

exports.findAllForCourier = (req, res) => {
  const courierId = req.params.courierId;
  const status = req.query.status;

  const condition = {
    courierId: courierId,
    status: status,
  };

  Order.findAll({
    where: condition,
    include: [
      {
        model: User,
        as: 'courier',
        where: { id: courierId }
      },
      {
        model: Customer,
        as: "pickUpCustomer",
        required: true,
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "clerk",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
    order: [
      ["createdAt", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Orders for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Orders for user with id=" + userId,
      });
    });
};

exports.findAllForCourierInProgress = (req, res) => {
  const courierId = req.params.courierId;
  const status = 'Delivered';

  const condition = {
    courierId: courierId,
    status: {
      [Op.ne]: status,
    },
  };

  Order.findAll({
    where: condition,
    include: [
      {
        model: User,
        as: 'courier',
        where: { id: courierId }
      },
      {
        model: Customer,
        as: "pickUpCustomer",
        required: true,
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "clerk",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
    order: [
      ["createdAt", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Orders for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Orders for user with id=" + userId,
      });
    });
};

exports.findAllForCourierCompleted = (req, res) => {
  const courierId = req.params.courierId;
  const status = 'Delivered';

  const condition = {
    courierId: courierId,
    status: status,
  };

  Order.findAll({
    where: condition,
    include: [
      {
        model: User,
        as: 'courier',
        where: { id: courierId }
      },
      {
        model: Customer,
        as: "pickUpCustomer",
        required: true,
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "clerk",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
    order: [
      ["createdAt", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Orders for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Orders for user with id=" + userId,
      });
    });
};

exports.findAll = (req, res) => {
  const orderId = req.query.orderId;
  const condition = orderId
    ? {
      id: {
        [Op.like]: `%${orderId}%`,
      },
    }
    : null;

  Order.findAll({
    include: [
      {
        model: User,
        as: "clerk",
        required: false,
      },
      {
        model: Customer,
        as: "pickUpCustomer",
        required: true,
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "courier",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
    order: [
      [Sequelize.literal(`CASE 
      WHEN status = 'Created' THEN 1
      WHEN status = 'Pending' THEN 2
      WHEN status = 'PickedUp' THEN 3
      WHEN status = 'Delivered' THEN 4
      ELSE 5
   END`), 'ASC'],
      ["createdAt", "ASC"],
    ],
  })
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

  Order.findByPk(id, {
    include: [
      {
        model: User,
        as: "clerk",
        required: false,
      },
      {
        model: Customer,
        as: "pickUpCustomer",
        required: true,
      },
      {
        model: Customer,
        as: "dropOffCustomer",
        required: true,
      },
      {
        model: User,
        as: "courier",
        required: false,
      },
      {
        model: Path,
        as: "officeToPickUpCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "pickUpCustomerToDropOffCustomerPath",
        required: false,
      },
      {
        model: Path,
        as: "dropOffCustomerToOfficePath",
        required: false,
      },
    ],
  })
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
