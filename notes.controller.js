const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")
const { accessSync } = require("fs")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString(),
  }

  notes.push(note)

  await saveNotes(notes)
  console.log(chalk.bgGreen("Note was added!"))
}

async function editNote(id, title) {
  let notes = await getNotes()
  const index = notes.findIndex((note) => note.id === id)
  if (index !== -1) {
    notes[index].title = title
    await saveNotes(notes)
    console.log(chalk.bgGreen("Значение title успешно изменено"))
  } else {
    console.log(chalk.bgRed("Значение id не было найдено"))
  }
}

async function removeNote(idToDelete) {
  const notes = await getNotes()

  const updatedNotes = notes.filter((note) => note.id !== idToDelete)

  await saveNotes(updatedNotes)

  console.log(chalk.bgGreen("Note was deleted!"))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlue("Here is the list of notes:"))
  notes.forEach((note) => {
    console.log(chalk.bgWhite(note.id), chalk.blue(note.title))
  })
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  editNote,
}
