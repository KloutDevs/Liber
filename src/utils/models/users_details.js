const { Schema, model } = require('mongoose');

const users_details = new Schema({
	id: {
		type: Number,
		unique: true,
		required: true,
	},
    name: String,
    detail: String,
	diary: [],
	schedule: [],
	history: []
});

module.exports = model('users_details', users_details);