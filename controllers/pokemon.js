const knex = require("../db/knex.js");
// const fs = require('fs');
// const API_KEY = fs.readFileSync(".apikey", 'utf8');
// const moment = require('moment');
// const axios = require('axios');

module.exports = {
  // user should lose 50 points
  // pokemon should gain 20 xp
  // if (pokemon xp / (100 * pokemon[0].level)) * 100) >= 100 { gain 1 level, xp = 0}
  feedPokemon: (req, res) => {
    knex('users')
      .where('users.id', req.session.user_id)
      .then((user) => {
        if (user[0].points < 50) {
          res.redirect('/');
        } else {
          // if user has more than 50 points
          let promiseArr = [];

          let userPtsPromise = knex('users')
            .where('users.id', req.session.user_id)
            .increment('points', -50)
          promiseArr.push(userPtsPromise);

          let pokeLvlPromise = knex('pokemons')
            .where('pokemons.owner_id', req.session.user_id)
            .then((pokemon) => {
              if ((pokemon[0].xp + 20) / (pokemon[0].level * 100) * 100 >= 100) {
                let levelUp = pokemon[0].level + 1;
                console.log(levelUp);
                return knex('pokemons')
                  .where('pokemons.owner_id', req.session.user_id)
                  .update({
                    level: levelUp,
                    xp: 0,
                    hp: pokemon[0].hp+20
                  })
              }
            })
          promiseArr.push(pokeLvlPromise);

          let pokeXpPromise = knex('pokemons')
            .where('pokemons.owner_id', req.session.user_id)
            .increment('xp', 20)
          promiseArr.push(pokeXpPromise);

          Promise.all(promiseArr)
            .then((results) => {
              console.log(results);
              res.redirect('/');
            })
        }
      })
  }
}
