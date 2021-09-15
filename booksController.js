const createError = require('http-errors')

let booklist = []  //changeable empty 
let idno = 0




exports.index = function (req, res) {
    res.send(booklist)  //send back js object key: item
}

exports.create = function (req, res, next) {
    if (!req.body.title) {
        return (next(createError(400, "title is required")))  /* now needs a key of title {
            "title" : "key value", 
            "second key": "second value"
        } */
    }
    console.log(req.body)
    booklist.push({ id: idno, title: req.body.title, author: req.body.author, read: req.body.read, authorSurname: req.body.authorSurname }) //get whats in body and push into array post  http://localhost:3005/book/create and get http://localhost:3005/books to see results
    res.send({ result: true })
    idno++
}

exports.show = function (req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if (!bookitem) {
        return (next(createError(404, "no book with that id")))   //GET http://localhost:3005/book/0
    }
    res.send(bookitem)
}
exports.showByAuthor = function (req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if (!bookitem) {
        return (next(createError(404, "no book by that author")))   //GET http://localhost:3005/book/authorname
    }
    booklist = booklist.filter((book) => book.id != req.params.id)  //reset list to filter out one we dont want

    res.send(bookitem)
}

exports.delete = function (req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if (!bookitem) {
        return (next(createError(404, "no book with that id")))   //GET http://localhost:3005/book/0
    }
    booklist = booklist.filter((book) => book.id != req.params.id)  //reset list to filter out one we dont want
    res.send({ result: true })
}

exports.update = function (req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if (!req.body.title) {
        return (next(createError(400, "title is required")))
    }
    if (!bookitem) {
        return (next(createError(404, "no book with that id")))
    }
    booklist = booklist.map((book) => {
        if (book.id == req.params.id) {  //if right id
            book.title = req.body.title
            book.author = req.body.author
            book.read = req.body.read
            book.authorSurname = req.body.authorSurname
        }
        return book  //return book 
    })
    res.send({ result: true })
}

