const { sequelize } = require("../connection");
const { ThemesPropertiesModel } = require("../model/themesProperties.model");

const listar = async function (id) {

    console.log("listar propiedades de un tema");
    try {
        const themesProperties = await sequelize.query(`SELECT *
        FROM themes_properties WHERE 1=1 AND theme_id = ${id}
        ORDER BY id`);
        if (themesProperties && themesProperties[0]) {
            return themesProperties[0];
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        throw error;
    }

};

const actualizar = async function (id,theme_id,property_name,property_value) {
    console.log("actualizar theme property");
    let themePropertyRetorno = null; //guarda el tema que se va incluir o editar;
    const data = {id, theme_id, property_name, property_value}; //se obtiene los datos del cuerpo de la peticion
    try {
        let themePropertyResult = null;
        if (id) {
            themePropertyResult = await ThemesPropertiesModel.findByPk(id);
        }
        if (themePropertyResult) {
            themePropertyRetorno = await ThemesPropertiesModel.update(data, { where: { id: id } });
            themePropertyRetorno = data;
        } else {
            themePropertyRetorno = await ThemesPropertiesModel.create(data);
        }
        return themePropertyRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
}; 
//eliminar
const eliminar = async function (id) {
    console.log("eliminar temas propiedades");

    try {
        await ThemesPropertiesModel.destroy({ where: { id: id } });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}; 
module.exports = {
    listar, actualizar, eliminar
};