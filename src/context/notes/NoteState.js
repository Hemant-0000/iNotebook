import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // GET ALL NOTES
  const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYjBkYTllN2M0ZGE2OGM2YWNmN2FiIn0sImlhdCI6MTY0NTk0MDIwMH0.o9lc_azQNV7X4ZhTeqDBJ1vwXl9O__nkSdZOTE3CkCw'
          }
        });
        const json = await response.json()
        setNotes(json)
  }

  // ADD A NOTE
  const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYjBkYTllN2M0ZGE2OGM2YWNmN2FiIn0sImlhdCI6MTY0NTk0MDIwMH0.o9lc_azQNV7X4ZhTeqDBJ1vwXl9O__nkSdZOTE3CkCw'
          },
          body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
  }


  // DELETE A NOTE
  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id })
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYjBkYTllN2M0ZGE2OGM2YWNmN2FiIn0sImlhdCI6MTY0NTk0MDIwMH0.o9lc_azQNV7X4ZhTeqDBJ1vwXl9O__nkSdZOTE3CkCw'
          }
        });
        const json = await response.json();
    setNotes(newNotes)
  }


  // EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxYjBkYTllN2M0ZGE2OGM2YWNmN2FiIn0sImlhdCI6MTY0NTk0MDIwMH0.o9lc_azQNV7X4ZhTeqDBJ1vwXl9O__nkSdZOTE3CkCw'
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();

      let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState; 