import {useCallback, useState} from "react";

import {Card, Page404} from "./component";
import {ContainerApp} from "./styledApp";
import {useWebSocketListener} from "./component/hook/useWebSocketListener";
import {Data, RefData} from "./interface";

const App = () => {
  const [data, setData] = useState<Data[]>([]);
  const [disconnectedData, setDisconnectedData] = useState<Data[]>([]);

  const handleMessages = useCallback((parsedMessage: Data, objectData: {[key: string]: Data}) => {
    if (!objectData.hasOwnProperty(parsedMessage.id)) {
      objectData[parsedMessage.id] = parsedMessage;
    } else {
      objectData[parsedMessage.id] = {
        ...objectData[parsedMessage.id],
        ...parsedMessage,
      };
    }

    const dataArray = Object.values(objectData);

    setData(dataArray);
  }, []);

  const {sendJSON, error} = useWebSocketListener("ws://localhost:3200", handleMessages);

  const updateData = (data: Data) => {
    const refData: RefData = {
      command: data.connected ? "connect" : "disconnect",
      id: data.id,
    };

    if (!data.connected) {
      setDisconnectedData((prevDisconnectedData) => {
        const updatedData = [...prevDisconnectedData];
        const index = updatedData.findIndex((item) => item.id === data.id);

        if (index !== -1) {
          updatedData[index] = data;
        } else {
          updatedData.push(data);
        }

        return updatedData;
      });
    }

    sendJSON(refData);
  };

  if (error) return <Page404 />;

  if (data === null || data === undefined) return <div>Cargando...</div>;

  return (
    <ContainerApp>
      {data?.map((item) => (
        <Card
          key={item.id}
          data={item}
          disconnectedData={
            item.connected
              ? undefined
              : disconnectedData.find((disconnectedItem) => disconnectedItem.id === item.id)
          }
          updateData={updateData}
        />
      ))}
    </ContainerApp>
  );
};

export default App;
