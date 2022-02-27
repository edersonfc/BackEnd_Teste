var bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const SECRET = 'senha_do_token';

class UserController {


    ////////////////////////////////////////////////////////////////////////////////

    //Create Store and Inserting Data
    async store(req, res) {

        const { nome, email, senha, telefones } = req.body
       
        //criar o hash da senha
        const password_hash = await bcrypt.hashSync(senha, 8)
        const user = new User({ nome, email, senha: password_hash, telefones })
       
        //criar o token da senha
        const token = sign({}, 'encriptando', { subject: user._id.toString() })

        user.token = token
        const emailAlreadyExist = await User.findOne({ email })

        if (emailAlreadyExist) return res.status(401).json({
            messagem: 'Email já Existe !'
        })

        await user.save()
        return res.json(user)

    }


    ////////////////////////////////////////////////////////////////////////////////


    async loginUser(req, res) {

        const { id, email, senha } = req.body
        const { authorization } = req.headers
        // console.log(authorization)

        // const user = new User({ nome, email, senha, telefones })
        const return_all_data = await User.findOne({ token: authorization })
        // return res.json( return_all_data.token) 

        if (authorization === return_all_data.token) {
            if (email !== return_all_data.email) {
                return res.status(401).json({ messagem: 'Usuário e/ou senha inválidos' });
            } else {
                // Compare PassWordRaw with HashFromBd
                bcrypt.compare(senha, return_all_data.senha, function (err, results) {
                    if (err) {
                        throw new Error(err);
                    }
                    if (results) {
                        const { _id, nome, telefones } = return_all_data
                        //Creating token temporary
                        const token = jwt.sign({ userId: return_all_data.id }, SECRET, { expiresIn: 30 * 60 })
                        return res.json({
                            athentication: true, token, user: { _id, nome, email, telefones }
                        })
                    } else {
                        return res.status(401).json({ messagem: "Usuário e/ou senha inválidos" });
                    }
                })
            }


        } else if (authorization != return_all_data.token) {

            return res.status(401).json({ messagem: 'Não autorizado' });
        }


    }

    ////////////////////////////////////////////////////////////////////////////////



    // async buscarUsuariosMetodo(parametro_id) {
    async buscarUsuariosMetodo(req, res) {

        // console.log(  req.param.user_id )
        console.log(req.query.user_id)

        const id = req.query.user_id

        try {
            // console.log(parametro_id)
            const return_all_data = await User.findById(id)

            if (!return_all_data) {
                return res.status(401).json({ messagem: 'Usuário Não Encontrado' });
            }

            const { token, _id, nome, email, telefones, createdAt, updatedAt } = return_all_data

            return res.json(return_all_data)

        } catch (err) { { messagem: 'Erro ao Buscar Usuário !' } }

    }
    ////////////////////////////////////////////////////////////////////////////////




    async InserirUsuarios(req, res) {

        // const { id, email, senha } = req.body;
        // const { authorization } = req.headers;
        // console.log(req.query);
        console.log(req.body);
        let RespostaDoServidor = "{RESPOSTA"
        return res.json(req.body)

    }


}

module.exports = UserController, SECRET;