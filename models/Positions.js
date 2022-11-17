const mongoose = require('mongoose')


const PositionSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'The name of the role is required!']
    },

    levels: {
        type: [Number],
        enum: [100, 200, 300, 400, 500]
    }

},
{
    timestamp: true,
})


module.exports = mongoose.model('Posiitons', PositionSchema)