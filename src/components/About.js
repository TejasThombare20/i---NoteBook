// import React , {useContext,useEffect} from 'react'
import React , {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'


const About = () => {
   const a = useContext(noteContext);
  //  useEffect(()=>
  //  {
  //   a.update()
  //  },[])
  
  return (  
    <div>
      {/* my name is {a.name1} and batch is {a.batch} */}
    </div>
  )
} 

export default About
