module.exports = (app) => {
    const Customer = require("../controllers/customer.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Customer
    router.post("/customers/", [authenticateRoute], Customer.create);
  
    // Retrieve all Customers
    router.get("/customers/", Customer.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/customers/:id", Customer.findOne);
  
    // Update a Customer with customerId
    router.put("/customers/:id", [authenticateRoute], Customer.update);
  
    // Delete a Customer with customerId
    router.delete("/customers/:id", [authenticateRoute], Customer.delete);
  
    // Delete all Customers
    router.delete("/customers/", [authenticateRoute], Customer.deleteAll);
  
    app.use("/courierapi", router);
  };
  
