
//Start Server EXPRESS
const express = require('express');
const app = express();

//Import file that use DataBase
require('./src/dataBase/mongoDB')

const routes = require('./src/rotas/routes')

const bodyParser = require('body-parser')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//Path of routes
app.use(routes);


//show Status of Server
app.listen(3000, () => {
	console.log('Executando em http://localhost:3000/');
});



