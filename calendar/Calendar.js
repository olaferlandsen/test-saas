/**
 *
 * */
var Calendar = (function () {
    /**
     * @param {object} data
     * @param {object} options
     * */
    function Calendar(data, options) {
        this.days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        this.REGEXP_TIME = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
        /**
         * CSS classes
         * */
        this.classes = {
            container: 'calendar',
            heading: 'calendar-header',
            body: 'calendar-body',
            col: 'col',
            hours: 'col time',
            cell: 'cell',
            cellActive: 'active',
            cellUsed: 'used',
            time: 'cell'
        };
        /**
         *
         * */
        this.timeCells = [];
        /**
         *
         * */
        this.data = {};
        /**
         * Default options
         * */
        this.options = {
            step: 30,
            start: '08:00',
            end: '19:30',
            headers: []
        };
        for (var option in options) {
            if (this.options.hasOwnProperty(option)
                && typeof this.options[option] === typeof options[option])
                this.options[option] = options[option];
        }
        for (var day in data) {
            for (var _i = 0, _a = data[day]; _i < _a.length; _i++) {
                var task = _a[_i];
                this.setTask(task, day, task.hora_inicio, task.hora_termino);
            }
        }
        //this.data = data;
        this.timeCells = this.series(this.options.step, this.options.start, this.options.end);
    }
    /**
     * Create a new task
     * @param {object} task - All task information
     * @param {string} day
     * @param {string} start
     * @param {string} end
     * */
    Calendar.prototype.setTask = function (task, day, start, end) {
        console.log('serie_time:', [start, end]);
        if (start !== undefined && end !== undefined) {
            var serie = this.series(30, start, end);
            for (var i = 0; i < serie.length; i++) {
                var time = serie[i];
                this.data[this.createId(day, time)] = {
                    label: i == 0 ? task.nombre : ''
                };
            }
        }
    };
    /**
     * @param {HTMLElement} htmlContainer
     * @return void
     * */
    Calendar.prototype.draw = function (htmlContainer) {
        //
        var htmlCalendar = document.createElement('div');
        htmlCalendar.className = this.classes.container;
        //
        var heading = document.createElement('div');
        heading.className = this.classes.heading;
        // draw header
        var prev = document.createElement('div');
        prev.className = 'col prev';
        prev.appendChild(document.createTextNode('\u00ab'));
        heading.appendChild(prev);
        // draw days names
        for (var i = 0; i < this.days.length; i++) {
            var day = this.days[i];
            if (this.options.headers) {
                day = this.options.headers[i];
            }
            var header = document.createElement('div');
            header.className = 'col';
            header.appendChild(document.createTextNode(day));
            heading.appendChild(header);
        }
        var next = document.createElement('div');
        next.className = 'col next';
        next.appendChild(document.createTextNode('\u00bb'));
        heading.appendChild(next);
        //
        var body = document.createElement('div');
        body.className = this.classes.body;
        //
        var hours = document.createElement('div');
        hours.className = this.classes.hours;
        //
        for (var _i = 0, _a = this.days; _i < _a.length; _i++) {
            var day = _a[_i];
            var col = document.createElement('div');
            col.className = this.classes.col;
            for (var _b = 0, _c = this.timeCells; _b < _c.length; _b++) {
                var time = _c[_b];
                var id = this.createId(day, time);
                var cell = document.createElement('div');
                cell.className = this.classes.cell;
                cell.id = id;
                if (this.data.hasOwnProperty(id)) {
                    cell.className += ' ' + this.classes.cellUsed;
                    var text = document.createElement('span');
                    if (this.data[id].label != '') {
                        var edit = document.createElement('a');
                        edit.href = '#';
                        edit.className = 'edit';
                        cell.appendChild(edit);
                        text.appendChild(document.createTextNode(this.data[id].label));
                        cell.appendChild(text);
                        var a = document.createElement('a');
                        a.href = '#';
                        a.className = 'comment';
                        cell.appendChild(a);
                    }
                }
                else {
                    var plus = document.createElement('a');
                    plus.href = '#';
                    plus.className = 'plus';
                    cell.appendChild(plus);
                }
                col.appendChild(cell);
            }
            body.appendChild(col);
        }
        // time cells
        for (var _d = 0, _e = this.timeCells; _d < _e.length; _d++) {
            var time = _e[_d];
            var cell = document.createElement('div');
            cell.className = this.classes.time;
            cell.appendChild(document.createTextNode(time));
            hours.appendChild(cell);
        }
        body.insertBefore(hours, body.firstChild);
        body.appendChild(hours.cloneNode(true));
        htmlCalendar.appendChild(heading);
        htmlCalendar.appendChild(body);
        htmlContainer.appendChild(htmlCalendar);
    };
    /**
     * @param {integer} step
     * @param {string} startTime
     * @param {string} endTime
     * @return array
     * */
    Calendar.prototype.series = function (step, startTime, endTime) {
        if (step === void 0) { step = 0; }
        var results = [];
        startTime = new Date(this.timeToUnix(startTime));
        if (endTime !== undefined)
            endTime = new Date(this.timeToUnix(endTime));
        else
            endTime = false;
        while (startTime.getDate() == 1) {
            // toLocaleTimeString() no funciona "bien" en safari osx
            results.push(startTime.toLocaleTimeString('en-US', {
                hour12: false,
                hour: "numeric",
                minute: "numeric"
            }));
            startTime.setMinutes(startTime.getMinutes() + step);
            if (endTime !== false && startTime.getTime() > endTime.getTime())
                break;
        }
        return results;
    };
    /**
     * @param {string} time
     * @return number
     * */
    Calendar.prototype.timeToUnix = function (time) {
        if (this.REGEXP_TIME.test(time)) {
            var date = new Date(1970, 0, 1, 0, 0, 0, 0);
            var match = time.match(this.REGEXP_TIME);
            date.setHours(Number(match[1]));
            date.setMinutes(Number(match[2]));
            return date.getTime();
        }
        return new Date(1970, 0, 1, 0, 0, 0, 0).getTime();
    };
    /**
     * @param {string} day
     * @param {string} time
     * @return string
     * */
    Calendar.prototype.createId = function (day, time) {
        return '_cell_' + day + '_' + this.timeToUnix(time);
    };
    return Calendar;
}());
