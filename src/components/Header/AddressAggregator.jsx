import { useContext, useEffect, useState } from "react";

import { ReactComponent as IconClipboard } from "../../images/clipboard.svg";

import { AddressesContext } from "../../contexts/AddressesContext";

const AddressAggregator = ({ toggleAggregator }) => {
  const [textareaContent, setTextareaContent] = useState(
    " asdfds  asdf ronin:edb136a58e616c0443988d2897af59aa17045045 ronin:e6f4661ce451287042433da5aead165f0b7af11e "
  );
  const [addresses, setAddresses] = useState(null);

  const handleChange = (e) => {
    setTextareaContent(e.target.value);
  };

  const addressChecker = (address) => {
    const l = address.length;
    const regex = new RegExp("^[a-z0-9:]*$");
    const roninAddressLength = 46;

    if (l === roninAddressLength && regex.test(address)) {
      return true;
    } else {
      return false;
    }
  };

  const addressParser = () => {
    const string = textareaContent.trim().replace(/\s\s+/g, " ");
    const array = string.split(" ");

    let arrayOfAddresses = [];

    for (let i = 0; i < array.length; i++) {
      let isAnAddress = addressChecker(array[i]);

      if (isAnAddress) {
        arrayOfAddresses.push(array[i]);
      }
    }

    console.log(arrayOfAddresses);
    return arrayOfAddresses;
  };

  const verifyAddresses = () => {
    const parserResponse = addressParser();

    if (parserResponse.length !== 0) {
      setAddresses(parserResponse);
    } else {
      console.log("a");
    }
  };

  const setContext = useContext(AddressesContext);

  useEffect(() => {
    setContext(addresses);
  }, [setContext, addresses]);

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
            type="text"
            value={textareaContent}
            onChange={handleChange}
            onKeyUp={verifyByHittingEnter}
            placeholder={`A ronin address should look like this:
            ronin:edb136a58e616c0443988d2897af59aa17045045`}
          />
          <button>
            <p>Paste</p>
            <IconClipboard />
          </button>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              toggleAggregator();
            }}
          >
            Cancel
          </button>
          <button onClick={verifyAddresses}>Add address</button>
        </div>
      </div>
    </div>
  );
};

export default AddressAggregator;
