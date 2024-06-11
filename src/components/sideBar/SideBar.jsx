import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="side-bar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "active item-link" : "item-link"
          }
          to="/dashborad/users"
        >
          <i className="fa-solid fa-users-line"></i>Users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active item-link" : "item-link"
          }
          to="/dashborad/user/create"
        >
          <i className="fa-solid fa-user-plus"></i> New User
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active item-link" : "item-link"
          }
          to="/dashborad/products"
        >
          <i class="fa-brands fa-solid fa-product-hunt"></i> Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active item-link" : "item-link"
          }
          to="/dashborad/product/create"
        >
          <i class="fa-solid fa-plus"></i> New Product
        </NavLink>
      </div>
    </>
  );
}
