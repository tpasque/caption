
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({
      id: 800,
      facebook_id:"10103893635535073",
      brand_id:200,
      campaign_photo_url: "http://smashburger.com/wp-content/themes/smashburger_v3/img/double-burger.jpg",
      // start_date: "NULL",
      // end_date: "NULL",
      points_for_win: 5,
      money_for_win: 10.00
  }),
    knex('posts').insert({
      id:801,
      facebook_id:"10103893635535073",
      brand_id:200,
      campaign_photo_url: "http://smashburger.com/wp-content/themes/smashburger_v3/img/milkshakes.jpg",
      // start_date: "NULL",
      // end_date: "NULL",
      points_for_win: 3,
      money_for_win: 5.00
  }),
    knex('posts').insert({
      id:802,
      facebook_id:"10103893635535073",
      brand_id:201,
      campaign_photo_url: "https://chinookseedery.com/wp-content/uploads/2013/03/IMG_0998-Sunflower-In-Colorado-Field.jpg",
      // start_date: "NULL",
      // end_date: "NULL",
      points_for_win: 5,
      money_for_win: 5.00
  })

 );

};
