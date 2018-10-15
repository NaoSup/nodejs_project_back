const Client = require('../models/Client');

exports.createClient = (req, res, next) => {
  // const hash = bcrypt.hashSync(req.body.password, 10)
  const client = new Client({
    companyName: req.body.companyName,
    address: req.body.address,
    contactPerson: req.body.contactPerson,
    businessLine: req.body.businessLine
  })
  client.save((err) => {
    if (err) {
      console.log('error on client create', err)
      return next(err)
    }
    res.sendStatus(204)
  })
}

exports.getClients = (req, res) => {
  Client.find()
    .then(results => {
      res.send(results)
    })
    .catch(err => console.log('error while getting clients list', err))
}

exports.getOneClient = (req, res) => {
  Client.find({ _id: req.params.id })
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(`error while getting client with id ${req.params.id}`, err))
}

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