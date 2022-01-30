import { useContext, useEffect, useState } from "react";

import { AddressesContext } from "../contexts/AddressesContext";

const AddressAggregator = ({ toggleAggregator }) => {
  const [textareaContent, setTextareaContent] = useState(
    "ronin:edb136a58e616c0443988d2897af59aa17045045 ronin:e6f4661ce451287042433da5aead165f0b7af11e ronin:ronan:"
  );
  const [roninDirections, setRoninDirections] = useState(null);

  const handleChange = (e) => {
    setTextareaContent(e.target.value);
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

    for (let i = 0; i < array.length; i++) {
      let isAnAddress = addressChecker(array[i]);

      if (isAnAddress) {
        arrayOfAddresses.push(array[i]);
      }
    }

    return arrayOfAddresses;
  };

  //Start textarea checks and update valid addresses
  const verifyAddresses = () => {
    const parserResponse = addressParser();

    if (parserResponse.length !== 0) {
      setRoninDirections(parserResponse);
    } else {
      console.log("No valid addresses detected");
    }
  };

  const setContext = useContext(AddressesContext);

  useEffect(() => {
    setContext(roninDirections);
  }, [setContext, roninDirections]);

  const verifyByHittingEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      verifyAddresses();
    }
  };

  const closeAggregator = (e) => {
    if (e.target.className === "aggregator") {
      toggleAggregator();
    }
  };

  return (
    <div className="aggregator" onClickCapture={closeAggregator}>
      <div className="container">
        <h3>Add new address</h3>
        <label htmlFor="addressAggregator">
          <p>
            You can add one or more ronin addresses by separating them with a
            space.
          </p>
        </label>
        <div className="address-area">
          <textarea
            id="addressAggregator"
            className="error"
            type="text"
            value={textareaContent}
            onChange={handleChange}
            onKeyUp={verifyByHittingEnter}
            placeholder={`A ronin address should look like this:
            ronin:edb136a58e616c0443988d2897af59aa17045045`}
          />
        </div>
        <div className="notifications">
          <p>test text</p>
          {/* <p>no valid addresses detected</p> */}
          {/* <p>some addresses are invalid</p>
          <p>an address is not valid</p> */}
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              toggleAggregator();
            }}
          >
            Cancel
          </button>
          {/* <button onClick={verifyAddresses}>Add address</button> */}
          <button onClick={verifyAddresses}>add address(es)</button>
        </div>
      </div>
    </div>
  );
};

export default AddressAggregator;
