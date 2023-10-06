const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },

});


User.pre('save', function(next) {
    //hash the password before saving it to the database
    const hash = bcrypt.hash(this.password, 10);
    //replace the clear text passowrd with the hashed one
    this.password = hash;
    next();
});

module.exports = mongoose.model('User', User);