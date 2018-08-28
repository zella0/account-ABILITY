exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([{
          name: 'troy',
          email: 'troy@troy.com',
          password: 'troy'

        },
        {
          name: 'nick',
          email: 'nick@nick.com',
          password: 'nick'
        },
        {
          name: 'jeff',
          email: 'jeff@jeff.com',
          password: 'jeff'
        }
      ]);
    });
};
