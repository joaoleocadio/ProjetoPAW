const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({

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
    vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador' },
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Produto', ProdutoSchema)