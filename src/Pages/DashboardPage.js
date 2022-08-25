import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import io from "socket.io-client";
const socket = io("http://ec2-13-112-157-12.ap-northeast-1.compute.amazonaws.com/dashboard");

function DashboardPage(props) {
  let COLORS = ["#FFA500", "#87CEFA"];
  const [isConnected, setIsConnected] = useState(socket.connected);
  let [orangeCount, setOrangeCount] = useState(0);
  let [blueCount, setBlueCount] = useState(0);
  let pieData = [
    {
      name: "Orange",
      value: orangeCount,
    },
    {
      name: "Blue",
      value: blueCount,
    },
  ];
  useEffect(() => {
	connectSocket()
  }, []);

  const connectSocket = () =>{
	if (performance.navigation.type === 1) {
		socket.emit("refresh-game", {});
		console.log('Refresh page');
	} else {
		socket.emit("get-current-votes", {});
	}
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

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
  console.log(isConnected);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value} votes`}</label>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center mt-[200px] flex-col">
      <h1 className="text-4xl mb-10 text-gray-600">Result votes</h1>
      <PieChart className="text-2xl" width={730} height={300}>
        <Pie
          data={pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </div>
  );
}

export default DashboardPage;
