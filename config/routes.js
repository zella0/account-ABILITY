const index_controller = require("../controllers/index.js");


module.exports = function(app){
  app.get('/', index_controller.renderMain);
}
