const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../Module/Note");

const { body, validationResult } = require('express-validator');
// const Note = require("../Module/Note");



// Get all notes of login user using : GET /api/notes/fetchAllNotes
router.get('/fetchAllNotes',fetchUser,
async (req,res)=>{
    try {
        const notes = await Notes.find({user : req.user.id}) 
          res.json(notes)
        
    } catch(error){

        console.log(error.massage);
        res.status(500).send("internal server error")
    }
})  

 
// add a new notes using : POST /api/notes/addNotes - login required
router.post('/addNotes',fetchUser,[
    body('title',"enter a valid name").isLength({min :3 }),
    body('description',"enter a valid password").isLength({min :5 }),
],
async (req,res)=>{
try {  
  const {title,description,tag} = req.body;

  console.log((req.body));
  const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()});
    }
    const note = new Notes({ user:req.user.id,title,description,tag})
    const savedNote = await note.save()

    res.json(savedNote);
     
} catch(error){

    console.log(error.massage);
    res.status(500).send("internal server error")
}
})  

// update an existing note using PUT : /api/notes/updatenote/:id
router.put('/updateNote/:id',fetchUser,
async (req,res)=>{
     try {
        const {title , description , tag}  = req.body;
    
        //create a new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // find the note to be updated and update it 
        let note = await Notes.findById(req.params.id);
        // console.log("note  1: ",note);

        if(!note)
        {
          return res.status(404).send(" not found")
        }

        // checking the authentication of user
        if(note.user && note.user.toString() !== req.user.id )
        {
            return res.status(404).send(" not allowed")
        }
         note = await Notes.findOneAndUpdate(req.param.id,
            {
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            },
             {new :  true })
        //  console.log("note 2 :",note);
          res.json({note})
     } catch(error){

         console.log(error.massage);
         res.status(500).send("internal server error")
     }
}) 





// delete the existing note using : DELETE : /api/notes/deleteNote/:id


router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id: ",id);
    const { id: userId } = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      
      return res.status(400).send("Invalid note ID");
    }

    const deletedNote = await Notes.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!deletedNote) {
      return res.status(404).send("Note not found or not allowed");
    }

    res.json({ "Success": "Note has been deleted", note: deletedNote });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

  

module.exports = router