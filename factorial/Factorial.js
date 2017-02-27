/**
 * Calcula el factorial de forma iterativa
 *
 * @param value {number}
 * @return number
 * */
var iterativeFactorial = function (value) {
    var iteration = 1;
    for (var i = 2; i <= value; i++)
        iteration *= i;
    return iteration;
};
/**
 * Calcula el factorial de forma recursiva
 *
 * @param value {number}
 * @return number
 * */
var recursiveFactorial = function (value) {
    if (value === 0)
        return 1;
    else
        return value * recursiveFactorial(value - 1);
};
/**
 * Cuenta todos los ceros de un factorial
 *
 * @param value {number}
 * @return number
 * */
var allRightZeros = function (value) {
    var iteration = 1;
    for (var i = 2; i <= value; i++)
        iteration *= i;
    return (String(iteration).match(/0/g) || []).length;
};
/**
 * Cuenta los ultimos ceros a la derecha de un factorial
 *
 * @param value {number}
 * @return number
 * */
var lastRightZeros = function (value) {
    var iteration = 1;
    for (var i = 2; i <= value; i++)
        iteration *= i;
    var match = String(iteration).match(/0+$/);
    if (match !== null && match.length > 0)
        return match[0].length;
    return 0;
};
