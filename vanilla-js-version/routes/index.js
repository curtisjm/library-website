const express = require('express')
const router = express.Router()

const Book = require('../models/book')

// use router to create routes
router.get('/', async (req, res) => {
    let books
    try {
        // sort books by created at date in descending order and include the 10 most recent ones
        books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
    } catch {
       books = []
    }
    res.render('index', { books: books })
})

// export info from this file
module.exports = router