
let personaje= [
    {jugador:'Jugador1' ,color: 'Rojo', hexa: '', nombre: '', deck: [], mercancia: [], dinero: 150, gestapo: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador2' ,color: 'Azul', hexa: '', nombre: '', deck: [], mercancia: [], dinero: 150, gestapo: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador3' ,color: 'Amarillo', hexa: '', nombre: '', deck: [], mercancia: [], dinero: 150, gestapo: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador4' ,color: 'Verde', hexa: '', nombre: '', deck: [], mercancia: [], dinero: 150, gestapo: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}}
    {jugador:'Jugador5' ,color: 'Verde', hexa: '', nombre: '', deck: [], mercancia: [], dinero: 150, gestapo: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}}
    {jugador:'Jugador6' ,color: 'Verde', hexa: '', nombre: '', deck: [], mercancia: [], dinero: 150, gestapo: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}}
    ];

let contador = 0;
export const personajeJugador = () => {
    contador++;
    const aux = personaje.filter(personaje => personaje.jugador === `Jugador${contador}`);
    personaje = personaje.filter(personaje => personaje.jugador !== `Jugador${contador}`);
    return aux;
}
