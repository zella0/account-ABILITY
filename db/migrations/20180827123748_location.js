exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', (table) => {
    table.increments();
    table.string('location_name');
    table.string('location_address');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
