import React, { useEffect, useState, useRef } from "react";
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
import abc from "../image/HuyetAp.png";
import { Button, Modal } from "antd-mobile";
import { Scatter } from "react-chartjs-2";
import { useMainContext } from "../common/context";
import BMIRule from "./BMI-rule";
import BMI_HB_BL_rule from "./Health-index-rule";
import {
  dataHeight,
  dataWeight,
  dataHeartBeat,
  dataBloodPressure,
  dataBMI,
  dataBMI2,
} from "../const";

import {
  handleGraphBMI,
  handleLogicWeight,
  handleLogicHeight,
  handleLogicHeartBeat,
  handleLogicBMI,
  handleLogicBloodPressure,
} from "../utils/index";

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
  tooltips: true,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chiều cao",
    // },
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
const style2 = {
  borderColor: "black",
  borderWidth: 5,
  backgroundColor: "black",
  pointBackgroundColor: "black",
  pointBorderColor: "black",
  pointRadius: 4,
  pointHoverRadius: 5,
  showLine: true,
};
const Tab2 = () => {
  const { weight, height, heartBeat, bloodPressure, submit } = useMainContext();
  const [stateResultHeartBeat, setStateResultHeartBeat] = useState([]);
  const [stateResultBloodPressure, setStateResultBloodPressure] = useState([]);
  const [stateResultHeight, setStateResultHeight] = useState([]);
  const [stateResultWeight, setStateResultWeight] = useState([]);

  const [dataFinalHeight, setDataFinalHeight] = useState(dataHeight);
  const [dataFinalWeight, setDataFinalWeight] = useState(dataWeight);
  const [dataFinalHeartBeat, setDataFinalHeartBeat] = useState(dataHeartBeat);
  const [dataFinalBloodPressure, setDataFinalBloodPressure] =
    useState(dataBloodPressure);

  const [stateDataHeightUpdate, setStateDataHeightUpdate] = useState(null);
  const [stateDataWeightUpdate, setStateDataWeightUpdate] = useState(null);
  const [stateDataHeartBeatUpdate, setStateDataHeartBeatUpdate] =
    useState(null);
  const [stateDataBloodPressureUpdate, setStateDataBloodPressureUpdate] =
    useState(null);

  const [healthIndex, setHealthIndex] = useState([
    { resultUH: 2, label: "UH" },
    { resultLH: 2, label: "LH" },
    { resultSH: 2, label: "SH" },
    { resultH: 2, label: "H" },
  ]);

  useEffect(() => {
    if (weight && height && heartBeat && bloodPressure && submit) {
      setStateResultHeartBeat(handleLogicHeartBeat(heartBeat));
      setStateResultBloodPressure(handleLogicBloodPressure(bloodPressure));
      setStateResultHeight(handleLogicHeight(height));
      setStateResultWeight(handleLogicWeight(weight));

      setDataFinalHeight(dataHeight);
      setDataFinalWeight(dataWeight);
      setDataFinalHeartBeat(dataHeartBeat);
      setDataFinalBloodPressure(dataBloodPressure);

      setStateDataHeightUpdate(null);
      setStateDataWeightUpdate(null);
      setStateDataHeartBeatUpdate(null);
      setStateDataBloodPressureUpdate(null);
      setDataFinalBMI2(dataBMI2);
    }
  }, [weight, height, heartBeat, bloodPressure, submit]);

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
          ...dataFinalBloodPressure.datasets,
          ...stateDataBloodPressureUpdate,
        ],
      });
    }
  }, [
    stateDataHeightUpdate,
    stateDataWeightUpdate,
    stateDataHeartBeatUpdate,
    stateDataBloodPressureUpdate,
  ]);

  const [a, setA] = useState([
    { resultTC: 2, label: "TC" },
    { resultCD: 2, label: "CD" },
    { resultTBP: 2, label: "TBP" },
    { resultBP: 2, label: "BP" },
  ]);
  useEffect(() => {
    setA(BMIRule(stateResultHeight, stateResultWeight));
  }, [stateResultHeight, stateResultWeight]);

  const [stateDataUpdate_TC, setStateDataUpdate_TC] = useState(null);
  const [stateDataUpdate_CD, setStateDataUpdate_CD] = useState(null);
  const [stateDataUpdate_TBP, setStateDataUpdate_TBP] = useState(null);
  const [stateDataUpdate_BP, setStateDataUpdate_BP] = useState(null);

  const [stateDataBMIUpdate, setStateDataBMIUpdate] = useState(null);
  const [dataFinalBMI, setDataFinalBMI] = useState(dataBMI);
  const [dataFinalBMI2, setDataFinalBMI2] = useState(dataBMI2);
  const [stateResultBMI, setStateResultBMI] = useState([]);
  // let BMI = useRef(10000);
  // console.log("BMI.current", BMI.current);
  let BMIGraph2 = useRef();
  let newPointList = useRef([]);
  let minX = 10000;
  let maxY = -10000;
  newPointList.current.forEach((item) => {
    if (item.y > 0) {
      if (item.y > maxY) {
        maxY = item.y;
      }
    }
  });
  newPointList.current.forEach((item) => {
    if (item.y === maxY) {
      if (item.x < minX) {
        minX = item.x;
      }
    }
  });

  // console.log("BMIGraph2.current", BMIGraph2.current);
  useEffect(() => {
    const TCPoint = handleGraphBMI(a[0].resultTC, a[0].label);
    const CDPoint = handleGraphBMI(a[1].resultCD, a[1].label);
    const TBPPoint = handleGraphBMI(a[2].resultTBP, a[2].label);
    const BPPoint = handleGraphBMI(a[3].resultBP, a[3].label);
    if (TCPoint !== undefined) {
      newPointList.current = [...newPointList.current, ...TCPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...TCPoint],
        ...style2,
      });
      setStateDataUpdate_TC(dataUpdate);
    }
    if (CDPoint !== undefined) {
      newPointList.current = [...newPointList.current, ...CDPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...CDPoint],
        ...style2,
      });
      setStateDataUpdate_CD(dataUpdate);
    }
    if (TBPPoint !== undefined) {
      newPointList.current = [...newPointList.current, ...TBPPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...TBPPoint],
        ...style2,
      });
      setStateDataUpdate_TBP(dataUpdate);
    }
    if (BPPoint !== undefined) {
      newPointList.current = [...newPointList.current, ...BPPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...BPPoint],
        ...style2,
      });
      setStateDataUpdate_BP(dataUpdate);
    }
  }, [a]);
  useEffect(() => {
    const tmp = handleLogicBMI(minX);
    BMIGraph2.current = tmp;
    setStateResultBMI(tmp);
  }, [minX]);
  useEffect(() => {
    let dataBMIUpdate = [];
    stateResultBMI.map((item) => {
      dataBMIUpdate.push({
        data: [
          { x: 16, y: item.result },
          { x: minX, y: item.result },
          { x: minX, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataBMIUpdate(dataBMIUpdate);
  }, [stateResultBMI, minX]);
  useEffect(() => {
    if (stateDataBMIUpdate) {
      setDataFinalBMI2({
        ...dataBMI2,
        datasets: [...dataBMI2.datasets, ...stateDataBMIUpdate],
      });
    }
  }, [stateDataBMIUpdate]);

  useEffect(() => {
    if (stateDataUpdate_TC) {
      setDataFinalBMI((pre) => {
        return {
          ...pre,
          datasets: [...pre.datasets, ...stateDataUpdate_CD],
        };
      });
    }
    if (stateDataUpdate_CD) {
      setDataFinalBMI((pre) => {
        return {
          ...pre,
          datasets: [...pre.datasets, ...stateDataUpdate_CD],
        };
      });
    }
    if (stateDataUpdate_TBP) {
      setDataFinalBMI((pre) => {
        return {
          ...pre,
          datasets: [...pre.datasets, ...stateDataUpdate_TBP],
        };
      });
    }
    if (stateDataUpdate_BP) {
      setDataFinalBMI((pre) => {
        return {
          ...pre,
          datasets: [...pre.datasets, ...stateDataUpdate_BP],
        };
      });
    }
  }, [
    stateDataUpdate_TC,
    stateDataUpdate_CD,
    stateDataUpdate_TBP,
    stateDataUpdate_BP,
  ]);
  useEffect(() => {
    setHealthIndex(
      BMI_HB_BL_rule(
        stateResultBMI,
        stateResultHeartBeat,
        stateResultBloodPressure
      )
    );
  }, [stateResultBMI, stateResultHeartBeat, stateResultBloodPressure]);

  useEffect(() => {
    console.log("@@@@@@@@@@@@@@@@@@@@: ", healthIndex);
  }, [healthIndex]);
  return (
    <>
      <div className="grid-cols-2 grid gap-8 ">
        <div className="max-w-sm w-full m-auto">
          <p>Chiều cao</p>
          <Scatter options={options} data={dataFinalHeight}></Scatter>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <p>Chieu cao</p>
                    <img src={abc}></img>
                    <img src={abc}></img>
                    <img src={abc}></img>
                  </div>
                ),
                onConfirm: () => {
                  console.log("Confirmed");
                },
                confirmText: "OK",
              })
            }
          >
            Hàm thành viên
          </Button>
        </div>
        <div className="max-w-sm w-full m-auto">
          <p>Khối lượng cơ thể</p>
          <Scatter options={options} data={dataFinalWeight}></Scatter>
        </div>
      </div>
      <div className=" w-full">
        <div className="max-w-sm m-auto">
          <p>Đồ thị BMI 1</p>
          <Scatter options={options} data={dataFinalBMI}></Scatter>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="max-w-xs">
          <p>Đồ thị BMI 2</p>
          <Scatter options={options} data={dataFinalBMI2}></Scatter>
        </div>
        <div className="max-w-xs">
          <p>Nhịp tim</p>
          <Scatter options={options} data={dataFinalHeartBeat}></Scatter>
        </div>

        <div className="max-w-xs">
          <p>Huyết áp</p>
          <Scatter options={options} data={dataFinalBloodPressure}></Scatter>
        </div>
      </div>
    </>
  );
};
export default Tab2;
