require('dotenv').load()
var moment = require('moment')
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');
var jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary');
var fs = require('fs')
var multer = require('multer')
var upload = multer({dest: './'})

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,

});

function Users(){
  return knex('users')
}

function Posts(){
  return knex('posts')
}

function Captions(){
  return knex('captions')
}

function Ranks(){
  return knex('ranks')
}

function Brands(){
  return knex('brands')
}

function createToken(user){
  return jwt.sign(user, process.env.TOKEN_SECRET)
}
function verifyToken(user){
  return jwt.verify(user, process.env.TOKEN_SECRET)
}

//post route to get all Users
router.get('/users', function (req, res, next) {
  console.log('you hit this route');
  Users().select('*').then(function (users) {
    console.log(users);
    res.send(users)
  })
})

module.exports = router;
