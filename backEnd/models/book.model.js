let mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    quantity: String,
    isbn: String,
    publisher: String,
    publishedYear: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);

// Create a new book in DATABASE
module.exports.createBook = function (newBook, callback) {
    newBook.save(callback);
};
// End of Create a new book in DATABASE