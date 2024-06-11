import axios from "axios";
import React, { useEffect, useState } from "react";
import "./form.css";

import Cookies from "universal-cookie";

export default function Form(props) {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordR, setpasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailErro, setemailErro] = useState("");

  const registerStyle = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",

    marginTop: "40px",
  };
  const formStyle = {
    boxShadow: "0px 2px 15px rgb(0 0 0 /10%)",
    width: "400px",
  };
  const buttonStyle = { width: "100%" };
  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);
  async function submit(e) {
    // let flag = true;
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api${props.endPoint}`,
        {
          name: name,
          email: email,
          password: Password,
          password_confirmation: passwordR,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      if (res.status === 200) {
        window.location.pathname = `/${props.navgate}`;
      }
    } catch (erro) {
      setemailErro(erro.response.status);
    }
  }
  return (
    <div className="register" style={props.registerStyle && registerStyle}>
      <form onSubmit={submit} style={props.registerStyle && formStyle}>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name === "" && accept && <p className="erro">User Name is Required</p>}
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          placeholder="Email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {accept && emailErro === 422 && (
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
          <button type="submit" style={props.buttonStyle && buttonStyle}>
            {props.textButton}
          </button>
        </div>
      </form>
    </div>
  );
}
