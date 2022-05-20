import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Archivenotes, Home, Login, Signup, Trashnotes } from "./pages";
import { Editormodal, Sidebar } from "./components";
import PrivateRoutes from "./privateRoute/PrivateRoute";
import { useModal } from "./context/modalContext";

function App() {
  const { isModal } = useModal();
  return (
    <div className="App">
      <Sidebar />
      {isModal && <Editormodal />}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/archives" element={<Archivenotes />} />
          <Route path="/trash" element={<Trashnotes />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
