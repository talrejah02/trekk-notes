import { useContext, createContext, useState, useReducer } from "react";
import { filterReducer } from "../utils/filterReducer";
const NotesContext = createContext(null);
const useNotes = () => useContext(NotesContext);

const NotesProvider = ({children}) => {
  const [Allnotes, setAllnotes] = useState([]);
  const initialFilterState = {
    tag: "all",
    priority: "all",
    sortByDate: "latest",
  };
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState)
  return <NotesContext.Provider value={{Allnotes,setAllnotes,filterState,filterDispatch,initialFilterState}}>{children}</NotesContext.Provider>;
};
export {useNotes,NotesProvider}
