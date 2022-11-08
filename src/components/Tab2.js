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
  const [stateResultHeartBeat, setStateResultHeartBeat] = useState([]);
  const [stateResultBloodPressure, setStateResultBloodPressure] = useState([]);
  const [stateResultHeight, setStateResultHeight] = useState([]);
  const [stateResultWeight, setStateResultWeight] = useState([]);

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
  // handleLogicHeartBeat(55);
  useEffect(() => {
    if (weight && height && heartBeat && bloodPressure) {
      setStateResultHeartBeat(handleLogicHeartBeat(heartBeat));
      setStateResultBloodPressure(handleLogicBloodPressure(bloodPressure));
      setStateResultHeight(handleLogicHeight(height));
      setStateResultWeight(handleLogicWeight(weight));
    }
  }, [weight, height, heartBeat, bloodPressure]);

  useEffect(() => {
    console.log({
      stateResultWeight,
      stateResultHeight,
      stateResultBloodPressure,
      stateResultHeartBeat,
    });
  }, [
    stateResultWeight,
    stateResultHeight,
    stateResultBloodPressure,
    stateResultHeartBeat,
  ]);

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
