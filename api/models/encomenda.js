const mongoose = require('mongoose')

const EncomendaSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador' },
    produtos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Produto'}]
})

module.exports = mongoose.model('Encomenda', EncomendaSchema)