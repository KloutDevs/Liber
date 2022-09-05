const { Schema, model } = require('mongoose');

const users = new Schema({
	id: {
		type: Number,
		unique: true,
		required: true,
	},
    mail: String,
    user: String,
    password: String,
});

module.exports = model('users', users);