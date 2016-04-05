
exports.up = function(knex, Promise) {
 return knex.schema.createTable('brands', function(t){
   t.increments();
   t.string('facebook_id');
   t.string('brand_name');
   t.string('brand_image_url');
   t.timestamps();
   t.string('time');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('brands');
}
