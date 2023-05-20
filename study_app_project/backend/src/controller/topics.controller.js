const TopicService = require("../service/topics.service");

const listar = async function (req, res) {
    console.log("listar topicos");
    try {
        const topics = await TopicService.listar(req.query.filtro || '');
        console.log("topics", topics);
        if (topics) {
            res.json({
                succes: true,
                topicos: topics
            });
        } else {
            res.json({
                succes: true,
                topicos: []
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

const buscarPorCodigo = async function (req, res) {
    console.log("consultar topico");

    try {
        const topicModelResult = await TopicService.buscarPorCodigo(req.params.id, req.body.topic);
        if (topicModelResult) {
            res.json({
                succes: true,
                topic: topicModelResult
            });
        } else {
            res.json({
                succes: true,
                topico: null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

const actualizar = async function (req, res) {
    console.log("actualizar topico");
    let topicoRetorno = null;

    try {
        topicoRetorno = await TopicService.actualizar(req.body.id, req.body.create_date, req.body.name, 
                                                        req.body.topic_id, req.body.order, req.body.priority, 
                                                        req.body.color, req.body.owner_user_id);
        
        res.json({
            succes: true,
            topico: topicoRetorno
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

const eliminar = async function (req, res) {
    console.log("eliminar topico");

    try {
        //TopicModel.destroy(req.params.id);
        await TopicService.eliminar(req.params.id);
        res.json({
            succes: true,
        });
    } catch (error) {
        console.log(error);
        res.json({
            succes: false,
            error: error.message
        });
    }
};

module.exports = {
    listar, buscarPorCodigo, actualizar, eliminar
};