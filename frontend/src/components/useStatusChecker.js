import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const CHECK_STATUS_EVENT = "checkStatusEvent";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useStatusChecker = () => {
  const [nRequest, setNRequest] = useState(0);
  const [bots, setBots] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
    console.log(socketRef.current);

    // Listens for incoming messages
    socketRef.current.on(CHECK_STATUS_EVENT, (status) => {
      setNRequest(status.nRequest);
      setBots(status.bots);

      console.log("Status: ", status);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { nRequest, bots };
};

export default useStatusChecker;
