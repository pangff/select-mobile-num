'use strict';
const XLSX = require('xlsx');

/**
 * 连续count次号码
 */
const uninterruptedlyNum = (testNum, count) => {
  let re = new RegExp("((?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=a)){" + count + "}\\d)")
  let re2 = new RegExp("((?:9(?=8)|8(?=7)|7(?=6)|6(?=5)|5(?=4)|4(?=3)|3(?=2)|2(?=1)|1(?=0)|0(?=a)){" + count + "}\\d)")
  return re.test(testNum) || re2.test(testNum)
}

/**
 * 相同号码
 */
const uninterruptedlySameNum = (testNum, count) => {
  let re = new RegExp("(\\d)\\1{" + count + "}");
  return re.test(testNum);
}

/**
 * 重叠号码
 */
const overlapNum = (testNum, uninterruptedCount) => {
  let re = new RegExp("(\\d)\\1{" + uninterruptedCount + "}(\\d)\\2{" + uninterruptedCount + "}");
  return re.test(testNum);
}

/**
 * 对称号码
 */
const adjectiveNum = (testNum) => {
  testNum = testNum+"";
  let str1 = testNum.substr(0, testNum.length / 2);
  let str2 = testNum.substr(testNum.length / 2, testNum.length - 1);
  let str3 = str2.split("").reverse().join("");
  if (str1 === str3) {
    return true;
  } else {
    return false;
  }
}



//连续相同数字个数
const UNINTERRUPTED_SAME_NUM_COUNT = 4;


//叠字个数
const OVERLAP_NUM = 2;


//连续相邻数字个数
const UNINTERRUPTED_NEIGHBOUR_NUM_COUNT = 4;



const selectMobileNum=(prefix,startNum,endNum)=>{
  let array = [];
  let result = [];
  for(let i=startNum;i<=endNum;i++){
    array.push(i)
  }

  for (let i = 0; i < array.length; i++) {
    let t1 = uninterruptedlySameNum(array[i], UNINTERRUPTED_SAME_NUM_COUNT-1);
    if (t1) {
      console.log(prefix+array[i])
      result.push(array[i])
      array.splice(i,1)
    }
  }

  for (let i = 0; i < array.length; i++) {
    let t1 = overlapNum(array[i], OVERLAP_NUM-1);

    if (t1) {
      console.log(prefix+array[i])
      result.push(array[i])
      array.splice(i,1)
    }
  }

  for (let i = 0; i < array.length; i++) {
    let t1 = uninterruptedlyNum(array[i], UNINTERRUPTED_NEIGHBOUR_NUM_COUNT-1);

    if (t1) {
      console.log(prefix+array[i])
      result.push(array[i])
      array.splice(i,1)
    }
  }


  console.log('对称数字(1221)：')
  for (let i = 0; i < array.length; i++) {
    let t1 = adjectiveNum(array[i]);

    if (t1) {
      console.log(prefix+array[i])
      result.push(array[i])
      array.splice(i,1)
    }
  }
  return result
}

let nums = selectMobileNum("5660",4000,9999)
let xmsxData = [];
xmsxData.push(["序号","号码"])
nums.forEach((item,index)=>{
  xmsxData.push([index+1,item])
})
var ws = XLSX.utils.aoa_to_sheet(xmsxData);
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "靓号");

XLSX.writeFile(wb, "./data/靓号.xlsx");