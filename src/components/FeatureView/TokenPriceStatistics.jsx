import React, { useContext, useEffect, useState } from "react";

import IconSLP from "../../images/icon-slp.png";
import IconAXS from "../../images/icon-axs.png";

import { toSmallNumber } from "../../helpers/utilities";

import { ReactComponent as IconCaret } from "../../images/caret.svg";
import { ReactComponent as IconCaretCircle } from "../../images/caret-down-circle.svg";

import { TokenDataContext } from "../../contexts/TokenDataContext";

const TokenPriceStatistics = ({ tokenUpdater, api, token }) => {
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const getTokenData = async () => {
      const res = await fetch(api + token + "USDT");

      const json = await res.json();

      setTokenData(json);
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
            className={`priceChange ${
              Math.sign(tokenData.priceChangePercent) === -1
                ? "negative"
                : "positive"
            }`}
          >
            <span>{`${toSmallNumber(tokenData.priceChangePercent, 2)}%`}</span>
            <IconCaret />
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
