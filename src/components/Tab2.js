import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMainContext } from "../common/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      // data: labels.map(() => Math.random()),
      data: [, 0, 1, 1, 0],

      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      // data: labels.map(() => Math.random()),
      data: [, 1, 0, 0, 1],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Tab2 = () => {
  const { weight, height, heartBeat, bloodPressure } = useMainContext();
  console.log("🚀 ~ file: Tab2.js ~ line 61 ~ Tab2 ~ weight", weight);
  //logic
  return (
    <div className="">
      <p>aaaaaaa</p>
      <Line options={options} data={data} />
      <p>aaaaaaa</p>
      <Line options={options} data={data} />
      {/* <p>aaaaaaa</p>
      <Line options={options} data={data} /> <p>aaaaaaa</p>
      <Line options={options} data={data} /> */}
    </div>
  );
};
export default Tab2;
