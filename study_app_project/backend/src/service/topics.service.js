const { sequelize } = require("../connection");
const { TopicModel } = require("../model/topics.model");

const listar = async function (textoBuscar) {
    console.log("listar topicos");
    try {
        const topics = await sequelize.query( `SELECT * FROM topics WHERE
                                            UPPER(name) LIKE UPPER('%${textoBuscar}%')
                                            ORDER BY id`);
        console.log("topics", topics);
        if (topics && topics[0]) {
            return topics[0];
        } else {
            return []; 
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const buscarPorCodigo = async function (id) {
    console.log("Consultar topico");

    try {
        const topicModelResult = await TopicModel.findByPk(req.params.id);
        if (topicModelResult) {
            return topicModelResult;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const actualizar = async function (id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topico");
    let topicoRetorno = null;
    const data = {id, create_date, name, topic_id, order, priority, color, owner_user_id};

    try {
        let topicModelResult = null;
        if (id) {
            topicModelResult = await TopicModel.findByPk(id);
        }
        if (topicModelResult) {
            topicoRetorno = await TopicModel.update({data}, { where: { id: id } });
            topicoRetorno = data;
        } else {
            topicoRetorno = await TopicModel.create(data);
        }
        return topicoRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function (id) {
    console.log("eliminar topico");

    try {
        //TopicModel.destroy(req.params.id);
        const topics = await sequelize.query("DELETE FROM topics WHERE topic_id = " + id);
        console.log("topico eliminado");
        return topics;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    listar, buscarPorCodigo, actualizar, eliminar
};