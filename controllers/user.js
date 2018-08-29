const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');

module.exports = {
  renderUser: (req, res) => {
    let promiseArr = [];

    let todos = knex('todos')
      .where('todos.user_id', req.params.id);
    promiseArr.push(todos);

    let checkins = knex('checkins')
      .where('checkins.user_id', req.params.id);
    promiseArr.push(checkins);

    Promise.all(promiseArr)
      .then((results) => {
        console.log(results[0]);
        console.log('////////');
        console.log(results[1]);
        res.render('user', {
          API_KEY: API_KEY,
          user_id: req.session.user_id,
          todos: results[0],
          checkins: results[1]
        })
      })
  },
  createTodo: (req, res) => {
    knex('todos')
      .insert({
        title: req.body.todo_title,
        description: req.body.todo_description,
        due_date: "" || req.body.todo_time,
        reward_points: 10,
        user_id: req.session.user_id
      })
      .then(() => {
        res.redirect(`/user/${req.session.user_id}`);
      })
  },
  createCheckin: (req, res) => {
    knex('checkins')
      .insert({
        location_address: req.body.location_address,
        location_latlng: req.body.latLng,
        description: req.body.checkin_description,
        checkin_time: req.body.checkin_time,
        reward_points: 20,
        user_id: req.session.user_id
      })
      .then(() => {
        res.redirect(`/user/${req.session.user_id}`);
      })
  }
}
