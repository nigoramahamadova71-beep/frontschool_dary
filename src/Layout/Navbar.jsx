import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">📘</div>
        <span className="navbar__title">Электронный дневник</span>
      </div>

      <button className="navbar__btn" onClick={logout}>
        Выйти
      </button>
    </header>
  );
};

export default Navbar;
