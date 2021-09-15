const express = require('express');  //import express
const router = express.Router();
const books = require('./booksController');

//get the home page / list of all objects
router.get('/books', books.index)  //if books run the index file to get all of books in list
router.post('/book/create', books.create)  // 
router.get('/book/:id', books.show)
router.delete('/book/:id', books.delete)
router.put('/book/:id', books.update)
router.get('/books/:author', books.showByAuthor)


module.exports = router;  //export everything as router