//Xử lý luật cho Health Index
const BMI_HB_BL_rule = (resultBMI, resultHeartBeat, resultBloodPressure) => {
  const labelBMI = resultBMI.map((item) => item.label);
  const labelAllBMI = ["TC", "CD", "TBP", "BP"];
  const resultFinalBMI = [];
  labelAllBMI.map((item) => {
    if (labelBMI.includes(item)) {
      const index = labelBMI.findIndex((i) => i === item);
      resultFinalBMI.push(resultBMI[index]);
    } else {
      resultFinalBMI.push({ result: 0, label: item });
    }
  });

  const labelHeartBeat = resultHeartBeat.map((item) => item.label);
  const labelAllHeartBeat = ["T", "BT", "C"];
  const resultFinalHeartBeat = [];
  labelAllHeartBeat.map((item) => {
    if (labelHeartBeat.includes(item)) {
      const index = labelHeartBeat.findIndex((i) => i === item);
      resultFinalHeartBeat.push(resultHeartBeat[index]);
    } else {
      resultFinalHeartBeat.push({ result: 0, label: item });
    }
  });

  const labelBloodPressure = resultBloodPressure.map((item) => item.label);
  const labelAllBloodPressure = ["T", "BT", "C"];
  const resultFinalBloodPressure = [];
  labelAllBloodPressure.map((item) => {
    if (labelBloodPressure.includes(item)) {
      const index = labelBloodPressure.findIndex((i) => i === item);
      resultFinalBloodPressure.push(resultBloodPressure[index]);
    } else {
      resultFinalBloodPressure.push({ result: 0, label: item });
    }
  });
  // UH, LH, SH, H
  let resultFinalHealthIndex = [
    { resultUH: 2, label: "UH" },
    { resultLH: 2, label: "LH" },
    { resultSH: 2, label: "SH" },
    { resultH: 2, label: "H" },
  ];

  const hanldeLogicHealthIndex = (
    resultLabel,
    labelBMI,
    labelHeartBeat,
    labelBloodPressure
  ) => {
    const labelResult = resultLabel;
    const tmp = "result" + resultLabel;
    const BmiItem = resultFinalBMI.filter((item) => item.label === labelBMI);
    const HeartBeatItem = resultFinalHeartBeat.filter(
      (item) => item.label === labelHeartBeat
    );
    const BloodPressureItem = resultFinalBloodPressure.filter(
      (item) => item.label === labelBloodPressure
    );

    const min = Math.min(
      HeartBeatItem[0].result,
      BloodPressureItem[0].result,
      BmiItem[0].result
    );
    resultFinalHealthIndex.forEach((item) => {
      if (item.label === labelResult && item?.[tmp] > min && min !== 0) {
        item[tmp] = min;
      }
    });
  };

  labelAllBMI.forEach((label_BMI) => {
    labelAllHeartBeat.forEach((label_HeartBeat) => {
      labelAllBloodPressure.forEach((label_BloodPressure) => {
        //0,0,0
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //0,0,1
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //0,0,2
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        // 0,1,0
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //0,1,1
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "H",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //0,1,2
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //0,2,0
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //0,2,1
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //0,2,2
        if (
          label_BMI === "TC" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }

        //1,0,0
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //1,0,1
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "SH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //1,0,2
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        // 1,1,0
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "SH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //1,1,1
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "H",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //1,1,2
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "SH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //1,2,0
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //1,2,1
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "SH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //1,2,2
        if (
          label_BMI === "CD" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }

        //2,0,0
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //2,0,1
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //2,0,2
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        // 2,1,0
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //2,1,1
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "H",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //2,1,2
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //2,2,0
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //2,2,1
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //2,2,2
        if (
          label_BMI === "TBP" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }

        //3,0,0
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //3,0,1
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //3,0,2
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "T" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        // 3,1,0
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //3,1,1
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "SH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //3,1,2
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "BT" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //3,2,0
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "T"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //3,2,1
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "BT"
        ) {
          hanldeLogicHealthIndex(
            "LH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
        //3,2,2
        if (
          label_BMI === "BP" &&
          label_HeartBeat === "C" &&
          label_BloodPressure === "C"
        ) {
          hanldeLogicHealthIndex(
            "UH",
            label_BMI,
            label_HeartBeat,
            label_BloodPressure
          );
        }
      });
    });
  });
  // UH, LH, SH ,H
  resultFinalHealthIndex = resultFinalHealthIndex.map((item) => {
    if (item.resultUH === 2) {
      return { ...item, resultUH: 0 };
    }
    if (item.resultLH === 2) {
      return { ...item, resultLH: 0 };
    }
    if (item.resultSH === 2) {
      return { ...item, resultSH: 0 };
    }
    if (item.resultH === 2) {
      return { ...item, resultH: 0 };
    }
    return item;
  });
  return resultFinalHealthIndex;
};
export default BMI_HB_BL_rule;
