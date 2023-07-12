import Card from 'react-bootstrap/Card';
import noteContext from '../context/notes/NoteContext';
import {useContext} from 'react'
import {AiFillDelete} from "react-icons/ai"
import  {FaEdit} from  "react-icons/fa"


function BasicExample(props) {
  const {note,updateNote} = props;
  const context =useContext(noteContext);
  const {deleteNote} = context;

  return (
    <Card className='column  my-2 mx-2' style={{ width: '15rem' }}>
      <Card.Body className='relative'>
        <div>
        <FaEdit className='mx-1' onClick={()=>{updateNote(note)}}/>
        <AiFillDelete   className='mx-1 ' onClick={()=>{deleteNote(note._id)}}/>
        </div>
        <div className="d-flex align-item-center">
        <Card.Title>{note.title}</Card.Title>
        </div>

        <Card.Text>
         {note.description}
        </Card.Text>

        <Card.Text>
        {note.tag}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default BasicExample;