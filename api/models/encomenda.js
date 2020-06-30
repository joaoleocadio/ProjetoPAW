const mongoose = require('mongoose')

const EncomendaSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador' },
    produtos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Produto'}],
    estado: {
        type: String,
        enum: ['Em Tratamento', 'Enviada para o cliente',
                'Recebida pelo cliente', 'Cancelada'],
        default: 'Em Tratamento',        
    },
})

module.exports = mongoose.model('Encomenda', EncomendaSchema)