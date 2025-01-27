const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;

public_users.post("/register", (req,res) => {
  users.push(req.body);
  return res.status(200).json({message: "user Registered"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let myISBN = req.params.isbn;
  let myBook = books.filter((book)=>book.isbn === myISBN);
  return res.status(200).json(myBook);
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let myAuthor = req.params.author;
  let myBook = books.filter((book)=>book.author === myAuthor);
  return res.status(200).json(myBook);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let myTitle = req.params.title;
  let myBook = books.filter((book)=>book.title === myTitle);
  return res.status(200).json(myBook);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let myISBN = req.params.isbn;
  let review = books.filter((book)=>book.isbn === myISBN);
  return res.status(200).json(review[0].reviews);
});

module.exports.general = public_users;