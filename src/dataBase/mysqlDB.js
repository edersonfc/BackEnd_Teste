const mysql = require('mysql');
const express = require('express');
const app = express();
//const routes = require('./routes')



const connection = mysql.createConnection({

    /* SERVIDOR LOCAL*/
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'app_mobile'


});



//VERIFICA SE A CONEÇÃO FOI FEITA
connection.connect(function (err) {
	if (err) return console.log(err);
	console.log('conectou!');
});
//const bodyParser = require('body-parser')