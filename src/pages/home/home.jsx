import React from "react";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Noteseditor, Noteslisting } from "../../components";
import { useAuth } from "../../context";
import { useNotes } from "../../context/notesContext";
import { Searchicon } from "../assets/svg/searchIcon";
import axios from "axios";
import "./home.css";
import { Filtericon, Sorticon } from "../../components/assets/svg";
import { getTags } from "../../utils/getTags";
import { getFilteredList } from "../../utils/filter";
function Home() {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const { Allnotes, setAllnotes, filterState, filterDispatch } = useNotes();
  
  const priority = ["low", "Medium", "High"];
 var tags = getTags(Allnotes)
  
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/notes`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        setAllnotes(response.data.notes);
        tags=getTags(response.data.notes)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!isLogin) {
    navigate("/signin");
  }
  const Finalnotes = getFilteredList(Allnotes, filterState)


  return (
    <div className="home">
      <section className="home-header">
        <span className="home-search-icon">
          <Searchicon />
        </span>
        <input className="home-input" type="text" />
        <button className="action-icon filter-btn">
          <Filtericon />
      <section className="filter-section">
        <section className="filter-priority">
          <span className="filter-header">Filter by priority</span>
          {priority.map((item) => (
            <span className="filter-item" onClick={()=>filterDispatch({type:"FILTER_BY_PRIORITY",payload:item})}>{item}</span>
          ))}
        </section>
        <section className="filter-tag">
          <span className="filter-header">By Tags</span>
          {tags.map((item) => (
            <span className="filter-item" onClick={()=>filterDispatch({type:"FILTER_BY_TAG",payload:item})}>{item}</span>
          ))}
        </section>
      </section>
        </button>
        <button className="action-icon sort-btn">
          <Sorticon />
      <section className="sort">
      <span className="filter-header">By Time</span>
        <span className="filter-item" onClick={()=>filterDispatch({type:"SORT_BY_DATE",payload:"latest"})} filterDispatch>latest</span>
        <span className="filter-item" onClick={()=>filterDispatch({type:"SORT_BY_DATE",payload:"oldest"})}>Oldest</span>
      </section>
        </button>
      </section>

      <Noteseditor />
      {Allnotes.length > 0 && (
        <Noteslisting notes={Finalnotes} actionType={"home"}/>
      )}
    </div>
  );
}

export { Home };
