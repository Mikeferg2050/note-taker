document.addEventListener("DOMContentLoaded", function () {
  const notesList = document.getElementById("notes");
  const noteTitle = document.getElementById("note-title");
  const noteText = document.getElementById("note-text");
  const saveNoteBtn = document.getElementById("save-note");
  const clearNoteBtn = document.getElementById("clear-note");
  const newNoteBtn = document.getElementById("new-note");

  let notes = [];

  // Fetch notes from the server
  function fetchNotes() {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => {
        notes = data;
        renderNotes();
      });
  }

  // Render notes to the DOM
  function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note.title;
      li.dataset.id = note.id;
      li.addEventListener("click", () => {
        displayNote(note);
      });
      notesList.appendChild(li);
    });
  }

  // Display selected note
  function displayNote(note) {
    noteTitle.value = note.title;
    noteText.value = note.text;
  }

  // Clear the note editor
  function clearNoteEditor() {
    noteTitle.value = "";
    noteText.value = "";
  }

  // Save a new note
  function saveNote() {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((note) => {
        notes.push(note);
        renderNotes();
        clearNoteEditor();
      });
  }

  // Event listeners
  saveNoteBtn.addEventListener("click", saveNote);
  clearNoteBtn.addEventListener("click", clearNoteEditor);
  newNoteBtn.addEventListener("click", clearNoteEditor);

  // Initial fetch
  fetchNotes();
});
