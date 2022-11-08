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

const Graph2 = () => {
  const { bloodPressure } = useMainContext();
  const [stateResultBloodPressure, setStateResultBloodPressure] = useState([]);
  const data = {
    datasets: [
      {
        label: "Thấp",
        data: [
          {
            x: 70,
            y: 1,
          },
          {
            x: 80,
            y: 1,
          },
          {
            x: 90,
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
          {
            x: 80,
            y: 0,
          },
          {
            x: 90,
            y: 1,
          },
          {
            x: 120,
            y: 1,
          },
          {
            x: 130,
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
          {
            x: 120,
            y: 0,
          },
          {
            x: 130,
            y: 1,
          },
          {
            x: 140,
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
        text: "Huyết áp",
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
  const handleLogicBloodPressure = (bloodPressure) => {
    let resultBloodPressure = [];
    if (bloodPressure <= 80) {
      resultBloodPressure.push({ result: 1, label: "T" });
    }
    if (80 < bloodPressure && bloodPressure < 90) {
      resultBloodPressure.push({
        result: rightTrapezoid(bloodPressure, 80, 90),
        label: "T",
      });
      resultBloodPressure.push({
        result: leftTrapezoid(bloodPressure, 80, 90),
        label: "BT",
      });
    }

    if (90 <= bloodPressure && bloodPressure <= 120) {
      resultBloodPressure.push({
        result: 1,
        label: "BT",
      });
    }
    if (120 < bloodPressure && bloodPressure < 130) {
      resultBloodPressure.push({
        result: rightTrapezoid(bloodPressure, 120, 130),
        label: "BT",
      });
      resultBloodPressure.push({
        result: leftTrapezoid(bloodPressure, 120, 130),
        label: "C",
      });
    }
    if (bloodPressure >= 130) {
      resultBloodPressure.push({
        result: 1,
        label: "C",
      });
    }
    return resultBloodPressure;
  };

  // handleLogicHeartBeat(55);
  useEffect(() => {
    if (bloodPressure) {
      setStateResultBloodPressure(handleLogicBloodPressure(bloodPressure));
      setStateDataUpdate(null);
      setDataFinal(data);
    }
  }, [bloodPressure]);
  const [stateDataUpdate, setStateDataUpdate] = useState(null);

  useEffect(() => {
    let dataUpdate = [];
    stateResultBloodPressure.map((item) => {
      dataUpdate.push({
        data: [
          { x: 70, y: item.result },
          { x: bloodPressure, y: item.result },
          { x: bloodPressure, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataUpdate(dataUpdate);
  }, [stateResultBloodPressure]);

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
export default Graph2;
