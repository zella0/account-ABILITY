const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');

module.exports = {
  renderMain: (req, res)=>{
    res.render('index', {
      API_KEY: API_KEY
    })
  }
}
