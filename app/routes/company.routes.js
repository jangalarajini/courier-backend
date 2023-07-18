module.exports = (app) => {
    const Company = require("../controllers/company.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Customer
    router.post("/company/", [authenticateRoute], Company.create);
  
    // Retrieve all Customers
    router.get("/company/", Company.findAll);
  
    // Retrieve a single Customer with customerId
    router.get("/company/:id", Company.findOne);
  
    // Update a Customer with customerId
    router.put("/company/:id", [authenticateRoute], Company.update);
  
    // Delete a Customer with customerId
    router.delete("/company/:id", [authenticateRoute], Company.delete);
  
    // Delete all Customers
    router.delete("/company/", [authenticateRoute], Company.deleteAll);
  
    app.use("/courierapi", router);
  };
  
