/**
 * Calcula el factorial de forma iterativa
 *
 * @param value {number}
 * @return number
 * */
let iterativeFactorial = (value:number):number => {
	let iteration = 1;
	for (let i = 2; i <= value; i++) iteration *= i;
	return iteration;
};
/**
 * Calcula el factorial de forma recursiva
 *
 * @param value {number}
 * @return number
 * */
let recursiveFactorial= (value:number):number => {
	if (value === 0) return 1;
	else return value * recursiveFactorial( value - 1 );
};
/**
 * Cuenta todos los ceros de un factorial
 *
 * @param value {number}
 * @return number
 * */
let allRightZeros = (value:string|number) => {
	let iteration = 1;
	for (let i = 2; i <= value; i++) iteration *= i;
	return (String(iteration).match(/0/g) || []).length;
};
/**
 * Cuenta los ultimos ceros a la derecha de un factorial
 *
 * @param value {number}
 * @return number
 * */
let lastRightZeros = (value:string|number) => {
	let iteration = 1;
	for (let i = 2; i <= value; i++) iteration *= i;
	let match = String(iteration).match(/0+$/);
	if (match !== null && match.length > 0) return match[0].length;
	return 0;
};