exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', (table) => {
    table.increments();
    table.string('title');
    table.string('description');
    table.string('location');
    table.string('due_time');
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
  return knex.schema.dropTable('todos');
};
