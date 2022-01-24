import { useCallback, useEffect, useState } from "react";

import "./sass/App.scss";

import { TokenDataContext } from "./contexts/TokenDataContext";
import { AddresesContext } from "./contexts/AddresesContext";

import Header from "./components/Header/Header";
import FeaturedView from "./components/FeatureView/FeaturedView";
import ScholarsSection from "./components/Scholars/ScholarsSection";

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

  //------------------token context only--------------

  const [tokenData, setTokenData] = useState(null);

  const setContext = useCallback(
    (update) => {
      setTokenData(update);
    },
    [setTokenData]
  );

  const getTokenContextValue = useCallback(
    () => ({
      tokenData,
      setContext,
    }),
    [tokenData, setContext]
  );

  return (
    <main className="app">
      <div className="container">
        <Header />
        <TokenDataContext.Provider value={getTokenContextValue()}>
          <AddresesContext.Provider value={"qa"}>
            <FeaturedView />
            <ScholarsSection />
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
