import React from "react";
import { useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./login.css";
import loginsvg from "../assets/svg/login.svg";
import { useEffect } from "react";
import { useAuth } from "../../context";

function Login() {
  const { isLogin, setLogin } = useAuth();
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const loginHandler = async () => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: userEmail.current.value,
        password: userPassword.current.value,
      });
      setLogin(true);
      const userDetail = {
        Email: response.data.foundUser.email,
        name:
          response.data.foundUser.firstName +
          " " +
          response.data.foundUser.lastName,
      };
      localStorage.setItem("token", response.data.encodedToken);
      localStorage.setItem("user", JSON.stringify(userDetail));
     
    } catch (error) {
      console.log(error);
    }
  };

  const guestLoginhandler = () => {
    userEmail.current.value = "adarshbalika@gmail.com";
    userPassword.current.value = "adarshBalika123";
    console.log(userEmail.current.value, userPassword.current.value);
    loginHandler();
  };

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
          <section className="login-header">Login</section>
          <form action="" className="login-form">
            <section className="input-field">
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

                <input
                  type="email"
                  placeholder="Username"
                  ref={userEmail}
                  required
                />
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
                  required
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
                <label for="check">Remember me</label>
              </section>
              <NavLink to="">forgot your password?</NavLink>
            </section>
            <button
              type="submit"
              className="btn-primary"
              onClick={loginHandler}
            >
              Log in
            </button>
          </form>
          <button className="btn-primary" onClick={guestLoginhandler}>
            {" "}
            Guest Log in
          </button>
          <NavLink className="login-link" to="/signup">
            Create an account{">"}
          </NavLink>
        </section>
      </section>
    </section>
  );
}

export { Login };
