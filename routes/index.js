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

//Satellizer OAuth route that authenticates the user and logs them in.
router.post('/auth/facebook', function(req, res, next){
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
router.post('/user', function(req, res, next){
  var token = req.body.token
  var user = verifyToken(token)
  Users().where('facebook_id', user.facebook_id).first().then(function(result){
    res.send(result)
  })

})

//route that gets all posts.  Chained Join query to get post with brand information and associated captions.
router.get('/posts', function (req, res, next) {
    Posts().join('captions', 'posts.id', 'captions.post_id').join('brands', 'posts.brand_id', 'brands.id').then(function (result) {
      // [resultObject{posts:postsArray[postObject{post:post, captions:captionArray[caption]}]}]
      //[ { posts:[ { post:{},brands:[],captions:[{},{},{},{}]}]}];
      var dataArray = []
      var postsArray = [];
      var postsObj = {};
      var captionsArray = [];
      var buildData = function(){
        for (var i = 0; i < result.length; i++) {
          post = result[i].post_id
          caption = result[i].caption
          up_votes = result[i].up_votes
            if (postsObj[post]) {
            var item =  postsObj[post]
            item.post.caption.push({
              caption:caption,
              up_votes:up_votes
            })
          } else{
            postsObj[post] = {
              post: {
                post_id: result[i].post_id,
                post_campaign_url: result[i].campaign_photo_url,
                brand: {
                  brand_name: result[i].brand_name,
                  brand_image_url: result[i].brand_image_url
                },
                caption: [{
                  caption: caption,
                  up_votes: up_votes
                }]
              }
            }
          }
        }
        //for in loop that takes postsObj which is an object with multiple key:value pairs
        //the key:value pairs are the post_id value as the key and post object as the pair.
        //this for in loop extracts all of the pairs and puts them into postsArray so we can
        //push that array into an object that is inside dataArray in order to have an array
        //of objects that we can use on the Angular side.
        for (var key in postsObj){
          var value = postsObj[key];
          postsArray.push(value)
        }
        dataArray.push({posts: postsArray})
      }
      buildData(result)

      // var stuff is a data set I used to send test data through to model what my eventual dataArray would look like.

      // var stuff = [{posts: [{post:{id:800, facebook_id:10103893635535073, brand_id:200, campaign_photo_url: "http://smashburger.com/wp-content/themes/smashburger_v3/img/double-burger.jpg"},
      // captions:[{id:1, post_id:800, caption: "hello"}, {id:2, post_id:800, caption: "hello again"},{id:3, post_id:800, caption: "hello THIRD again"} ]},
      // {post:{id:801, facebook_id:10103893635535073, brand_id:200, campaign_photo_url: "http://smashburger.com/wp-content/themes/smashburger_v3/img/milkshakes.jpg"},
      // captions:[{id:3, post_id:801, caption: "hello there"}, {id:4, post_id:801, caption: "hello there again"}]}
      // ]}];

      res.send(dataArray)
  })
})


module.exports = router;
