import { useContext, createContext, useState } from "react";
const NotesContext = createContext(null);
const useNotes = () => useContext(NotesContext);

const NotesProvider = ({children}) => {
  const [Allnotes, setAllnotes] = useState([]);
  return <NotesContext.Provider value={{Allnotes,setAllnotes}}>{children}</NotesContext.Provider>;
};
export {useNotes,NotesProvider}
