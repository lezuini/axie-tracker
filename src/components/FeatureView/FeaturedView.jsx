import React from "react";
import PerformanceSummary from "./PerformanceSummary";

import TokenPriceStatistics from "./TokenPriceStatistics";

const FeaturedView = () => {
  const BINANCE_API = "https://api.binance.com/api/v3/ticker/24hr?symbol=";

  return (
    <div className="featuredView">
      <TokenPriceStatistics api={BINANCE_API} token="SLP" />
      <PerformanceSummary />
      {/* <TokenPriceStatistics api={BINANCE_API} token="AXS" /> */}
    </div>
  );
};

export default FeaturedView;
