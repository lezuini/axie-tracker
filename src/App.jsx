import { useCallback, useEffect, useState } from "react";

import "./sass/App.scss";

import { TokenDataContext } from "./contexts/TokenDataContext";
import { AccountsContext } from "./contexts/AccountsContext";
import { SettingsContext } from "./contexts/SettingsContext";

import Header from "./components/Header/Header";
import AddButton from "./components/AddButton";
import AddressAggregator from "./components/AddressAggregator";
import FeaturedView from "./components/FeatureView/FeaturedView";
import ScholarsSection from "./components/Scholars/ScholarsSection";

function App() {
  const GAME_API = "https://game-api.axie.technology/api/v1/";

  const [aggregatorIsActive, setAggregatorIsActive] = useState(false);
  const [roninDirections, setRoninDirections] = useState(null);
  const [accountUpdater, setAccountUpdater] = useState(null);

  const toggleAggregator = () => {
    setAggregatorIsActive(!aggregatorIsActive);
  };

  // ------------ Settings context only ------------

  const [settings, setSettings] = useState({ wallet: false });

  const getSettingsContext = useCallback(
    () => ({
      settings,
      setContext: setSettings,
    }),
    [settings, setSettings]
  );

  // ------------ Tokens context only ------------

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

  // ------------ Accounts context only ------------

  const [accountsData, setAccountsData] = useState(
    localStorage.getItem("accountsData")
      ? JSON.parse(localStorage.getItem("accountsData"))
      : null
  );

  // Get new account information (Updater only)

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

    if (roninDirections !== null && roninDirections.length > 0) {
      getAccountsDataFromAPI();
      console.log("Updating accounts information");
    }
  }, [accountUpdater]);

  useEffect(() => {
    if (accountsData !== null) {
      let ronins = [];

      accountsData.forEach((account) => {
        ronins.push(account.ronin);
      });

      setRoninDirections(ronins);
    }
  }, [accountsData]);

  // Context
  const setAccountsContext = useCallback(
    (newData) => {
      setAccountsData(newData);

      localStorage.setItem("accountsData", JSON.stringify(newData));
    },
    [setAccountsData]
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
        <SettingsContext.Provider value={getSettingsContext()}>
          <Header />

          <AddButton
            toggleAggregator={toggleAggregator}
            aggregatorIsActive={aggregatorIsActive}
          />

          <AccountsContext.Provider value={getAccountsContext()}>
            {/* This section is responsible for adding ronin addresses */}
            {aggregatorIsActive && (
              <AddressAggregator toggleAggregator={toggleAggregator} />
            )}
            <TokenDataContext.Provider value={getTokenContextValue()}>
              <FeaturedView setAccountUpdater={setAccountUpdater} />
              <ScholarsSection />
            </TokenDataContext.Provider>
          </AccountsContext.Provider>
        </SettingsContext.Provider>
      </div>
    </main>
  );
}

export default App;
