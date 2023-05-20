const ThemesPropertiesService = require('../service/themesProperties.service');

///cuando se trata de listar es mejor usar SQL puro por cuestion de tiempo
const listar = async function (req, res) {
    console.log("listar temas/propiedades");
    try {
        const themesProperties = await ThemesPropertiesService.listar(req.params.id);
        if (themesProperties) {
            // en users[0] se encuentra el listado de lo que se recupera desde el sql
            res.json({
                success: true,
                temas_propiedades: themesProperties
            });
        } else {
            res.json({
                success: true,
                temas_propiedades: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
}; 

const actualizar = async function (req, res) {
    console.log("actualizar temas propiedades");
    let themePropertyRetorno = null;
    try {
        themePropertyRetorno = await ThemesPropertiesService.actualizar(
            req.body.id, req.body.theme_id, req.body.property_name, 
            req.body.property_value
        );
        res.json({
            success: true,
            themes_properties: themePropertyRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
}; 
const eliminar = async function (req, res) {
    console.log("eliminar temas propiedades");

    try {
        const tema_propiedadRetorno =  await ThemesPropertiesService.eliminar(req.params.id);
        res.json({
            success: tema_propiedadRetorno,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
}; 
module.exports = {
    listar, actualizar, eliminar
};
