const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dbPath = path.join(__dirname, "../db/db.json");

// GET /api/notes
router.get("/notes", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST /api/notes
router.post("/notes", (req, res) => {
  const newNote = { id: uuidv4(), ...req.body };

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id
router.delete("/notes/:id", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== req.params.id);

    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json({ ok: true });
    });
  });
});

module.exports = router;
