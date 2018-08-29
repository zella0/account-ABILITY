const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');

module.exports = {
  renderUser: (req, res) => {
    // let curTime = Date.now();
    // curTime.getHours()
    // console.log();
    knex('todos')
      .where('todos.user_id', req.params.id)
      .then((todos)=>{
        console.log(todos);
        res.render('user', {
          API_KEY: API_KEY,
          todos: todos,
          user_id: req.session.user_id
        });
      })
  },
  createTodo: (req, res) => {
    knex('todos')
      .insert({
        title: req.body.title,
        description: req.body.description,
        location: "" || req.body.latLng,
        due_time: "" || req.body.time,
        reward_points: 10,
        user_id: req.session.user_id
      })
      .then(() => {
        res.redirect(`/user/${req.session.user_id}`);
      })
  }
}
