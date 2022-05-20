import React from "react";
import { useRef, useEffect } from "react";
import { Archiveicon, Coloricon, Tagicon, Trashicon } from "../assets/svg";
import { useNotes } from "../../context/notesContext";
import axios from "axios";
import "./noteseditor.css";
import { useModal } from "../../context/modalContext";
import { useToast } from "@chakra-ui/react";

function Noteseditor() {
  const { setAllnotes } = useNotes();
  const { selectedNote,isModal,setModal } = useModal();
  let title = useRef();
  let body = useRef();
  const toast = useToast()

  useEffect(() => {
    if (isModal) {
      title.current.innerText = selectedNote.title;
      body.current.innerText = selectedNote.body;
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
            },
          },
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setAllnotes(response.data.notes);
        setModal(false)
        toast({
          position: 'top-right',
          title: "Note updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      } catch (error) {
        console.log(error);
      }
    })();
  }

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
              },
            },
            {
              headers: { authorization: localStorage.getItem("token") },
            }
          );
          setAllnotes(response.data.notes);
          toast({
            position: 'top-right',
            title: "Note Created",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  return (
    <div className="note-editor-card">
      <div className="note-editor-title" ref={title} contentEditable={true}>
        Title
      </div>
      <div className="note-editor-body" ref={body} contentEditable={true}>
        Take a Note...
      </div>
      <section className=" editor-action-icons ">
        <section>
          <button className="action-icon" title="Color">
            <Coloricon />
          </button>
          <button className="action-icon" title="Tag">
            <Tagicon />
          </button>
          <button className="action-icon" title="Archive">
            <Archiveicon />
          </button>
          <button className="action-icon" title="Trash">
            <Trashicon />
          </button>
        </section>
        {isModal?( <button className="btn-primay-submit" onClick={updateNote}>
            Update Note
          </button>):( <button className="btn-primay-submit" onClick={addNewnote}>
          Add Note
        </button>)}
      </section>
    </div>
  );
}

export { Noteseditor };
