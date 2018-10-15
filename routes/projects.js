const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects')
// GET projects
router.get('/', projectsController.getProjects);
// GET a project by id
router.get('/create/:id', projectsController.getOneProject);
// Create a project
router.post('/', projectsController.createProject);
// Update a project by id
router.put('/update/:id', projectsController.updateProject);
// Delete a project by id
router.delete('/delete/:id', projectsController.deleteProject);
// Get projects stats
router.get('/stats', projectsController.getProjectsStats);

module.exports = router;
