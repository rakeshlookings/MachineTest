const express = require('express')
const bookRouter = express.Router()
const BookController = require('../controllers/Book.controller')

bookRouter.post('/', BookController.create)
bookRouter.get('/', BookController.list)
bookRouter.get('/:id', BookController.getOne)
bookRouter.patch('/:id', BookController.update)
bookRouter.delete('/:id', BookController.remove)

module.exports = bookRouter