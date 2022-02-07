import { useContext, useEffect, useState } from "react";

import { AccountsContext } from "../contexts/AccountsContext";

const AddressAggregator = ({ toggleAggregator }) => {
  const GAME_API = "https://game-api.axie.technology/api/v1/";

  const [textareaContent, setTextareaContent] = useState("");
  const [invalidEntries, setInvalidEntries] = useState(null);
  const [roninAddressesNotValidated, setRoninAddressesNotValidated] =
    useState(null);
  const [addressesAreValid, setAddressesAreValid] = useState(false);
  const [addressWithError, setAddressWithError] = useState(null);
  const [roninAddresses, setRoninAddresses] = useState(null);
  const [fade, setFade] = useState(false);

  const closeAggregator = (e) => {
    let id = e.target.id;

    if ((id === "aggregator" || id === "close-btn") && invalidEntries !== 0) {
      setFade(true);

      setTimeout(() => {
        toggleAggregator();
      }, 200);
    }
  };

  const handleTextChange = (e) => {
    setTextareaContent(e.target.value);

    if (invalidEntries !== null) {
      setInvalidEntries(null);
    }
  };

  // Check address structure to match a valid ronin address
  const addressChecker = (address) => {
    const l = address.length;
    const roninAddressLength = 46;

    const regexBody = new RegExp("^[a-z0-9]*$");
    const regexHeader = new RegExp("^ronin:$");

    const addressHeader = address.slice(0, 6);
    const addressBody = address.slice(6);

    if (
      l === roninAddressLength &&
      regexBody.test(addressBody) &&
      regexHeader.test(addressHeader)
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Extracts and sends to check a possible address
  const addressParser = () => {
    const string = textareaContent.trim().replace(/\s\s+/g, " ");
    const array = string.split(" ");

    const arrayOfAddresses = [];
    let invalidEntries = 0;

    for (let i = 0; i < array.length; i++) {
      let isAnAddress = addressChecker(array[i]);

      if (isAnAddress) {
        arrayOfAddresses.push(array[i]);
      } else {
        invalidEntries++;
      }
    }

    return [arrayOfAddresses, invalidEntries];
  };

  // Start textarea checks and update valid addresses
  const verifyAddresses = () => {
    if (!fade) {
      const [parserResponse, invalidEntries] = addressParser();

      if (parserResponse.length !== 0) {
        if (invalidEntries === 0) {
          setInvalidEntries(0);
          setRoninAddressesNotValidated(parserResponse);
        } else {
          setInvalidEntries(invalidEntries);
        }
      } else {
        setInvalidEntries(-1);
      }
    }
  };

  const verifyByHittingEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verifyAddresses();
    }
  };

  // ------------ Fetch API ------------

  const setError = (address, reason) => {
    setAddressWithError(address);

    // Does not exist
    if (reason === null) {
      setInvalidEntries(-2);
    }
    // Data could not be obtained
    else {
      setInvalidEntries(-3);
    }
  };

  const setValidatedAddresses = (addresses) => {
    // console.log("All correct, proceed to update the state");

    setAddressesAreValid(true);
    setRoninAddresses(addresses);

    setTimeout(() => {
      setFade(true);

      setTimeout(() => {
        toggleAggregator();
      }, 200);
    }, 800);
  };

  // Final validation consulting the API
  useEffect(() => {
    const getAccountsDataFromAPI = async () => {
      let string = roninAddressesNotValidated.join(",");

      const res = await fetch(GAME_API + string);
      const json = await res.json();

      // When a single address is validated
      if (roninAddressesNotValidated.length === 1) {
        json.ronin = string;
        let length = Object.keys(json).length;

        if (length !== 18) {
          if (length === 1) {
            setError(string, null);
          } else {
            setError(string);
          }
        } else {
          if (json.name !== null) {
            setValidatedAddresses([json]);
          } else {
            setError(string);
          }
        }
      }
      // When multiple addresses are validated
      else {
        let array = [];
        let error = false;

        for (const key in json) {
          let ronin = "ronin:" + key.slice(2);

          json[key].ronin = ronin;

          let length = Object.keys(json[key]).length;

          if (length === 18) {
            if (json[key].name !== null) {
              array.push(json[key]);
            } else {
              error = true;

              setError(ronin);
            }
          } else {
            error = true;

            if (length === 1) {
              setError(ronin, null);
            } else {
              setError(ronin);
            }
            break;
          }
        }

        if (!error) {
          setValidatedAddresses(array);
        }
      }
    };

    if (roninAddressesNotValidated !== null) {
      getAccountsDataFromAPI();
    }
  }, [roninAddressesNotValidated]);

  // ------------ Context ------------

  const { accountsData, setContext } = useContext(AccountsContext);

  // Merge existing data with new data
  useEffect(() => {
    let filteredArray = [];

    if (accountsData !== null && roninAddresses !== null) {
      let array = [...accountsData, ...roninAddresses];

      let ronins = [];

      for (let i = 0; i < accountsData.length; i++) {
        ronins.push(array[i].ronin);
      }

      for (let i = 0; i < roninAddresses.length; i++) {
        let total = 0;

        for (let j = 0; j < ronins.length; j++) {
          if (roninAddresses[i].ronin !== ronins[j]) {
            total++;
          }
        }

        if (total === ronins.length) filteredArray.push(roninAddresses[i]);
      }
    }

    if (roninAddresses !== null) {
      if (accountsData !== null) {
        setContext([...accountsData, ...filteredArray]);
      } else {
        setContext(roninAddresses);
      }
    }
  }, [roninAddresses]);

  return (
    <div
      id="aggregator"
      className={`aggregator ${fade ? "fade" : ""}`}
      onClickCapture={closeAggregator}
    >
      <div className="container">
        <h3>Add new address(es)</h3>
        <label htmlFor="addressAggregator">
          <p>
            You can add one or more ronin addresses by separating them with a
            space.
          </p>
        </label>
        <div className="address-area">
          <textarea
            id="addressAggregator"
            className={
              invalidEntries !== null
                ? invalidEntries !== 0
                  ? "error"
                  : "correct"
                : undefined
            }
            type="text"
            value={textareaContent}
            disabled={invalidEntries === 0 ? true : false}
            onChange={handleTextChange}
            onKeyUp={verifyByHittingEnter}
            placeholder={`A ronin address should look like this: ronin:edb136a58e616c0443988d2897af59aa17045045`}
          />
        </div>
        <div className="notifications">
          {invalidEntries !== null &&
            (invalidEntries > 0 ? (
              invalidEntries === 1 ? (
                <p>An address is not valid</p>
              ) : (
                <p>Some addresses are invalid</p>
              )
            ) : invalidEntries !== 0 ? (
              invalidEntries === -1 ? (
                <p>No valid addresses detected</p>
              ) : invalidEntries === -2 ? (
                <p>
                  {`The address: ...${addressWithError.slice(
                    30
                  )} does not exist`}
                </p>
              ) : (
                <p>
                  {`Could not get data for address: ...${addressWithError.slice(
                    30
                  )}`}
                </p>
              )
            ) : !addressesAreValid ? (
              <p className="correct">Seems good, checking...</p>
            ) : (
              <p className="correct">Success</p>
            ))}
        </div>
        <div className="buttons">
          <button
            id="close-btn"
            onClick={closeAggregator}
            disabled={invalidEntries === 0 ? true : false}
          >
            Cancel
          </button>
          <button
            disabled={invalidEntries === 0 ? true : false}
            onClick={verifyAddresses}
          >
            Add address(es)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressAggregator;
