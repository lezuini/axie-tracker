import { useEffect, useState } from "react";

// import slp from "../images/smooth-love-potion.png";
// import { ReactComponent as Caret } from "../images/caret-up.svg";

const PerformanceSummary = ({ binanceData, gameData }) => {
  // const { lastPrice, priceChangePercent } = binanceData;

  // const fixed = (string) => {
  //   return Number(string).toFixed(4);
  // };

  // const [inGame, setInGame] = useState(0);
  // const [ronin, setRonin] = useState(0);
  // const [total, setTotal] = useState(0);
  // const [price, setPrice] = useState(fixed(lastPrice));

  // useEffect(() => {
  //   let totalSLP = 0;
  //   let roninSLP = 0;
  //   let inGameSLP = 0;

  //   for (let property in gameData) {
  //     inGameSLP += gameData[property].in_game_slp;
  //     roninSLP += gameData[property].ronin_slp;
  //     totalSLP += gameData[property].total_slp;
  //   }

  //   setInGame(inGameSLP);
  //   setRonin(roninSLP);
  //   setTotal(totalSLP);
  // }, [gameData]);

  return (
    <div className="summary">
      <h2>Scholars</h2>
      <div className="group">
        <p>In game:</p>
        <strong>
          400 <span>SLP</span>
        </strong>
        <span>USDT $80</span>
      </div>
      <div className="group">
        <p>In wallet:</p>
        <strong>
          200 <span>SLP</span>
        </strong>
        <span>USDT $40</span>
      </div>
      <h3>Total:</h3>
      <div className="group">
        <strong>
          3000 <span>SLP</span>
        </strong>
        <span>USDT $40</span>
      </div>
      <h3>Profit (50%):</h3>
      <span>USDT $20</span>
    </div>
  );
};

export default PerformanceSummary;
