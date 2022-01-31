import { useCallback, useEffect, useState } from "react";

import "./sass/App.scss";

import { TokenDataContext } from "./contexts/TokenDataContext";
import { AccountsContext } from "./contexts/AccountsContext";
import { AddressesContext } from "./contexts/AddressesContext";

import Header from "./components/Header/Header";
import FeaturedView from "./components/FeatureView/FeaturedView";
import ScholarsSection from "./components/Scholars/ScholarsSection";

import AddressAggregator from "./components/AddressAggregator";
import AddButton from "./components/AddButton";

function App() {
  const GAME_API = "https://game-api.axie.technology/api/v1/";

  //------------------token context only--------------

  const [tokenData, setTokenData] = useState(null);

  const setTokenContext = useCallback(
    (newData) => {
      setTokenData(newData);
    },
    [setTokenData]
  );

  const getTokenContextValue = useCallback(
    () => ({
      tokenData,
      setContext: setTokenContext,
    }),
    [tokenData, setTokenContext]
  );

  //------------------addresses context only--------------

  const [addresses, setAddresses] = useState(null);

  const setAddressesArray = useCallback(
    (newData) => {
      setAddresses(newData);
    },
    [setAddresses]
  );

  //------------------accounts context only--------------

  const [accountsData, setAccountsData] = useState(null);

  //get account information

  useEffect(() => {
    const getAccountsDataFromAPI = async () => {
      let string = addresses.join(",");

      // console.log(string);

      const res = await fetch(GAME_API + string);
      const json = await res.json();

      // console.log(json);

      if (addresses.length === 1) {
        json.ronin = string;

        setAccountsData([json]);
      } else {
        let array = [];

        for (const key in json) {
          let ronin = "ronin:" + key.slice(2);

          json[key].ronin = ronin;

          array.push(json[key]);
        }
        setAccountsData(array);
      }
    };

    if (addresses !== null) {
      getAccountsDataFromAPI();
    }

    // console.log("a<aaa");
  }, [addresses]);

  const [aggregatorIsActive, setAggregatorIsActive] = useState(false);

  const toggleAggregator = () => {
    setAggregatorIsActive(!aggregatorIsActive);
  };

  return (
    <main className="app">
      <div className="container">
        <AddressesContext.Provider value={setAddressesArray}>
          <Header />
          {aggregatorIsActive && (
            <AddressAggregator toggleAggregator={toggleAggregator} />
          )}

          <AddButton
            toggleAggregator={toggleAggregator}
            aggregatorIsActive={aggregatorIsActive}
          />

          <TokenDataContext.Provider value={getTokenContextValue()}>
            <AccountsContext.Provider value={accountsData}>
              <FeaturedView />
              <ScholarsSection />
            </AccountsContext.Provider>
          </TokenDataContext.Provider>
        </AddressesContext.Provider>
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
