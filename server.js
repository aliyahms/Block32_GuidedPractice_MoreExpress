const express = require("express");
const app = express();
const PORT = 3000;

// In order to get information form request body we need to Parse it with body parsing hardware.
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// /notes  data endpoints
const notes = require("./data/notes");

// Notes router imported
app.use("/notes", require("./api/notes"));

// Default 404 catch-all middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

// Defualt Error handler middleware.. ?? console.error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
