import React, { useContext } from "react";
import TopBar from "../../components/topBar/TopBar";

import { Outlet } from "react-router-dom";
import SideBar from "../../components/sideBar/SideBar";

export default function Dashborad() {
  return (
    <div>
      <TopBar />
      <div className="contant-flex">
        <SideBar />
        <div style={{ width: "80%" }}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
