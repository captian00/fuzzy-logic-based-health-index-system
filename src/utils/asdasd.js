export const showDetailHeartBeat = (kq) => {
  let arr = [];
  if (kq < 50) {
    arr = [
      ...arr,
      { result: 1 },
      { result: 0 },
      { result: 0 },
    
    ];
  }
  if (kq <= 50 && kq >= 55) {
    arr = [
      ...arr,
      { result: right(kq, 50, 55) },
      { result: left(kq, 50, 60) },
      { result: 0 },
    ];
  }
  if (55 < kq && kq < 60) {
    arr = [
      ...arr,
      { result: 0 },
      { result: left(kq, 55, 60) },
      { result: 0 },
    ];
  }
  if (60 < kq && kq < 100) {
    arr = [
      ...arr,
      { result: 0 },
      { result: 1 },
      { result: 0 },
    ];
  }
  if (kq < 100 && kq > 105) {
    arr = [
      ...arr,
      { result: 0 },
      { result: right(kq, 100, 105) },
      { result: 0 },
    ];
  }
  if (105 <= kq && kq <= 110) {
    arr = [
      ...arr,
      { result: 0 },
      { result: right(kq, 100, 105) },
      { result: left(kq, 105, 110) },
    ];
  }
  if (kq > 110) {
    arr = [
      ...arr,
      { result: 0},
      { result: 0 },
      { result: 1 },
    ];
  }
 
  return arr;
};
