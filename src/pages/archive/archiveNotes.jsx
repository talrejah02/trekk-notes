import React from 'react'
import { Noteslisting } from '../../components'
import { useArchive } from '../../context'

function Archivenotes() {
    const {archiveList} = useArchive()
    
  return (
      <div className='home'>
      <section className='page-header'>
        <span className='page-header-text'>Archive</span>
      </section>
      {archiveList.length>0?(<Noteslisting notes={archiveList} actionType={"archive"}/>):( <span className='page-error'>You have nothing here</span>)}
     
      
    </div>
  )
}

export { Archivenotes }