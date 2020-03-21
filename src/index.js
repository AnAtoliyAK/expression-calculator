function eval() {
  // Do not use eval!!!
  return;
}

function multiply(a, b) {
  return a * b;
}

function devide(a, b) {
  if (b == 0) {
    throw Error('TypeError: Division by zero.');
  }
  return a / b;
}

function sum(a, b) {
  return parseFloat(a) + parseFloat(b);
}
function substract(a, b) {
  return a - b;
}

function recMultDevideOper(ar) {
  let result = [...ar];

  while (result.findIndex(el => el === '*' || el === '/') !== -1) {
    let elIndex = result.findIndex(el => el === '*' || el === '/');
    let sign = result[elIndex];
    if (sign === '/') {
      result = removal(result, elIndex, devide);
    }
    if (sign === '*') {
      result = removal(result, elIndex, multiply);
    }
  }
  return result;
}

function recSumSubstractOper(ar) {
  let result = [...ar];

  while (result.findIndex(el => el === '+' || el === '-') !== -1) {
    let elIndex = result.findIndex(el => el === '+' || el === '-');
    let sign = result[elIndex];
    if (sign === '+') {
      result = removal(result, elIndex, sum);
    }
    if (sign === '-') {
      result = removal(result, elIndex, substract);
    }
  }
  return result;
}

function removal(remAr, elIndex, operationFunc) {
  let res = [...remAr];
  res.splice(elIndex - 1, 3, operationFunc(res[elIndex - 1], res[elIndex + 1]));
  return res;
}

function transformDataStringToArray(expr) {
  let arrayWithoutSpaces = expr.trim().split('').filter(e => e !== ' ');
  let innerArray = [];
  arrayWithoutSpaces.forEach((el, ind, arr) => {
    if (!isNaN(+el) && !isNaN(arr[ind - 1])) {
      let val = innerArray.pop() + el;
      innerArray.push(val);
    } else {
      innerArray.push(el);
    }
  });
  return innerArray;
}

function expressionCalculator(expr) {
  const dataArray = transformDataStringToArray(expr);
  const multDevideResultArray = recMultDevideOper(dataArray);
  const sumSubstrResultArray = recSumSubstractOper(multDevideResultArray);

  return sumSubstrResultArray[0];
}
module.exports = {
  expressionCalculator
}





