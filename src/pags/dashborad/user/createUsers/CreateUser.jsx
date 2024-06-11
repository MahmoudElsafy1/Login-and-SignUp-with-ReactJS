import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { User } from "../../../website/Auth/context/UserContext";
import "./user.css";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordR, setpasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailErro, setemailErro] = useState(false);
  const context = useContext(User);

  const token = context.auth.token;

  const nav = useNavigate();

  async function submit(e) {
    // let flag = true;
    e.preventDefault();
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/user/create`,
        {
          name: name,
          email: email,
          password: Password,
          password_confirmation: passwordR,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      nav("/dashborad/users");

      // if (res.status === 200) {
      //   props.local && window.localStorage.setItem("email", email);
      //   window.location.pathname = `/${props.navgate}`;
      // }
    } catch (erro) {
      if (erro.response.status === 422) {
        setemailErro(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <div>
        <div>
          <form onSubmit={submit}>
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name === "" && accept && (
              <p className="erro">User Name is Required</p>
            )}
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailErro && (
              <p className="erro">Email is already taken</p>
            )}
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
            <label htmlFor="repeat">Repeat Password :</label>
            <input
              type="password"
              id="repeat"
              placeholder="Repeat Password"
              value={passwordR}
              onChange={(e) => setpasswordR(e.target.value)}
            />
            {passwordR !== Password && accept && (
              <p className="erro">password dose not match</p>
            )}
            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
