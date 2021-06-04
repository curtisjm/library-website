const express = require('express')
const router = express.Router()
// import our author definition
const Author = require('../models/author')
const Book = require('../models/book')
// image types that we accept
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// all books route
router.get('/', async (req, res) => {
    let query = Book.find()
    if(req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != '') {
        // lte = less than or equal to
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter!= '') {
        // gte = greater than or equal to
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
        const books = await query.exec() 
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// new book route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

// create book route
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
    // save our cover image with FilePond
    saveCover(book, req.body.cover)

    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch {
        renderNewPage(res, book, true)
    }
})

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if(hasError) params.errorMessage = 'Error creating book'
        res.render('books/new', params)
    } catch {
        res.redirect('/books')
    }
}

// function saveCover(book, coverEncoded) {
function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}

// export info from this file
module.exports = router