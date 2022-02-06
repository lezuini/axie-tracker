import { useContext, useEffect, useState } from "react";

import { TokenDataContext } from "../../contexts/TokenDataContext";
import { AccountsContext } from "../../contexts/AccountsContext";
import { SettingsContext } from "../../contexts/SettingsContext";

import { toSmallNumber } from "../../helpers/utilities";

const PerformanceSummary = () => {
  const { tokenData } = useContext(TokenDataContext);
  const { accountsData } = useContext(AccountsContext);
  const { settings } = useContext(SettingsContext);

  const [flashIsOn, setFlashIsOn] = useState(false);
  const [tokensInAccounts, setTokensInAccounts] = useState({
    inGame: 0,
    ronin: 0,
    total: 0,
    profit: 0,
  });

  useEffect(() => {
    if (accountsData !== null) {
      let sumOfSLP = 0;
      let sumOfRoninSLP = 0;
      let total = 0;
      let profit = 0;

      accountsData.forEach((account) => {
        sumOfSLP += account.in_game_slp;
        sumOfRoninSLP += account.ronin_slp;
      });

      total = sumOfSLP + sumOfRoninSLP;

      if (settings.wallet) {
        profit = total / 2;
      } else {
        profit = sumOfSLP / 2;
      }
      setTokensInAccounts({
        inGame: sumOfSLP,
        ronin: sumOfRoninSLP,
        total: sumOfSLP + sumOfRoninSLP,
        profit: profit,
      });
    }
  }, [accountsData, settings]);

  useEffect(() => {
    if (accountsData !== null) {
      setFlashIsOn(true);

      setTimeout(() => {
        setFlashIsOn(false);
      }, 200);
    }
  }, [tokenData, accountsData]);

  return (
    <div className={`performance-summary ${flashIsOn ? "flash" : ""}`}>
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
                tokensInAccounts.profit * tokenData.lastPrice,
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
