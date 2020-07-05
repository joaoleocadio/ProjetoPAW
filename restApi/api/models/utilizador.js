const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    firstName: {
		type: String,
		required: true
	},
    lastName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		unique: true,
        required: true
    },    
    address: {
        type: String
    },    
    age: Number,
    email: { 
        type: String,
        unique: true,
        required: true 
    },
    password: { type: String, required: true },
    phoneNumber: Number,
    //id: { type: String, unique: true, required: true },
    role: {
        type: String,
        enum: ['ADMIN', 'COMERCIANTE', 'CLIENTE'],
        default: 'CLIENTE',
        index: true
    },
    encomenda: [{type: mongoose.Schema.Types.ObjectId, ref: 'Encomenda'}],
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Utilizador', UserSchema)