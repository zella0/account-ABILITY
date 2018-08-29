exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.integer('weapon_lvl').defaultTo(0);
    table.integer('armor_lvl').defaultTo(0);
    table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
