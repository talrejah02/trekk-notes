import React from 'react'
import { Archiveicon, Coloricon, Tagicon, Trashicon } from '../assets/svg'
import "./noteseditor.css"

function Noteseditor() {
  return (
    <div className='note-editor-card'>
      <div className='note-editor-title' contentEditable={true}>Title</div>
      <div className='note-editor-body' contentEditable={true}>Take a Note...</div>
      <section className=" editor-action-icons ">
       
        <section>
      <button className="action-icon" title="Color">
          <Coloricon/>
        </button>
        <button className="action-icon" title="Tag">
          <Tagicon/>
        </button>
        <button className="action-icon" title="Archive">
          <Archiveicon/>
        </button>
        <button className="action-icon" title="Trash">
          <Trashicon/>
        </button>
        </section>
        <button className='btn-primay-submit'>Close</button>
      </section>
    </div>
  )
}

export { Noteseditor }