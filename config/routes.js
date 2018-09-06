const index_controller = require("../controllers/index.js");
const user_controller = require("../controllers/user.js");
const pokemon_controller = require("../controllers/pokemon.js");

module.exports = function(app) {
  app.get('/', index_controller.renderMain);

  app.post('/userRegister', index_controller.userRegister);
  app.post('/userLogin', index_controller.userLogin);

  app.use(authMiddleWare);

  app.get('/user/feedPokemon', pokemon_controller.feedPokemon);

  app.get('/user/:id', user_controller.renderUser);
  app.post('/user/:id/createTodo', user_controller.createTodo);
  app.post('/user/:id/createCheckin', user_controller.createCheckin);

  app.get('/user/deleteTodo/:id', user_controller.deleteTodo);
  app.get('/user/deleteCheckin/:id', user_controller.deleteCheckin);
  app.post('/user/updateTodo/:id', user_controller.updateTodo);
  app.post('/user/updateCheckin/:id', user_controller.updateCheckin);


}

function authMiddleWare(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/');
  } else {
    next();
  }
}
