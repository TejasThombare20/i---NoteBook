import React, { useContext }  from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Notes from './Notes';
import noteContext from '../context/notes/NoteContext';
import { useState } from 'react';



function BasicExample() {
    const context =useContext(noteContext);
    const {addNote,showAlert} = context;
    const [note,setNote] = useState({title : " ",description:"",tag : ""})
    const handleClick =(e)=>
    { 
        e.preventDefault();
         addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
         window.location.reload();
         showAlert("note added successfully","success");
    }
    const onChange =(e)=>
    {
       setNote({...note,[e.target.name]:e.target.value})
    } 
  return (
    <>
    <div className="container">
    <h1>Add a notes</h1>
    <Form onSubmit={handleClick}>
      <Form.Group  className="mb-3" >
      {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
        <Form.Label htmlFor = "title">title</Form.Label>
        <Form.Control id="title" type="text" name='title'minLength={4} required value={note.title} placeholder="Enter title" onChange={onChange} />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicPassword"> */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor='description'>description</Form.Label>
        <Form.Control type="text" id='description'minLength={5} required value={note.description} name='description' placeholder="Description" onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='tag'>tag</Form.Label>
        <Form.Control type="text" id='tag' name='tag'minLength={2} required value={note.tag} placeholder="tag" onChange={onChange} />
      </Form.Group>
     
      <Button disabled={note.title.length<4 ||note.description.length<5 } variant="primary"  type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </>
  );
}

export default BasicExample;
