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

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET,
//
// });

function Users(){
  return knex('users')
}

function Posts(){
  return knex('posts')
}

function Captions(){
  return knex('captions')
}

function Rank(){
  return knex('rank')
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

//Satellizer route that authenticates the user and logs them in.
router.post('/auth/facebook', function(req,res){
  console.log("req is"+req);
  var fields = ['id', 'email', 'first_name', 'last_name', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
  code: req.body.code,
  client_id: req.body.clientId,
  client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  redirect_uri: req.body.redirectUri
 };
   request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }
          var user = {}
          user.facebook_id = profile.id
          user.profile_image_url = 'https://graph.facebook.com/'+profile.id+'/picture?type=large'
          user.email = profile.email
          user.first_name = profile.first_name
          user.last_name = profile.last_name
          user.name = profile.name;
          user.total_money_earned = 0;
          user.total_money_owed = 0;
          user.total_points = 0;
          user.time = moment().calendar()
          var token = createToken(user)
          Users().insert(user)
            .catch(function(error){
              console.log(error);
            }).then(function(){
              res.send({token: token})
              res.redirect('/feed')
            })

      })
    });
})

//Verify User Logged in: getting user information
router.post('/user', function(req, res){
  var token = req.body.token
  var user = verifyToken(token)
  Users().where('facebook_id', user.facebook_id).first().then(function(result){
    res.send(result)
  })

})
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
