import React, { useState } from "react";
import AddressAggregator from "./AddressAggregator";

const Menu = ({ closeMenu }) => {
  const [aggregatorIsOpen, setAggregatorIsOpen] = useState(false);
  const [configIsOpen, setConfigIsOpen] = useState(false);

  const toggleAggregator = () => {
    setAggregatorIsOpen(!aggregatorIsOpen);
  };
  const toggleConfig = () => {
    setConfigIsOpen(!configIsOpen);
  };

  return (
    <>
      <div
        className="menu"
        onClick={(e) => {
          closeMenu(e);
        }}
      >
        <ul>
          <li>
            <button onClick={toggleAggregator}>Add new address</button>
          </li>
          <li>
            <button onClick={toggleConfig}>Settings</button>
          </li>
        </ul>
      </div>
      {aggregatorIsOpen && (
        <AddressAggregator toggleAggregator={toggleAggregator} />
      )}
    </>
  );
};

export default Menu;
