const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, unique: true },
    password: { type: Number },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
