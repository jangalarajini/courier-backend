module.exports = (app) => {
    const Path = require("../controllers/path.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Customer
    router.post("/path/", [authenticateRoute], Path.create);
  
    // Retrieve all Customers
    router.get("/path/", Path.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/path/:id", Path.findOne);
  
    // Update a Customer with customerId
    router.put("/path/:id", [authenticateRoute], Path.update);
  
    // Delete a Customer with customerId
    router.delete("/path/:id", [authenticateRoute], Path.delete);
  
    // Delete all Customers
    router.delete("/path/", [authenticateRoute], Path.deleteAll);
  
    app.use("/courierapi", router);
  };
  
