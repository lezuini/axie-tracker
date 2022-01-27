import { useContext, useEffect, useState } from "react";
import Scholar from "./Scholar";

import { ReactComponent as IconResize } from "../../images/resize.svg";

import { TokenDataContext } from "../../contexts/TokenDataContext";
import { AccountsContext } from "../../contexts/AccountsContext";

const ScholarsSection = () => {
  const { tokenData } = useContext(TokenDataContext);
  const accountsData = useContext(AccountsContext);

  const deleteAccount = () => {};

  return (
    <section className="scholars-section">
      <div className="separator">
        <div className="title">
          <h3>Scholars</h3>
        </div>
      </div>
      <div className="accounts-section">
        <button className="expander">
          <p>Total accounts {accountsData.length}</p>
          <div className="icon">
            <IconResize />
          </div>
        </button>
        <div className="accounts">
          {accountsData &&
            tokenData &&
            accountsData.map((account, i) => {
              return (
                <Scholar
                  account={account}
                  key={i}
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
