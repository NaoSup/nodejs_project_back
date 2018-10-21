const Employee = require('../models/Employee');

exports.createEmployee = (req, res, next) => {
  const employee = new Employee({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    username: req.body.username,
    birthdate: req.body.birthdate,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    position: req.body.position
  })
  employee.save((err) => {
    if (err) {
      console.log('error on employee create', err)
      return next(err)
    }
    res.sendStatus(204)
  })
}

exports.getEmployees = (req, res) => {
  Employee.find()
    .then(results => {
      res.send({ code:20000, data: results})
    })
    .catch(err => {
      console.log('error while getting employees list', err)
    })
}

exports.getOneEmployee = (req, res) => {
  Employee.find({ _id: req.params.id })
    .then(result => {
      res.send({ code:20000, data:result })
    })
    .catch(err => console.log(`error while getting client with id ${req.params.id}`, err))
}

exports.updateEmployee = (req, res, next) => {
  Employee.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    err => {
      if (err) {
        console.log(err)
        return next(err)
      }
      console.log(`employee  ${req.params.id} updated`)
      res.sendStatus(204)
    })
}

exports.deleteEmployee = (req, res, next) => {
  Employee.findOneAndDelete({ _id: req.params.id },
    err => {
      if (err) {
        console.log(`error while deleting employee ${req.params.id}`, err)
        return next(err)
      }
      console.log(`employee  ${req.params.id} deleted`)
      res.sendStatus(204)
    })
}
