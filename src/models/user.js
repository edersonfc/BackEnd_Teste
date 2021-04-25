const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    token: {

        type: String,
        required: true,

    },

    nome: {

        type: String,
        required: true,

    },

    email: {

        type: String,
        required: true,
        unique: true

    },

    senha: {

        type: String,
        required: true,

    },

    telefones: {

        type: [{

            _id: false,
            numero: {
                type: String,
                required: true,
            },

            ddd: {
                type: String,
                required: true,
            }

        }],
        required: true

    },


},

    { timestamps: true, }

)

module.exports = mongoose.model('User', UserSchema)