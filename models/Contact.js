const mongoose = require('mongoose')
const validator = require('validator')


const ContactSchema = mongoose.Schema({
    
    name: String,

    email: {
        type: String,
        required: [true, "Email is required."],
        validate: [validator.isEmail, 'Please provide a valid email']
    },

    message: String,
    phone: String,
    

}, {timestamps: true})


module.exports = mongoose.model('Contact', ContactSchema)