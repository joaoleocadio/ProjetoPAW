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
        require: true
    },    
    address: String,
    age: Number,
    email: { 
        type: String,
        unique: true,
        required: true 
    },
    password: { type: String, required: true },
    phoneNumber: Number,
    idCard: { type: String, unique: true, required: true },
    role: {
        type: String,
        enum: ['ADMIN', 'COMERCIANTE', 'CLIENTE', 'EXT'],
        default: 'EXT',
        index: true
    },
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Utilizador', UserSchema)