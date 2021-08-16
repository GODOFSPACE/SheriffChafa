
let personaje= [
    {jugador:'Jugador1' ,color: 'Rojo', hexa: '', nombre: 'Tamalero', deck: [], mercancia: [], declaracion:'', dinero: 150, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador2' ,color: 'Azul', hexa: '', nombre: 'Panadero', deck: [], mercancia: [], declaracion:'', dinero: 150, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador3' ,color: 'Amarillo', hexa: '', nombre: 'Pinatero', deck: [], mercancia: [], declaracion:'', dinero: 150, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador4' ,color: 'Verde', hexa: '', nombre: 'Aguacatera', deck: [], mercancia: [], declaracion:'', dinero: 150, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador5' ,color: 'Morado', hexa: '', nombre: 'Creeper', deck: [], mercancia: [], declaracion:'', dinero: 150, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}},
    {jugador:'Jugador6' ,color: 'Naranja', hexa: '', nombre: 'Zombie', deck: [], mercancia: [], declaracion:'', dinero: 150, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, ilegales: 0}}
    ];

let contador = 0;
export const personajeJugador = () => {
    contador++;
    const aux = personaje.filter(personaje => personaje.jugador === `Jugador${contador}`)[0];
    personaje = personaje.filter(personaje => personaje.jugador !== `Jugador${contador}`);
    return aux;
}
