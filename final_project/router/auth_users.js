const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"gopi","password":"abc@123"}];
//{"username":"gopi","password":"abc@123"}
const isValid = (username)=>{ //returns boolean
return username === users[0].username;
}

const authenticatedUser = (username,password)=>{ //returns boolean
return username === users[0].username && password === users[0].password;
}

//only registered users can login
regd_users.post("/login", (req,res) => {

  if(authenticatedUser(req.body.username,req.body.password)){
    const user = req.body;
    if (!user) {
      return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
      data: user
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken
    }
    return res.status(200).json({message: "User authenticated"});
  }else{
    return res.status(403).json({message: "User not authenticated"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let myISBN = req.params.isbn;
  let review = books.filter((book)=>book.isbn === myISBN);
  //console.log(req.user);
  let myUser = req.user.data.username;
  review[0].reviews[myUser]= req.body.review;
  return res.status(200).json(review[0].reviews);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let myISBN = req.params.isbn;
  let review = books.filter((book)=>book.isbn === myISBN);
  //console.log(req.user);
  let myUser = req.user.data.username;
  delete review[0].reviews[myUser];
  return res.status(200).json({message:"review deleted"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
