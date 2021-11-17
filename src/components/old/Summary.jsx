import { useEffect, useState } from "react";

import slp from "../images/smooth-love-potion.png";
import { ReactComponent as Caret } from "../images/caret-up.svg";

const Summary = ({ binanceData, gameData }) => {
  const { lastPrice, priceChangePercent } = binanceData;

  const fixed = (string) => {
    return Number(string).toFixed(4);
  };

  const [inGame, setInGame] = useState(0);
  const [ronin, setRonin] = useState(0);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(fixed(lastPrice));

  useEffect(() => {
    let totalSLP = 0;
    let roninSLP = 0;
    let inGameSLP = 0;

    for (let property in gameData) {
      inGameSLP += gameData[property].in_game_slp;
      roninSLP += gameData[property].ronin_slp;
      totalSLP += gameData[property].total_slp;
    }

    setInGame(inGameSLP);
    setRonin(roninSLP);
    setTotal(totalSLP);
  }, [gameData]);

  return (
    <div className="summary">
      <h2>Summary</h2>
      <div className="content">
        <div className="general">
          <p>
            <img src={slp} alt="SLP" />
            <span>SLP Value:</span>
            <strong> ${fixed(lastPrice)} USDT</strong>
          </p>
          <p>
            <span>Price Change (24hr):</span>
            <strong
              style={
                priceChangePercent < 0
                  ? { color: "#ff0000" }
                  : { color: "#008000" }
              }
            >
              <Caret
                style={
                  priceChangePercent < 0
                    ? { transform: "rotate(180deg)", fill: "#ff0000" }
                    : { fill: "#008000" }
                }
              />
              {priceChangePercent}%
            </strong>
          </p>
          <br />
          <br />

          <p>
            <span>Total SLP in Game: </span>
            <strong>{inGame}</strong>
            <span>${fixed(inGame * lastPrice)}</span>
          </p>

          <p>
            <span>Total SLP in all RONIN wallets:</span>
            <strong>{ronin}</strong>
            <span>${fixed(ronin * lastPrice)}</span>
          </p>
          <br />
          <br />
        </div>
        <div className="total">
          <h3>Total:</h3>
          <p>
            <img src={slp} alt="SLP Icon" />
            <span>SLP: </span>
            <strong>{total}</strong>
            <span>${fixed(total * price)}</span>
          </p>
          <p>
            <span>Profit (50%): </span>
            <strong>${fixed(total * lastPrice) / 2}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
