const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');

module.exports = {
  renderMain: (req, res) => {
    if (req.session.user_id) {
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
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password
      })
      .then(() => {
        res.redirect('/');
      })
  },
  userLogin: (req, res) => {
    knex('users')
      .where('users.email', req.body.user_email)
      .then((user) => {
        if (user[0].password === req.body.user_password) {
          req.session.user_id = user[0].id
          res.redirect(`/user/${req.session.user_id}`)
        } else {
          res.redirect('/');
        }
      })
  },
  renderOwnerEntry: (req, res) => {
    if (req.session.owner_id) {
      res.redirect(`/owner/${req.session.owner_id}`)
    } else {
      res.render('owner_entry', {
        API_KEY: API_KEY,
      })
    }
  },
  ownerRegister: (req, res) => {

  },
  ownerLogin: (req, res) => {

  }
}
