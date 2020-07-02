const mongoose = require('mongoose')

const EncomendaSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador' },
    produtos: [
        {
            quantidade: {type: Number},
            produto:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto'
            }
        }],
    estado: {
        type: String,
        enum: ['Em Tratamento', 'Enviada para o cliente',
                'Recebida pelo cliente', 'Cancelada'],
        default: 'Em Tratamento',        
    },
    address: {type: String, required: true},
    info: {type: String},
    observacoes: {type: String},
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Encomenda', EncomendaSchema)