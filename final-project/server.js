const express = require('express');
const app = express();

const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

const routes = require('./server/routes');
// Define the port address and tell express to use this port
const port = process.env.PORT || 5000;
app.set('port', port);

app.use('/', routes);

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Listening on port: ', port);
});

mongoose.connect('mongodb://localhost:27017/memories',
   { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
      if (err) {
         console.log('Connection failed: ' + err);
      }
      else {
         console.log('Connected to database!');
      }
   }
);