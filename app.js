let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//let indexRouter = require('./routes/index');
let textMsgRouter = require('./routes/textmsgcontroller.js');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/textmsg', textMsgRouter);

//app.use(passport.authenticate('jwt', {session: false} ));

function setConfig(config)  {
  const log = config.log();

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.set('config',config);
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
}

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

module.exports = { "setConfig":setConfig, app:app};
