import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ArchiveProvider, AuthProvider } from "./context";
import { NotesProvider } from "./context/notesContext";
import { ModalProvider } from "./context/modalContext";
import { TrashProvider } from "./context/trashContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NotesProvider>
        <AuthProvider>
          <ChakraProvider>
            <TrashProvider>
              <ArchiveProvider>
                <ModalProvider>
                  <App />
                </ModalProvider>
              </ArchiveProvider>
            </TrashProvider>
          </ChakraProvider>
        </AuthProvider>
      </NotesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
