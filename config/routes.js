const index_controller = require("../controllers/index.js");
const user_controller = require("../controllers/user.js");

module.exports = function(app){
  app.get('/', index_controller.renderMain);

  app.post('/userRegister', index_controller.userRegister);
  app.post('/userLogin', index_controller.userLogin);

  app.use(authMiddleWare);
  app.get('/user/:id', user_controller.renderUser);
  app.post('/user/:id/createTodo', user_controller.createTodo);
}

function authMiddleWare(req, res, next){
  if(!req.session.user_id){
    res.redirect('/');
  }else{
    next();
  }
}
