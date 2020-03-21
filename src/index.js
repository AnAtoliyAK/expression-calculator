function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arr = expr.split(' ').join('').split('');
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*') {
            result += Number(arr[i - 1]) * Number(arr[i + 1]);
        }
        else if (arr[i] === '/') {
            if (arr[i + 1] === '0') {
                throw Error('TypeError: Division by zero.');
            }
            else result += Number(arr[i - 1]) / Number(arr[i + 1]);
        }
        else if (arr[i] === '-') {
            result += Number(arr[i - 1]) - Number(arr[i + 1]);
        }
        else if (arr[i] === '+') {
            result += Number(arr[i - 1]) + Number(arr[i + 1]);
        }
    }
    return result;
    //return SpeechRecognitionResult;
}
module.exports = {
    expressionCalculator
}