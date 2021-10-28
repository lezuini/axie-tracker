import { useState } from "react";

const AddressAggregator = ({ updateAddresses }) => {
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

  return (
    <div className="aggregator">
      <label htmlFor="addressAggregator">
        <p>Add a ronin address to start visualizing the data</p>
        <span>You can press enter or space to add the address</span>
      </label>
      <div className="input">
        <input
          id="addressAggregator"
          type="text"
          value={address}
          onChange={handleChange}
          onKeyDown={updateByHittingEnter}
          placeholder={"0xedb136a58e616c0443988d2897af59aa17045045"}
        />
        <button onClick={update}>Add</button>
      </div>
    </div>
  );
};

export default AddressAggregator;
