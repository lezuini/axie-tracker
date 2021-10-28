import { useEffect, useState } from "react";
import AddressAggregator from "./components/AddressAggregator";
import Records from "./components/Records";
import Summary from "./components/Summary";
import "./styles/App.scss";

function App() {
  const BINANCE_API =
    "https://api.binance.com/api/v3/ticker/24hr?symbol=SLPUSDT";
  const GAME_API = "https://game-api.axie.technology/api/v1/";

  const [addresses, setAddresses] = useState(
    localStorage.getItem("addresses")
      ? JSON.parse(localStorage.getItem("addresses"))
      : []
  );
  const [binanceData, setBinanceData] = useState(null);
  const [gameData, setGameData] = useState(null);

  const updateAddresses = (address) => {
    setAddresses([...addresses, address]);
  };

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));

    if (addresses.length > 0) {
      let serializedAddresses = "";

      addresses.forEach((address) => {
        serializedAddresses += address + ",";
      });

      const addressSet = serializedAddresses.slice(0, -1);

      const promises = Promise.all([
        fetch(BINANCE_API),
        fetch(GAME_API + addressSet),
      ]);

      const updateData = async () => {
        const [res1, res2] = await promises;

        const json1 = await res1.json();
        const json2 = await res2.json();

        setBinanceData(json1);

        if (json2.success) {
          const address0x = "0x" + addressSet.slice(6);
          setGameData({ [address0x]: json2 });
        } else {
          setGameData(json2);
        }

        console.log(json1, json2);
      };

      updateData();
    } else {
      setGameData([]);
    }
  }, [addresses]);

  return (
    <main className="app">
      <div className="container">
        <AddressAggregator updateAddresses={updateAddresses} />
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
        )}
      </div>
    </main>
  );
}

export default App;
