const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects')
// GET projects
router.get('/', projectsController.getProjects);
// GET a project by id
router.get('/:id', projectsController.getOneProject);
// Create a project
router.post('/', projectsController.createProject);
// Update a project by id
router.put('/:id', projectsController.updateProject);
// Delete a project by id
router.delete('/:id', projectsController.deleteProject);

module.exports = router;
