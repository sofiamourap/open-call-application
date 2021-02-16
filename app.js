var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var candidatsRouter = require('./routes/candidats');
var galleryRouter = require('./routes/gallery');
var openCallRouter = require('./routes/openCall');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/candidats', candidatsRouter);
app.use('/gallery', galleryRouter);
app.use('/opencall', openCallRouter);

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
  res.send('error');
});

"CREATE TABLE `candidats` (`id` INT AUTO_INCREMENT,`full_name` varchar(255),`project` varchar(255),`email` varchar(255),`residency_id` INT,`status` BOOLEAN,PRIMARY KEY (`id`));CREATE TABLE `openCall` (`id` INT  AUTO_INCREMENT,`residency_name` varchar(255),`gallery_id` INT,`description` varchar(255),`status` BOOLEAN, PRIMARY KEY (`id`));CREATE TABLE `gallery` (`id` INT AUTO_INCREMENT,`name` varchar(255),`country` varchar(255),`city` varchar(255),`open_calls` varchar(255),PRIMARY KEY (`id`));"

module.exports = app;
