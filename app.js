'use strict'
// Dependencies nodejs 
const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      logger = require('morgan'),

      controller = require('./controller'),
      expressSession = require('express-session'),
      passport = require('passport'),
      localPassport = require('passport-local').Strategy,
      flash = require('connect-flash'),
      app = express();
      

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Setings node 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session())


app.use( controller );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;