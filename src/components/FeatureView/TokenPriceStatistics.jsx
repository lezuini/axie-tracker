import React, { useContext, useEffect, useState } from "react";

import IconSLP from "../../images/icon-slp.png";
import IconAXS from "../../images/icon-axs.png";

import { toSmallNumber } from "../../helpers/utilities";

import { ReactComponent as IconCaret } from "../../images/caret.svg";
import { ReactComponent as IconCaretCircle } from "../../images/caret-down-circle.svg";

import { TokenDataContext } from "../../contexts/TokenDataContext";

const TokenPriceStatistics = ({ tokenUpdater, api, token }) => {
  const [flashIsOn, setFlashIsOn] = useState(false);
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const getTokenData = async () => {
      const res = await fetch(api + token + "USDT");

      const json = await res.json();

      setTokenData(json);

      setFlashIsOn(true);

      setTimeout(() => {
        setFlashIsOn(false);
      }, 200);
    };

    getTokenData();

    return () => {};
  }, [tokenUpdater, api, token]);

  const context = useContext(TokenDataContext);

  useEffect(() => {
    if (
      tokenData &&
      tokenData.symbol === "SLPUSDT" &&
      context.tokenData !== tokenData
    ) {
      context.setContext(tokenData);
    }
  }, [context, tokenData]);

  return (
    <div className={`token-card ${flashIsOn ? "flash" : ""}`}>
      {tokenData !== null ? (
        <>
          <div className="icon">
            <img
              src={token === "SLP" ? IconSLP : IconAXS}
              alt={`${token} Icon`}
            />
          </div>
          <div className="token">
            <h2 className={token === "SLP" ? "slp" : undefined}>{token}</h2>
            <p>
              {token === "SLP" ? "Smooth Love Potion" : "Axie Infinity Token"}
            </p>
          </div>
          <div className="price-indicator">
            <strong>{`USDT $${toSmallNumber(
              tokenData.lastPrice,
              token === "SLP" ? 4 : 2
            )}`}</strong>
            <div
              className={`price-change ${
                Math.sign(tokenData.priceChangePercent) === -1
                  ? "negative"
                  : "positive"
              }`}
            >
              <span>{`${toSmallNumber(
                tokenData.priceChangePercent,
                2
              )}%`}</span>
              <IconCaret />
            </div>
          </div>
          <div className="price-lowhigh">
            <div className="element">
              <IconCaretCircle className="inverted" />
              <p>{`$${toSmallNumber(
                tokenData.highPrice,
                token === "SLP" ? 4 : 2
              )}`}</p>
            </div>
            <div className="element">
              <IconCaretCircle />
              <p>{`$${toSmallNumber(
                tokenData.lowPrice,
                token === "SLP" ? 4 : 2
              )}`}</p>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default TokenPriceStatistics;
