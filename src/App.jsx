import { useEffect, useState } from "react";

import FeaturedView from "./components/FeatureView/FeaturedView";
import Header from "./components/Header/Header";
// import AddressAggregator from "./components/AddressAggregator";
// import Records from "./components/Records";
// import Summary from "./components/Summary";
import "./sass/App.scss";

import { TokenDataContext } from "./contexts/TokenDataContext";
import { AddresesContext } from "./contexts/AddresesContext";

function App() {
  const GAME_API = "https://game-api.axie.technology/api/v1/";

  // const [addresses, setAddresses] = useState(
  //   localStorage.getItem("addresses")
  //     ? JSON.parse(localStorage.getItem("addresses"))
  //     : []
  // );
  // const [binanceData, setBinanceData] = useState(null);
  // const [gameData, setGameData] = useState(null);

  // const updateAddresses = (address) => {
  //   setAddresses([...addresses, address]);
  // };

  // useEffect(() => {
  //   localStorage.setItem("addresses", JSON.stringify(addresses));

  //   if (addresses.length > 0) {
  //     let serializedAddresses = "";

  //     addresses.forEach((address) => {
  //       serializedAddresses += address + ",";
  //     });

  //     const addressSet = serializedAddresses.slice(0, -1);

  //     const promises = Promise.all([
  //       fetch(BINANCE_API),
  //       fetch(GAME_API + addressSet),
  //     ]);

  //     const updateData = async () => {
  //       const [res1, res2] = await promises;

  //       const json1 = await res1.json();
  //       const json2 = await res2.json();

  //       setBinanceData(json1);

  //       if (json2.success) {
  //         const address0x = "0x" + addressSet.slice(6);
  //         setGameData({ [address0x]: json2 });
  //       } else {
  //         setGameData(json2);
  //       }

  //       console.log(json1, json2);
  //     };

  //     updateData();
  //   } else {
  //     setGameData([]);
  //   }
  // }, [addresses]);

  const getTokenDataContext = {
    symbol: "SLPUSDT",
    priceChange: "-0.00290000",
    priceChangePercent: "-19.205",
    weightedAvgPrice: "0.01212706",
    prevClosePrice: "0.01510000",
    lastPrice: "0.01220000",
    lastQty: "2240.00000000",
    bidPrice: "0.01210000",
    bidQty: "7708082.00000000",
    askPrice: "0.01220000",
    askQty: "393387.00000000",
    openPrice: "0.01510000",
    highPrice: "0.01520000",
    lowPrice: "0.01050000",
    volume: "4242185392.00000000",
    quoteVolume: "51445216.07270000",
    openTime: 1642792457786,
    closeTime: 1642878857786,
    firstId: 57913756,
    lastId: 58036612,
    count: 122857,
  };

  return (
    <main className="app">
      <div className="container">
        <Header />
        <TokenDataContext.Provider value={getTokenDataContext}>
          <AddresesContext.Provider value={"qa"}>
            <FeaturedView />
          </AddresesContext.Provider>
        </TokenDataContext.Provider>
        {/* <AddressAggregator updateAddresses={updateAddresses} />
        {binanceData && gameData && (
          <>
            <Summary binanceData={binanceData} gameData={gameData} />
            <Records
              binanceData={binanceData}
              gameData={gameData}
              addresses={addresses}
              setAddresses={setAddresses}
            />
          </>
        )} */}
      </div>
    </main>
  );
}

export default App;
