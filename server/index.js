const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./router.js");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;
// ANSI escape codes for colors
const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m"; // Reset color

// Unicode characters for decoration
const checkMark = "✔";
const crossMark = "❌";

function createBeautifulMessage(message, symbol, color) {
  const length = message.length + 4;
  const border = "-".repeat(length);
  return `${color}${border}\n${symbol}  ${message}  ${symbol}\n${border}${reset}`;
}

server.use(cors());
server.use(express.json());
server.use("/", route);

mongoose
  .connect(process.env.DB)
  .then(() => {
    const successMessage = `Database connected successfully`;
    console.log(createBeautifulMessage(successMessage, checkMark, green));
  })
  .catch((error) => {
    const errorMessage = `Database connection failed: ${error}`;
    console.log(createBeautifulMessage(errorMessage, crossMark, red));
  });

server.listen(port, () => {
  const serverMessage = `Server started at: http://localhost:${port}/`;
  console.log(createBeautifulMessage(serverMessage, checkMark, green));
});
