const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});


User.pre('save', async function(next) {
    //hash the password before saving it to the database
    const hash = await bcrypt.hash(this.password, 10);
    //replace the clear text passowrd with the hashed one
    this.password = hash;
    next();
});



User.methods.isValidPassword = async function(password) {
    //comparing the clear text password passed to the fucntion with the hashed one we saved in the database
    return bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('User', User);

