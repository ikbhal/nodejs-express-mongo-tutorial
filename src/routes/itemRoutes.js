// itemRoutes.js

var express = require('express');
var app = express();
var itemRouter = express.Router();
var Item = require('../models/Item');

itemRouter.route('/').get(function(req, res){
  Item.find(function(err, itms){
    if(err){
      console.log(err);
    }else {
      res.render('items', {itms:itms});
    }
  });
});

itemRouter.route('/single').get(function(req, res){
  res.render('singleItem');
});

itemRouter.route('/add').get(function(req, res){
  res.render('addItem');
});

itemRouter.route('/add/post').post(function(req, res){
  var item = new Item(req.body);
  item.save()
    .then( item => {
      res.redirect('/');
    })
    .catch( err => {
      res.status(400).send('Unable to connect to database');
    });
});

itemRouter.route('/edit/:id').get(function(req, res){
  var id = req.params.id;
  Item.findById(id, function(err, item){
    res.render('editItem', {item: item});
  });
});
module.exports = itemRouter;
