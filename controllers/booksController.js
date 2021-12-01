const Book = require("../models/Book");
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

//GET ALL BOOKS
async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.writeHead(200, headers);
    res.end(JSON.stringify(books));
  } catch (error) {
    res.status(500).json(error);
  }
}
//GET SINGLE BOOK BY ID
async function getBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: "Book not found..." }));
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(book));
  } catch (error) {
    res.status(500).json(error);
  }
}

//CREATE SINGLE BOOK
async function createBook(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const { name, genre, edition, author } = JSON.parse(body);
      const book = {
        name,
        genre,
        edition,
        author,
      };
      const newBook = await Book.create(book);
      res.writeHead(201, headers);
      res.end(JSON.stringify(newBook));
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
//GET SINGLE BOOK BY ID
async function getBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: "Book not found..." }));
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(book));
  } catch (error) {
    res.status(500).json(error);
  }
}

//DELETE SINGLE BOOK
async function delBook(req, res, id) {
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: "Book not found..." }));
    }
    res.writeHead(200, headers);
    res.end(JSON.stringify(book));
  } catch (error) {
    res.status(500).json(error);
  }
}
//UPDATE SINGLE BOOK
async function editBook(req, res, id) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const { name, genre, edition, author } = JSON.parse(body);
      const book = {
        name,
        genre,
        edition,
        author,
      };
      const updatedbook = await Book.findByIdAndUpdate(id, book);
      if (!updatedbook) {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ message: "Book not found..." }));
      }
      res.writeHead(201, headers);
      res.end(JSON.stringify(updatedbook));
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  delBook,
  editBook,
};
