// app.js
var express = require('express');
var mongoose = require('mongoose');
var itemRouter = require('./src/routes/itemRoutes');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://ikbhal:Faaiza786@ds135394.mlab.com:35394/lbedb')
  .then(() =>{
    console.log('Connected');
  })
  .catch(err => {
    console.error('App starting error:' + err.stack);
    process.exit(1);
  });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/items', itemRouter);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function(){
  console.log('hello world');
});
