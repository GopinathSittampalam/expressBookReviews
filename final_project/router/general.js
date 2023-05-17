const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //res.send(JSON.stringify(books));
  //return res.status(200).json(JSON.stringify({books},null,0));
  return res.status(200).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let myISBN = req.params.isbn;
  let myBook = books.filter((book)=>book.isbn === myISBN);
  //res.send(JSON.stringify(myBook));
  return res.status(200).json(myBook);
  //return res.status(200).json({message: "Books were filtered by ISBN"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let myAuthor = req.params.author;
  let myBook = books.filter((book)=>book.author === myAuthor);
  //res.send(JSON.stringify(myBook));
  return res.status(200).json(myBook);
  //return res.status(200).json({message: "Books were filtered by author",body:{myBook}});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let myTitle = req.params.title;
  let myBook = books.filter((book)=>book.title === myTitle);
  //res.send(JSON.stringify(myBook));
  return res.status(200).json(myBook);
  //return res.status(200).json({message: "Books were filtered by title"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let myISBN = req.params.isbn;
  let review = books.filter((book)=>book.isbn === myISBN);
  //res.send(JSON.stringify(review));
  return res.status(200).json(review);
  //return res.status(200).json({message: "Reviews were filtered by ISBN"});
});

module.exports.general = public_users;
