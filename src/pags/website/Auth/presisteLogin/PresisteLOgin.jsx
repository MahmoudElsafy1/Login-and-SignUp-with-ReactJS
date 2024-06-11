import React, { useContext, useEffect, useState } from "react";
import { User } from "../context/UserContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import Cookies from "universal-cookie";

export default function PresisteLOgin() {
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);
  const cookie = new Cookies();

  const getToken = cookie.get("Bearer");
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: { Authorization: "Bearer " + getToken },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token);
            context.setAuth((prev) => {
              return { userDeatils: data.data.user, token: data.data.token };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
