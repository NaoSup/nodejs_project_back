const Client = require('../models/Client');

// Create a client
exports.createClient = (req, res, next) => {
  const client = new Client({
    companyName: req.body.companyName,
    address: req.body.address,
    contactPerson: req.body.contactPerson,
    businessSector: req.body.businessSector
  })
  client.save((err) => {
    if (err) {
      console.log('error on client create', err)
      return next(err)
    }
    res.sendStatus(204)
  })
}
// Get all clients
exports.getClients = (req, res) => {
  Client.find()
    .then(results => {
      res.send({ code: 20000, data: results })
    })
    .catch(err => console.log('error while getting clients list', err))
}
// Get a client
exports.getOneClient = (req, res) => {
  Client.find({ _id: req.params.id })
    .then(result => {
      res.send({ code: 20000, data: result})
    })
    .catch(err => console.log(`error while getting client with id ${req.params.id}`, err))
}
// Update a client
exports.updateClient = (req, res, next) => {
  Client.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    err => {
      if (err) {
        console.log(err)
        return next(err)
      }
      console.log(`client ${req.params.id} updated`)
      res.sendStatus(204)
    })
}
// Delete a client
exports.deleteClient = (req, res, next) => {
  Client.findOneAndDelete({ _id: req.params.id },
    err => {
      if (err) {
        console.log(`error while deleting client ${req.params.id}`, err)
        return next(err)
      }
      console.log(`client  ${req.params.id} deleted`)
      res.sendStatus(204)
    })
}