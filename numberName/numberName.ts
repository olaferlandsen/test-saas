/**
 * Get name of a number between -999999999 to 999999999.
 *
 * @example
 * // returns "menos novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve"
 * getNameOfNumber(-999999999);
 *
 * @example
 * // returns "novecientos noventa y nueve millones novecientos noventa y nueve mil novecientos noventa y nueve"
 * getNameOfNumber(999999999);
 *
 * @example
 * // returns "cien"
 * getNameOfNumber(1e2)
 *
 * @example
 * // returns "doce"
 * getNameOfNumber("1e2")
 *
 * @param value {number|string}
 * @return string
 * */
function numberName (value:number|string):string {
	/**
	 * @param {*} value
	 * @return boolean
	 * */
	this.isInt = function (value:any):boolean {
		return Number(value) === value && value % 1 === 0;
	};
	/**
	 * @param {*} value
	 * @return boolean
	 * */
	this.isFloat = function (value:any):boolean {
		return Number(value) === value && value % 1 !== 0;
	};
	/**
	 * @param {*} value
	 * @return boolean
	 * */
	this.isNumeric = function (value:any):boolean {
		return this.isFloat(value) || this.isInt(value);
	};

	// remove all no numbers chars except "-".
	if (typeof value === 'string') value = value.trim().replace(/[^\d\-]+/, '');

	// Empty values are not allowed
	if (value === undefined || value === null || String(value).length === 0) {
		throw  new Error('Invalid input value');
	}
	// try convert string to number.
	if (typeof value === 'string') value = Number(value);

	// if the value is not a number, so throw error
	if (!this.isNumeric(value)) throw  new Error('Only numbers are allowed as input');
	/**
	 * @property
	 * */
	this.value = value;
	/**
	 * @const
	 * */
	this._0_10 = [
		'cero', 'uno', 'dos' , 'tres'  ,'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'
	];
	/**
	 * @const
	 * */
	this._10_19 = [
		'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho',
		'diecinueve',
	];
	/**
	 * @const
	 * */
	this._20_29 = [
		'veinte', 'veintiuno', 'veintidos', 'veintitres', 'veinticuatro', 'veiticinco', 'veintiseis',
		'veintisiete', 'veintiocho', 'veintinueve'
	];
	/**
	 * @const
	 * */
	this._30_90 = [
		'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
	];
	/**
	 * @const
	 * */
	this._100_900 = [
		'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos',
		'ochocientos', 'novecientos'
	];

	/**
	 * @return number
	 * */
	this.getAbsolute = function ():number {
		return Math.abs(this.value);
	};
	/**
	 * @return boolean
	 * */
	this.isNegative = function ():boolean {
		return this.value < 0;
	};
	/**
	* @return string
	* */
	this.getName = function () {
		let result:string = '';
		let value = this.getAbsolute();
		if (value === 0) return 'cero';
		else if (value> 999999) result = this.getMillions(value);
		else if (value> 999) result = this.getThousands(value);
		else if (value> 99) result = this.getHundreds(value);
		else if (value> 9) result= this.getTens(value);
		else result = this.getUnits(value);
		result = result.replace(/\s+cero\s*$/i, '');
		if (this.isNegative()) return 'menos ' + result;
		return result;
	};
	/**
	* @param value {number}
	* @return string
	* */
	this.getUnits = function (value:number):string {
		let number = value.toString().replace(/^0+/, '');
		let index = number.substr( number.length - 1);
		return this._0_10[Number(index)];
	};
	/**
	* @param value {number}
	* @return string
	* */
	this.getTens = function (value:number):string {
		if (value < 10) return this.getUnits(value);
		else if (value == 10) {
			return 'diez';
		}
		else if(value > 9 && value < 20) {
			return this._10_19[ value -10];
		}
		else if (value > 19 && value < 30){
			return this._20_29[ value - 20 ];
		}
		else {
			let units = this.getUnits(value);
			let index = Number(value.toString().substr(0, 1)) - 3;
			if (units != 'cero' && units.length > 0) return this._30_90[index] + ' y ' + units;
			return this._30_90[index];
		}
	};
	/**
	* @param value {number}
	* @return string
	* */
	this.getHundreds = function (value:number):string {
		let valueString:any =value.toString();
		if (value > 99) {
			if (value == 100) return 'cien';
			else {
				let index = Number(value.toString().substr(0, 1));
				return this._100_900[index-1] + ' ' + this.getTens (valueString.substr(1));
			}
		}
		else return this.getTens(value);
	};
	/**
	* @param value {number}
	* @return string
	* */
	this.getThousands = function (value:number):string {
		let stringValue = value.toString();
		let hundreds = Number(stringValue.substr(value.toString().length - 3));
		let thousands = Number(stringValue.substr(0, value.toString().length - 3));
		if (thousands > 0) {
			if (thousands == 1) return 'mil ' + this.getHundreds(hundreds);
			else if (thousands.toString().length == 2) {
				return this.getTens(thousands) + ' mil ' + this.getHundreds(hundreds);
			}
			else {
				return this.getHundreds(thousands) + ' mil ' + this.getHundreds(hundreds);
			}
		}
		else return this.getHundreds(hundreds)
	};
	/**
	* @param value {number}
	* @return string
	* */
	this.getMillions = function (value:number):string {
		let name:string = '';
		let thousands:number = Number(value.toString().substr(value.toString().length - 6));
		let million:number = Number(value.toString().substr(0, value.toString().length - 6));
		if (million.toString().length > 1) {
			name = this.getHundreds(million) + ' millones';
		}
		else {
			let unit = this.getUnits(million);
			if(unit == 'uno') unit = 'un';
			name = unit + ' millon';
		}
		return name + ' ' + this.getThousands(thousands);
	};
	//
	return this.getName();
}
