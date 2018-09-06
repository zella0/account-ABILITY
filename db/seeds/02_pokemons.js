
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemons').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemons').insert([
        {owner_id: 1},
        {owner_id: 2},
        {owner_id: 3}
      ]);
    });
};
