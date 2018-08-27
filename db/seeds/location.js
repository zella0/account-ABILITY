exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('location').del()
    .then(function() {
      // Inserts seed entries
      return knex('location').insert([{
          location_name: 'starbucks',
          location_address: ''
        },
        {
          location_name: 'the larry',
          location_address: 'galvanize'
        },
        {
          location_name: '76 gas station',
          location_address: '76'
        }
      ]);
    });
};