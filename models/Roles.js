const mongoose = require('mongoose')


const RolesSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'The name of the role is required!']
    },

    levels: {
        type: [String | Number],
        default: [100, 200, 300, 400, 500]
    }

},
{
    timestamp: true,
})


module.exports = mongoose.model('Roles', RolesSchema)