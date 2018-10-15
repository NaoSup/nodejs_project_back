const Project = require('../models/Project')
const constants = require('../config/constants')

exports.createProject = (req, res, next) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    client: req.body.client,
    employees: req.body.employees,
    price: req.body.price,
    status: req.body.status,
    comments: req.body.comments || []
  })
  project.save((err) => {
    if (err) {
      console.log('error on project create', err)
      return next(err)
    }
    res.sendStatus(204)
  })
}

exports.getProjects = (req, res) => {
  Project.find()
    .then(results => {
      res.send(results)
    })
    .catch(err => console.log('error while getting projects list', err))
}

exports.getOneProject = (req, res) => {
  Project.find({ _id: req.params.id })
    .then(result => {
      res.send(result)
    })
    .catch(err => console.log(`error while getting client with id ${req.params.id}`, err))
}

exports.updateProject = (req, res, next) => {
  Project.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    err => {
      if (err) {
        console.log(err)
        return next(err)
      }
      console.log(`project  ${req.params.id} updated`)
      res.sendStatus(204)
    })
}

exports.deleteProject = (req, res, next) => {
  Project.findOneAndDelete({ _id: req.params.id },
    err => {
      if (err) {
        console.log(`error while deleting project ${req.params.id}`, err)
        return next(err)
      }
      console.log(`project  ${req.params.id} deleted`)
      res.sendStatus(204)
    })
}

exports.getProjectsStats = async(req, res) => {
  const projects = await Project.find()
  const stats = {}
  // init stats objects with data equals to zero
  constants.PROJECT_STATUS.forEach(status => stats[status] = 0)
  
  // count number of projects for each status
  projects.forEach(project => {
    constants.PROJECT_STATUS.forEach(status => {
      if (status === project.status) {
        stats[status] += 1
      }
    })
  })
  res.send(stats)
}