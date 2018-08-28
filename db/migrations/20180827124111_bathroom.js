exports.up = function(knex, Promise) {
  return knex.schema.createTable('bathroom', (table) => {
    table.increments();
    table.string('img_url');
    table.integer('stars').defaultTo(0);
    table.string('bathroom_type');
    table.integer('location_id')
      .notNullable()
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
