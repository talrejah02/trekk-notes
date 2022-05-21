import React from 'react'
import { Notescard } from '../notesCard/notesCard'
import "./noteslisting.css"

function Noteslisting({ notes, actionType}) {
  
  
  
  return (
    <div className='notes-listing'>
      {notes.length>0&&(notes.map((item) => <Notescard note={item} actionType={actionType}/>))}
     
    </div>
  )
}

export {Noteslisting}