const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },
    nome: {
		type: String,
		required: true
	},
    stock: {
		type: Number,
		required: true
	},  
    preco: {
        type: Number,
        required: true
    }, 
    descricao: {
        type: String,
        required: true
    },
    
    //user: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador' },
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Produto', ProdutoSchema)