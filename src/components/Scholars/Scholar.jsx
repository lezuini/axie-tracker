import PFP from "../../images/pfp.png";
import { ReactComponent as IconCopy } from "../../images/copy.svg";
import { ReactComponent as IconOpen } from "../../images/open-outline.svg";
import { ReactComponent as IconTrophy } from "../../images/trophy.svg";
import { useEffect, useState } from "react";

const Scholar = ({ account, lastPrice, deleteAccount }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(account);
  }, [account]);

  // const handleClick = () => {
  //   deleteAccount(ronin);
  // };

  const handleCopy = () => {
    navigator.clipboard.writeText("a");
  };

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  return (
    <>
      {data && (
        <div className="scholar">
          <div className="account-details" onClick={toggleDropdown}>
            <div className="profile-picture">
              <img src={PFP} alt="pfp" />
            </div>
            <div className="upper">
              <p className="name">{data.name}</p>
              <p className="slp">{data.in_game_slp} SLP</p>
            </div>
            <div className="middle">
              <div className="mmr">
                <IconTrophy />
                <p>{data.mmr}</p>
              </div>
              <p className="usdt">USDT {data.in_game_slp * lastPrice}$</p>
            </div>
            <div className="lower">
              <p className="rank">
                Rank: <span>#{data.rank}</span>
              </p>
              <p className="next-claim">
                Next Claim in: <span>10</span> day(s)
              </p>
            </div>
          </div>
          {dropdownIsOpen && (
            <div className="dropdown">
              <div className="wallet">
                <a
                  href={`https://marketplace.axieinfinity.com/profile/${data.ronin}/axie`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>{data.ronin}</p>
                  <IconOpen />
                </a>
                <button className="copy-btn" onMouseUp={handleCopy}>
                  <IconCopy />
                </button>
              </div>
              <div className="statistics">
                <div className="element">
                  <p>Last Claim</p>
                  <strong>{data.last_claim}</strong>
                </div>
                <div className="element">
                  <p>Next Claim</p>
                  <strong>{data.next_claim}</strong>
                </div>
                <div className="element">
                  <p>Average</p>
                  <strong>{`400 SLP`}</strong>
                </div>
                <div className="element">
                  <p>Lifetime SLP</p>
                  <strong>{data.lifetime_slp}</strong>
                </div>
              </div>
              <div className="delete-account">
                <button>Delete Scholar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Scholar;
