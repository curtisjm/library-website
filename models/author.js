const mongoose = require('mongoose')
const Book = require('./book')

// create a schema - a table
const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// run this before removing an author
// make sure we don't delete an author that still has books
authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
        if(err) {
            next(err)
        } else if(books.length > 0) {
            next(new Error('This author still has books'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)