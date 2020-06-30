const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({

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
    descricao: {
        type: String,
        required: true
    },
    
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Produto', ProdutoSchema)