
exports.up = function(knex, Promise) {
 return knex.schema.createTable('rank', function(t){
   t.increments();
   t.string('green_pepper');
   t.string('banana_pepper');
   t.string('jalapeno');
   t.string('habanero');
   t.string('jamaican_hot_pepper');
   t.string('ghost_pepper');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('rank');
}
