import React, { useEffect, useState } from "react";

import IconSLP from "../../images/icon-slp.png";
import IconAXS from "../../images/icon-axs.png";
import { ReactComponent as Caret } from "../../images/caret.svg";

const TokenPriceStatistics = ({ api, token }) => {
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const getTokenData = async () => {
      const res = await fetch(api + token + "USDT");

      const json = await res.json();

      console.log(json);
      setTokenData(json);
    };

    getTokenData();

    return () => {};
  }, [api, token]);

  const toSmallNumber = (string, decimalSize) => {
    return Number(string).toFixed(decimalSize);
  };

  return (
    <div className="token-card">
      {tokenData !== null ? (
        <>
          <div className="icon">
            <img
              src={token === "SLP" ? IconSLP : IconAXS}
              alt={`${token} Icon`}
            />
          </div>
          <div className="token">
            <h2>{token}</h2>
            <p>
              {token === "SLP" ? "Smooth Love Potion" : "Axie Infinity Token"}
            </p>
          </div>
          <strong>{`USDT $${toSmallNumber(
            tokenData.lastPrice,
            token === "SLP" ? 4 : 2
          )}`}</strong>
          <div
            className={
              Math.sign(tokenData.priceChangePercent) === -1
                ? "priceChange negative"
                : "priceChange positive"
            }
          >
            <span>{`${toSmallNumber(tokenData.priceChangePercent, 2)}%`}</span>
            <Caret />
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default TokenPriceStatistics;
