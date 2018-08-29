exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([{
          user_name: 'troy',
          email: 'troy@troy.com',
          password: 'troy'

        },
        {
          user_name: 'nick',
          email: 'nick@nick.com',
          password: 'nick'
        },
        {
          user_name: 'jeff',
          email: 'jeff@jeff.com',
          password: 'jeff'
        }
      ]);
    });
};
