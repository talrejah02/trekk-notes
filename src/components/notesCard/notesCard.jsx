import React from "react";
import { useArchive } from "../../context/archiveContext";
import { useModal } from "../../context/modalContext";
import { useTrash } from "../../context/trashContext";
import {
  Archiveicon,
  Coloricon,
  Deleteicon,
  Restoreicon,
  Trashicon,
} from "../assets/svg";
import "./notescard.css";

function Notescard({ note, actionType }) {
  const { setModal, setSelectednote } = useModal();
  const { AddtoArchive, DeleteFromArchive, RestoreFromArchive } = useArchive();
  const { AddtoTrash, DeleteFromTrash, RestoreFromTrash } = useTrash();
  const cardHandler = (e) => {
    if (e.target.tagName === "svg" || e.target.tagName === "path") {
      return undefined;
    } else if (actionType === "home") {
      setSelectednote(note);
      setModal(true);
    }
  };
  const deleteHandler = () => {
    if (actionType === "archive") {
      DeleteFromArchive(note);
    } else if (actionType === "trash") {
      DeleteFromTrash(note)
    }
  };
  const restoreHandler = () => {
    if (actionType === "archive") {
      RestoreFromArchive(note);
    }else if (actionType === "trash") {
      RestoreFromTrash(note)
    }
  };
  return (
    <div className="notes-card" onClick={cardHandler}>
      <span className="note-title">{note.title}</span>
      <span className="note body">{note.body}</span>
      <section className="note-action-icons">
        {actionType === "home" && (
          <>
            <button
              className="action-icon"
              title="Archive"
              onClick={() => AddtoArchive(note)}
            >
              <Archiveicon />
            </button>
            <button className="action-icon" title="Color">
              <Coloricon />
            </button>
            <button className="action-icon" title="Trash" onClick={()=>AddtoTrash(note)}>
              <Trashicon />
            </button>
          </>
        )}
        {(actionType === "archive" || actionType === "trash") && (
          <>
            <button
              className="action-icon"
              title="Delete"
              onClick={deleteHandler}
            >
              <Deleteicon />
            </button>
            <button
              className="action-icon"
              title="Restore"
              onClick={restoreHandler}
            >
              <Restoreicon />
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export { Notescard };
