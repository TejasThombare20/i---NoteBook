import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from "./Noteitem"
import AddNote from "./Addnote";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote, showAlert } = context;
  const [note, setNote] = useState({ id: "", etitle: " ", edescription: "", etag: "" });
  const ref = useRef(null);
  const refclose = useRef(null);
  let Navigate = useNavigate();
  useEffect(() => {
    const v = () => {
      if(localStorage.getItem("token")){
        getNote()
      }
      else{
        Navigate("/login")
      }
    }
    v();
    
  }, [])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateNote = (currentNote) => {
    ref.current.click()
    console.log("current note", currentNote)
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log("updating the note...", note);

    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click()
    showAlert("note updated successfully", "success")
    window.location.reload()
    // addNote(note.title,note.description,note.tag);
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />
      <Button variant="primary" ref={ref} className='d-none' onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container">

            <Form >
              <Form.Group className="mb-3" >
                {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
                <Form.Label htmlFor="etitle">title</Form.Label>
                <Form.Control id="etitle" value={note.etitle} minLength={4} required type="text" name='etitle' placeholder="Enter title" onChange={onChange} />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicPassword"> */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor='edescription'>description</Form.Label>
                <Form.Control type="text" value={note.edescription} minLength={5} required id='edescription' name='edescription' placeholder="Description" onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor='etag'>tag</Form.Label>
                <Form.Control type="text" value={note.etag} minLength={2} required id='etag' name='etag' placeholder="tag" onChange={onChange} />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refclose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' onClick={handleClick} variant="primary" >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>



      <div className='row my-3 mx-3'>
        <h1>Your Notes :</h1>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} className=" col mb-6" updateNote={updateNote} note={note} />
        })}

      </div>
    </>
  )
}

export default Notes
