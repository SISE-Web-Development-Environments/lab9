const express = require("express");
const logger = require("morgan");
const app = express();
app.use(express.json()); // (?) parse application/json
app.use(logger("dev")); // (?) logger

const message = "default";

app.use((req, res, next) => {
  console.log("welcome to my server"); // (1) Execute any code.
  next(); // (4) Call the next middleware function in the stack.
});

app.use(
  "/numbers",
  (req, res, next) => {
    console.log("一"); // (1) Execute any code.
    next(); // (4) Call the next middleware function in the stack.
  },
  (req, res, next) => {
    console.log("二"); // (1) Execute any code.
    next(); // (4) Call the next middleware function in the stack.
  }
);

app.use((req, res, next) => {
  if (!req.body.message) req.body.message = message; // (2) Make changes to the request and the response objects.
  next(); // (4) Call the next middleware function in the stack.
});

app.use((req, res, next) => {
  res.send("last resort"); // (3) End the request-response cycle
});

const server = app.listen(3000, () => {
  console.log("party started at port", 3000);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
});
