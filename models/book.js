const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/bookCovers'

// create a schema - a table
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        // reference author from authors collection, tells mongoose to reference another object inside of our collections
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // tell mongoose what we're referencing, must match name set in author model
        ref: 'Author'
    }
})

// used to display the cover images of books in the search books section
bookSchema.virtual('coverImagePath').get(function() {
    if(this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})


module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath