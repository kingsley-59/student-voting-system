const mongoose = require('mongoose')


const ContestantSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles'
    },

    votes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
    
}, {timestamps: true})


module.exports = mongoose.model('Contestants', ContestantSchema)