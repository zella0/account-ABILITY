exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bathroom').del()
    .then(function() {
      // Inserts seed entries
      return knex('bathroom').insert([{
          img: '',
          stars: '5',
          bathroom_type: 'single',
          review: ''
        },
        {
          img: '',
          stars: '4',
          bathroom_type: 'single',
          review: ''
        },
        {
          img: '',
          stars: '2',
          bathroom_type: 'public',
          review: ''
        }
      ]);
    });
};