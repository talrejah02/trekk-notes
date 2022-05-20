import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { Editormodal, Sidebar } from "./components";
import PrivateRoutes from "./privateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Sidebar />
      {/* <Editormodal/>   */}
      <Routes>
        <Route element={<PrivateRoutes/>}>
        <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signin" element={ <Login/>}/>
        <Route path="/signup" element={ <Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
