import React from 'react'
import { Notescard } from '../notesCard/notesCard'
import "./noteslisting.css"

function Noteslisting() {
  return (
    <div className='notes-listing'>
      <Notescard/>
    </div>
  )
}

export {Noteslisting}