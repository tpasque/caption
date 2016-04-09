
exports.up = function(knex, Promise) {
 return knex.schema.createTable('brands', function(t){
   t.increments();
   t.string('facebook_id');
   t.string('brand_name');
   t.text('brand_image_url');
   t.text('public_id');
   t.timestamps();
   t.string('time');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('brands');
}
