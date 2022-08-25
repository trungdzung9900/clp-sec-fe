import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../css/ClientPage.css";
const socket = io("http://ec2-13-112-157-12.ap-northeast-1.compute.amazonaws.com/client");

function ClientPage(props) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    let [orangeCount, setOrangeCount] = useState(0);
    let [blueCount, setBlueCount] = useState(0);

  const handleOrange = async () => {
    socket.emit("votes", { votes: "orange" });
  };
  const handleBlue = () => {
    socket.emit("votes", { votes: "blue" });
  };
  
  useEffect(() => {
    connectSocket()
  }, []);
  const connectSocket = () => {
    socket.on("connect", () => {
        setIsConnected(true);
      });
  
      socket.on("disconnect", () => {
        setIsConnected(false);
      });
      socket.emit("get-current-votes", {});
  
      socket.on("votes-result", (response) => {
        setOrangeCount(response.orange);
        setBlueCount(response.blue);
        console.log(response);
      });
  
      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("votes-result");
      };
  }

  return (
    <div className="flex items-center justify-center mt-[200px]">
      <div>
        <h2 className="text-4xl mb-[20px] text-center">{orangeCount} click</h2>
        <button
          className="h-64 w-56 opacity-50 bg-[#FFA500] rounded-lg m-[10px] p-[15px] text-5xl border"
          onClick={handleOrange}
        >
          Orange
        </button>
      </div>
      <div>
        <h2 className="text-4xl mb-[20px] text-center">{blueCount} click</h2>
        <button
          className="h-64 w-56 opacity-50 bg-[#87CEFA] rounded-lg m-[10px] p-[15px] text-5xl"
          onClick={handleBlue}
        >
          Blue
        </button>
      </div>
    </div>
  );
}

export default ClientPage;
