const BMI_HB_BL_rule = (resultBMI, resultHeartBeat, resultBloodPressure)=>{
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
    const labelAllHeartBeat = ["T", "BT", "C",];
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
    // console.log('--------------------------');
    // console.log("resultFinalBMI", resultFinalBMI);
    // console.log("resultFinalHeartBeat", resultFinalHeartBeat);
    // console.log("resultFinalBloodPressure", resultFinalBloodPressure);
    // console.log("--------------------------");
}
export default BMI_HB_BL_rule