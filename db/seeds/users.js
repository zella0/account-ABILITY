exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([{
          name: 'troy',
          email: 'troy@troy.com',
          password: 'troy',
          comments: 'smells like greatness'
        },
        {
          name: 'nick',
          email: 'nick@nick.com',
          password: 'nick',
          comments: 'great lighting'
        },
        {
          name: 'jeff',
          email: 'jeff@jeff.com',
          password: 'jeff',
          comments: 'automatic flush doesnt work'
        }
      ]);
    });
};