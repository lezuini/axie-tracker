import React, { useState } from "react";
import PerformanceSummary from "./PerformanceSummary";

import TokenPriceStatistics from "./TokenPriceStatistics";

import { ReactComponent as IconRefresh } from "../../images/refresh.svg";

const FeaturedView = ({ setAccountUpdater }) => {
  const BINANCE_API = "https://api.binance.com/api/v3/ticker/24hr?symbol=";

  const [tokenUpdater, setTokenUpdater] = useState(null);
  const [refreshDisabled, setRefreshDisabled] = useState(false);

  const handleClick = () => {
    const now = Date.now();

    setRefreshDisabled(true);

    setTimeout(() => {
      setRefreshDisabled(false);
    }, 500);

    console.log("Updating");

    setAccountUpdater(now);
    setTokenUpdater(now);
  };

  return (
    <div className="featuredView">
      <div className="container">
        <TokenPriceStatistics
          tokenUpdater={tokenUpdater}
          api={BINANCE_API}
          token="SLP"
        />
        <PerformanceSummary />
        <TokenPriceStatistics
          tokenUpdater={tokenUpdater}
          api={BINANCE_API}
          token="AXS"
        />
      </div>
      <button disabled={refreshDisabled ? true : false} onMouseUp={handleClick}>
        <p>Refresh</p>
        <IconRefresh />
      </button>
    </div>
  );
};

export default FeaturedView;
