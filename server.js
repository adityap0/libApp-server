const http = require("http");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const url = require("url");
const {
  getBooks,
  getBook,
  createBook,
  delBook,
  editBook,
} = require("./controllers/booksController");
dotenv.config();

const server = http.createServer((req, res) => {
  var path = url.parse(req.url).pathname;
  const id = req.url.split("/")[3];
  if (req.url === "/api/books" && req.method === "GET") {
    getBooks(req, res);
  } else if (path === `/api/books/${id}` && req.method === "GET") {
    getBook(req, res, id);
  } else if (path === `/api/books/${id}` && req.method === "DELETE") {
    delBook(req, res, id);
  } else if (path === `/api/books/${id}` && req.method === "PUT") {
    editBook(req, res, id);
  } else if (path === "/api/books" && req.method === "POST") {
    createBook(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found Mister!" }));
  }
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Db"))
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
