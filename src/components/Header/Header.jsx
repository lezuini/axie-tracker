import React, { useEffect, useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const toggleMenu = () => {
    if (menuIsOpen) {
      closeMenu(true);
    } else if (!menuIsVisible) {
      setMenuIsOpen(true);
    }
  };

  const closeMenu = (bypass, e) => {
    if (menuIsOpen && (bypass || e.target.id === "menu")) {
      setMenuIsOpen(false);

      setTimeout(() => {
        setMenuIsVisible(false);
      }, 200);
    }
  };

  useEffect(() => {
    if (menuIsOpen) {
      setMenuIsVisible(true);
    }
  }, [menuIsOpen]);

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
          menuIsOpen
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
      <Menu
        menuIsOpen={menuIsOpen}
        menuIsVisible={menuIsVisible}
        closeMenu={closeMenu}
      />
    </header>
  );
};

export default Header;
