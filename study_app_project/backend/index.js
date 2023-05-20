const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser());

app.use(cors({
    origin: '*'
}));

const userRoute = require("./src/route/users.route");
const themeRoute = require("./src/route/themes.route");
const topicRoute = require("./src/route/topics.route");
const themesPropertiesRoute = require("./src/route/themesProperties.route"); 

//Ruta raiz
app.get('/', function (req, res) {
    //Logica.
    res.send('Hello World');
});

app.get('/pagina2', function (req, res) {
    //Logica de negocios
    //esta aqui -Controller

    res.json({application: 'Study APP', version: '1.0.0'});
});

//Llamadas a los routes de los UCs
userRoute(app);
themeRoute(app);
topicRoute(app);
themesPropertiesRoute(app);

app.listen(4000);