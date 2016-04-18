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

//post route to add a vote to a caption
//this route also adds a point to the total_points of the User who submitted the vote
//need to optimize this so that if they vote on another caption inside the post, it takes the first vote back.
router.post('/vote', function (req, res, next) {
  // console.log("this is the req.body in the vote route");
  // console.log(req.body);
  Captions().select('up_votes').where('caption_id', req.body.caption_id).first().then(function (up_votes) {
    var up_votes = up_votes.up_votes
    var new_up_votes = (up_votes+1)
    Captions().where('caption_id', req.body.caption_id).update({up_votes:new_up_votes}).then(function (captions_response) {
      Users().select('total_points').where('facebook_id', req.body.user_facebook_id).then(function (total_points) {
        var total_points = total_points[0].total_points
        var new_total_points = (total_points + 1)
        Users().where('facebook_id', req.body.user_facebook_id).update({total_points:new_total_points}).then(function (users_response) {
          res.redirect('/#/posts')
        })
      })
    })
  })
})

router.post('/vote/:id', function (req, res, next) {
  console.log("req params");
console.log(req.params);
  Captions().select('up_votes').where('caption_id', req.body.caption_id).first().then(function (up_votes) {
    var up_votes = up_votes.up_votes
    var new_up_votes = (up_votes+1)
    Captions().where('caption_id', req.body.caption_id).update({up_votes:new_up_votes}).then(function (captions_response) {
      Users().select('total_points').where('facebook_id', req.body.user_facebook_id).then(function (total_points) {
        var total_points = total_points[0].total_points
        var new_total_points = (total_points + 1)
        Users().where('facebook_id', req.body.user_facebook_id).update({total_points:new_total_points}).then(function (users_response) {
          res.redirect('/#/posts/'+req.params)
        })
      })
    })
  })
})

//route to get all pipers for admin dashboard
router.get('/pipers', function (req, res, next) {
  Users().select('*').then(function (users_response) {
    res.send(users_response)

  })
})

router.get('/brands', function (req, res, next) {
  Brands().select('*').then(function (brands_response) {
    res.send(brands_response)
  })
})

//get route for payment information for admin page.  Gets top caption and the info about that pipers
router.get('/admin/payments', function (req, res, next) {
  Captions().join('posts', 'posts.id', 'captions.post_id').join('brands', 'posts.brand_id', 'brands.id').then(function(result){
    Users().select('*').then(function (users_result) {
      var dataArray = []
      var postsArray = [];
      var postsObj = {};
      var captionsArray = [];
      var buildData = function(){
        for (var i = 0; i < result.length; i++) {
          post = result[i].post_id
          caption = result[i].caption
          up_votes = result[i].up_votes
          caption_id = result[i].caption_id
          caption_facebook_id = result[i].caption_facebook_id
          if (postsObj[post]) {
            var item =  postsObj[post]
            item.post.caption.push({
              caption:caption,
              up_votes:up_votes,
              caption_id:caption_id,
              caption_facebook_id:caption_facebook_id
            })
          } else{
            postsObj[post] = {
              post: {
                post_id: result[i].post_id,
                post_campaign_url: result[i].campaign_photo_url,
                post_money_for_win: result[i].money_for_win,
                post_points_for_win: result[i].points_for_win,
                post_start_date: result[i].start_date,
                post_end_date: result[i].end_date,
                post_facebook_id: result[i].post_facebook_id,
                brand: {
                  brand_name: result[i].brand_name,
                  brand_image_url: result[i].brand_image_url
                },
                caption: [{
                  caption: caption,
                  up_votes: up_votes,
                  caption_id:caption_id,
                  caption_facebook_id:caption_facebook_id
                }]
              }
            }
          }
        }
        for (var key in postsObj){
          var value = postsObj[key];
          postsArray.push(value)
        }
        dataArray.push({posts: postsArray})
        var newArr = dataArray[0].posts
        for (var i = 0; i < newArr.length; i++) {
          var maxCaption = newArr[i].post.caption.reduce(function(prev, current) {
            return (prev.up_votes > current.up_votes) ? prev : current
          })
          newArr[i].post.caption = maxCaption
        }
        for (var i = 0; i < newArr.length; i++) {
          var cfi = newArr[i].post.caption.caption_facebook_id
          for (var j = 0; j < users_result.length; j++) {
            var urfi = users_result[j].facebook_id
            if(cfi==urfi){
              newArr[i].post.caption_facebook_id = users_result[j]
            }
          }
        }
        res.send(newArr)
      }
      buildData(result)
    })

  })

})

