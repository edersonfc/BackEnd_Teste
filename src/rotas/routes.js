var express = require('express');
var router = express.Router();
// router.use(express.json());
const UserController = require('../controllers/userController')

// const User = require('../models/user')

//Creating one Instance of class userController
const userController = new UserController()

const jwt = require('jsonwebtoken')

router.use(express.json());



// router.get('/logar_usuarios', userController.loginUser)

// router.get('/buscar_usuarios', authetication_middle, userController.buscarUsuariosMetodo) 

// router.post('/cadastro_usuarios', userController.store)


router.post('/teste', userController.InserirUsuarios)



// 'http://localhost:5000/teste'






function authetication_middle(req, res, next) {

	var SECRET = 'senha_do_token';
	const { id } = req.body
	const [,token] = req.headers.authorization.split(" ")
	jwt.verify(token, SECRET, (error, decoding) => {
		if (error) return res.status(401).json({ messagem: 'Não autorizado' });
		// if (error) res.status(401).json(console.log(id + " Não autorizado"));
		req.id = decoding.id;
		next();
	})
}












module.exports = router;

