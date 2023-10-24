import {useState, useEffect} from "react";

import {Data, RefData} from "../../interface";

export const useWebSocketListener = (
  chanel: string,
  handleMessages: (parsedMessage: Data, objectData: {[key: string]: Data}) => void,
) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(chanel);

    setSocket(newSocket);

    const handleOpen = () => {
      console.log("connection WebSocket Open");
    };

    const objectData: {[key: string]: Data} = {};
    const handleMessage = (event: MessageEvent) => {
      const parsedMessage = JSON.parse(event.data);

      handleMessages(parsedMessage, objectData);
    };

    const handleError = (event: Event) => {
      setError("Error processing received data");
      console.error("Error de WebSocket:", event);
    };

    newSocket.addEventListener("open", handleOpen);
    newSocket.addEventListener("message", handleMessage);
    newSocket.addEventListener("error", handleError);

    return () => {
      newSocket.removeEventListener("open", handleOpen);
      newSocket.removeEventListener("message", handleMessage);
      newSocket.removeEventListener("error", handleError);
      newSocket.close();
    };
  }, [chanel, handleMessages]);

  const sendJSON = (object: RefData) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(JSON.stringify(object));
      } catch (err) {
        setError("Error sending data through the socket");
      }
    } else {
      setError("The socket is not connected.");
    }
  };

  return {sendJSON, error};
};
