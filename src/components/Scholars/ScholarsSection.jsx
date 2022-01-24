import { useEffect, useState } from "react";
import Scholar from "./Scholar";

import { ReactComponent as IconResize } from "../../images/resize.svg";

const ScholarsSection = ({
  binanceData,
  gameData,
  addresses,
  setAddresses,
}) => {
  // const { lastPrice } = binanceData;

  // const [accounts, setAccounts] = useState([]);

  // const deleteAccount = (ronin) => {
  //   // let newAccounts = accounts.filter((account) => {
  //   //   return account.ronin !== ronin;
  //   // });

  //   let newAddresses = addresses.filter((address) => {
  //     return address !== ronin;
  //   });

  //   setAddresses(newAddresses);
  //   // setAccounts(newAccounts);
  // };

  // useEffect(() => {
  //   let array = [];

  //   for (let property in gameData) {
  //     gameData[property].ronin = "ronin:" + property.slice(2);
  //     console.log(gameData[property].name);
  //     array.push(gameData[property]);
  //   }
  //   setAccounts([...array]);
  // }, [gameData]);

  // console.log(accounts);

  return (
    <section className="scholars-section">
      <div className="separator">
        <div className="title">
          <h3>Scholars</h3>
        </div>
      </div>
      <div className="accounts-section">
        <button className="expander">
          <p>Total accounts 5</p>
          <div className="icon">
            <IconResize />
          </div>
        </button>
        <div className="accounts">
          <Scholar />
        </div>
      </div>
      {/* {accounts.map((account, i) => {
        return (
          <Record
            account={account}
            lastPrice={lastPrice}
            key={i}
            deleteAccount={deleteAccount}
          />
        );
      })} */}
    </section>
  );
};

export default ScholarsSection;
