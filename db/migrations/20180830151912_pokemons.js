
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pokemons', (table)=>{
    table.increments();
    table.string('pokemon_name').defaultTo('Wobbuffet');
    table.string('abilities').defaultTo('Wobba');
    table.string('img_url').defaultTo('/img/wobba100hp.png');
    table.integer('level').defaultTo(1);
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
