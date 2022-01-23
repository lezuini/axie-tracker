import React, { useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const [menuIsActive, setMenuIsActive] = useState(false);

  const toggleMenu = () => {
    setMenuIsActive(!menuIsActive);
  };

  const closeMenu = (e) => {
    if (e.target.className === "menu") {
      toggleMenu();
    }
  };

  return (
    <header>
      <div className="text">
        <h1>Axie Infinity SLP Tracker</h1>
        <span>
          By <strong>Leonardo Meza</strong>
        </span>
      </div>
      <button
        className={
          menuIsActive
            ? "hamburger hamburger--slider is-active"
            : "hamburger hamburger--slider"
        }
        type="button"
        onClick={toggleMenu}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      {menuIsActive ? <Menu closeMenu={closeMenu} /> : ""}
    </header>
  );
};

export default Header;
