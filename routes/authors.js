const express = require('express')
const router = express.Router()
// import our author definition
const Author = require('../models/author')

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
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    } catch {
        // send back to new author page with an error message
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
})

// export info from this file
module.exports = router