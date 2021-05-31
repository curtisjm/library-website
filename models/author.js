const mongoose = require('mongoose')

// create a schema - a table
const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)