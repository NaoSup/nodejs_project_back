const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');

// GET clients
router.get('/', clientsController.getClients);
// GET a client by id
router.get('/:id', clientsController.getOneClient);
// Create a client
router.post('/', clientsController.createClient);
// Update a client by id
router.put('/:id', clientsController.updateClient);
// Delete a client by id
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
