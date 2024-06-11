import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  async function heandlLogOut() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: { Authorization: "Bearer " + token },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/login";
  }
  return (
    <div className="container shadow ">
      <nav className="d-flex p-2 ">
        <div className="d-flex">
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              color: "black",
              paddingRight: "10px",
            }}
          >
            Home
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }}>About</Link>
        </div>
        <div className="d-flex">
          {!token ? (
            <>
              <Link
                to="/register"
                style={{ textAlign: "center", marginRight: "10px" }}
                className="register-nav"
              >
                Register
              </Link>
              <Link
                to="/login"
                style={{ textAlign: "center" }}
                className="register-nav"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashborad"
                style={{ textAlign: "center", marginRight: "10px" }}
                className="register-nav"
              >
                Dashborad
              </Link>
              <Link className="register-nav" onClick={heandlLogOut}>
                Log out
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
