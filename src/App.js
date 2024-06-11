import { Route, Routes } from "react-router-dom";
import "./App.css";

import SignUp from "./pags/website/Auth/sign up/Signup";
import Login from "./pags/website/Auth/login/Login";
import Home from "./pags/website//home/Home";
import Dashborad from "./pags/dashborad/Dashborad";
import Users from "./pags/dashborad/user/users/Users";
import UpdateUsers from "./pags/dashborad/user/updateUsers/UpdateUsers";
import CreateUser from "./pags/dashborad/user/createUsers/CreateUser";
import RequireAuth from "./pags/website/Auth/requireAuth/RequireAuth";
import PresisteLOgin from "./pags/website/Auth/presisteLogin/PresisteLOgin";
import Products from "./pags/dashborad/products/Products";
import CreateProduct from "./pags/dashborad/products/CreateProduct";
import UpdateProducts from "./pags/dashborad/products/UpdateProducts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PresisteLOgin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashborad" element={<Dashborad />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUsers />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<CreateProduct />} />
              <Route path="products/:id" element={<UpdateProducts />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
