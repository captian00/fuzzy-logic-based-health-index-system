const BMIRule = (resultHeight, resultWeight) => {
//   console.log("height", resultHeight);
//   console.log("weight", resultWeight);

  const labelHeight = resultHeight.map((item) => item.label);
  const labelAllHeight = ["RT", "T", "TB", "C", "RC"];
  const resultFinalHeight = [];
  labelAllHeight.map((item) => {
    if (labelHeight.includes(item)) {
      const index = labelHeight.findIndex((i) => i === item);
      resultFinalHeight.push(resultHeight[index]);
    } else {
      resultFinalHeight.push({ result: 0, label: item });
    }
  });
//   console.log("resultFinalHeight", resultFinalHeight);

  const labelWeight = resultWeight.map((item) => item.label);
  const labelAllWeight = ["RN", "N", "TB", "NA", "RNA"];
  const resultFinalWeight = [];
  labelAllWeight.map((item) => {
    if (labelWeight.includes(item)) {
      const index = labelWeight.findIndex((i) => i === item);
      resultFinalWeight.push(resultWeight[index]);
    } else {
      resultFinalWeight.push({ result: 0, label: item });
    }
  });
//   console.log("resultFinalWeight", resultFinalWeight);

  let resultFinal = [
    { resultTC: 2, label: "TC" },
    { resultCD: 2, label: "CD" },
    { resultTBP: 2, label: "TBP" },
    { resultBP: 2, label: "BP" },
  ];
  function rule(x, labelHeight, labelWeight) {
    // console.log("Luat:" + labelHeight + " " + labelWeight);
    const labelResult = x;
    const tmp = "result" + x;
    const heightItem = resultFinalHeight.filter(
      (item) => item.label === labelHeight
    );
    const weightItem = resultFinalWeight.filter(
      (item) => item.label === labelWeight
    );
    const num1 = heightItem[0].result;
    const num2 = weightItem[0].result;
    // console.log("num1:", num1);
    // console.log("num2:", num2);
    const min = Math.min(num1, num2);
    // console.log("min:", min);
    resultFinal.forEach((item) => {
      //   console.log("truoc if item.result:", item?.[tmp], tmp);
      if (item.label === labelResult && item?.[tmp] > min && min !== 0) {
        // console.log("min:", min);
        item[tmp] = min;
        // console.log("cap nhat item.result:", item[tmp], tmp);
        // console.log("----------");
      }
    });
  }
  labelAllHeight.forEach((labelHeight) => {
    labelAllWeight.forEach((labelWeight) => {
      // height = RT
      if (labelHeight === "RT" && labelWeight === "RN") {
        //0,0
        // const labelResult = 'CD'
        // const heightItem= resultFinalHeight.filter((item) => item.label === labelHeight);
        // const weightItem= resultFinalWeight.filter((item) => item.label === labelWeight);
        // const num1 = heightItem[0].result
        // const num2 = weightItem[0].result
        // const min = Math.min(num1,num2)
        // resultFinal.forEach(item =>{
        //     if(item.label === labelResult && item.result>min){
        //         item.result=min
        //     }
        // })
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "RT" && labelWeight === "N") {
        //0,1
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "RT" && labelWeight === "TB") {
        //0,2
        rule("TBP", labelHeight, labelWeight);
      }
      if (labelHeight === "RT" && labelWeight === "NA") {
        //0,3
        rule("BP", labelHeight, labelWeight);
      }
      if (labelHeight === "RT" && labelWeight === "RNA") {
        //0,4
        rule("BP", labelHeight, labelWeight);
      }

      // height = T
      if (labelHeight === "T" && labelWeight === "RN") {
        //1,0
        rule("TC", labelHeight, labelWeight);
      }
      if (labelHeight === "T" && labelWeight === "N") {
        //1,1
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "T" && labelWeight === "TB") {
        //1,2
        rule("TBP", labelHeight, labelWeight);
      }
      if (labelHeight === "T" && labelWeight === "NA") {
        //1,3
        rule("TBP", labelHeight, labelWeight);
      }
      if (labelHeight === "T" && labelWeight === "RNA") {
        //1,4
        rule("BP", labelHeight, labelWeight);
      }

      // height = BT
      if (labelHeight === "TB" && labelWeight === "RN") {
        //2,0
        rule("TC", labelHeight, labelWeight);
      }
      if (labelHeight === "TB" && labelWeight === "N") {
        //2,1
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "TB" && labelWeight === "TB") {
        //2,2
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "TB" && labelWeight === "NA") {
        //2,3
        rule("TBP", labelHeight, labelWeight);
      }
      if (labelHeight === "TB" && labelWeight === "RNA") {
        //2,4
        rule("TBP", labelHeight, labelWeight);
      }

      // height = C
      if (labelHeight === "C" && labelWeight === "RN") {
        //3,0
        rule("TC", labelHeight, labelWeight);
      }
      if (labelHeight === "C" && labelWeight === "N") {
        //3,1
        rule("TC", labelHeight, labelWeight);
      }
      if (labelHeight === "C" && labelWeight === "TB") {
        //3,2
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "C" && labelWeight === "NA") {
        //3,3
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "C" && labelWeight === "RNA") {
        //3,4
        rule("TBP", labelHeight, labelWeight);
      }

      // height = RC
      if (labelHeight === "RC" && labelWeight === "RN") {
        //4,0
        rule("TC", labelHeight, labelWeight);
      }
      if (labelHeight === "RC" && labelWeight === "N") {
        //4,1
        rule("TC", labelHeight, labelWeight);
      }
      if (labelHeight === "RC" && labelWeight === "TB") {
        //4,2
        rule("TC", labelHeight, labelWeight);
      }
      if (labelHeight === "RC" && labelWeight === "NA") {
        //4,3
        rule("CD", labelHeight, labelWeight);
      }
      if (labelHeight === "RC" && labelWeight === "RNA") {
        //4,4
        rule("CD", labelHeight, labelWeight);
      }
    });
  });
  resultFinal = resultFinal.map((item) => {
    if (item.resultTC === 2) {
      return { ...item, resultTC: 0 };
    }
    if (item.resultCD === 2) {
      return { ...item, resultCD: 0 };
    }
    if (item.resultTBP === 2) {
      return { ...item, resultTBP: 0 };
    }
    if (item.resultBP === 2) {
      return { ...item, resultBP: 0 };
    }
    return item;
  });
  // console.log(resultFinal);
  return resultFinal;
};
export default BMIRule
