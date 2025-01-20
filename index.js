const yargs = require("yargs")
const { addNote, printNotes, removeNote } = require("./notes.controller")

yargs.command({
  command: "add",
  describe: "add new note to list",
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
  command: "remove",
  describe: "remove note from list",
  builder: {
    id: {
      type: "string",
      describe: "remove title",
      demandOption: true,
    },
  },
  async handler({ id }) {
    await removeNote(id)
  },
})

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes()
  },
})

yargs.parse()
