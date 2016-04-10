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

// //post route for adding a new post from the admin
// router.post('/post/new', upload.single('file'), function (req, res, next) {
//   cloudinary.uploader.upload(req.file.filename, function (cloudinary_result) {
//     Brands().select('id').where('brand_name', req.body.post_brand_name).then(function (brand_id) {
//       var post_brand_id = brand_id[0].id
//       var post = {}
//       post.facebook_id = req.body.user_facebook_id
//       post.brand_id = post_brand_id
//       post.campaign_photo_url = cloudinary_result.secure_url
//       post.public_id = cloudinary_result.public_id
//       // post.start_date = req.body.post_start_date
//       // post.end_date = req.body.post_end_date
//       post.points_for_win = req.body.post_points_for_win
//       post.money_for_win = req.body.post_money_for_win
//       post.time = moment().calendar()
//
//       Posts().insert(post).then(function (post_result) {
//         Posts().select('id').where('campaign_photo_url', cloudinary_result.secure_url).then(function (post_id) {
//           var post_id = post_id[0].id
//           var caption1 = {}
//           caption1.post_id = post_id
//           caption1.facebook_id = req.body.user_facebook_id
//           caption1.caption = req.body.post_caption_1
//           caption1.up_votes = 0
//           Captions().insert(caption1).then(function (caption1_result) {
//             var caption2 = {}
//             caption2.post_id = post_id
//             caption2.facebook_id = req.body.user_facebook_id
//             caption2.caption = req.body.post_caption_2
//             caption2.up_votes = 0
//             Captions().insert(caption2).then(function (caption2_result) {
//               var caption3 = {}
//               caption3.post_id = post_id
//               caption3.facebook_id = req.body.user_facebook_id
//               caption3.caption = req.body.post_caption_3
//               caption3.up_votes = 0
//               Captions().insert(caption3).then(function (caption3_result) {
//                 var caption4 = {}
//                 caption4.post_id = post_id
//                 caption4.facebook_id = req.body.user_facebook_id
//                 caption4.caption = req.body.post_caption_4
//                 caption4.up_votes = 0
//                 Captions().insert(caption4).then(function (caption4_result) {
//                   res.redirect('/#/posts')
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// })

module.exports = router;
