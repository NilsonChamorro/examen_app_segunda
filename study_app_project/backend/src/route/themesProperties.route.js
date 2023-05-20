const themes_propertiesController = require('../controller/themesProperties.controller');
module.exports = function (app){
    app.get("/themes_properties/list/:id", themes_propertiesController.listar);
    app.post("/themes_properties/update", themes_propertiesController.actualizar);
    app.delete("/themes_properties/delete/:id", themes_propertiesController.eliminar);
}
