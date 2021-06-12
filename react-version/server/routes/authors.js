import express from 'express'

import { allAuthors } from '../controllers/authors.js'

// const express = require('express')

// const { allAuthors } = require('../controllers/authors.js')

const router = express.Router()

router.get('/', allAuthors)

export default router