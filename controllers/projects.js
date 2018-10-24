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
    .populate('client')
    .exec()
    .then(results => {
      res.send({ code: 20000, data: results })
    })
    .catch(err => console.log('error while getting projects list', err))
}

exports.getOneProject = (req, res) => {
  Project.find({ _id: req.params.id })
    .populate('client')
    .populate('employees')
    .exec()
    .then(result => {
      res.send({ code: 20000, data: result })
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
  res.send({ code: 20000, data: stats })
}

exports.getSalesRevenue = async(req, res) => {
  const aggregation = await Project.aggregate([
    {
      $group: {
        _id: null,
        revenue: { $sum: '$price' }
      }
    }
  ])
  const salesRevenue = aggregation.length && aggregation[0]['revenue']
  res.send({ code: 20000, data: salesRevenue })
  
}

exports.getEmployeeProjects = async(req, res) => {
  const projects = await Project.find({ employees: { $in: req.params.employee }})
    .populate('client').exec();

  res.send({ code: 20000, data: projects })
}

exports.getClientProjects = async(req, res) => {
  const projects = await Project.find({ client: req.params.client })
    .populate('employees').exec();
  res.send({ code: 20000, data: projects })
}