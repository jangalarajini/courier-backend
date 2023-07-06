module.exports = (app) => {
    const Node = require("../controllers/node.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Customer
    router.post("/node/", [authenticateRoute], Node.create);
  
    // Retrieve all Customers
    router.get("/node/", Node.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/node/:id", Node.findOne);
  
    // Update a Customer with customerId
    router.put("/node/:id", [authenticateRoute], Node.update);
  
    // Delete a Customer with customerId
    router.delete("/node/:id", [authenticateRoute], Node.delete);
  
    // Delete all Customers
    router.delete("/node/", [authenticateRoute], Node.deleteAll);
  
    app.use("/courierapi", router);
  };
  
