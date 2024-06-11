import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../website/Auth/context/UserContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  let showUsers;
  const [useEvectRun, setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;

  async function getUsers() {
    let res = await axios.get("http://127.0.0.1:8000/api/user/show", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    setUsers(res.data);
  }
  useEffect(() => {
    getUsers();
  }, [useEvectRun]);
  async function deleteUres(id) {
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch {
      console.log("error");
    }
  }

  showUsers = users.map((user, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "4px" }}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteUres(user.id)}
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        ></i>
      </td>
    </tr>
  ));
  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
      \
    </div>
  );
}
