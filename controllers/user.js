const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');
const moment = require('moment');
const axios = require('axios');

// table.string('pokemon_name');
// table.string('abilities');
// table.string('img_url');
// table.integer('level').defaultTo(0);
// table.integer('hp').defaultTo(100);
// table.integer('xp').defaultTo(0);
// table.integer('owner_id')

module.exports = {
  renderUser: (req, res) => {
    let promiseArr = [];

    let todos = knex('todos')
      .where('todos.user_id', req.params.id);
    promiseArr.push(todos);

    let checkins = knex('checkins')
      .where('checkins.user_id', req.params.id);
    promiseArr.push(checkins);

    let user = knex('users')
      .where('users.id', req.session.user_id)
    promiseArr.push(user);

    let pokemon = knex('pokemons')
      .where('pokemons.owner_id', req.session.user_id)
    promiseArr.push(pokemon);

    Promise.all(promiseArr)
      .then((results) => {
        res.render('user', {
          API_KEY: API_KEY,
          user_id: req.session.user_id,
          todos: results[0],
          checkins: results[1],
          user: user[2],
          pokemon: pokemon[3]
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
  },
  deleteTodo: (req, res) => {
    knex('todos')
      .where('todos.id', req.params.id)
      .del()
      .then(() => {
        res.redirect(`/user/${req.session.user_id}`);
      })
  },
  deleteCheckin: (req, res) => {
    knex('checkins')
      .where('checkins.id', req.params.id)
      .del()
      .then(() => {
        res.redirect(`/user/${req.session.user_id}`);
      })
  },
  updateTodo: (req, res) => {
    let isInTime;
    let currentDate = moment().format('L');
    let currentTime = moment().format('hh:mm a');
    let due_date = req.body.due_date.substring(0, 10);
    let due_time = req.body.due_date.substring(11, req.body.due_date.length)
    currentTime = currentTime.replace(/ /g, '').toLowerCase();
    due_time = due_time.replace(/ /g, '').toLowerCase();

    let beginningTime = moment(currentTime, 'h:mma');
    let endTime = moment(due_time, 'h:mma');
    let beforeDueDate = moment(currentDate).isBefore(due_date);
    let sameDueDate = moment(currentDate).isSame(due_date);
    let beforeDueTime = beginningTime.isBefore(endTime);
    if (beforeDueDate === true) {
      isInTime = true;
    } else if (sameDueDate === true && beforeDueTime === true) {
      isInTime = true;
    } else {
      isInTime = false;
    }
    if (isInTime === true) {
      knex('users')
        .where('users.id', req.session.user_id)
        .increment('points', 10)
        .then(() => {
          res.redirect(`/user/deleteTodo/${req.params.id}`);
        })
    } else {
      knex('users')
        .where('users.id', req.session.user_id)
        .increment('points', -5)
        .then(() => {
          res.redirect(`/user/deleteTodo/${req.params.id}`);
        })
    }
  },
  updateCheckin: (req, res) => {
    // if past time, send a post request -10 THEN redirect to delete
    // if within time, check for location
    // if location out of range dont send a post request
    // if location in range send a post request +20 THEN redirect to delete
    if (req.body.isInTime === false) {
      knex('users')
        .where('users.id', req.session.user_id)
        .increment('points', -10)
        .then(() => {
          res.redirect(`/user/deleteCheckin/${req.params.id}`);
        })
    } else if (req.body.isInTime === true && req.body.isInRange === false) {
      res.redirect(`/user/${req.session.user_id}`);
    } else if (req.body.isInTime === true && req.body.isInRange === true) {
      knex('users')
        .where('users.id', req.session.user_id)
        .increment('points', 20)
        .then(() => {
          res.redirect(`/user/deleteCheckin/${req.params.id}`);
        })
    }
  }
}
