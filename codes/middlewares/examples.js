const express = require("express");
const logger = require("morgan");
const app = express();
app.use(express.json()); // parse application/json
app.use(logger("dev")); //logger

const message = "default";

app.use((req, res, next) => {
  console.log("welcome to my server"); // Execute any code.
  next(); // Call the next middleware function in the stack.
});

app.use(
  "/numbers",
  (req, res, next) => {
    console.log("一"); // Execute any code.
    next(); // Call the next middleware function in the stack.
  },
  (req, res, next) => {
    console.log("二"); // Execute any code.
    next(); // Call the next middleware function in the stack.
  }
);

app.use((req, res, next) => {
  if (!req.body.message) req.body.message = message; // Make changes to the request and the response objects.
  next(); // Call the next middleware function in the stack.
});

app.use((req, res, next) => {
  res.send("last resort");
});

const server = app.listen(3000, () => {
  console.log("party started at port", 3000);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
});
