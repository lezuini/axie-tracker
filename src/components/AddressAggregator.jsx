import { useContext, useEffect, useState } from "react";

import { AddressesContext } from "../contexts/AddressesContext";

const AddressAggregator = ({ toggleAggregator }) => {
  const [textareaContent, setTextareaContent] = useState(
    "ronin:edb136a58e616c0443988d2897af59aa17045045 ronin:e6f4661ce451287042433da5aead165f0b7af11e"
  );
  const [roninDirections, setRoninDirections] = useState(null);
  const [invalidEntries, setInvalidEntries] = useState(null);

  const closeAggregator = (e) => {
    if (e.target.className === "aggregator") {
      toggleAggregator();
    }
  };

  const handleTextChange = (e) => {
    setTextareaContent(e.target.value);

    if (invalidEntries !== null) {
      setInvalidEntries(null);
    }
  };

  //Check address structure to match a valid ronin address
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

  //Extracts and sends to check a possible address
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

  //Start textarea checks and update valid addresses
  const verifyAddresses = () => {
    const [parserResponse, invalidEntries] = addressParser();

    if (parserResponse.length !== 0) {
      if (invalidEntries === 0) {
        setInvalidEntries(0);
        // setRoninDirections(parserResponse);
      } else {
        setInvalidEntries(invalidEntries);
      }
    } else {
      setInvalidEntries(-1);
    }
  };

  const verifyByHittingEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verifyAddresses();
    }
  };

  //---------------------- to change -----------------------

  const setContext = useContext(AddressesContext);

  useEffect(() => {
    setContext(roninDirections);
  }, [setContext, roninDirections]);

  return (
    <div className="aggregator" onClickCapture={closeAggregator}>
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
                ? invalidEntries > 0 || invalidEntries !== 0
                  ? "error"
                  : "correct"
                : undefined
            }
            type="text"
            value={textareaContent}
            onChange={handleTextChange}
            onKeyUp={verifyByHittingEnter}
            placeholder={`A ronin address should look like this:
            ronin:edb136a58e616c0443988d2897af59aa17045045`}
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
              <p>No valid addresses detected</p>
            ) : (
              <p className="correct">Seems good</p>
            ))}
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              toggleAggregator();
            }}
          >
            Cancel
          </button>
          <button onClick={verifyAddresses}>Add address(es)</button>
        </div>
      </div>
    </div>
  );
};

export default AddressAggregator;
