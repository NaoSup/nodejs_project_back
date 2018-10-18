const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');
const employeesRouter = require('./routes/employees');

const app = express();

// connection to database
let dev_db_url = 'mongodb://admin:p4ssword@ds245022.mlab.com:45022/angular-project';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configuring headers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Content-type', 'application/json');
  res.header('Accept', "application/json");
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200', 'https://nodejs-project-front.appspot.com/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin');

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/clients', clientsRouter);
app.use('/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res.send(err.status || 500);
});

module.exports = app;
