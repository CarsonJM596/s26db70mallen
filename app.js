require('dotenv').config();

const Costume = require("./models/costume");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var resourceRouter = require('./routes/resource');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var journalsRouter = require('./routes/journals');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var costumesRouter = require('./routes/costumes');
var app = express();

const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Success message
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

async function recreateDB() {
  await Costume.deleteMany();

  let costume1 = new Costume({
    costume_type: "Witch",
    size: "M",
    cost: 50
  });

  let costume2 = new Costume({
    costume_type: "Zombie",
    size: "L",
    cost: 40
  });

  let costume3 = new Costume({
    costume_type: "Vampire",
    size: "S",
    cost: 60
  });

  await costume1.save();
  await costume2.save();
  await costume3.save();

  console.log("Database seeded!");
}

db.once("open", async function () {
  console.log("Connection to DB succeeded");
  await recreateDB();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes (these come AFTER DB connection setup)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/journals', journalsRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);
app.use('/resource', resourceRouter);
app.use('/costumes', costumesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
