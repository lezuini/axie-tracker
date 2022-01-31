import React, { useState } from "react";

const Menu = ({ closeMenu }) => {
  return (
    <>
      <div
        className="menu"
        onClick={(e) => {
          closeMenu(e);
        }}
      >
        <div className="container">
          <h3>About the app</h3>
          <p>Add ronin addresses and see the SLP they contain</p>
          <a
            href="https://github.com/leonardomeza87/axie-tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository
          </a>
          <a
            href="https://twitter.com/leonardomeza87"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Twitter
          </a>
        </div>
      </div>
    </>
  );
};

export default Menu;
