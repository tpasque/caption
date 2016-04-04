
exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', function(t){
   t.increments();
   t.string('facebook_id').unique();
   t.text('profile_image_url');
   t.string('email');
   t.string('first_name');
   t.string('last_name');
   t.string('name');
   t.timestamps();
   t.decimal('total_money_earned');
   t.decimal('total_money_owed');
   t.float('total_points');
   t.boolean('is_admin');
   t.boolean('is_agency');
   t.boolean('is_piper');
   t.string('time');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('users');
}
