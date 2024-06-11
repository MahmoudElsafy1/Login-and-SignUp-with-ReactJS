import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../../../../components/header/Header";
import "./login.css";
import { User } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [accept, setAccept] = useState(false);
  const [erro, setErro] = useState(false);
  const userLog = useContext(User);
  const nav = useNavigate();
  const cookie = new Cookies();

  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: Password,
      });
      const token = res.data.data.token;
      const userDeatils = res.data.data.user;
      cookie.set("Bearer", token);
      console.log(token);
      userLog.setAuth({ token, userDeatils });
      nav("/dashborad");
    } catch (erro) {
      if (erro.response.status === 401) setErro(true);
    }
    setAccept(true);
  }

  return (
    <div>
      <Header />
      <div className="parent login">
        <div className="register">
          <form onSubmit={submit}>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              placeholder="Password..."
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {Password.length < 8 && accept && (
              <p className="erro">password must be more then 8 cahr</p>
            )}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Login</button>
            </div>
            {accept && erro && <p className="erro">Wrong Email or password </p>}
          </form>
        </div>
      </div>
    </div>
  );
}
