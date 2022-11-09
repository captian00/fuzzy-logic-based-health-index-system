import React, { useEffect, useState } from "react";
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
import { Scatter } from "react-chartjs-2";
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

const Tab4 = () => {
  const { heartBeat } = useMainContext();
  const [stateResultHeartBeat, setStateResultHeartBeat] = useState([]);
  const data = {
    datasets: [
      {
        label: "Thấp",
        data: [
          {x: 40,
            y: 1,
          },
          {x: 50,
            y: 1,
          },
          {x: 55,
            y: 0,
          },
        ],
        borderColor: "red",
        borderWidth: 2,
        backgroundColor: "red",
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
        tension: 0,
        showLine: true,
      },
      {
        label: "Bình thường",
        data: [
          {x: 50,
            y: 0,
          },
          {x: 60,
            y: 1,
          },
          {x: 100,
            y: 1,
          },
          {x: 110,
            y: 0,
          },
        ],
        borderColor: "blue",
        borderWidth: 2,
        backgroundColor: "blue",
        pointBackgroundColor: "blue",
        pointBorderColor: "blue",
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
        tension: 0,
        showLine: true,
      },

      {
        label: "Cao",
        data: [
          {x: 105,
            y: 0,
          },
          {x: 110,
            y: 1,
          },
          {x: 120,
            y: 1,
          },
        ],
        borderColor: "green",
        borderWidth: 2,
        backgroundColor: "green",
        pointBackgroundColor: "green",
        pointBorderColor: "green",
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
        tension: 0,
        showLine: true,
      },
    ],
  };
  const options = {
    tooltips: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nhịp tim",
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            min: 140,
            max: 200,
          },
          gridLines: {
            color: "#888",
            drawOnChartArea: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1,
          },
          gridLines: {
            color: "#888",
            drawOnChartArea: false,
          },
        },
      ],
    },
  };
  const style = {
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "black",
    pointBackgroundColor: "black",
    pointBorderColor: "black",
    pointRadius: 3,
    pointHoverRadius: 5,
    showLine: true,
  };
  const [dataFinal, setDataFinal] = useState(data);
  const rightTrapezoid = (x, a, b) => {
    return (b - x) / (b - a);
  };

  const leftTrapezoid = (x, c, d) => {
    return (x - c) / (d - c);
  };
  const handleLogicHeartBeat = (heartBeat) => {
    let resultHeartBeat = [];
    if (heartBeat <= 50) {
      resultHeartBeat.push({ result: 1, label: "T" });
    }
    if (50 < heartBeat && heartBeat < 55) {
      resultHeartBeat.push({
        result: rightTrapezoid(heartBeat, 50, 55),
        label: "T",
      });
    }
    if (50 < heartBeat && heartBeat < 60) {
      resultHeartBeat.push({
        result: leftTrapezoid(heartBeat, 50, 60),
        label: "BT",
      });
    }
    if (60 <= heartBeat && heartBeat <= 100) {
      resultHeartBeat.push({
        result: 1,
        label: "BT",
      });
    }
    if (100 < heartBeat && heartBeat < 110) {
      resultHeartBeat.push({
        result: rightTrapezoid(heartBeat, 100, 110),
        label: "BT",
      });
    }
    if (105 < heartBeat && heartBeat < 110) {
      resultHeartBeat.push({
        result: leftTrapezoid(heartBeat, 105, 110),
        label: "C",
      });
    }
    if (heartBeat >= 110) {
      resultHeartBeat.push({
        result: 1,
        label: "C",
      });
    }
    return resultHeartBeat;
  };

  // handleLogicHeartBeat(55);
  useEffect(() => {
    if (heartBeat) {
      setStateResultHeartBeat(handleLogicHeartBeat(heartBeat));
      setStateDataUpdate(null);
      setDataFinal(data);
    }
  }, [heartBeat]);
  const [stateDataUpdate, setStateDataUpdate] = useState(null);

  useEffect(() => {
    let dataUpdate = [];
    stateResultHeartBeat.map((item) => {
      dataUpdate.push({
        data: [
          { x: 40, y: item.result },
          { x: heartBeat, y: item.result },
          { x: heartBeat, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataUpdate(dataUpdate);
  }, [stateResultHeartBeat]);

  useEffect(() => {
    if (stateDataUpdate) {
      setDataFinal({
        ...dataFinal,
        datasets: [...dataFinal.datasets, ...stateDataUpdate],
      });
    }
  }, [stateDataUpdate]);

  //logic
  return (
    <div className="">
      <Scatter options={options} data={dataFinal}></Scatter>
    </div>
  );
};
export default Tab4;
