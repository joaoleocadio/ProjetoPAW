const mongoose = require('mongoose')

const ReclamacaoSchema = new mongoose.Schema({

    titulo: {
		type: String,
		required: true
	},
    corpo: {
		type: String,
		required: true
	},  
    estado: {
        type: String,
        required: true,
        enum: ['Em Tratamento', 'Tratada', 'Resolvida', 'Cancelada'],
        default: 'Em Tratamento',
    },
    
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Reclamação', ReclamacaoSchema)