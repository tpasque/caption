
exports.up = function(knex, Promise) {
 return knex.schema.createTable('rank', function(t){
   t.increments();
   t.string('bell_pepper');
   t.string('pimento_pepper');
   t.string('poblano_pepper');
   t.string('anaheim_pepper');
   t.string('jalapeno_pepper');
   t.string('cayenne_pepper');
   t.string('habanero_pepper');
   t.string('ghost_pepper');
   t.string('scorpion_pepper');
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('rank');
}
