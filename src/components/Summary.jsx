import { useEffect, useState } from "react";

const Summary = ({ binanceData, gameData }) => {
  const { lastPrice, priceChangePercent } = binanceData;

  const [inGame, setInGame] = useState(0);
  const [ronin, setRonin] = useState(0);
  const [total, setTotal] = useState(0);

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
      <p>
        SLP Value: ~ <strong> ${Number(lastPrice).toFixed(4)}</strong>
      </p>
      <p>
        Change 24hrs: ~{" "}
        <strong
          style={priceChangePercent < 0 ? { color: "red" } : { color: "green" }}
        >
          {priceChangePercent}%
        </strong>
      </p>
      <br />
      <br />
      <p>
        Total SLP: {total} ~ <strong>${(total * lastPrice).toFixed(4)}</strong>
      </p>
      <p>
        In Game SLP: {inGame} ~{" "}
        <strong>${(inGame * lastPrice).toFixed(4)}</strong>
      </p>

      <p>
        In Ronin SLP: {ronin} ~{" "}
        <strong>${(ronin * lastPrice).toFixed(4)}</strong>
      </p>
      <br />
      <br />
      <p>
        Profit: (50%) ~ <strong>${(total * lastPrice).toFixed(4) / 2}</strong>
      </p>
    </div>
  );
};

export default Summary;
