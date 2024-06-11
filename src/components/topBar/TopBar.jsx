import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="d-flex container shadow">
      <h1>Store</h1>
      <Link className="register-nav" to="/">
        Go To Website
      </Link>
    </div>
  );
}
