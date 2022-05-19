import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../../context";
import loginsvg from "../assets/svg/login.svg";
import "../login/login.css";

function Signup() {
  const { isLogin, setLogin } = useAuth();
  const userFirstName = useRef();
  const userLastName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate()
  const location = useLocation()

  const signupHandler = async() => {
    try {
      const response = await axios.post(`/api/auth/signup`, {
        email: userEmail.current.value,
        password: userPassword.current.value,
        firstName:userFirstName.current.value,
        lastName:userLastName.current.value
      })
      setLogin(true)
      const userDetail = {
        Email: response.data.createdUser.email,
        name:
          response.data.createdUser.firstName +
          " " +
          response.data.createdUser.lastName,
      };
      localStorage.setItem("token", response.data.encodedToken);
      localStorage.setItem("user", JSON.stringify(userDetail));
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isLogin && location?.state?.from?.pathname) {
      navigate(location.state.from.pathname);
    } else if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);
 

  return (
    <section className="login-wrapper">
      <section className="login-card">
        <section className="login-hero">
          <img className="login-hero-img" src={loginsvg} alt="" />
        </section>
        <section className="login-main">
          <section className="login-header">Sign Up</section>
          <section className="input-field">
            <section className="input-group">
              <span className="input-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--ic"
                  width="18"
                  height="18"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill=""
                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"
                  ></path>
                </svg>
              </span>
              <input type="text" placeholder="First name" ref={userFirstName} />
            </section>

            <section className="input-group">
              <span className="input-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--ic"
                  width="18"
                  height="18"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill=""
                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"
                  ></path>
                </svg>
              </span>
              <input type="text" placeholder="Last name" ref={userLastName} />
            </section>

            <section className="input-group">
              <section className="input-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--ri"
                  width="18"
                  height="18"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill=""
                    d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12z"
                  ></path>
                </svg>
              </section>

              <input type="email" placeholder="Email" ref={userEmail} />
            </section>
            <section className="input-group">
              <span className="input-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--ic"
                  width="18"
                  height="18"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill=""
                    d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"
                  ></path>
                </svg>
              </span>

              <input
                type="password"
                placeholder="Enter password"
                ref={userPassword}
              />

              <span className="input-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--mdi"
                  width="15"
                  height="15"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"
                  ></path>
                </svg>
              </span>
            </section>
          </section>
          <section className="input-check">
            <section className="input-check-left">
              <input type="checkbox" name="check" />
              <label for="check">I accept all terms and condition</label>
            </section>
          </section>
          <button className="btn-primary" onClick={signupHandler}>Create New Account</button>
          <NavLink className="login-link" to="/signin">
            Already have an account ?
          </NavLink>
        </section>
      </section>
    </section>
  );
}

export { Signup };
