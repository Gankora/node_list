const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

const addNote = async (title) => {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString(),
  }
  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.green("Note was added!!!"))
}

const getNotes = async () => {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

const removeNote = async (id) => {
  const notes = await getNotes()

  const updateNotes = notes.filter((note) => note.id !== id)

  if (updateNotes.length === notes.length) {
    console.log(chalk.red("Note not found!"))
  } else {
    await fs.writeFile(notesPath, JSON.stringify(updateNotes))
    console.log(chalk.green("Note was removed!"))
  }
}

const printNotes = async () => {
  const notes = await getNotes()

  console.log(chalk.bgGreenBright("Here is the list of notes:"))
  notes.forEach((note) => {
    console.log("id:", chalk.red(note.id), "name:", chalk.green(note.title))
  })
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNote,
}
