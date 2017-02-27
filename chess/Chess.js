/**
 * @constructor
 * //https://gist.github.com/JotaSe/8b076d1a1fc119c4264d
 * */
var Chess = (function () {
    /**
     *
     * @param {number} size
     * @param {int} x - By default position X = 1; like a real chees
     * @param {int} y - By default position Y = 0; like a real chess
     * */
    function Chess(size, x, y) {
        if (size === void 0) { size = 8; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        /**
         * @const
         * */
        this.xPatron = [2, 1, -1, -2, -2, -1, 1, 2];
        /**
         * @const
         * */
        this.yPatron = [1, 2, 2, 1, -1, -2, -2, -1];
        /**
         * @property
         * */
        this.solutions = {};
        /**
         * @property
         * */
        this.board = 0;
        this.size = size;
        this.board = size * size;
        this.x = Math.min(size, Math.max(0, x));
        this.y = Math.min(size, Math.max(0, y));
        for (var x_1 = 0; x_1 < this.size; x_1++) {
            for (var y_1 = 0; y_1 < this.size; y_1++)
                this.setSolution(x_1, y_1, -1);
        }
        this.setSolution(this.x, this.y, 0);
    }
    Chess.prototype.solve = function () {
        this.play(this.x, this.y, this.xPatron, this.yPatron, 1);
    };
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} xAction
     * @param {number} yAction
     * @param {number} index
     * @return boolean
     * */
    Chess.prototype.play = function (x, y, xAction, yAction, index) {
        if (this.board === index)
            return true;
        for (var i = 0; i < this.size; i++) {
            if (!this.isValid(x + xAction[i], y + yAction[i]))
                continue;
            if (this.alreadyUsed(x + xAction[i], y + yAction[i]))
                continue;
            this.setSolution(x, y, index);
            if (this.play(x + xAction[i], y + yAction[i], xAction, yAction, index + 1))
                return true;
            else
                this.setSolution(x, y, -1);
        }
        return false;
    };
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} index
     * @return void
     * */
    Chess.prototype.setSolution = function (x, y, index) {
        if (!this.solutions.hasOwnProperty(x))
            this.solutions[x] = {};
        this.solutions[x][y] = index;
    };
    /**
     *
     * @param {number} x
     * @param {number} y
     * @return number - Iteration index
     * */
    Chess.prototype.getSolution = function (x, y) {
        if (this.solutions.hasOwnProperty(x))
            return this.solutions[x][y];
        return undefined;
    };
    /**
     *
     * @param {number} x
     * @param {number} y
     * @return boolean
     * */
    Chess.prototype.isValid = function (x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    };
    /**
     *
     * @param {number} x
     * @param {number} y
     * @return boolean
     * */
    Chess.prototype.alreadyUsed = function (x, y) {
        return this.getSolution(x, y) !== -1;
    };
    /**
     * @return object
     * */
    Chess.prototype.getSolutions = function () {
        var solutions = {};
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++)
                solutions[this.getSolution(x, y)] = { x: x, y: y };
        }
        return solutions;
    };
    /**
     * @return object
     * */
    Chess.prototype.getSolutionString = function () {
        var board = '';
        for (var x = 0; x < this.size; x++) {
            var row = [];
            for (var y = 0; y < this.size; y++) {
                var index = this.getSolution(x, y).toString();
                if (index.length === 1)
                    index = ' ' + index;
                row.push(index);
            }
            board += row.join('    ') + "\n";
        }
        return board;
    };
    return Chess;
}());
