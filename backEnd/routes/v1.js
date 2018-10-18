var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');
const bookController = require('../controllers/book.controller')

// ********* USER AND ADMIN ROUTES  *************//
router.post('/users/create',                        userController.create);
router.get('/users/getByUserId/:userId',            userController.getByUserId);
router.put('/users/updateByUserId/:userId',         userController.updateByUserId);
router.delete('/users/deleteByUserId/:userId',      userController.deleteByUserId);
router.get('/users/getAllUsers',                    userController.getAllUsers);
router.post('/users/loginUser',                      userController.loginUser);


// ********* BOOK ROUTES  *************//
router.post('/books/create',                        bookController.create);
router.get('/books/getByBookId/:bookId',            bookController.getByBookId);
router.put('/books/updateByBookId/:bookId',         bookController.updateByBookId);
router.delete('/books/deleteByBookId/:bookId',      bookController.deleteByBookId);
router.get('/books/getAllBooks',                    bookController.getAllBooks);


module.exports = router;
