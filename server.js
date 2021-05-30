// check if environment is not production
if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// require file used as our router / controller
const indexRouter = require('./routes/index')

// set view engine
app.set('view engine', 'ejs')
// set where views will be coming from
// current directory name + /views
app.set('views', __dirname + '/views')
// hookup express layouts
// used to put all files inside of to prevent duplication of parts of code
    // i.e. headers, footers, etc
app.set('layout', 'layouts/layout')
// tell app to use express layouts
app.use(expressLayouts)
// tell express where our public files will be
app.use(express.static('public'))

// used for connection to MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
// print error if connection is unsuccessful
db.on('error', error => console.error(error))
// print message when we first connect to the database
db.once('open', () => console.log('Connected to Mongoose'))

// tell app which router to use to handle the root path
app.use('/', indexRouter)

// tell app to listen on a certain port
app.listen(process.env.PORT || 3000)