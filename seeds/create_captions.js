
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('captions').del(),

    // Inserts seed entries
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"1",
      caption:"caption 1, really creative",
      up_votes:"10"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"1",
      caption:"caption 2, also really creative",
      up_votes:"8"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"1",
      caption:"caption 3, kind of really creative",
      up_votes:"12"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"1",
      caption:"caption 4, creative",
      up_votes:"0"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"2",
      caption:"caption 1, creative",
      up_votes:"40"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"2",
      caption:"caption 2, creative",
      up_votes:"30"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"2",
      caption:"caption 3, creative",
      up_votes:"20"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"2",
      caption:"caption 4, creative",
      up_votes:"45"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"3",
      caption:"caption 1, creative",
      up_votes:"12"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"3",
      caption:"caption 2, creative",
      up_votes:"3"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"3",
      caption:"caption 3, creative",
      up_votes:"24"
  }),
    knex('captions').insert({
      facebook_id:"10103893635535073",
      post_id:"3",
      caption:"caption 4, creative",
      up_votes:"12"
  })
 );
 }
