import { useEffect, useState } from "react";
import Record from "./Record";

const Records = ({ binanceData, gameData, addresses, setAddresses }) => {
  const { lastPrice } = binanceData;

  const [accounts, setAccounts] = useState([]);

  const deleteAccount = (ronin) => {
    // let newAccounts = accounts.filter((account) => {
    //   return account.ronin !== ronin;
    // });

    let newAddresses = addresses.filter((address) => {
      return address !== ronin;
    });

    setAddresses(newAddresses);
    // setAccounts(newAccounts);
  };

  useEffect(() => {
    let array = [];

    for (let property in gameData) {
      gameData[property].ronin = "ronin:" + property.slice(2);
      console.log(gameData[property].name);
      array.push(gameData[property]);
    }
    setAccounts([...array]);
  }, [gameData]);

  console.log(accounts);

  return (
    <div>
      {accounts.map((account, i) => {
        return (
          <Record
            account={account}
            lastPrice={lastPrice}
            key={i}
            deleteAccount={deleteAccount}
          />
        );
      })}
    </div>
  );
};

export default Records;
