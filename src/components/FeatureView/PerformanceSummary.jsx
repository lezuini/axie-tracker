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
      <h3>SLP</h3>
      <p>In game: 200</p>
      <span>~ $40</span>
      <p>In wallet: 200</p>
      <span>~ $40</span>
      <h3>Total</h3>
      <strong>3000</strong>
      <span>~ $40</span>
      <p>Profit</p>
      <span>~ $20 (50%)</span>
    </div>
  );
};

export default PerformanceSummary;
