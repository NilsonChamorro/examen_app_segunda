const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("bd_study_app", 'postgres', 'SCT-2014', {
    host : 'localhost',
    port : 5432,
    dialect : 'postgres'
});

const testConnection = function() {
    try {
        sequelize.authenticate();
        console.log("Conectado con Exito!!!");
    } catch (error) {
        console.log("Error de conexion", error);
    }
}

testConnection();

module.exports = {
    Sequelize,
    sequelize
}