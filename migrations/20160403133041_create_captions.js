
exports.up = function(knex, Promise) {
 return knex.schema.createTable('captions', function(t){
   t.increments();
   t.string('facebook_id').unique();
   t.integer('post_id');
   t.string('caption');
   t.timestamps();
   t.integer('up_votes');
   t.string('time');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('captions');
}
