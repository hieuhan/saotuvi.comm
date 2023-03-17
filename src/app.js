const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const ejsLayouts = require('express-ejs-layouts');
const adminRoutes = require('./admin/routes');
//const routers = require('./routers');

//mongoose 
//require('./lib/mongoose');

// user middleware
app.use(helmet());
app.use(morgan('combined'));
// compress responses
app.use(compression());

// add body-parser
//app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

// data sanitization against Nosql query injection
app.use(mongoSanitize());

// data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// view engine setup
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('views', path.join(__dirname, 'views') );
//app.set('layout', 'admin/views/layout');

//app.set('views', path.join(__dirname, 'views'));
////app.set('view engine', 'ejs');
// app.set('layout extractScripts', true)
// app.set('layout extractStyles', true)
//app.set('layout', 'layouts/default');
//app.use(expressLayouts);


//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
//app.use(expressLayouts)


//app.use(expressLayouts);
//app.set('layout', './views/layouts')

// set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'admin/public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// routers
//adminRoutes(app);
//app.use(adminRoutes);
//app.use(routers);
adminRoutes(app);

// error handling middleware called
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// app.use((err, req, res, next) => {
//     /* set locals, only providing error in development */
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'devlopment' ? err : {};

//     /* render the error page */
//     res.status(err.status || 500);
//     res.render('error');
// });

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

module.exports = app;