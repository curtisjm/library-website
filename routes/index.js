const express = require('express')
const router = express.Router()

// use router to create routes
router.get('/', (req, res) => {
    res.render('index')
})

// export info from this file
module.exports = router