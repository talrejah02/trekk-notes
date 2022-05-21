import React from "react";
import { useRef, useEffect, useState } from "react";
import {
  Archiveicon,
  Coloricon,
  Tagicon,
  Trashicon,
  Addicon,
} from "../assets/svg";
import { useNotes } from "../../context/notesContext";
import axios from "axios";
import "./noteseditor.css";
import { useModal } from "../../context/modalContext";
import { useToast } from "@chakra-ui/react";

function Noteseditor() {
  const { setAllnotes } = useNotes();
  const { selectedNote, isModal, setModal } = useModal();
  let title = useRef();
  let body = useRef();
  const toast = useToast();
  const priority = ["low", "Medium", "High"];
  const colorCodes = ["#917707", "#157b83", "#8d5d30", "#582c6d"];
  const tagRef = useRef();

  const [noteDetails, setNotedetails] = useState({
    tags: [],
    color: "#22222",
    priority: "",
  });

  

  useEffect(() => {
    if (isModal) {
      title.current.innerText = selectedNote.title;
      body.current.innerText = selectedNote.body;
    }
    if (selectedNote) {
      setNotedetails({
        tags: selectedNote.tags,
        color: selectedNote.color,
        priority: selectedNote.priority,
      });
    } 
  }, []);

  const updateNote = () => {
    (async () => {
      try {
        const response = await axios.post(
          `/api/notes/${selectedNote._id}`,
          {
            note: {
              ...selectedNote,
              title: title.current.innerText,
              body: body.current.innerText,
              editedAt: Date.now(),
              color: noteDetails.color,
              tags: noteDetails.tags,
              priority: noteDetails.priority,
            },
          },
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setAllnotes(response.data.notes);
        setModal(false);
        toast({
          position: "top-right",
          title: "Note updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const addNewnote = () => {
    if (localStorage.getItem("token")) {
      (async () => {
        try {
          const response = await axios.post(
            `/api/notes`,
            {
              note: {
                title: title.current.innerText,
                body: body.current.innerText,
                createdAt: Date.now(),
                editedAt: Date.now(),
                color: noteDetails.color,
                tags: noteDetails.tags,
                priority: noteDetails.priority,
              },
            },
            {
              headers: { authorization: localStorage.getItem("token") },
            }
          );
          setAllnotes(response.data.notes);
          toast({
            position: "top-right",
            title: "Note Created",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          console.log(response.data.notes);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  return (
    <div className="note-editor-card" style={{backgroundColor:noteDetails.color}}>
      <div className="note-editor-title" ref={title} contentEditable={true}>
        Title
      </div>
      <div className="note-editor-body" ref={body} contentEditable={true}>
        Take a Note...
      </div>
      <section className="tag-chips-container">
        {noteDetails.tags.map((item) => <span className="tag-chip">{item}</span>)}
      </section>
      <section className=" editor-action-icons ">
        <section>
          <button className="action-icon color-btn" title="Color">
            <Coloricon />
            <section className="color-selector">
            {colorCodes.map((color)=><span className="color" style={{backgroundColor:color}} onClick={()=>setNotedetails({...noteDetails,color:color})}> </span>)}
            </section>
          </button>
          <button className="action-icon" title="Archive">
            <Archiveicon />
          </button>
          <button className="action-icon" title="Trash">
            <Trashicon />
          </button>
          
        </section>
        <section className="tag-section">
          <button className="action-icon tag-btn" title="Tag">
            <Tagicon />
          </button>
          <input type="text" ref={tagRef} className="tag-input" />
          <button
            className="action-icon"
            title="Add Tag"
            onClick={() => {
              setNotedetails({
                ...noteDetails,
                tags:[...noteDetails.tags, tagRef.current.value],
              });
            }}
          >
            <Addicon />
          </button>
        </section>
        <section className="priority-section">
          <span className="priority-label">Priority:</span>
          <select
            name="priority"
            value={noteDetails.priority}
            onChange={(e) =>
              setNotedetails({ ...noteDetails, priority: e.target.value })
            }
          >
            {priority.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </section>
        {isModal ? (
          <button className="btn-primay-submit" onClick={updateNote}>
            Update Note
          </button>
        ) : (
          <button className="btn-primay-submit" onClick={addNewnote}>
            Add Note
          </button>
        )}
      </section>
    </div>
  );
}

export { Noteseditor };
