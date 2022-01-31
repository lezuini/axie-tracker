import { useContext } from "react";

import { ReactComponent as IconResize } from "../../images/resize.svg";

import { TokenDataContext } from "../../contexts/TokenDataContext";
import { AccountsContext } from "../../contexts/AccountsContext";

import Scholar from "./Scholar";

const ScholarsSection = () => {
  const { tokenData } = useContext(TokenDataContext);
  const { accountsData, setContext } = useContext(AccountsContext);

  const deleteAccount = (name) => {
    const newAccountData = accountsData.filter(
      (account) => account.name !== name
    );

    let newRoninDirections = [];

    for (const key in newAccountData) {
      newRoninDirections.push(newAccountData[key].ronin);
    }

    setContext(newRoninDirections);
  };

  return (
    <section className="scholars-section">
      <div className="separator">
        <div className="title">
          <h3>Scholars</h3>
        </div>
      </div>
      <div className="accounts-section">
        <button className="expander">
          <p>Total accounts: {accountsData ? accountsData.length : "0"}</p>
          <div className="icon">
            <IconResize />
          </div>
        </button>
        <div className="accounts">
          {accountsData !== null &&
            tokenData !== null &&
            accountsData.map((account, i) => {
              return (
                <Scholar
                  account={account}
                  key={account.name}
                  lastPrice={tokenData.lastPrice}
                  deleteAccount={deleteAccount}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ScholarsSection;
