import React from "react";

import {WrapperSwitch} from "./styled";

interface SwitchProps {
  isOn: boolean;
  onSwitchChange: () => void;
}

const Switch: React.FC<SwitchProps> = ({isOn, onSwitchChange}) => {
  return (
    <WrapperSwitch>
      <label className="switch">
        <input checked={isOn} role="checkbox" type="checkbox" onChange={onSwitchChange} />
        <span className="slider" />
      </label>
    </WrapperSwitch>
  );
};

export default Switch;
