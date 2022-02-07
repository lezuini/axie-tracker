import { useContext, useState } from "react";

import { SettingsContext } from "../../contexts/SettingsContext";

const Menu = ({ menuIsOpen, menuIsVisible, closeMenu }) => {
  const [optionOne, setOptionOne] = useState(false);

  const { setContext } = useContext(SettingsContext);

  const handleClick = () => {
    setOptionOne(!optionOne);
    setContext({ wallet: !optionOne });
  };

  return (
    <div
      id="menu"
      className={menuIsVisible ? (menuIsOpen ? "open" : undefined) : "close"}
      onMouseUp={(e) => {
        closeMenu(false, e);
      }}
    >
      <div className="menu-container">
        <div className="container">
          <h3>About the app</h3>
          <p>
            Small app to follow multiple RONIN accounts and view their SLP,
            optimized for simplicity.
          </p>
          <hr />
          <h4>About the developer</h4>
          <p>
            I'm a Front End Web Developer looking for a job. My (not so active)
            Twitter profile{" "}
            <a
              href="https://twitter.com/leonardomeza87"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            {"."}
          </p>
          <h4>Source code</h4>
          <p>
            The code of this app can be seen in this{" "}
            <a
              href="https://github.com/leonardomeza87/axie-tracker"
              target="_blank"
              rel="noopener noreferrer"
            >
              repository
            </a>
            . If you want to make any changes you can open a pull request.
          </p>
          <hr />
          <h3>Settings</h3>
          <p htmlFor="wallet-consideration">
            Take into account the SLP of the wallets for the calculation of the
            profit:
          </p>
          <div
            id="checkbox"
            className={optionOne ? "active" : undefined}
            onMouseUp={handleClick}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
