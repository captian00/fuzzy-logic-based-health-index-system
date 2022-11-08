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
  const { weight} = useMainContext();
  const [stateResultWeight, setStateResultWeight] = useState([]);
  const data = {
    datasets: [
      {
        label: "Rất nhẹ",
        data: [
          {
            x: 40,
            y: 1,
          },
          {
            x: 44,
            y: 1,
          },
          {
            x: 49,
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
        label: "Nhẹ",
        data: [
          {
            x: 44,
            y: 0,
          },
          {
            x: 52,
            y: 1,
          },
          {
            x: 54,
            y: 1,
          },
          {
            x: 59,
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
        label: "Trung bình",
        data: [
          {
            x: 54,
            y: 0,
          },
          {
            x: 59,
            y: 1,
          },
          {
            x: 66,
            y: 1,
          },
          {
            x: 71,
            y: 0,
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
      {
        label: "Nặng",
        data: [
          {
            x: 66,
            y: 0,
          },
          {
            x: 71,
            y: 1,
          },
          {
            x: 74,
            y: 1,
          },
          {
            x: 79,
            y: 0,
          },
        ],
        borderColor: "orange",
        borderWidth: 2,
        backgroundColor: "orange",
        pointBackgroundColor: "orange",
        pointBorderColor: "orange",
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false,
        tension: 0,
        showLine: true,
      },
      {
        label: "Rất nặng",
        data: [
          {
            x: 74,
            y: 0,
          },
          {
            x: 79,
            y: 1,
          },
          {
            x: 85,
            y: 1,
          },
        ],
        borderColor: "purple",
        borderWidth: 2,
        backgroundColor: "purple",
        pointBackgroundColor: "purple",
        pointBorderColor: "purple",
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
        text: "Khối lượng cơ thể",
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
  const handleLogicWeight = (weight) => {
    let resultWeight = [];
    if (weight <= 44) {
      resultWeight.push({ result: 1, label: "RN" });
    }
    if (44 < weight && weight < 49) {
      resultWeight.push({
        result: rightTrapezoid(weight, 44, 49),
        label: "RN",
      });
    }
    if (44 < weight && weight < 52) {
      resultWeight.push({
        result: leftTrapezoid(weight, 44, 52),
        label: "N",
      });
    }
    if (52 <= weight && weight <= 54) {
      resultWeight.push({
        result: 1,
        label: "N",
      });
    }
    if (54 < weight && weight < 59) {
      resultWeight.push({
        result: rightTrapezoid(weight, 54, 59),
        label: "N",
      });
      resultWeight.push({
        result: leftTrapezoid(weight, 54, 59),
        label: "TB",
      });
    }
    if (59 <= weight && weight <= 66) {
      resultWeight.push({
        result: 1,
        label: "TB",
      });
    }
    if (66 < weight && weight < 71) {
      resultWeight.push({
        result: rightTrapezoid(weight, 66, 71),
        label: "TB",
      });
      resultWeight.push({
        result: leftTrapezoid(weight, 66, 71),
        label: "NA",
      });
    }
    if (71 <= weight && weight <= 74) {
      resultWeight.push({
        result: 1,
        label: "NA",
      });
    }
    if (74 < weight && weight < 79) {
      resultWeight.push({
        result: rightTrapezoid(weight, 74, 79),
        label: "NA",
      });
      resultWeight.push({
        result: leftTrapezoid(weight, 74, 79),
        label: "RNA",
      });
    }
    if (79 <= weight) {
      resultWeight.push({
        result: 1,
        label: "RNA",
      });
    }

    return resultWeight;
  };
  
  // handleLogicHeartBeat(55);
  useEffect(() => {
    if (weight) {
      setStateResultWeight(handleLogicWeight(weight));
      setStateDataUpdate(null);
      setDataFinal(data);
    }
  }, [weight]);
  const [stateDataUpdate, setStateDataUpdate] = useState(null);

  useEffect(() => {
    let dataUpdate = [];
    stateResultWeight.map((item) => {
      dataUpdate.push({
        data: [
          { x: 40, y: item.result },
          { x: weight, y: item.result },
          { x: weight, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataUpdate(dataUpdate);
  }, [
    stateResultWeight,
  ]);

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
