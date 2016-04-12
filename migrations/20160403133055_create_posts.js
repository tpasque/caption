
exports.up = function(knex, Promise) {
 return knex.schema.createTable('posts', function(t){
   t.increments();
   t.string('post_facebook_id');
   t.integer('brand_id');
   t.text('campaign_photo_url');
   t.text('public_id');
   t.date('start_date');
   t.date('end_date');
   t.integer('points_for_win');
   t.decimal('money_for_win');
   t.string('time');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts');
}
