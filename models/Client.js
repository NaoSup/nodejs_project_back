const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  companyName: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  contactPerson: {
    lastName: {
      type: String,
      trim: true
    },
    firstName: {
      type: String,
      trim: true
    },
    phone: String,
    email: {
      type: String,
      lowercase: true,
      trim: true
    }
  },
  businessSector: String
})

module.exports = mongoose.model('Client', ClientSchema)