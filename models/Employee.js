const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
  lastName: {
    type: String,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    lowercase: true,
    trim: true
  },
  birthdate: {
    type: Date
  },
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  position: {
    type: String,
    enum: ['project manager', 'developer', 'sales representative', 'integrator'] // @TODO constants
  }
})

module.exports = mongoose.model('Employee', EmployeeSchema)