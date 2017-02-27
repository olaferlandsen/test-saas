/**
* @constructor
* */
var Juego = (function () {
    /**
     *
     * */
    function Juego(nombre, cartasDelMazo) {
        this.cartas = [];
        this.jugadores = [];
        this.nombre = nombre;
        this.generarCartas(cartasDelMazo);
        this.barajar();
    }
    /**
     *
     * */
    Juego.prototype.agregarJugador = function (id, nombre, cartas) {
        if (cartas === void 0) { cartas = 0; }
        var porcion = this.cartas.slice(0, cartas);
        this.cartas = this.cartas.slice(cartas);
        this.barajar();
        return this.jugadores[id] = new Juego.Jugador(id, nombre, porcion, this);
    };
    /**
     *
     * */
    Juego.prototype.expulsarJugador = function (id) {
        this.cartas = this.cartas.concat(this.jugador(id).cartas);
        delete this.jugadores[id];
    };
    /**
     *
     * */
    Juego.prototype.jugador = function (id) {
        return this.jugadores[id];
    };
    /**
     *
     * */
    Juego.prototype.generarCartas = function (numeroDeCartas) {
        // eliminamos cartas anteriores
        this.cartas = [];
        // generamos nuevo mazo de cartas
        var nombres = ['Agua', 'Tierra', 'Fuego'];
        for (var i = 0; i < numeroDeCartas; i++) {
            this.cartas.push(new Juego.Carta(i, nombres[(Math.floor(Math.random() * 3) + 1)]));
        }
    };
    /**
     *
     * */
    Juego.prototype.barajar = function () {
        var currentIndex = this.cartas.length, tmp, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            tmp = this.cartas[currentIndex];
            this.cartas[currentIndex] = this.cartas[randomIndex];
            this.cartas[randomIndex] = tmp;
        }
    };
    /**
     *
     * */
    Juego.prototype.tomarCartas = function (numero) {
        this.barajar();
        var cartas = this.cartas.slice(0, numero);
        this.cartas = this.cartas.slice(numero);
        return cartas;
    };
    /**
     *
     * */
    Juego.prototype.devolverCarta = function (carta) {
        this.cartas.push(carta);
        this.barajar();
    };
    return Juego;
}());
var Juego;
(function (Juego) {
    var Jugador = (function () {
        /**
         *
         * */
        function Jugador(id, nombre, cartas, instance) {
            this.cartas = [];
            this.id = id;
            this.nombre = nombre;
            this.cartas = cartas;
            this.instance = instance;
        }
        /**
         *
         * */
        Jugador.prototype.darCartaAJuagador = function (objetivo) {
            return this.instance.jugador(objetivo).quitarCartaAJugador(this.id);
        };
        /**
         *
         * */
        Jugador.prototype.quitarCartaAJugador = function (objetivo) {
            if (this.instance.jugador(objetivo).contarCartas()) {
                var carta = this.instance.jugador(objetivo).cartas[0];
                this.instance.jugador(objetivo).cartas = this.instance.jugador(objetivo).cartas.slice(1);
                this.cartas.push(carta);
            }
        };
        /**
         *
         * */
        Jugador.prototype.tomarCartaDelMazo = function () {
            this.instance.barajar();
            var cartas = this.instance.tomarCartas(1);
            this.cartas = this.cartas.concat(cartas);
        };
        /**
         *
         * */
        Jugador.prototype.obtenerId = function () {
            return this.id;
        };
        /**
         *
         * */
        Jugador.prototype.obtenerNombre = function () {
            return this.nombre;
        };
        /**
         *
         * */
        Jugador.prototype.contarCartas = function () {
            return this.cartas.length;
        };
        /**
         *
         * */
        Jugador.prototype.mostrarCartas = function () {
            return this.cartas;
        };
        return Jugador;
    }());
    Juego.Jugador = Jugador;
    var Carta = (function () {
        function Carta(id, nombre) {
            this.id = id;
            this.nombre = nombre;
        }
        return Carta;
    }());
    Juego.Carta = Carta;
})(Juego || (Juego = {}));
var juego = new Juego('Demostración', 30);
juego.agregarJugador(1, "Pedro", 5);
juego.agregarJugador(2, "Juan", 5);
juego.agregarJugador(3, "Diego", 5);
juego.jugador(1).darCartaAJuagador(2);
juego.jugador(3).tomarCartaDelMazo();
