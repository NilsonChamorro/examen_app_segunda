const { sequelize } = require("../connection");
const { UserModel } = require("../model/users.model");

const listar = async function (textoBuscar) {
    console.log("listar usuarios");
    try {
        const users = await sequelize.query(`SELECT * FROM users WHERE  
                                            UPPER(name) LIKE UPPER('%${textoBuscar}%') 
                                            AND deleted IS false
                                            ORDER BY id`);

        if (users && users[0]) {
            return users[0];
        } else {
            return []
        }
    } catch (error) {
        throw error;
    }
};

const consultarPorCodigo = async function (id) {
    console.log("consultar usuario");

    try {
        const userModelResult = await UserModel.findByPk(id);
        if (userModelResult) {
            return userModelResult;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function (id, name, last_name, avatar, email, password, deleted) {
    console.log("actualizar usuarios service");
    //Variables
    let usuarioRetorno = null; //Guardará el usuario que se va a incluir o editar
    const data = {id, name, last_name, avatar, email, password, deleted};
    
    try {
        let userModelResult = null;
        if (id) {
            userModelResult = await UserModel.findByPk(id);//Buscar usuario por id pasado.
        }
        if (userModelResult) {
            //Asegurar que el usuario existe, entonces actualizar
            usuarioRetorno = await UserModel.update(data, { where: { id: id } });
            usuarioRetorno = data;
        } else {
            //Incluir
            usuarioRetorno = await UserModel.create(data);
        }
        
        return usuarioRetorno;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function (id) {
    console.log("eliminar usuario");
    //BorradoFisico
    //UserModel.destroy(req.params.id);
    try {
        const retorno = await sequelize.query(`UPDATE users SET deleted = true WHERE id = ${id}`);
        return retorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};