import React, { useContext, useEffect, useState } from "react";
import { User } from "../../website/Auth/context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  let showProducts;
  const [useEvectRun, setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;

  async function getProduct() {
    let res = await axios.get("http://127.0.0.1:8000/api/product/show", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    setProducts(res.data);
  }
  useEffect(() => {
    getProduct();
  }, [useEvectRun]);
  async function deleteUres(id) {
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  showProducts = products.map((product, i) => (
    <tr key={i}>
      <td>{i + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        <Link to={`${product.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "4px" }}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteUres(product.id)}
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
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
}
