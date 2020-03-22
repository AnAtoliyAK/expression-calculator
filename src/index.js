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

function simpleCalculate(dataArray) {
  const multDevideResultArray = recMultDevideOper(dataArray);
  return recSumSubstractOper(multDevideResultArray)[0];
}

function checkForPairedBrackets(arr) {
  return [...arr].filter(e => e === '(').length === [...arr].filter(e => e === ')').length;
}

function evaluateSingleBracketsValue(arr, openBracketIndex, closeBracketIndex) {
  let newArr = [...arr];
  const bracketExprArr = newArr.slice(openBracketIndex + 1, closeBracketIndex);
  const bracketCalcResult = simpleCalculate(bracketExprArr);
  const simplifiedExprArr = [...newArr];
  simplifiedExprArr.splice(openBracketIndex, closeBracketIndex - openBracketIndex + 1, bracketCalcResult);

  return simplifiedExprArr;
}

function calcWithNestedBrackets(arr) {

  if (!checkForPairedBrackets(arr)) {
    throw new Error('ExpressionError: Brackets must be paired');
  }

  let loopResult = [...arr];

  while (loopResult.findIndex(el => el === '(') !== -1) {
    const openBrIndexesArr = loopResult
      .map((el, index) => el === '(' ? index : null)
      .filter(e => !!e || e == 0);
    const closeBrIndex = loopResult.indexOf(')');
    const openBrIndex = openBrIndexesArr.filter(el => el < closeBrIndex).pop();
    loopResult = evaluateSingleBracketsValue(loopResult, openBrIndex, closeBrIndex);
  }

  const result = simpleCalculate(loopResult);
  return result;
}

function expressionCalculator(expr) {
  const dataArray = transformDataStringToArray(expr);
  let result;

  if (dataArray.filter(el => el === '(' || el === ')').length > 0) {
    result = calcWithNestedBrackets(dataArray);
  } else {
    result = simpleCalculate(dataArray);
  }

  return result;
}
module.exports = {
  expressionCalculator
}
