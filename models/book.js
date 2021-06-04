const mongoose = require('mongoose')

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
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
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

// make a virtual item from other elements of the schema
// used to display the cover images of books in the search books section
bookSchema.virtual('coverImagePath').get(function() {
    if(this.coverImage!= null && this.coverImageType != null) {
        return `data: ${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Book', bookSchema)