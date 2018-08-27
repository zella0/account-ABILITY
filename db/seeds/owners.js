exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('owners').del()
    .then(function() {
      // Inserts seed entries
      return knex('owners').insert([{
          owners_name: 'chelsea',
          email: 'chelsea@chelsea.com',
          password: 'chelsea'
        },
        {
          owners_name: 'meryl',
          email: 'meryl@meryl.com',
          password: 'meryl'
        },
        {
          owners_name: 'diana ross',
          email: 'diana@diana.com',
          password: 'diana'
        }
      ]);
    });
};