exports.up = function(knex, Promise) {
  return knex.schema.createTable('bathroom', (table) => {
    table.increments();
    table.string('img')
    table.integer('stars').defaultTo(0);
    table.string('bathroom_type');
    table.string('review');
    table.integer('users_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
      .index();
    table.integer('location_id')
      .references('id')
      .inTable('location')
      .onDelete('cascade')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bathroom');
};