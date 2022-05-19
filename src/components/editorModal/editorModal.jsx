import React from 'react'
import { Noteseditor } from '../notesEditor/notesEditor'
import "./editorModal.css"

function Editormodal() {
  return (
      <div className='modal-wrapper'>
          <Noteseditor/>
    </div>
  )
}

export {Editormodal}