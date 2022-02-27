
//Start Server EXPRESS
const express = require('express');
const app = express();

//Import file that use DataBase;
// require('./src/dataBase/mongoDB');
require('./src/dataBase/mysqlDB');

const routes = require('./src/rotas/routes');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const cors = require('cors');
// app.use(cors()); // OU
// app.use(cors( {origin:'http://urls_que_voce_quer_permitir_que_acessa_seus_dados'} ));

//Path of routes
app.use(routes);
//show Status of Server
// app.listen(3000, () => {
app.listen(process.env.PORT || 5000, () => {
	console.log('Executando em http://localhost:5000/');
});





