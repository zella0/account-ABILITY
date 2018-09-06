const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');

module.exports = {
  renderMain: (req, res) => {
    if (req.session.user_id) {
      // change: if statement to false for redirecting sessions
      res.redirect(`/user/${req.session.user_id}`)
    } else {
      res.render('index', {
        API_KEY: API_KEY,
      })
    }
  },
  userRegister: (req, res) => {
    knex('users')
      .insert({
        user_name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password
      })
      .then(() => {
        res.redirect('/');
      })
  },
  // when user logs in, create a wobbafet right away
  userLogin: (req, res) => {
    knex('users')
      .where('users.email', req.body.user_email)
      .then((user) => {
        if (user[0].password === req.body.user_password) {
          req.session.user_id = user[0].id;
          knex('pokemons')
          // .where('pokemons.owner_id', )
          .insert({
            owner_id: user[0].id
          })
          .then(()=>{
            res.redirect(`/user/${user[0].id}`);
          })
        } else {
          res.redirect('/');
        }
      })
  }
}
