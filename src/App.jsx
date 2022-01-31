import { useCallback, useEffect, useState } from "react";

import "./sass/App.scss";

import { TokenDataContext } from "./contexts/TokenDataContext";
import { AccountsContext } from "./contexts/AccountsContext";

import Header from "./components/Header/Header";
import FeaturedView from "./components/FeatureView/FeaturedView";
import ScholarsSection from "./components/Scholars/ScholarsSection";

import AddressAggregator from "./components/AddressAggregator";
import AddButton from "./components/AddButton";

function App() {
  const GAME_API = "https://game-api.axie.technology/api/v1/";

  const [aggregatorIsActive, setAggregatorIsActive] = useState(false);
  const [roninDirections, setRoninDirections] = useState(null);
  const [accountUpdater, setAccountUpdater] = useState(null);

  const toggleAggregator = () => {
    setAggregatorIsActive(!aggregatorIsActive);
  };

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

  //------------------accounts context only--------------

  const [accountsData, setAccountsData] = useState(null);

  // Get account information

  useEffect(() => {
    const getAccountsDataFromAPI = async () => {
      let string = roninDirections.join(",");

      const res = await fetch(GAME_API + string);
      const json = await res.json();

      if (roninDirections.length === 1) {
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

    if (roninDirections !== null) {
      getAccountsDataFromAPI();
    }
  }, [roninDirections, accountUpdater]);

  // Context
  const setAccountsContext = useCallback(
    (newData) => {
      setRoninDirections(newData);
    },
    [setRoninDirections]
  );

  const getAccountsContext = useCallback(
    () => ({
      accountsData,
      setContext: setAccountsContext,
    }),
    [accountsData, setAccountsContext]
  );

  return (
    <main className="app">
      <div className="container">
        <Header />

        {/* This section is responsible for adding ronin addresses */}
        {aggregatorIsActive && (
          <AddressAggregator
            toggleAggregator={toggleAggregator}
            setRoninDirections={setRoninDirections}
          />
        )}

        <AddButton
          toggleAggregator={toggleAggregator}
          aggregatorIsActive={aggregatorIsActive}
        />

        {/* These sections show the data obtained */}
        <TokenDataContext.Provider value={getTokenContextValue()}>
          <AccountsContext.Provider value={getAccountsContext()}>
            <FeaturedView setAccountUpdater={setAccountUpdater} />
            <ScholarsSection />
          </AccountsContext.Provider>
        </TokenDataContext.Provider>
      </div>
    </main>
  );
}

export default App;
