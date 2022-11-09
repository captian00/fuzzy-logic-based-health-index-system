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
import BMIRule from "./BMI-rule";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  tooltips: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chiều cao",
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
const handleLogicHeight = (height) => {
  let resultHeight = [];
  if (height <= 150) {
    resultHeight.push({ result: 1, label: "RT" });
  }
  if (150 < height && height < 155) {
    resultHeight.push({
      result: rightTrapezoid(height, 150, 155),
      label: "RT",
    });
    resultHeight.push({
      result: leftTrapezoid(height, 150, 155),
      label: "T",
    });
  }
  if (155 <= height && height <= 160) {
    resultHeight.push({
      result: 1,
      label: "T",
    });
  }
  if (160 < height && height < 165) {
    resultHeight.push({
      result: rightTrapezoid(height, 160, 165),
      label: "T",
    });
    resultHeight.push({
      result: leftTrapezoid(height, 160, 165),
      label: "TB",
    });
  }
  if (165 <= height && height <= 173) {
    resultHeight.push({
      result: 1,
      label: "TB",
    });
  }
  if (173 < height && height < 175) {
    resultHeight.push({
      result: rightTrapezoid(height, 173, 175),
      label: "TB",
    });
    resultHeight.push({
      result: leftTrapezoid(height, 105, 110),
      label: "C",
    });
  }
  if (175 <= height && height <= 180) {
    resultHeight.push({
      result: 1,
      label: "C",
    });
  }
  if (180 < height && height < 185) {
    resultHeight.push({
      result: rightTrapezoid(height, 180, 185),
      label: "C",
    });
    resultHeight.push({
      result: leftTrapezoid(height, 180, 185),
      label: "RC",
    });
  }
  if (height >= 185) {
    resultHeight.push({
      result: 1,
      label: "RC",
    });
  }
  return resultHeight;
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
const dataHeight = {
  datasets: [
    {
      label: "Rất thấp",
      data: [
        { x: 145, y: 1 },
        { x: 150, y: 1 },
        { x: 155, y: 0 },
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
      label: "Thấp",
      data: [
        { x: 150, y: 0 },
        { x: 155, y: 1 },
        { x: 160, y: 1 },
        { x: 165, y: 0 },
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
        { x: 160, y: 0 },
        { x: 165, y: 1 },
        { x: 173, y: 1 },
        { x: 175, y: 0 },
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
      label: "Cao",
      data: [
        { x: 173, y: 0 },
        { x: 175, y: 1 },
        { x: 180, y: 1 },
        { x: 185, y: 0 },
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
      label: "Rất cao",
      data: [
        { x: 180, y: 0 },
        { x: 185, y: 1 },
        { x: 190, y: 1 },
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
const dataWeight = {
  datasets: [
    {
      label: "Rất nhẹ",
      data: [
        { x: 40, y: 1 },
        { x: 44, y: 1 },
        { x: 49, y: 0 },
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
        { x: 44, y: 0 },
        { x: 52, y: 1 },
        { x: 54, y: 1 },
        { x: 59, y: 0 },
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
        { x: 54, y: 0 },
        { x: 59, y: 1 },
        { x: 66, y: 1 },
        { x: 71, y: 0 },
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
        { x: 66, y: 0 },
        { x: 71, y: 1 },
        { x: 74, y: 1 },
        { x: 79, y: 0 },
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
        { x: 74, y: 0 },
        { x: 79, y: 1 },
        { x: 85, y: 1 },
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
const dataHeartBeat = {
  datasets: [
    {
      label: "Thấp",
      data: [
        { x: 40, y: 1 },
        { x: 50, y: 1 },
        { x: 55, y: 0 },
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
        { x: 50, y: 0 },
        { x: 60, y: 1 },
        { x: 100, y: 1 },
        { x: 110, y: 0 },
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
        { x: 105, y: 0 },
        { x: 110, y: 1 },
        { x: 120, y: 1 },
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
const dataBloodPressure = {
  datasets: [
    {
      label: "Thấp",
      data: [
        { x: 70, y: 1 },
        { x: 80, y: 1 },
        { x: 90, y: 0 },
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
        { x: 80, y: 0 },
        { x: 90, y: 1 },
        { x: 120, y: 1 },
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
const Tab2 = () => {
  const { weight, height, heartBeat, bloodPressure } = useMainContext();
  const [stateResultHeartBeat, setStateResultHeartBeat] = useState([]);
  const [stateResultBloodPressure, setStateResultBloodPressure] = useState([]);
  const [stateResultHeight, setStateResultHeight] = useState([]);
  const [stateResultWeight, setStateResultWeight] = useState([]);

  const [dataFinalHeight, setDataFinalHeight] = useState(dataHeight);
  const [dataFinalWeight, setDataFinalWeight] = useState(dataWeight);
  const [dataFinalHeartBeat, setDataFinalHeartBeat] = useState(dataHeartBeat);
  const [dataFinalBloodPressure, setDataFinalBloodPressure] = useState(dataBloodPressure);

  const [stateDataHeightUpdate, setStateDataHeightUpdate] = useState(null);
  const [stateDataWeightUpdate, setStateDataWeightUpdate] = useState(null);
  const [stateDataHeartBeatUpdate, setStateDataHeartBeatUpdate] = useState(null);
  const [stateDataBloodPressureUpdate, setStateDataBloodPressureUpdate] =useState(null);

  useEffect(() => {
    if (weight && height && heartBeat && bloodPressure) {
      setStateResultHeartBeat(handleLogicHeartBeat(heartBeat));
      setStateResultBloodPressure(handleLogicBloodPressure(bloodPressure));
      setStateResultHeight(handleLogicHeight(height));
      setStateResultWeight(handleLogicWeight(weight));
      
      setDataFinalHeight(dataHeight);
      setDataFinalWeight(dataWeight);
      setDataFinalHeartBeat(dataHeartBeat)
      setDataFinalBloodPressure(dataBloodPressure);

      setStateDataHeightUpdate(null);
      setStateDataWeightUpdate(null);
      setStateDataHeartBeatUpdate(null);
      setStateDataBloodPressureUpdate(null);
    }
  }, [weight, height, heartBeat, bloodPressure]);

  useEffect(() => {
    let dataHeightUpdate = [];
    stateResultHeight.map((item) => {
      dataHeightUpdate.push({
        data: [
          { x: 145, y: item.result },
          { x: height, y: item.result },
          { x: height, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataHeightUpdate(dataHeightUpdate);
    
    let dataWeightUpdate = [];
    stateResultWeight.map((item) => {
      dataWeightUpdate.push({
        data: [
          { x: 40, y: item.result },
          { x: weight, y: item.result },
          { x: weight, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataWeightUpdate(dataWeightUpdate);

    let dataHeartBeatUpdate = [];
    stateResultHeartBeat.map((item) => {
      dataHeartBeatUpdate.push({
        data: [
          { x: 40, y: item.result },
          { x: heartBeat, y: item.result },
          { x: heartBeat, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataHeartBeatUpdate(dataHeartBeatUpdate);

    let dataBloodPressureUpdate = [];
    stateResultBloodPressure.map((item) => {
      dataBloodPressureUpdate.push({
        data: [
          { x: 70, y: item.result },
          { x: bloodPressure, y: item.result },
          { x: bloodPressure, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataBloodPressureUpdate(dataBloodPressureUpdate);
  }, [
    stateResultWeight,
    stateResultHeight,
    stateResultBloodPressure,
    stateResultHeartBeat,
  ]);

  useEffect(() => {
    if (stateDataHeightUpdate) {
      setDataFinalHeight({
        ...dataFinalHeight,
        datasets: [...dataFinalHeight.datasets, ...stateDataHeightUpdate],
      });
    }
    if (stateDataWeightUpdate) {
      setDataFinalWeight({
        ...dataFinalWeight,
        datasets: [...dataFinalWeight.datasets, ...stateDataWeightUpdate],
      });
    }
    if (stateDataHeartBeatUpdate) {
      setDataFinalHeartBeat({
        ...dataFinalHeartBeat,
        datasets: [...dataFinalHeartBeat.datasets, ...stateDataHeartBeatUpdate],
      });
    }
    if (stateDataBloodPressureUpdate) {
      setDataFinalBloodPressure({
        ...dataFinalBloodPressure,
        datasets: [
          ...dataFinalBloodPressure.datasets, ...stateDataBloodPressureUpdate,
        ],
      });
      
    }
  }, [stateDataHeightUpdate,
     stateDataWeightUpdate,
     stateDataHeartBeatUpdate,
     stateDataBloodPressureUpdate
    ]);

  const [a, setA] = useState();
  useEffect(() => {
    setA(BMIRule(stateResultHeight, stateResultWeight));
  }, [stateResultHeight, stateResultWeight]);
  useEffect(() => {
    console.log("result:", a);
  }, [a]);

  //logic
  return (
    <div className="">
      <Scatter options={options} data={dataFinalHeight}></Scatter>
      <Scatter options={options} data={dataFinalWeight}></Scatter>
      <Scatter options={options} data={dataFinalHeartBeat}></Scatter>
      <Scatter options={options} data={dataFinalBloodPressure}></Scatter>
    </div>
  );
};
export default Tab2;
