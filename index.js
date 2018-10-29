const express = require("express");
const helmet = require("helmet");

const notessRoutes = require("./notes/notesRoutes.js");

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get("/", (req, res) => {
  res.send("It's Alive");
});

server.use("/api/notes", notesRoutes);

server.listen(9000, () => console.log("\nAPI running on 9k\n"));
