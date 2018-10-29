const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const DB = knex(knexConfig.development);

const app = express();
const port = 3333;

app.use(helmet(), logger("combined"), cors(), express.json());

app.get("/", (req, res) => {
  res.send("It's Alive!");
});

app.get("/dashboard", (req, res) => {
  DB("NOTES")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(e => {
      res.status(500).json(e);
    });
});

app.get("/dashboard/:id", (req, res) => {
  const { id } = req.params;
  DB("NOTES")
    .where({ id: id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(e => {
      res.status(404).json(e);
    });
});

app.post("/add-note", (req, res) => {
  const { title, textBody } = req.body;

  DB.insert({ title, textBody })
    .into("NOTES")
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(e => {
      res.status(500).json(e);
    });
});

app.put("/dashboard/:id", (req, res) => {
  const { id } = req.params;
  const { title, textBody } = req.body;
  DB("NOTES")
    .where({ id })
    .update({ title, textBody })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(e => {
      res.status(500).json(e);
    });
});

app.delete("/dashboard/:id", (req, res) => {
  const { id } = req.params;
  DB("NOTES")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(e => {
      res.status(404).json(e);
    });
});

app.listen(port, console.log(`== Server Listening on Port ${port} ==`));
