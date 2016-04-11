
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('ranks').del(),

    // Inserts seed entries
    knex('ranks').insert({
      pepper:"Bell Pepper",
      min_points:0,
      max_points:50,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/1-Bell-Pepper_ipdxzs.png"
  }),
    knex('ranks').insert({
      pepper:"Pimento Pepper",
      min_points:51,
      max_points:100,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/2-Pimento-Pepper_ujk3yd.png"
  }),
    knex('ranks').insert({
      pepper:"Poblano Pepper",
      min_points:101,
      max_points:200,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/3-Poblano-Pepper_si1nej.png"
  }),
    knex('ranks').insert({
      pepper:"Anaheim Pepper",
      min_points:201,
      max_points:300,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/4-Anaheim-Pepper_tksykv.png"
  }),
    knex('ranks').insert({
      pepper:"Jalapeno Pepper",
      min_points:301,
      max_points:400,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/5-Jalapeno-Pepper_mkqgio.png"
  }),
    knex('ranks').insert({
      pepper:"Cayenne Pepper",
      min_points:401,
      max_points:500,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/6-Cayenne-Pepper_bidkki.png"
  }),
    knex('ranks').insert({
      pepper:"Habanero Pepper",
      min_points:501,
      max_points:650,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/7-Habenero-Pepper_s3ehvp.png"
  }),
    knex('ranks').insert({
      pepper:"Ghost Pepper",
      min_points:651,
      max_points:800,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/8-Ghost-Pepper_zh1mos.png"
  }),
    knex('ranks').insert({
      pepper:"Scorpion Pepper",
      min_points:801,
      max_points:1000,
      pepper_image_url: "https://res.cloudinary.com/domwzddwk/image/upload/v1460398830/9-Scorpion-Pepper_bvxxfg.png"
  })

 );
 }