//gets information to use on dashboard analytics
router.get('/dashboard', function (req, res, next) {
  Posts().select('*').then(function (posts) {
    Captions().select('*').then(function (captions) {
      Brands().select('*').then(function (brands) {
        Users().select('*').then(function (users) {
          res.send({posts:posts, captions:captions, brands:brands, users:users})
        })
      })
    })
  })
})

//post route for adding a new post from the admin
router.post('/post/new', upload.single('file'), function (req, res, next) {
  console.log("this is the req.body");
  console.log(req.body);
  cloudinary.uploader.upload(req.file.filename, function (cloudinary_result) {
    Brands().select('id').where('brand_name', req.body.post_brand_name).then(function (brand_id) {
      console.log("this is the brand id after the BRANDS query");
      console.log(brand_id);
      var post_brand_id = brand_id[0].id
      var post = {}
      post.post_facebook_id = req.body.user_facebook_id
      post.brand_id = post_brand_id
      post.campaign_photo_url = cloudinary_result.secure_url
      post.public_id = cloudinary_result.public_id
      post.start_date = req.body.post_start_date
      post.end_date = req.body.post_end_date
      post.points_for_win = req.body.post_points_for_win
      post.money_for_win = req.body.post_money_for_win
      post.time = moment().calendar()

      Posts().insert(post).then(function (post_result) {
        Posts().select('id').where('campaign_photo_url', cloudinary_result.secure_url).then(function (post_id) {
          var post_id = post_id[0].id
          var caption1 = {}
          caption1.post_id = post_id
          caption1.caption_facebook_id = req.body.user_facebook_id
          caption1.caption = req.body.post_caption_1
          caption1.up_votes = 0
          Captions().insert(caption1).then(function (caption1_result) {
            var caption2 = {}
            caption2.post_id = post_id
            caption2.caption_facebook_id = req.body.user_facebook_id
            caption2.caption = req.body.post_caption_2
            caption2.up_votes = 0
            Captions().insert(caption2).then(function (caption2_result) {
              var caption3 = {}
              caption3.post_id = post_id
              caption3.caption_facebook_id = req.body.user_facebook_id
              caption3.caption = req.body.post_caption_3
              caption3.up_votes = 0
              Captions().insert(caption3).then(function (caption3_result) {
                var caption4 = {}
                caption4.post_id = post_id
                caption4.caption_facebook_id = req.body.user_facebook_id
                caption4.caption = req.body.post_caption_4
                caption4.up_votes = 0
                Captions().insert(caption4).then(function (caption4_result) {
                  res.redirect('/#/admin')
                })
              })
            })
          })
        })
      })
    })
  })
})

//post route to get post by ID for individual post page.  Currently using for adding a caption and seeing an ind post
router.get('/post/:id', function(req, res, next){
  Posts().where('id', req.params.id).first().then(function(post_result){
    //this is what we are building
    //postArray = [ { post:{post:{},brands:[],captions:[{},{},{},{}]}}];
    var postArray = [];
    var postObj = {};
    Captions().where('post_id', req.params.id).then(function (captions_result) {
      Brands().where('id', post_result.brand_id).then(function (brand_result) {
        postObj.post = {
          post:post_result,
          captions:captions_result,
          brands:brand_result
        }
        postArray.push(postObj)
        res.send(postArray);
      })
    })
  })
})

//post route that adds a new caption from a user
//this route also adds a point to the total_points of the User who added the caption
router.post('/caption/new', function (req, res, next) {
  var caption = {};
  caption.caption_facebook_id = req.body.user_facebook_id
  caption.post_id = req.body.post_id
  caption.caption = req.body.new_caption
  caption.up_votes = 0
  caption.time = moment().calendar()
  Captions().insert(caption).then(function (response) {
    Users().select('total_points').where('facebook_id', req.body.user_facebook_id).then(function (total_points) {
      var total_points = total_points[0].total_points
      var new_total_points = (total_points + 1)
      Users().where('facebook_id', req.body.user_facebook_id).update({total_points:new_total_points}).then(function (user_response) {
        res.redirect('/#/posts')
      })
    })
  })
})

