/**
 *
 * */
class Calendar {
	readonly days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
	readonly REGEXP_TIME:RegExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
	/**
	 * CSS classes
	 * */
	readonly classes = {
		container   :'calendar',
		heading     :'calendar-header',
		body        :'calendar-body',
		col         :'col',
		hours       :'col time',
		cell        :'cell',
		cellActive  :'active',
		cellUsed    :'used',
		time        :'cell'
	};
	/**
	 *
	 * */
	timeCells:Array<string> = [];
	/**
	 *
	 * */
	data:any = {};
	/**
	 * Default options
	 * */
	options:any = {
		step    : 30,
		start   : '08:00',
		end     : '19:30',
		headers : []
	};
	/**
	 * @param {object} data
	 * @param {object} options
	 * */
	constructor (data:any, options?:{}) {

		for (let option in options) {
			if (this.options.hasOwnProperty(option)
				&& typeof this.options[option] === typeof options[option]) this.options[option] = options[option];
		}

		for (let day in data) {
			for (let task  of data[day]) {
				this.setTask (task, day, task.hora_inicio, task.hora_termino);
			}
		}

		//this.data = data;
		this.timeCells = this.series(
			this.options.step,
			this.options.start,
			this.options.end
		);
	}
	/**
	 * Create a new task
	 * @param {object} task - All task information
	 * @param {string} day
	 * @param {string} start
	 * @param {string} end
	 * */
	setTask (task:any, day:string, start:string, end?:string) {
		console.log( 'serie_time:', [start, end] );

		if (start !== undefined && end !== undefined) {
			let serie = this.series(30, start, end);
			for (let i = 0; i < serie.length; i++) {
				let time = serie[i];
				this.data[ this.createId(day, time) ] = {
					label:  i == 0 ? task.nombre : ''
				};
			}
		}
	}
	/**
	 * @param {HTMLElement} htmlContainer
	 * @return void
	 * */
	draw (htmlContainer:HTMLElement):void {
		//
		let htmlCalendar = document.createElement('div');
		htmlCalendar.className = this.classes.container;

		//
		let heading = document.createElement('div');
		heading.className = this.classes.heading;

		// draw header
		let prev = document.createElement('div');
		prev.className = 'col prev';
		prev.appendChild(document.createTextNode('\u00ab'));
		heading.appendChild(prev);
		// draw days names
		for (let i = 0; i < this.days.length; i++) {
			let day = this.days[i];
			if (this.options.headers) {
				day = this.options.headers[i];
			}

			let header = document.createElement('div');
			header.className = 'col';

			header.appendChild( document.createTextNode(day) );
			heading.appendChild(header);
		}

		let next = document.createElement('div');
		next.className = 'col next';
		next.appendChild(document.createTextNode('\u00bb'));
		heading.appendChild(next);

		//
		let body = document.createElement('div');
		body.className = this.classes.body;

		//
		let hours = document.createElement('div');
		hours.className = this.classes.hours;

		//
		for (let day of this.days) {
			let col = document.createElement('div');
			col.className = this.classes.col;
			for (let time of this.timeCells) {
				let id = this.createId(day, time);
				let cell = document.createElement('div');
				cell.className = this.classes.cell;
				cell.id = id;

				if (this.data.hasOwnProperty(id)) {
					cell.className += ' ' + this.classes.cellUsed;
					let text = document.createElement('span');
					if (this.data[id].label != '') {
						let edit = document.createElement('a');
						edit.href= '#';
						edit.className = 'edit';
						cell.appendChild(edit);
						text.appendChild(document.createTextNode( this.data[id].label ));
						cell.appendChild(text);

						let a = document.createElement('a');
						a.href= '#';
						a.className = 'comment';
						cell.appendChild(a);

					}
				}
				else {
					let plus = document.createElement('a');
					plus.href= '#';
					plus.className = 'plus';
					cell.appendChild(plus);
				}

				col.appendChild(cell);
			}
			body.appendChild(col);
		}

		// time cells
		for (let time of this.timeCells) {
			let cell = document.createElement('div');
			cell.className = this.classes.time;
			cell.appendChild(document.createTextNode( time ));
			hours.appendChild(cell);
		}

		body.insertBefore(hours, body.firstChild);
		body.appendChild(hours.cloneNode(true));

		htmlCalendar.appendChild(heading);
		htmlCalendar.appendChild(body);
		htmlContainer.appendChild(htmlCalendar);
	}
	/**
	 * @param {integer} step
	 * @param {string} startTime
	 * @param {string} endTime
	 * @return array
	 * */
	series (step:number = 0, startTime?:any, endTime?:any):Array<string> {
		let results = [];
		startTime = new Date(this.timeToUnix(startTime));
		if (endTime !== undefined) endTime = new Date(this.timeToUnix(endTime));
		else endTime = false;
		while (startTime.getDate() == 1) {
			// toLocaleTimeString() no funciona "bien" en safari osx
			results.push(startTime.toLocaleTimeString('en-US', {
				hour12  : false,
				hour    : "numeric",
				minute  : "numeric"
			}));
			startTime.setMinutes(startTime.getMinutes() + step);
			if (endTime !== false && startTime.getTime() > endTime.getTime()) break;
		}
		return results;
	}
	/**
	 * @param {string} time
	 * @return number
	 * */
	timeToUnix (time:string):number {
		if (this.REGEXP_TIME.test(time)) {
			let date = new Date(1970, 0, 1, 0, 0, 0, 0);
			let match: Array<string> = time.match(this.REGEXP_TIME);
			date.setHours(Number(match[1]));
			date.setMinutes(Number(match[2]));
			return date.getTime();
		}
		return new Date(1970, 0, 1, 0, 0, 0, 0).getTime();
	}
	/**
	 * @param {string} day
	 * @param {string} time
	 * @return string
	 * */
	createId (day:string, time) {
		return '_cell_' + day + '_' + this.timeToUnix(time)
	}

}