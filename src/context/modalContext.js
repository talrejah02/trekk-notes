import { useContext, createContext, useState } from "react";

const Modalcontext = createContext(null);
const useModal = () => useContext(Modalcontext);

const ModalProvider = ({ children }) => {
    const [isModal, setModal] = useState(false);
    const [selectedNote,setSelectednote]=useState()
  return (
    <Modalcontext.Provider value={{ isModal, setModal,selectedNote,setSelectednote }}>{children}</Modalcontext.Provider>
  );
};

export { useModal, ModalProvider };
