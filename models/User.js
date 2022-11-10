const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({

    regNo: {
        type: String,
        unique: true,
        required: [true, 'Please provide a registration number']
    },

    password: {
        type: String,
        required: [true, "password is required"],
    },

    email: String,
    phone: String,
    photo: String,

}, 
{
    timestamps: true
})


module.exports = mongoose.model('User', UserSchema)