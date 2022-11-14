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
import chieucao1 from "../image/Chieucao/chieucao1.png";
import chieucao2 from "../image/Chieucao/chieucao2.png";
import chieucao3 from "../image/Chieucao/chieucao3.png";
import chieucao4 from "../image/Chieucao/chieucao4.png";
import chieucao5 from "../image/Chieucao/chieucao5.png";
import bmiRule from "../image/BMIrule.png";
import cannang1 from "../image/Cannang/cannang1.png";
import cannang2 from "../image/Cannang/cannang2.png";
import cannang3 from "../image/Cannang/cannang3.png";
import cannang4 from "../image/Cannang/cannang4.png";
import cannang5 from "../image/Cannang/cannang5.png";
import BMI1 from "../image/BMI/BMI1.png";
import BMI2 from "../image/BMI/BMI2.png";
import BMI3 from "../image/BMI/BMI3.png";
import BMI4 from "../image/BMI/BMI4.png";
import nhiptimThap from "../image/NhipTim/thap.png";
import nhiptimBT from "../image/NhipTim/binhthuong.png";
import nhiptimCao from "../image/NhipTim/cao.png";
import huyetapThap from "../image/HuyetAp/thap.png";
import huyeapBT from "../image/HuyetAp/binhthuong.png";
import huyetapCao from "../image/HuyetAp/cao.png";
import HI1 from "../image/HIrule/HI1.png";
import HI2 from "../image/HIrule/HI2.png";
import HI3 from "../image/HIrule/HI3.png";
import HI4 from "../image/HIrule/HI4.png";
import Hi1 from "../image/HI/HI1.png";
import Hi2 from "../image/HI/HI2.png";
import Hi3 from "../image/HI/HI3.png";
import Hi4 from "../image/HI/HI4.png";

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
  dataHI,
  dataHI2,
} from "../const";

