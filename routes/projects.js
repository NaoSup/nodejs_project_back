const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects')
// GET projects
router.get('/', projectsController.getProjects);
// GET a project by id
router.get('/find/:id', projectsController.getOneProject);
// Create a project
router.post('/', projectsController.createProject);
// Update a project by id
router.put('/update/:id', projectsController.updateProject);
// Delete a project by id
router.delete('/delete/:id', projectsController.deleteProject);
// Get projects stats
router.get('/stats', projectsController.getProjectsStats);
// Get sales revenue
router.get('/revenue', projectsController.getSalesRevenue);
// Get projects for an employee
router.get('/employee/:employee', projectsController.getEmployeeProjects);
// Get projects for a client
router.get('/client/:client', projectsController.getClientProjects);

module.exports = router;
