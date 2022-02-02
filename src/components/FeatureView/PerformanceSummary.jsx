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
    <div className="performance-summary">
      {tokensInAccounts !== null && tokenData !== null && (
        <>
          <h2>Scholars</h2>
          <div className="group">
            <h4>In game:</h4>
            <strong>
              {tokensInAccounts.inGame} <span>SLP</span>
            </strong>
            <p>
              {`USDT `}
              <span>
                $
                {toSmallNumber(
                  tokensInAccounts.inGame * tokenData.lastPrice,
                  2
                )}
              </span>
            </p>
          </div>
          <div className="group">
            <h4>In wallet:</h4>
            <strong>
              {tokensInAccounts.ronin} <span>SLP</span>
            </strong>
            <p>
              {`USDT `}
              <span>
                $
                {toSmallNumber(tokensInAccounts.ronin * tokenData.lastPrice, 2)}
              </span>
            </p>
          </div>
          <div className="group">
            <h4>Total:</h4>
            <strong>
              {tokensInAccounts.total} <span>SLP</span>
            </strong>
            <p>
              {`USDT `}
              <span>
                $
                {toSmallNumber(tokensInAccounts.total * tokenData.lastPrice, 2)}
              </span>
            </p>
          </div>
          <div className="profit">
            <h4>Profit (50%):</h4>
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
