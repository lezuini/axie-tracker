import PFP from "../../images/pfp.png";
import { ReactComponent as IconCopy } from "../../images/copy.svg";
import { ReactComponent as IconTrophy } from "../../images/trophy.svg";
import { useState } from "react";

const Scholar = ({ account, lastPrice, deleteAccount }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  // const {
  //   in_game_slp,
  //   last_claim,
  //   lifetime_slp,
  //   mmr,
  //   name,
  //   next_claim,
  //   rank,
  //   ronin,
  //   ronin_slp,
  //   total_slp,
  // } = account;

  // const handleClick = () => {
  //   deleteAccount(ronin);
  // };

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(ronin);
  // };

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  return (
    <div className="scholar">
      <div className="account-details" onClick={toggleDropdown}>
        <div className="profile-picture">
          <img src={PFP} alt="pfp" />
        </div>
        <div className="upper">
          <p className="name">Nanahoshi gaming pro master hd</p>
          <div className="mmr">
            <IconTrophy />
            <p>1300</p>
          </div>
          <p className="slp">500 SLP</p>
        </div>
        <div className="lower">
          <p className="rank">
            Rank: <span>#1873244</span>
          </p>
          <p className="next-claim">Next Claim in: 10 day(s)</p>
        </div>
      </div>
      {dropdownIsOpen && (
        <div className="dropdown">
          <div className="wallet">
            <a
              href={`https://marketplace.axieinfinity.com/profile/${"ronin"}/axie`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {"ronin:0xedb136a58e616c0443988d2897af59aa17045045"}
            </a>
            <button>
              <IconCopy />
            </button>
          </div>
          <div className="statistics">
            <div className="element">
              <p>Last Claim</p>
              <strong>02/02</strong>
            </div>
            <div className="element">
              <p>Next Claim</p>
              <strong>02/02</strong>
            </div>
            <div className="element">
              <p>Average</p>
              <strong>{`400 SLP`}</strong>
            </div>
            <div className="element">
              <p>Lifetime SLP</p>
              <strong>{`100200`}</strong>
            </div>
          </div>
          <div className="delete-account">
            <button>Delete Scholar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholar;
