
exports.up = function(knex, Promise) {
 return knex.schema.createTable('ranks', function(t){
   t.increments();
   t.string('pepper');
   t.integer('min_points');
   t.integer('max_points');
   t.text('pepper_image_url');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('ranks');
}
