import React from "react";
import { Archiveicon, Coloricon, Trashicon } from "../assets/svg";
import "./notescard.css";
function Notescard() {
  return (
    <div className="notes-card">
      <span className="note-title">TITLE</span>
      <span className="note body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
        repudiandae quam sit dolores modi nostrum, dolorum obcaecati, eveniet
        magni, sint et vitae enim pariatur. Quisquam consequuntur consectetur
        non? Quasi voluptatibus dolor recusandae laudantium, molestias odit
        fugit nostrum dolore deleniti quae. Deleniti obcaecati quaerat explicabo
        odit quas est dolorem quos voluptate.
      </span>
      <section className="note-action-icons">
        <button className="action-icon" title="Archive">
          <Archiveicon />
        </button>
        <button className="action-icon" title="Trash">
          <Trashicon />
        </button>
        <button className="action-icon" title="Color">
          <Coloricon />
        </button>
      </section>
    </div>
  );
}

export { Notescard };
