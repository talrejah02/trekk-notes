import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Noteseditor, Noteslisting } from '../../components'
import { useAuth } from '../../context'
import { useNotes } from '../../context/notesContext'
import { Searchicon } from '../assets/svg/searchIcon'
import axios from "axios"
import "./home.css"

function Home() {
  const navigate = useNavigate()
  const { isLogin } = useAuth()
  const {Allnotes,setAllnotes}=useNotes([])
  
  useEffect(() => {
    
    (async () => {
      try {
        const response = await axios.get(`/api/notes`, {
          headers:{authorization: localStorage.getItem("token")}
        })
        setAllnotes(response.data.notes)
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])
 
  if (!isLogin) {
    navigate("/signin");
  }


  return (
    <div className='home'>
      <section className='home-header'>
        <span className='home-search-icon'><Searchicon/></span>
      <input className='home-input' type="text"/>
      </section>
      <Noteseditor />
      {Allnotes.length > 0&&
        <Noteslisting notes={Allnotes} actionType={"home"} />}
    </div>
  )
}

export {Home}