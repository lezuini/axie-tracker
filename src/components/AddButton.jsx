import React from "react";

import { ReactComponent as IconAdd } from "../images/add.svg";

const AddButton = ({ toggleAggregator, aggregatorIsActive }) => {
  return (
    <div className="one-screen">
      <button
        id="aggregatorToggleBtn"
        className={aggregatorIsActive ? "active" : undefined}
        onMouseUp={toggleAggregator}
      >
        <IconAdd />
      </button>
    </div>
  );
};

export default AddButton;