router.get('/peppers', function (req, res, next) {
  Ranks().select('*').then(function (peppers_result) {
    res.send(peppers_result)
  })
})


//Verify User Logged in: getting user information
router.post('/user', function(req, res, next){
  var token = req.body.token
  var user = verifyToken(token)
  Users().where('facebook_id', user.facebook_id).first().then(function(result){
    // Posts().join('captions', 'posts.facebook_id', )
    Captions().select('*').where('caption_facebook_id', user.facebook_id).then(function (caption_result) {
        result.captions = caption_result
        res.send(result)
      // })
    })
  })
})

//route that gets all posts.  Chained Join query to get post with brand information and associated captions.
router.get('/posts', function (req, res, next) {
  Captions().join('posts', 'posts.id', 'captions.post_id').join('brands', 'posts.brand_id', 'brands.id').then(function(result){
    // console.log("result in posts route");
    // console.log(result);
      // [resultObject{posts:postsArray[postObject{post:post, captions:captionArray[caption]}]}]
      //[ { posts:[ { post:{post:{},brands:[],captions:[{},{},{},{}]}}]}];
      var dataArray = []
      var postsArray = [];
      var postsObj = {};
      var captionsArray = [];
      var buildData = function(){
        for (var i = 0; i < result.length; i++) {
          post = result[i].post_id
          caption = result[i].caption
          up_votes = result[i].up_votes
          caption_id = result[i].caption_id
          caption_facebook_id = result[i].caption_facebook_id
          if (postsObj[post]) {
            var item =  postsObj[post]
            item.post.caption.push({
              caption:caption,
              up_votes:up_votes,
              caption_id:caption_id,
              caption_facebook_id:caption_facebook_id
            })
          } else{
            postsObj[post] = {
              post: {
                post_id: result[i].post_id,
                post_campaign_url: result[i].campaign_photo_url,
                post_money_for_win: result[i].money_for_win,
                post_points_for_win: result[i].points_for_win,
                post_start_date: result[i].start_date,
                post_end_date: result[i].end_date,
                post_facebook_id: result[i].post_facebook_id,
                brand: {
                  brand_name: result[i].brand_name,
                  brand_image_url: result[i].brand_image_url
                },
                caption: [{
                  caption: caption,
                  up_votes: up_votes,
                  caption_id:caption_id,
                  caption_facebook_id:caption_facebook_id
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
        // console.log(dataArray[0].posts[0].post);
        // })
      }
      buildData(result)
      // var stuff is a data set I used to send test data through to model what my eventual dataArray would look like, it is commented out at the bottom of the file as an example if needed.
      res.send(dataArray)
  })
})

//post route to add new brand - admin
router.post('/brand/new', upload.single('file'), function (req, res, next) {
  cloudinary.uploader.upload(req.file.filename, function (cloudinary_result) {
    var brand = {}
    brand.facebook_id = req.body.user_facebook_id
    brand.brand_name = req.body.brand_name
    brand.brand_image_url = cloudinary_result.secure_url
    brand.public_id = cloudinary_result.public_id
    brand.time = moment().calendar()
    Brands().insert(brand).then(function (brand_result) {
      //change this route to see all brands once that is created
      res.redirect('/#/admin')
    })
  })


})
module.exports = router;

//var stuff used as a hard coded data set in the "/posts" route while building query.
  // var stuff = [{posts: [{post:{id:800, facebook_id:10103893635535073, brand_id:200, campaign_photo_url: "http://smashburger.com/wp-content/themes/smashburger_v3/img/double-burger.jpg"},
  // captions:[{id:1, post_id:800, caption: "hello"}, {id:2, post_id:800, caption: "hello again"},{id:3, post_id:800, caption: "hello THIRD again"} ]},
  // {post:{id:801, facebook_id:10103893635535073, brand_id:200, campaign_photo_url: "http://smashburger.com/wp-content/themes/smashburger_v3/img/milkshakes.jpg"},
  // captions:[{id:3, post_id:801, caption: "hello there"}, {id:4, post_id:801, caption: "hello there again"}]}
  // ]}];