import {
  handleGraphBMI,
  handleGraphHI,
  handleLogicWeight,
  handleLogicHeight,
  handleLogicHeartBeat,
  handleLogicBMI,
  handleLogicHI,
  handleLogicBloodPressure,
  showDetail,
  showDetailHeight,
  showDetailWeight,
  showDetailHeartBeat,
  showDetailBloodPressure,
  showDetailBMI,
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
  responsive: true,
  tooltips: true,
  plugins: {
    legend: {
      position: "top",
    },
    zoom: {
      zoom: {
        wheel: {
          enable: true,
        },
      },
    },
  },
  //   // title: {
  //   //   display: true,
  //   //   text: "Chiều cao",
  //   // },
  // },
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
  borderWidth: 3.5,
  backgroundColor: "black",
  pointBackgroundColor: "black",
  pointBorderColor: "black",
  pointRadius: 3.5,
  pointHoverRadius: 4,
  showLine: true,
};
const Tab2 = () => {
  // Đưa dữ liệu chiều cao, cân nặng, nhịp tim, huyết áp lên đồ thị
  const { weight, height, heartBeat, bloodPressure, submit, setKQ } =
    useMainContext();
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
    if (!weight || !height || !heartBeat || !bloodPressure) {
      setStateResultHeartBeat([]);
      setStateResultBloodPressure([]);
      setStateResultHeight([]);
      setStateResultWeight([]);
      setStateDataHeightUpdate(null);
      setStateDataWeightUpdate(null);
      setStateDataHeartBeatUpdate(null);
      setStateDataBloodPressureUpdate(null);
      setDataFinalHeight(dataHeight);
      setDataFinalWeight(dataWeight);
      setDataFinalHeartBeat(dataHeartBeat);
      setDataFinalBloodPressure(dataBloodPressure);

      setA([
        { resultTC: 2, label: "TC" },
        { resultCD: 2, label: "CD" },
        { resultTBP: 2, label: "TBP" },
        { resultBP: 2, label: "BP" },
      ]);
      newBmiPointList.current = [];
      setDataFinalBMI(dataBMI);
      setStateDataUpdate_TC(null);
      setStateDataUpdate_CD(null);
      setStateDataUpdate_TBP(null);
      setStateDataUpdate_BP(null);

      setStateDataBMIUpdate(null);
      setDataFinalBMI2(dataBMI2);

      setStateDataHIUpdate(null);
      setDataFinalHI(dataHI);

      setStateDataHIUpdate2(null);
      setDataFinalHI2(dataHI2);
      setNewHIPoint([]);
      setUHPoint([]);
      setLHPoint([]);
      setSHPoint([]);
      setHPoint([]);

      setHealthIndex([
        { resultUH: 2, label: "UH" },
        { resultLH: 2, label: "LH" },
        { resultSH: 2, label: "SH" },
        { resultH: 2, label: "H" },
      ]);
      setMaxYHi(-10000);
      setMinXHi(10000);
      minXBmi = 10000;
      maxYBmi = -10000;
    }
  }, [weight, height, heartBeat, bloodPressure, submit]);

  useEffect(() => {
    let dataHeightUpdate = [];
    stateResultHeight.map((item) => {
      dataHeightUpdate.push({
        data: [
          { x: 140, y: item.result },
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
          { x: 60, y: item.result },
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
  //----------------------------------------------------------

  // Sử dụng hệ mờ với 2 chỉ số chiều cao, cân nặng để tính chỉ số BMI và in kết quả lên đồ thị
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
  const [dataFinalBMI, setDataFinalBMI] = useState(dataBMI);

  const [stateDataBMIUpdate, setStateDataBMIUpdate] = useState(null);
  const [dataFinalBMI2, setDataFinalBMI2] = useState(dataBMI);
  const [stateResultBMI, setStateResultBMI] = useState([]);

  let newBmiPointList = useRef([]);
  let minXBmi = 10000;
  let maxYBmi = -10000;
  newBmiPointList.current.forEach((item) => {
    if (item.y > 0) {
      if (item.y > maxYBmi) {
        maxYBmi = item.y;
      }
    }
  });
  newBmiPointList.current.forEach((item) => {
    if (item.y === maxYBmi) {
      if (item.x < minXBmi) {
        minXBmi = item.x;
      }
    }
  });
  useEffect(() => {
    const TCPoint = handleGraphBMI(a[0].resultTC, a[0].label);
    const CDPoint = handleGraphBMI(a[1].resultCD, a[1].label);
    const TBPPoint = handleGraphBMI(a[2].resultTBP, a[2].label);
    const BPPoint = handleGraphBMI(a[3].resultBP, a[3].label);
    if (TCPoint !== undefined) {
      newBmiPointList.current = [...newBmiPointList.current, ...TCPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...TCPoint],
        ...style2,
      });
      setStateDataUpdate_TC(dataUpdate);
    }
    if (CDPoint !== undefined) {
      newBmiPointList.current = [...newBmiPointList.current, ...CDPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...CDPoint],
        ...style2,
      });
      setStateDataUpdate_CD(dataUpdate);
    }
    if (TBPPoint !== undefined) {
      newBmiPointList.current = [...newBmiPointList.current, ...TBPPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...TBPPoint],
        ...style2,
      });
      setStateDataUpdate_TBP(dataUpdate);
    }
    if (BPPoint !== undefined) {
      newBmiPointList.current = [...newBmiPointList.current, ...BPPoint];
      let dataUpdate = [];
      dataUpdate.push({
        data: [...BPPoint],
        ...style2,
      });
      setStateDataUpdate_BP(dataUpdate);
    }
  }, [a]);
  useEffect(() => {
    const tmp = handleLogicBMI(minXBmi);
    setStateResultBMI(tmp);
  }, [minXBmi]);

  useEffect(() => {
    let dataBMIUpdate = [];
    stateResultBMI.map((item) => {
      dataBMIUpdate.push({
        data: [
          { x: 0, y: item.result },
          { x: minXBmi, y: item.result },
          { x: minXBmi, y: 0 },
        ],
        ...style,
      });
    });
    setStateDataBMIUpdate(dataBMIUpdate);
  }, [stateResultBMI, minXBmi]);
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
          datasets: [...pre.datasets, ...stateDataUpdate_TC],
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
  //----------------------------------------------------------

  // Sử dụng hệ mờ với 3 chỉ số BMI, nhịp tim và huyết áp để tính chỉ số HI và in kết quả lên đồ thị
  const [healthIndex, setHealthIndex] = useState([
    { resultUH: 2, label: "UH" },
    { resultLH: 2, label: "LH" },
    { resultSH: 2, label: "SH" },
    { resultH: 2, label: "H" },
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
  const [newHIPoint, setNewHIPoint] = useState([]);
  const [UHPoint, setUHPoint] = useState([]);
  const [LHPoint, setLHPoint] = useState([]);
  const [SHPoint, setSHPoint] = useState([]);
  const [HPoint, setHPoint] = useState([]);

  const [stateDataHIUpdate, setStateDataHIUpdate] = useState(null);
  const [stateDataHIUpdate2, setStateDataHIUpdate2] = useState(null);
  const [dataFinalHI, setDataFinalHI] = useState(dataHI);
  const [dataFinalHI2, setDataFinalHI2] = useState(dataHI2);
  const [resultHI, setResultHI] = useState([]);
  useEffect(() => {
    console.log("healthIndex", healthIndex);
    const tmp1 = handleGraphHI(healthIndex[0].resultUH, healthIndex[0].label);
    const tmp2 = handleGraphHI(healthIndex[1].resultLH, healthIndex[1].label);
    const tmp3 = handleGraphHI(healthIndex[2].resultSH, healthIndex[2].label);
    const tmp4 = handleGraphHI(healthIndex[3].resultH, healthIndex[3].label);

    if (tmp1 !== [] && tmp1 !== undefined) {
      setUHPoint((pre) => {
        if (pre !== tmp1) {
          return tmp1;
        } else if (pre === tmp1) {
          return pre;
        }
      });
    }
    if (tmp2 !== [] && tmp2 !== undefined) {
      setLHPoint((pre) => {
        if (pre !== tmp2) {
          return tmp2;
        } else if (pre === tmp2) {
          return pre;
        }
      });
    }
    if (tmp3 !== [] && tmp3 !== undefined) {
      setSHPoint((pre) => {
        if (pre !== tmp3) {
          return tmp3;
        } else if (pre === tmp3) {
          return pre;
        }
      });
    }
    if (tmp4 !== [] && tmp4 !== undefined) {
      setHPoint((pre) => {
        if (pre !== tmp4) {
          return tmp4;
        } else if (pre === tmp4) {
          return pre;
        }
      });
    }
  }, [healthIndex]);
  useEffect(() => {
    if (
      UHPoint !== undefined &&
      LHPoint !== undefined &&
      SHPoint !== undefined &&
      HPoint !== undefined
    ) {
      setNewHIPoint([...UHPoint, ...LHPoint, ...SHPoint, ...HPoint]);
    }
  }, [HPoint, UHPoint, SHPoint, LHPoint]);

  const [minXHi, setMinXHi] = useState(10000);
  const [maxYHi, setMaxYHi] = useState(-10000);
  useEffect(() => {
    newHIPoint.forEach((item) => {
      if (item.y > 0) {
        if (item.y > maxYHi) {
          setMaxYHi(item.y);
        }
      }
    });
  }, [maxYHi, newHIPoint]);
  useEffect(() => {
    newHIPoint.forEach((item) => {
      if (item.y === maxYHi) {
        if (item.x < minXHi) {
          setMinXHi(item.x);
        }
      }
    });
  }, [maxYHi, minXHi, newHIPoint]);
  useEffect(() => {
    let dataHIUpdate = [];
    dataHIUpdate.push({
      data: [...newHIPoint],
      ...style2,
    });
    setStateDataHIUpdate(dataHIUpdate);
    setResultHI(handleLogicHI(minXHi));
    console.log("minXHi", minXHi);
  }, [minXHi, newHIPoint]);

  useEffect(() => {
    if (stateDataHIUpdate) {
      setDataFinalHI(() => {
        return {
          ...dataFinalHI,
          datasets: [...dataFinalHI.datasets, ...stateDataHIUpdate],
        };
      });
    }
  }, [stateDataHIUpdate]);
  useEffect(() => {
    let dataHIUpdate = [];

    console.log("resultHI", resultHI);
    resultHI.forEach((item, index) => {
      // if(index===0 || index ===1){
      dataHIUpdate.push({
        data: [
          { x: 0, y: item.result },
          { x: minXHi, y: item.result },
          { x: minXHi, y: 0 },
        ],
        ...style,
      });
      // }
    });
    setStateDataHIUpdate2(dataHIUpdate);
  }, [resultHI]);
  useEffect(() => {
    console.log("stateDataHIUpdate2", stateDataHIUpdate2);
    if (stateDataHIUpdate2) {
      setDataFinalHI2({
        ...dataHI,
        datasets: [...dataHI.datasets, ...stateDataHIUpdate2],
      });
    }
  }, [stateDataHIUpdate2]);
  setKQ(minXHi);
  let detail = showDetail(minXHi);

  let detailWeight = showDetailWeight(stateResultWeight);
  let detailHeight = showDetailHeight(stateResultHeight);
  console.log("detailWeight", detailWeight);
  let detailHeartBeat = showDetailHeartBeat(stateResultHeartBeat);
  // console.log("detailHeartBeat", detailHeartBeat);
  let detailBloodPressure = showDetailBloodPressure(stateResultBloodPressure);
  let detailBMI = showDetailBMI(stateResultBMI);
  //----------------------------------------------------------

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="max-w-xs m-auto">
          <p>Chiều cao</p>
          <Scatter options={options} data={dataFinalHeight}></Scatter>
          <p>f = [RT, T, TB, C, RC]</p>
          <p>
            [{" "}
            {detailHeight !== [] &&
              detailHeight.reduce((a, b, index) => {
                if (index === 0) {
                  return b.result;
                }
                return `${a},${b.result}`;
              }, "")}
            ]
          </p>
          <p>
            <i>Chú thích:</i> RT: Rất thấp, T: Thấp, TB: Trung bình, C: Cao, RC:
            Rất cao
          </p>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <p>Rất thấp</p>
                    <img src={chieucao1}></img>
                    <p>Thấp</p>
                    <img src={chieucao2}></img>
                    <p>Trung bình</p>
                    <img src={chieucao3}></img>
                    <p>Cao</p>
                    <img src={chieucao4}></img>
                    <p>Rất cao</p>
                    <img src={chieucao5}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Hàm thành viên
          </Button>
        </div>
        <div className="max-w-xs m-auto">
          <p>Khối lượng cơ thể</p>
          <Scatter options={options} data={dataFinalWeight}></Scatter>
          <p>f = [RN, N, TB, NA, RNA]</p>
          <p>
            [{" "}
            {detailWeight !== [] &&
              detailWeight.reduce((a, b, index) => {
                if (index === 0) {
                  return b.result;
                }
                return `${a},${b.result}`;
              }, "")}
            ]
          </p>
          <p>
            <i>Chú thích:</i> RN: Nhẹ, N: Nhẹ, TB: Trung Bình, NA: Nặng, RNA:
            Rất nặng
          </p>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <p>Rất nhẹ</p>
                    <img src={cannang1}></img>
                    <p>Nhẹ</p>
                    <img src={cannang2}></img>
                    <p>Trung bình</p>
                    <img src={cannang3}></img>
                    <p>Nặng</p>
                    <img src={cannang4}></img>
                    <p>Rất nặng</p>
                    <img src={cannang5}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Hàm thành viên
          </Button>
        </div>
      </div>
      <div className=" w-full">
        <div className="max-w-sm m-auto">
          <p>
            Sử dụng hệ mờ với 2 chỉ số chiều cao và khối lượng cơ thể, ta có kết
            quả như sau
          </p>
          <p>BMI</p>
          <Scatter options={options} data={dataFinalBMI}></Scatter>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <img src={bmiRule}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Luật
          </Button>
        </div>
      </div>
      <div className=" w-full">
        <div className="max-w-sm m-auto">
          <p>
            Giải mờ theo phương pháp cực đại gần nhất, ta tính được BMI như bên
            dưới
          </p>
          <p>BMI</p>
          <Scatter options={options} data={dataFinalBMI2}></Scatter>
          <p>f = [TC, CD, TBP, BP]</p>
          <p>
            [{" "}
            {detailBMI !== [] &&
              detailBMI.reduce((a, b, index) => {
                if (index === 0) {
                  return b.result;
                }
                return `${a},${b.result}`;
              }, "")}
            ]
          </p>
          <p>
            <i>Chú thích:</i> TC: Thiếu cân, CD: Cân đối, TBP: Tiền béo phì, BP:
            Béo phì
          </p>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <p>Thiếu cân</p>
                    <img src={BMI1}></img>
                    <p>Cân đối</p>
                    <img src={BMI2}></img>
                    <p>Tiền béo phì</p>
                    <img src={BMI3}></img>
                    <p>Béo phì</p>
                    <img src={BMI4}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Hàm thành viên
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="max-w-xs m-auto">
          <p>Nhịp tim</p>
          <Scatter options={options} data={dataFinalHeartBeat}></Scatter>
          <p>f = [T, TB, C]</p>
          <p>
            [{" "}
            {detailHeartBeat !== [] &&
              detailHeartBeat.reduce((a, b, index) => {
                if (index === 0) {
                  return b.result;
                }
                return `${a},${b.result}`;
              }, "")}
            ]
          </p>
          <p>
            <i>Chú thích:</i> T: Thấp, TB: Trung bình, C: Cao
          </p>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <p>Thấp</p>
                    <img src={nhiptimThap}></img>
                    <br></br>
                    <p>Bình thường</p>
                    <img src={nhiptimBT}></img>
                    <br></br>
                    <p>Cao</p>
                    <img src={nhiptimCao}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Hàm thành viên
          </Button>
        </div>

        <div className="max-w-xs m-auto">
          <p>Huyết áp</p>
          <Scatter options={options} data={dataFinalBloodPressure}></Scatter>
          <p>f = [T, TB, C]</p>
          <p>
            [{" "}
            {detailBloodPressure !== [] &&
              detailBloodPressure.reduce((a, b, index) => {
                if (index === 0) {
                  return b.result;
                }
                return `${a},${b.result}`;
              }, "")}
            ]
          </p>
          <p>
            <i>Chú thích:</i> T: Thấp, TB: Trung bình, C: Cao
          </p>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <p>Thấp</p>
                    <img src={huyetapThap}></img>
                    <br></br>
                    <p>Bình thường</p>
                    <img src={huyeapBT}></img>
                    <br></br>
                    <p>Cao</p>
                    <img src={huyetapCao}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Hàm thành viên
          </Button>
        </div>
      </div>
      <div className=" w-full">
        <div className="max-w-sm m-auto">
          <p>
            Sử dụng hệ mờ với 3 chỉ số BMI, nhịp tim và huyết áp, ta có kết quả
            như sau
          </p>
          <p>Health Index</p>
          <Scatter options={options} data={dataFinalHI}></Scatter>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <img src={HI1}></img>
                    <br></br>

                    <img src={HI2}></img>
                    <br></br>

                    <img src={HI3}></img>
                    <br></br>

                    <img src={HI4}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Luật
          </Button>
        </div>
      </div>
      <div className=" w-full">
        <div className="max-w-sm m-auto">
          <p>
            Giải mờ theo phương pháp cực đại gần nhất, ta tính đc chỉ số sức
            khỏe như bên dưới
          </p>
          <p>Health Index</p>
          <Scatter options={options} data={dataFinalHI2}></Scatter>
          <Button
            block
            onClick={() =>
              Modal.alert({
                content: (
                  //thay cho nay
                  <div>
                    <p>Yếu</p>
                    <img src={Hi1}></img>
                    <br></br>
                    <p>Không khỏe lắm</p>
                    <img src={Hi2}></img>
                    <br></br>
                    <p>Có vẻ khỏe</p>
                    <img src={Hi3}></img>
                    <br></br>
                    <p>Khỏe</p>
                    <img src={Hi4}></img>
                  </div>
                ),
                onConfirm: () => {},
                confirmText: "OK",
              })
            }
          >
            Hàm thành viên
          </Button>
        </div>
      </div>
      <div className=" w-full">
        <div className="max-w-sm m-auto">
          <p>Chỉ số sức khỏe của bạn là: {minXHi !== 10000 && minXHi}</p>
          <p>f = [UH, LH, SH, H ]</p>
          <p>
            [{" "}
            {detail !== [] &&
              detail.reduce((a, b, index) => {
                if (index === 0) {
                  return b.result;
                }
                return `${a},${b.result}`;
              }, "")}
            ]
          </p>
          <p>
            <i>Chú thích:</i> UH: Yếu, LH: Không khỏe lắm, SH: Có vẻ khỏe, H:
            Khỏe
          </p>
        </div>
      </div>
    </>
  );
};
export default Tab2;
