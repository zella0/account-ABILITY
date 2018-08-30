const knex = require("../db/knex.js");
const fs = require('fs');
const API_KEY = fs.readFileSync(".apikey", 'utf8');
const moment = require('moment');

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
        // console.log(results[0]);
        // console.log('////////');
        // console.log(results[1]);
        res.render('user', {
          API_KEY: API_KEY,
          user_id: req.session.user_id,
          todos: results[0],
          checkins: results[1],
          // moment: moment
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

    // CHECK FOR TIME
    let isInTime;
    let currentDate = moment().format('L');
    let currentTime = moment().format('hh:mm a');
    let due_date = req.body.checkin_time.substring(0, 10);
    let due_time = req.body.checkin_time.substring(11, req.body.checkin_time.length)
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

    // CHECK FOR LOCATION
    function initMap() {
      let isInRange;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let destinationCoords = req.body.location_latlng;
          destinationCoords = destinationCoords.split(',');
          let destinationLat = Number(destinationCoords[0]);
          let destinationLng = Number(destinationCoords[1]);
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          let p1 = new google.maps.LatLng(pos.lat, pos.lng);
          let p2 = new google.maps.LatLng(destinationLat, destinationLng);

          if (calcDistanceToMiles(p1, p2) <= 0.5) {
            isInRange = true;
            alert(`${calcDistanceToMiles(p1, p2)} miles away. In range of location!`)
          } else {
            isInRange = false;
            alert(`${calcDistanceToMiles(p1, p2)} miles away. Not in range of location!`)
          }
        }, );
        return isInRange;
      }
    }

    // console.log(isInTime);

    // knex('users')
    // .where('users.id', req.session.user_id)
    // .increment('points', 20)
    // .then(()=>{
    //   res.redirect(`/user/deleteTodo/${req.params.id}`);
    // })

  }
}

function calcDistanceToMiles(p1, p2) {
  return (0.621371 * (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000)).toFixed(2);
}
