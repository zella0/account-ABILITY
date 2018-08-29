const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');

module.exports = {
  renderUser: (req, res)=>{
    res.render('user', {
      API_KEY: API_KEY
    });
  }
}
