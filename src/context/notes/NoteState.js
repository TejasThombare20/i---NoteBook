// import { useState } from "react";
import { useState } from "react";
import axios from "axios";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    //  var name1 = "Tejas";
    //  var batch = 10;
    const host = "http://localhost:5001";
    const notesInitial = [];
    var [notes, setNotes] = useState(notesInitial);

    // Get all note
    const getNote = async () => {
        // TODO : API call
        try {
            const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem('token')
                },
                //  body: JSON.stringify(title, description, tag),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch notes"); // Handle error if the response is not successful
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const json = await response.json();
                console.log(json);
                setNotes(json);
            } else {
                console.error("Response is not in JSON format");
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    //Add a Note 

    const addNote = async (title, description, tag) => {

        try {
            // TODO : API call
            // console.log(title, description, tag);
            const response = await axios.post(`${host}/api/notes/addNotes`, {
                title,
                description,
                tag,
            }, {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "authtoken": localStorage.getItem('token')
                    // 'Accept':'application/json'
                },
            });
            const json = await response.json();
            console.log(json)
            if (!response.ok) {
                throw new Error("Failed to add note"); // Handle error if the response is not successful
            }

            const note = await response.json();


            console.log("Adding a new note");
            setNotes(notes.concat(note));
        } catch (error) {
            console.error("Error adding note:", error);
        }

    }


    // Delete a Note
    const deleteNote = async (id) => {
        try {
            const response = await axios.delete(`${host}/api/notes/deleteNote/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem('token')
                },

            });
            
            const json = await response.data;
            console.log(json)
            console.log("deleting the note with id " + id)

            const newNotes = notes.filter(((note) =>   note._id !== id ))
            setNotes(newNotes)
        } catch (error) {
            console.error("Error deleting note:", error.response.data);
        }
    }



let newNote = JSON.parse(JSON.stringify(notes))
// Edit a note 
const editNote = async (id, title, description, tag) => {
    // API call
    const response = await axios.put(`${host}/api/notes/updateNote/${id}`,
        { title, description, tag },
        {
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },

        });
    const json = await response.data;
    // logic to edit
    for (let index = 0; index < notesInitial.length; index++) {
        const element = notesInitial[index];
        if (element._id === id) {
            newNote.title = title;
            newNote.description = description;
            newNote.tag = tag;
            break;
        }
        setNotes(newNote);
    }
}


// Alert function
const [alert, setAlert] = useState(null)

const showAlert = (message, type) => {
    setAlert({
        msg: message,
        type: type
    })
    setInterval(() => {
        setAlert(null)
    }, 3000);
}

return (
    //  <NoteContext.Provider value={{name1,batch}} >
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote, showAlert }}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NoteState;
