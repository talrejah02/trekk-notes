import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNotes } from "./notesContext";

const Archivecontext = createContext(null);
const useArchive = () => useContext(Archivecontext);

const ArchiveProvider = ({ children }) => {
  const [archiveList, setArchiveList] = useState([]);
  const { setAllnotes } = useNotes();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/archives`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        setArchiveList(response.data.archives);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const AddtoArchive = (note) => {
    (async () => {
      try {
        const response = await axios.post(
          `/api/notes/archives/${note._id}`,
          {
            note,
          },
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setArchiveList(response.data.archives);
        setAllnotes(response.data.notes);

        toast({
          position: "top-right",
          title: "Note Archived",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const RestoreFromArchive = (note) => {
    (async () => {
      try {
        const response = await axios.post(
          `/api/archives/restore/${note._id}`,
          {},
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setArchiveList(response.data.archives);
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
  const DeleteFromArchive = (note) => {
    (async () => {
      try {
        const response = await axios.delete(
          `/api/archives/delete/${note._id}`,
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        setArchiveList(response.data.archives);

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
    <Archivecontext.Provider
      value={{
        archiveList,
        setArchiveList,
        AddtoArchive,
        DeleteFromArchive,
        RestoreFromArchive,
      }}
    >
      {children}
    </Archivecontext.Provider>
  );
};

export { useArchive, ArchiveProvider };
