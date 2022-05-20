import React from 'react'
import { Noteslisting } from '../../components'
import { useTrash } from '../../context/trashContext'

function Trashnotes() {
    const {trashList} =useTrash()
  return (
    <div className='home'>
           <section className='page-header'>
        <span className='page-header-text'>Trash</span>
      </section>
      {trashList.length>0?(<Noteslisting notes={trashList} actionType={"trash"}/>):( <span className='page-error'>You have nothing here</span>)}
    </div>
  )
}

export {Trashnotes}