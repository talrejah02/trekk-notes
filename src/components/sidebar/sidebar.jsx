import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Archiveicon, Loginicon, Logouticon, Notesicon, Trashicon } from "../assets/svg";
import "./sidebar.css";

function Sidebar() {
  const {isLogin,setLogin}=useAuth()
  return (
    <article className="sidebar">
      <header className="sidebar-header">
        <div className="header-logo">
          <span>Likho Notes</span>
        </div>
      </header>
      <nav className="sidebar-nav">
        <section className="nav-items">
          <section className="nav-link">
            <NavLink className="nav-btn" to="/">
              <span className="nav-icon">
                <Notesicon />
              </span>
              All Notes
            </NavLink>
          </section>
          <section className="nav-link">
            <NavLink className="nav-btn" to="/archives">
              <span className="nav-icon">
                <Archiveicon />
              </span>
              Archive
            </NavLink>
          </section>
          <section className="nav-link">
            <NavLink className="nav-btn" to="/trash">
              <span className="nav-icon">
                <Trashicon />
              </span>
              Trash
            </NavLink>
          </section>
        </section>
        <footer className="nav-items">
          {!isLogin ? (<section className="nav-link">
            <NavLink className="nav-btn" to="/signin">
              <span className="nav-icon">
                <Loginicon />
              </span>
              Login
            </NavLink>
          </section>) : (<section className="nav-link" onClick={() => {
              setLogin(false)
              localStorage.clear()
          }}>
            <NavLink className="nav-btn" to="/signin">
            <span className="nav-icon">
                <Logouticon/>
              </span>
              Logout
            </NavLink>
          </section>)

          }
          
          
        </footer>
      </nav>
    </article>
  );
}

export { Sidebar };
