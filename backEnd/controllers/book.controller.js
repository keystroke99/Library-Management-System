let Book = require('../models/book.model');

// Create a Book
const create = async function(req, res){
    if (!req.body.title) {
        return res.json({
            success: false,
            message: "please enter book title"
        });
    } else if (!req.body.description) {
        return res.json({
            success: false,
            message: "please enter description"
        })
    } else if (!req.body.author) {
        return res.json({
            success: false,
            message: "please enter author name"
        })
    } else if (!req.body.quantity) {
        return res.json({
            success: false,
            message: "please enter quantity"
        })
    } else if (!req.body.publisher) {
        return res.json({
            success: false,
            message: "please enter publisher name"
        })
    } else if (!req.body.publishedYear) {
        return res.json({
            success: false,
            message: "please enter published year"
        })
    } else {
        let newBook = new Book({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            quantity: req.body.quantity,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            publishedYear: req.body.publishedYear
        });

        Book.createBook(newBook, function (err, Book) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.json({
                    success: true,
                    message: "Book data uploaded sucessfully",
                    bookData: Book
                });
            }
        });
    }
}
module.exports.create = create;
// End of Create a Book

// Get By BookId
const getByBookId = function(req, res){
    let id = req.params.bookId;
    Book.findById(id, function (err, result) {
        if (result) {
            res.send({
                success: true,
                bookData: result
            });
        } else {
            res.json({
                success: false,
                message: "Not Found / Send a valid ID"
            });
        }
    });
}
module.exports.getByBookId = getByBookId;
// End of Get By BookId

// Update a Book
const updateByBookId = async function(req, res){
    Book.findById(req.params.bookId, function (err, result) {
        if (result) {
            Book.findOneAndUpdate({_id: req.params.bookId}, req.body, function (err, bookObj) {
                if (err) return res.json({
                    success: false,
                    message: 'Error in updating book',
                    error: err
                });
                if (bookObj) {
                    return res.json({
                        success: true,
                        message: 'Successfully updated the book',
                        bookData: bookObj
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Not Found / Send a valid ID"
            });
        }
    });
}
module.exports.updateByBookId = updateByBookId;
// End of Update a Book

// Delete a Book
const deleteByBookId = async function(req, res){
    let id = req.params.bookId;
    Book.findById(req.params.bookId, function (err, result) {
        if (result) {
            Book.findByIdAndRemove(id, function (err, post) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Book Not Exists / Send a valid ID"
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Deleted Book Successfully"
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Not Found / Send a valid ID"
            });
        }
    });
}
module.exports.deleteByBookId = deleteByBookId;
// End of Delete a Book

// Get All Books
const getAllBooks = async function(req, res){
    Book.find({}, function(err, bookList) {
        if (bookList) {
          res.send({
              success: true,
              userData: bookList
          });
        } else {
          res.json({
            error: "No data found!"
          });
        }
      });
}
module.exports.getAllBooks = getAllBooks;
// End of Get All Books


