import Author from '../models/author.js'
import Book from '../models/book.js'

// const Author = require('../models/author.js')
// const Book = require('../models/book.js')

export const allAuthors = async(req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
	    const authors = await Author.find(searchOptions)
	    res.status(200).json(authors)
    } catch(err) {
        console.log('here')
	    res.status(404).json({ message: err.message})
    }
}