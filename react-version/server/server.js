// const express = require('express')
// const methodOverride = require('method-override')
// const cors = require('cors')
// const mongoose = require('mongoose')

// const authorRouter = require('./routes/authors.js')
// const bookRouter = require('./routes/books.js')

// if(process.env.NODE_ENV != 'production') {
//     require('dotenv').config()
// }

import express, { json, urlencoded } from 'express'
import methodOverride from 'method-override'
import cors from 'cors'
import mongoose from 'mongoose'

import authorRouter from './routes/authors.js'
// import bookRouter from './routes/books.js'

const app = express()

app.use(methodOverride('_method'))
app.use(json({ limit: "30mb", extended: true}))
app.use(urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use('/authors', authorRouter)
// app.use('/books', bookRouter)

const PORT = process.env.PORT || 5000
const DATABASE_URL = 'mongodb+srv://user:v8LNk1PaqD2UQJZZ@cluster0.bkzbv.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useFindAndModify: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message))

mongoose.set('useFindAndModify', false)