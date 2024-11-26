const yargs = require("yargs")
const pkg = require("./package.json")
const {
  addNote,
  printNotes,
  removeNote,
  editNote,
} = require("./notes.controller")

yargs.version(pkg.version)

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title)
  },
})

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes()
  },
})

yargs.command({
  command: "remove",
  describe: "Deleting notes by id's",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNote(id)
  },
})

yargs.command({
  command: "edit",
  describe: "Editing the note by id and title",
  builder: {
    id: {
      type: "string",
      describe: "Note id and title",
      demandOption: true,
    },
  },
  handler({ id, title }) {
    editNote(id, title)
  },
})

yargs.parse()
