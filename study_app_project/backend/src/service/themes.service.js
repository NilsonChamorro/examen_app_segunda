const { sequelize } = require("../connection");
const { ThemeModel } = require("../model/themes.model");

const listar = async function (textoBuscar) {
    console.log("listar temas");
    try {
        const themes = await sequelize.query(`SELECT * FROM themes WHERE  
                                            UPPER(name) LIKE UPPER('%${textoBuscar}%') 
                                            ORDER BY id`);
        console.log("themes", themes);
        if (themes && themes[0]) {
            return themes[0];
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

const buscarPorCodigo = async function (id) {
    console.log("consultar tema");
    try {
        const themeModelResult = await ThemeModel.findByPk(id);
        if (themeModelResult) {
            return themeModelResult;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function (id, create_date, name, description, keywords, owner_user_id) {
    console.log("actualizar tema");
    let temaRetorno = null;
    const data = {id, create_date, name, description, keywords, owner_user_id};

    try {
        let themeModelResult = null;
        if (id) {
            themeModelResult = await ThemeModel.findByPk(id);
        }
        if (themeModelResult) {
            temaRetorno = await ThemeModel.update(data, { where: { id: id } });
            temaRetorno = data;
        } else {
            temaRetorno = await ThemeModel.create(data);
        }
        return temaRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function (id) {
    console.log("eliminar tema");

    try {
        //ThemeModel.destroy(req.params.id);
        const themes = await sequelize.query("DELETE FROM themes WHERE id = " + id);
        console.log("tema eliminado");
        return themes;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    listar, buscarPorCodigo, actualizar, eliminar
};