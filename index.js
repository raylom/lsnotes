const express = require("express");
const helmet = require("helmet");

const notesRoutes = require("./notes/notesRoutes.js");

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get("/backend", (req, res) => {
  res.send("It's Alive");
});

server.use("/api/notes", notesRoutes);

server.listen(3100, () => console.log("\nAPI running on 9k\n"));
