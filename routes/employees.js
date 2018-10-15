const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees')

// GET employees
router.get('/', employeesController.getEmployees);
// GET a employee by id
router.get('/:id', employeesController.getOneEmployee);
// Create a employee
router.post('/', employeesController.createEmployee);
// Update a employee by id
router.put('/:id', employeesController.updateEmployee);
// Delete a employee by id
router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;
