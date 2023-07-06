module.exports = (app) => {
    const Edge = require("../controllers/edge.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Customer
    router.post("/edge/", [authenticateRoute], Edge.create);
  
    // Retrieve all Customers
    router.get("/edge/", Edge.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/edge/:id", Edge.findOne);
  
    // Update a Customer with customerId
    router.put("/edge/:id", [authenticateRoute], Edge.update);
  
    // Delete a Customer with customerId
    router.delete("/edge/:id", [authenticateRoute], Edge.delete);
  
    // Delete all Customers
    router.delete("/edge/", [authenticateRoute], Edge.deleteAll);
  
    app.use("/courierapi", router);
  };
  
