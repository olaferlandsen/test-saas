/**
* @constructor
* */
class Juego {
	cartas:Array<Juego.Carta> = [];
	nombre: string;
	jugadores: {};
	/**
	 *
	 * */
	constructor(nombre: string, cartasDelMazo?: number) {
		this.jugadores = [];
		this.nombre = nombre;
		this.generarCartas(cartasDelMazo);
		this.barajar();
	}
	/**
	 *
	 * */
	agregarJugador(id: number, nombre: string, cartas: number = 0) {
		let porcion = this.cartas.slice(0, cartas);
		this.cartas = this.cartas.slice(cartas);
		this.barajar();
		return this.jugadores[id] = new Juego.Jugador(
			id,
			nombre,
			porcion,
			this
		);
	}
	/**
	 *
	 * */
	expulsarJugador (id:number) {
		this.cartas = this.cartas.concat(this.jugador(id).cartas);
		delete this.jugadores[id];
	}
	/**
	 *
	 * */
	jugador(id: number):Juego.Jugador {
		return this.jugadores [id];
	}
	/**
	 *
	 * */
	generarCartas (numeroDeCartas:number):void {
		// eliminamos cartas anteriores
		this.cartas = [];
		// generamos nuevo mazo de cartas
		let nombres = ['Agua', 'Tierra', 'Fuego'];
		for (let i = 0; i < numeroDeCartas; i++) {
			this.cartas.push(new Juego.Carta(
				i, nombres[(Math.floor(Math.random() * 3) + 1)]
			));
		}
	}
	/**
	 *
	 * */
	barajar ():void {
		let currentIndex = this.cartas.length,
			tmp,
			randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			tmp = this.cartas[currentIndex];
			this.cartas[currentIndex] = this.cartas[randomIndex];
			this.cartas[randomIndex] = tmp;
		}
	}
	/**
	 *
	 * */
	tomarCartas (numero:number):Juego.Carta[] {
		this.barajar();
		let cartas = this.cartas.slice(0, numero);
		this.cartas = this.cartas.slice(numero);
		return cartas;
	}
	/**
	 *
	 * */
	devolverCarta (carta:Juego.Carta) {
		this.cartas.push(carta);
		this.barajar();
	}
	/**
	 *
	 * */
}
module Juego {
	export class Jugador {
		id: number;
		nombre: string;
		cartas:Array<Juego.Carta> = [];
		instance:Juego;
		/**
		 *
		 * */
		constructor(id: number, nombre: string, cartas: Array<Juego.Carta>, instance:Juego) {
			this.id = id;
			this.nombre = nombre;
			this.cartas = cartas;
			this.instance = instance;
		}
		/**
		 *
		 * */
		darCartaAJuagador(objetivo: number) {
			return this.instance.jugador(objetivo).quitarCartaAJugador(this.id);
		}
		/**
		 *
		 * */
		quitarCartaAJugador(objetivo: number) {
			if (this.instance.jugador(objetivo).contarCartas()) {
				let carta = this.instance.jugador(objetivo).cartas[0];
				this.instance.jugador(objetivo).cartas = this.instance.jugador(objetivo).cartas.slice(1);
				this.cartas.push(carta);
			}
		}
		/**
		 *
		 * */
		tomarCartaDelMazo () {
			this.instance.barajar();
			let cartas = this.instance.tomarCartas(1);
			this.cartas = this.cartas.concat(cartas);
		}
		/**
		 *
		 * */
		obtenerId() {
			return this.id;
		}
		/**
		 *
		 * */
		obtenerNombre(): string {
			return this.nombre;
		}
		/**
		 *
		 * */
		contarCartas(): number {
			return this.cartas.length;
		}
		/**
		 *
		 * */
		mostrarCartas () {
			return this.cartas;
		}
	}
	export class Carta {
		id:number;
		nombre:string;
		constructor (id:number, nombre:string) {
			this.id = id;
			this.nombre = nombre;
		}
	}
}

let juego = new Juego('Demostración', 30);
juego.agregarJugador(1, "Pedro", 5);
juego.agregarJugador(2, "Juan", 5);
juego.agregarJugador(3, "Diego", 5);
juego.jugador(1).darCartaAJuagador( 2 );
juego.jugador(3).tomarCartaDelMazo();
