const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({

    regNo: {
        type: String,
        unique: true,
        required: [true, 'Please provide a registration number']
    },

    password: {
        type: String,
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin']
    },

    email: String,
    phone: String,
    photo: String,

}, 
{
    timestamps: true
})



module.exports = mongoose.model('User', UserSchema)