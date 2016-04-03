
exports.up = function(knex, Promise) {
 return knex.schema.createTable('brands', function(t){
   t.increments();
   t.string('facebook_id').unique();
   t.string('brand_name');
   t.timestamps();
   t.string('time');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('brands');
}
