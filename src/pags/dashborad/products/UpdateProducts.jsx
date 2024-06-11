import React, { useContext, useEffect, useState } from "react";
import { User } from "../../website/Auth/context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [accept, setAccept] = useState(false);

  const context = useContext(User);

  const token = context.auth.token;

  const nav = useNavigate();
  let id = window.location.pathname.split("/").splice(-1);
  async function getProduct() {
    let res = await axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      });
  }
  useEffect(() => {
    getProduct();
  }, []);

  async function submit(e) {
    // let flag = true;
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        formData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      nav("/dashborad/products");
    } catch (erro) {
      console.log(erro);
      setAccept(true);
    }
  }
  return (
    <div>
      <div>
        <div>
          <form onSubmit={submit}>
            <label htmlFor="title">Title :</label>
            <input
              type="text"
              id="title"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title === "" && accept && (
              <p className="erro">User Name is Required</p>
            )}
            <label htmlFor="description">Description :</label>
            <input
              type="text"
              id="description"
              placeholder="Description..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* {accept  && (
                  <p className="erro">Email is already taken</p>
                )} */}
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              placeholder="Password..."
              //   value={image}
              onChange={(e) => setImage(e.target.files.item(0))}
            />
            {/* {Password.length < 8 && accept && (
                  <p className="erro">password must be more then 8 cahr</p>
                )} */}

            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
