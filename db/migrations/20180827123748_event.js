exports.up = function(knex, Promise) {
  return knex.schema.createTable('event', (table) => {
    table.increments();
    table.string('event_name');
    table.string('location');
    table.string('time');
    table.string('reward_points');
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
  return knex.schema.dropTable('event');
};
