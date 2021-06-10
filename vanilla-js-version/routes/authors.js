const express = require('express')
const router = express.Router()
// import our author definition
const Author = require('../models/author')
const Book = require('../models/book')

// all authors route
router.get('/', async (req, res) => {
    // variable to store all of our search objects
    // initialize with an empty object to show all if no options are specified
    let searchOptions = {}
    // use query instead of body for get requests
    if(req.query.name != null && req.query.name !== '') {
        // regex allows us to search for part of the text inside of the field in this case
        // i flag says that it is not case sensitive
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    // display all of the authors
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        // redirect users to the home page if something goes wrong
        res.redirect('/')
    }
})

// new author route
router.get('/new', (req, res) => {
    // create an author object
    res.render('authors/new', { author: new Author() })
})

// create author route
router.post('/', async (req, res) => {
    // name will be name input
    const author = new Author({
        // tell the server which parameters we want to accept from the client because other ones could be sent
        name: req.body.name
    })
    try {
        // save author to database, wait for creation, then populate newAuthor variable
        const newAuthor = await author.save()
        // take users to a page for the new author
        res.redirect(`authors/${newAuthor.id}`)
    } catch {
        // send back to new author page with an error message
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
})

// show author
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(6).exec()
        res.render('authors/show', { 
            author: author,
            booksByAuthor: books
        })
    } catch {
        res.redirect('/')
    }
})

// edit author
router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    } catch {
        res.redirect('/authors')
    }
})

// update author
router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch {
        if(author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating author'
            })
        }
    }
})

// delete author
router.delete('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        await author.remove()
        res.redirect('/authors')
    } catch {
        if(author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
})

// export info from this file
module.exports = router