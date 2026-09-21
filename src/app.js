const express = require("express");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "express-api",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
