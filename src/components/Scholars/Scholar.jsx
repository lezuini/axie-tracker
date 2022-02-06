import { useEffect, useRef, useState } from "react";

import { ReactComponent as IconCopy } from "../../images/copy.svg";
import { ReactComponent as IconOpen } from "../../images/open-outline.svg";
import { ReactComponent as IconTrophy } from "../../images/trophy.svg";

import { toSmallNumber } from "../../helpers/utilities";

import PFP from "../../images/pfp.png";

const Scholar = ({ account, lastPrice, deleteAccount }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const scholarDetails = useRef(null);
  const [fadeOutIsActive, setFadeOutIsActive] = useState(false);

  const toHumanDate = (milliseconds) => {
    const ms = Number(milliseconds.toString() + "000");

    const date = new Date(ms);

    const day = date.getDate(date);
    const month = date.getMonth(date) + 1;
    const year = date.getFullYear(date);

    const humanDate = day + "/" + month + "/" + year;

    return humanDate;
  };

  const getDaysDifference = (date1, date2) => {
    const diffTime = date2 - date1;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays;
  };

  const getDaysLeft = (nextClaim) => {
    const date1 = Date.now();
    const date2 = Number(nextClaim.toString() + "000");

    let days = getDaysDifference(date1, date2);

    if (days < 0) {
      days = 0;
    }

    return toSmallNumber(days, 1);
  };

  const getAverage = (lastClaim) => {
    const date1 = Number(lastClaim + "000");
    const date2 = Date.now();

    const days = getDaysDifference(date1, date2);

    let avg = Math.floor(account.in_game_slp / Math.ceil(days));

    return avg;
  };

  const toggleDropdown = () => {
    if (!dropdownIsOpen) {
      setDropdownIsOpen(!dropdownIsOpen);
    } else {
      setFadeOutIsActive(true);
      setTimeout(() => {
        setFadeOutIsActive(false);
        setDropdownIsOpen(!dropdownIsOpen);
      }, 300);
    }
  };

  // Scrolllll
  useEffect(() => {
    if (dropdownIsOpen) {
      scholarDetails.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [dropdownIsOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.ronin);
  };

  const handleClick = () => {
    deleteAccount(account.name);
  };

  return (
    <>
      {account && (
        <div className="scholar">
          <div className="account-details" onClick={toggleDropdown}>
            <div className="profile-picture">
              <img src={PFP} alt="pfp" />
            </div>
            <div className="upper">
              <p className="name">{account.name}</p>
              <p className="slp">{account.in_game_slp} SLP</p>
            </div>
            <div className="middle">
              <div className="mmr">
                <IconTrophy />
                <p>{account.mmr}</p>
              </div>
              <p className="usdt">
                USDT {toSmallNumber(account.in_game_slp * lastPrice, 4)}$
              </p>
            </div>
            <div className="lower">
              <p className="rank">
                Rank: <span>#{account.rank}</span>
              </p>
              <p className="next-claim">
                {getDaysLeft(account.next_claim) > 0 ? (
                  <>
                    {"Next Claim in: "}
                    <span>{getDaysLeft(account.next_claim)}</span>
                    {" day(s)"}
                  </>
                ) : (
                  <>{"Claim is available"}</>
                )}
              </p>
            </div>
          </div>
          {dropdownIsOpen && (
            <div
              className={`dropdown ${fadeOutIsActive ? "fade" : ""}`}
              ref={scholarDetails}
            >
              <div className="wallet">
                <a
                  href={`https://marketplace.axieinfinity.com/profile/${account.ronin}/axie`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>{account.ronin}</p>
                  <div className="icon">
                    <IconOpen />
                  </div>
                </a>
                <button className="copy-btn" onMouseUp={handleCopy}>
                  <IconCopy />
                </button>
              </div>
              <div className="statistics">
                <div className="element">
                  <p>Last Claim</p>
                  <strong>{toHumanDate(account.last_claim)}</strong>
                </div>
                <div className="element">
                  <p>Next Claim</p>
                  <strong>{toHumanDate(account.next_claim)}</strong>
                </div>
                <div className="element">
                  <p>Average</p>
                  <strong>{`${getAverage(account.last_claim)} SLP`}</strong>
                </div>
                <div className="element">
                  <p>Lifetime SLP</p>
                  <strong>{account.lifetime_slp}</strong>
                </div>
              </div>
              <div className="delete-account">
                <button onMouseUp={handleClick}>Delete Scholar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Scholar;
