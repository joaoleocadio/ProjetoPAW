const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    nome: {
		type: String,
		required: true
	},
    quantidade: {
		type: number,
		required: true
	},  
    preco: {
        type: Number,
        required: true
    },    
    /*
    role: {
        type: String,
        enum: ['ADMIN', 'COMERCIANTE', 'CLIENTE', 'EXT'],
        default: 'EXT',
        index: true
    },
    updated_at: { type: Date, default: Date.now }*/

})

module.exports = mongoose.model('Produto', UserSchema)