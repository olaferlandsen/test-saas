/**
 * @constructor
 * //https://gist.github.com/JotaSe/8b076d1a1fc119c4264d
 * */
class Chess {
	/**
	 * @const
	 * */
	readonly xPatron:Array<number>= [2, 1, -1, -2, -2, -1, 1, 2];
	/**
	 * @const
	 * */
	readonly yPatron:Array<number> = [1, 2, 2, 1, -1, -2, -2, -1];
	/**
	 * @property
	 * */
	size:number;
	/**
	 * @property
	 * */
	x:number;
	/**
	 * @property
	 * */
	y:number;
	/**
	 * @property
	 * */
	solutions:any = {};
	/**
	 * @property
	 * */
	board:number = 0;
	/**
	 *
	 * @param {number} size
	 * @param {int} x - By default position X = 1; like a real chees
	 * @param {int} y - By default position Y = 0; like a real chess
	 * */
	constructor (size:number = 8, x:number = 0, y:number = 0) {
		this.size = size;
		this.board = size * size;
		this.x = Math.min(size, Math.max(0, x));
		this.y = Math.min(size, Math.max(0, y));
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) this.setSolution(x, y, -1);
		}
		this.setSolution(this.x, this.y, 0);
	}
	solve () {
		this.play(this.x, this.y, this.xPatron, this.yPatron, 1);
	}
	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} xAction
	 * @param {number} yAction
	 * @param {number} index
	 * @return boolean
	 * */
	private play (x:number, y:number, xAction:Array<number>, yAction:Array<number>, index:number):boolean {
		if (this.board === index) return true;
		for (let i = 0; i < this.size; i++) {
			if (!this.isValid(x + xAction[i], y + yAction[i])) continue;
			if (this.alreadyUsed(x + xAction[i], y + yAction[i])) continue;
			this.setSolution(x, y, index);
			if (this.play(x + xAction[i], y + yAction[i], xAction, yAction, index+1)) return true;
			else this.setSolution(x, y, -1);
		}
		return false;
	}
	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} index
	 * @return void
	 * */
	setSolution (x:number, y:number, index:number):void {
		if (!this.solutions.hasOwnProperty(x)) this.solutions[x] = {};
		this.solutions[x][y] = index;
	}
	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return number - Iteration index
	 * */
	getSolution (x:number, y:number):number {
		if (this.solutions.hasOwnProperty(x)) return this.solutions[x][y];
		return undefined;
	}
	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return boolean
	 * */
	isValid(x:number, y:number):boolean {
		return x >= 0 && x < this.size && y >= 0 && y < this.size;
	}
	/**
	 *
	 * @param {number} x
	 * @param {number} y
	 * @return boolean
	 * */
	alreadyUsed (x:number, y:number):boolean {
		return this.getSolution(x, y) !== -1
	}
	/**
	 * @return object
	 * */
	getSolutions ():Object {
		let solutions:any = {};
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) solutions[this.getSolution(x, y)] = {x:x,y:y};
		}
		return solutions;
	}
	/**
	 * @return object
	 * */
	getSolutionString ():string {
		let board:string = '';
		for (let x = 0; x < this.size; x++) {
			let row = [];
			for (let y = 0; y < this.size; y++) {
				let index = this.getSolution(x, y).toString();
				if (index.length === 1) index = ' ' + index;
				row.push ( index );
			}
			board += row.join('    ') + "\n";
		}
		return board;
	}
}