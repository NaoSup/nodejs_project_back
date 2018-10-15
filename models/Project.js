const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../config/constants')

const ProjectSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  dateStart: Date,
  dateEnd: Date,
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client' 
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee' 
  }],
  price: {
    type: Number
  },
  status: {
    type: String,
    enum: constants.PROJECT_STATUS
  },
  comments: [{ type: String }]
})

module.exports = mongoose.model('Project', ProjectSchema)