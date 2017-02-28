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
function numberName(value) {
    /**
     * @param {*} value
     * @return boolean
     * */
    this.isInt = function (value) {
        return Number(value) === value && value % 1 === 0;
    };
    /**
     * @param {*} value
     * @return boolean
     * */
    this.isFloat = function (value) {
        return Number(value) === value && value % 1 !== 0;
    };
    /**
     * @param {*} value
     * @return boolean
     * */
    this.isNumeric = function (value) {
        return this.isFloat(value) || this.isInt(value);
    };
    /**
     *
     * */
    this.isDecimal = function () {
        return this.isFloat(this.value);
    };
    if (value === undefined || value === null || value === '')
        return '';
    // remove all no numbers chars except "-".
    if (typeof value === 'string')
        value = value.trim().replace(/[^\d\-\.]+/g, '');
    // Empty values are not allowed
    if (String(value).length === 0) {
        throw new Error('Invalid input value');
    }
    // try convert string to number.
    if (typeof value === 'string')
        value = Number(value);
    // if the value is not a number, so throw error
    if (!this.isNumeric(value))
        throw new Error('Only numbers are allowed as input');
    /**
     * @property
     * */
    this.value = value;
    /**
     * @const
     * */
    this._0_10 = [
        'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'
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
    this.getAbsolute = function (fixed) {
        if (this.isNumeric(fixed)) {
            var value_1 = Number(this.value.toString().replace(/(\d+)(\.\d+?)?/, '$1'));
            return Number(Math.abs(value_1).toFixed(fixed));
        }
        return Math.abs(this.value);
    };
    /**
     * @return boolean
     * */
    this.isNegative = function () {
        return this.value < 0;
    };
    /**
    * @return string
    * */
    this.getName = function () {
        var result = '';
        var value = this.getAbsolute(0);
        if (value === 0)
            return 'cero';
        else if (value > 999999)
            result = this.getMillions(value);
        else if (value > 999)
            result = this.getThousands(value);
        else if (value > 99)
            result = this.getHundreds(value);
        else if (value > 9)
            result = this.getTens(value);
        else
            result = this.getUnits(value);
        result = result.replace(/\s+cero\s*$/i, '');
        if (this.isNegative())
            result = 'menos ' + result;
        if (this.isDecimal()) {
            var decimal = Number(this.value.toString().replace(/^(\d+)(.(\d+))?/, '$3'));
            console.log('decimal:', decimal);
            result += ' punto ' + this.getTens(decimal);
        }
        return result;
    };
    /**
    * @param value {number}
    * @return string
    * */
    this.getUnits = function (value) {
        var number = value.toString().replace(/^0+/, '');
        var index = number.substr(number.length - 1);
        return this._0_10[Number(index)];
    };
    /**
    * @param value {number}
    * @return string
    * */
    this.getTens = function (value) {
        if (value < 10)
            return this.getUnits(value).replace(/^cero/, '');
        else if (value == 10) {
            return 'diez';
        }
        else if (value > 9 && value < 20) {
            return this._10_19[value - 10];
        }
        else if (value > 19 && value < 30) {
            return this._20_29[value - 20];
        }
        else {
            var units = this.getUnits(value);
            var index = Number(value.toString().substr(0, 1)) - 3;
            if (units != 'cero' && units.length > 0)
                return this._30_90[index] + ' y ' + units;
            return this._30_90[index];
        }
    };
    /**
    * @param value {number}
    * @return string
    * */
    this.getHundreds = function (value) {
        var valueString = value.toString().replace(/^0+/, '');
        if (value > 99) {
            if (value === 100)
                return 'cien';
            else {
                var index = Number(value.toString().substr(0, 1));
                return this._100_900[index - 1] + ' ' + this.getTens(valueString.substr(1)).replace(/^s+?cero/i, '');
            }
        }
        else
            return this.getTens(value);
    };
    /**
    * @param value {number}
    * @return string
    * */
    this.getThousands = function (value) {
        var stringValue = value.toString().replace(/^0+/, '');
        var hundreds = Number(stringValue.substr(value.toString().length - 3));
        var thousands = Number(stringValue.substr(0, value.toString().length - 3));
        if (thousands > 0) {
            if (thousands == 1)
                return 'mil ' + this.getHundreds(hundreds);
            else if (thousands.toString().length == 2) {
                return this.getTens(thousands) + ' mil ' + this.getHundreds(hundreds);
            }
            else {
                return this.getHundreds(thousands) + ' mil ' + this.getHundreds(hundreds);
            }
        }
        else
            return this.getHundreds(hundreds);
    };
    /**
    * @param value {number}
    * @return string
    * */
    this.getMillions = function (value) {
        var name = '';
        var thousands = Number(value.toString().substr(value.toString().length - 6));
        var million = Number(value.toString().substr(0, value.toString().length - 6));
        if (million.toString() != "1") {
            name = this.getHundreds(million) + ' millones';
        }
        else {
            var unit = this.getUnits(million);
            if (unit == 'uno')
                unit = 'un';
            name = unit + ' millon';
        }
        return name + ' ' + this.getThousands(thousands);
    };
    //
    return this.getName();
}
