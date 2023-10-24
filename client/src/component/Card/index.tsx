import React, {useState} from "react";

import {Switch} from "../../component";
import {Data} from "../../interface";

import {WrapperCard, Detail} from "./styled";
interface CardProps {
  data: Data | null;
  updateData: (T: Data) => void;
  disconnectedData: Data | undefined;
}

const Card: React.FC<CardProps> = ({data, updateData, disconnectedData}) => {
  const [switchStates, setSwitchStates] = useState<{[id: string]: boolean}>({});

  if (!data) return null;

  const handleSwitchChange = () => {
    const newSwitchState = !isSwitchOn;

    setSwitchStates((prevSwitchStates) => ({
      ...prevSwitchStates,
      [data.id]: !prevSwitchStates[data?.id] || false,
    }));

    const modifiedData: Data = {
      ...data,
      connected: newSwitchState,
    };

    updateData(modifiedData);
  };

  const isSwitchOn = switchStates[data?.id] || false;

  return (
    <WrapperCard>
      <Switch isOn={isSwitchOn} onSwitchChange={handleSwitchChange} />
      <Detail>
        <h5>{data?.name}</h5>
        <p>{data?.unit}</p>
        <p>{disconnectedData ? disconnectedData?.value : data?.value} </p>
        <p>Connected: {isSwitchOn ? "ON" : "OFF"}</p>
      </Detail>
    </WrapperCard>
  );
};

export default Card;
