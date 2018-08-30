
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pokemons', (table)=>{
    table.increments();
    table.string('pokemon_name');
    table.string('abilities');
    table.string('img_url');
    table.integer('level').defaultTo(0);
    table.integer('hp').defaultTo(100);
    table.integer('xp').defaultTo(0);
    table.integer('owner_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pokemons')
};
