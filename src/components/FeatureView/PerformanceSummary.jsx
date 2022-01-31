import { useContext, useEffect, useState } from "react";

import { TokenDataContext } from "../../contexts/TokenDataContext";
import { AccountsContext } from "../../contexts/AccountsContext";

import { toSmallNumber } from "../../helpers/utilities";

const PerformanceSummary = () => {
  const { tokenData } = useContext(TokenDataContext);
  const { accountsData } = useContext(AccountsContext);

  const [tokensInAccounts, setTokensInAccounts] = useState({
    inGame: 0,
    ronin: 0,
    total: 0,
  });

  useEffect(() => {
    if (accountsData !== null) {
      let sumOfSLP = 0;
      let sumOfRoninSLP = 0;

      accountsData.forEach((account) => {
        sumOfSLP += account.in_game_slp;
        sumOfRoninSLP += account.ronin_slp;
      });

      setTokensInAccounts({
        inGame: sumOfSLP,
        ronin: sumOfRoninSLP,
        total: sumOfSLP + sumOfRoninSLP,
      });
    }
  }, [accountsData]);

  return (
    <div className="summary">
      {tokensInAccounts !== null && tokenData !== null && (
        <>
          <h2>Scholars</h2>
          <div className="group">
            <p>In game:</p>
            <strong>
              {tokensInAccounts.inGame} <span>SLP</span>
            </strong>
            <span>{`USDT $${toSmallNumber(
              tokensInAccounts.inGame * tokenData.lastPrice,
              2
            )}`}</span>
          </div>
          <div className="group">
            <p>In wallet:</p>
            <strong>
              {tokensInAccounts.ronin} <span>SLP</span>
            </strong>
            <span>{`USDT $${toSmallNumber(
              tokensInAccounts.ronin * tokenData.lastPrice,
              2
            )}`}</span>
          </div>
          <h3>Total:</h3>
          <div className="group">
            <strong>
              {tokensInAccounts.total} <span>SLP</span>
            </strong>
            <span>{`USDT $${toSmallNumber(
              tokensInAccounts.total * tokenData.lastPrice,
              2
            )}`}</span>
          </div>
          <div className="profit">
            <h3>Profit (50%):</h3>
            <p>
              {`$${toSmallNumber(
                (tokensInAccounts.total * tokenData.lastPrice) / 2,
                2
              )}`}{" "}
              <span>USDT</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PerformanceSummary;
