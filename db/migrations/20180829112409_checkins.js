exports.up = function(knex, Promise) {
  return knex.schema.createTable('checkins', (table) => {
    table.increments();
    table.string('location_address');
    table.string('location_latlng');
    table.string('description');
    table.string('checkin_time');
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
  return knex.schema.dropTable('checkins');
};
