import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNotes } from "./notesContext";

const Trashcontext = createContext(null);
const useTrash = () => useContext(Trashcontext);

const TrashProvider = ({ children }) => {
  const [trashList, setTrashList] = useState([]);
  const { setAllnotes } = useNotes();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/trash`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        setTrashList(response.data.trash);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const AddtoTrash = (note) => {
    (async () => {
      try {
        const response = await axios.post(
          `/api/notes/trash/${note._id}`,{note},
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setTrashList(response.data.trash);
        setAllnotes(response.data.notes);
        toast({
          position: "top-right",
          title: "Note Trashd",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const RestoreFromTrash = (note) => {
    (async () => {
      try {
        const response = await axios.post(
          `/api/trash/restore/${note._id}`,
          {},
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setTrashList(response.data.trash);
        setAllnotes(response.data.notes);
        toast({
          position: "top-right",
          title: "Note Restored",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const DeleteFromTrash = (note) => {
    (async () => {
      try {
        const response = await axios.delete(`/api/trash/delete/${note._id}`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        setTrashList(response.data.trash);
        toast({
          position: "top-right",
          title: "Note Deleted Permanently",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Trashcontext.Provider
      value={{
        trashList,
        setTrashList,
        AddtoTrash,
        DeleteFromTrash,
        RestoreFromTrash,
      }}
    >
      {children}
    </Trashcontext.Provider>
  );
};

export { useTrash, TrashProvider };
