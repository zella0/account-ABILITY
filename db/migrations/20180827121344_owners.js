exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', (table) => {
    table.increments();
    table.string('owners_name');
    table.string('email');
    table.string('password');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners');
};