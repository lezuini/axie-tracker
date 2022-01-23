import { useState } from "react";

const AddressAggregator = ({ updateAddresses, toggleAggregator }) => {
  const [address, setAddress] = useState("");

  const handleChange = ({ target }) => {
    setAddress(target.value);
  };

  const update = () => {
    let l = address.length;
    if (l >= 42 && l <= 46) {
      updateAddresses(address.trim());
      setAddress("");
    }
  };

  const updateByHittingEnter = (e) => {
    // console.log(e.key);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      update();
    }
  };

  const closeModal = (e) => {
    if (e.target.className === "aggregator") {
      toggleAggregator();
    }
  };

  return (
    <div className="aggregator" onClickCapture={closeModal}>
      <div className="container">
        <label htmlFor="addressAggregator">
          <p>Add a ronin address to start visualizing the data</p>
          <span>You can press enter or space to add the address</span>
        </label>
        <div className="address-area">
          <textarea
            id="addressAggregator"
            type="text"
            value={address}
            onChange={handleChange}
            onKeyDown={updateByHittingEnter}
            placeholder={"0xedb136a58e616c0443988d2897af59aa17045045"}
          />
          <button>Paste</button>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              toggleAggregator();
            }}
          >
            Cancel
          </button>
          <button onClick={update}>Add address</button>
        </div>
      </div>
    </div>
  );
};

export default AddressAggregator;
