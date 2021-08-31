
let personaje= [
    {numJugador:1 ,color: 'Rojo', hexa: '', nombre: 'Tamalero', deck: [], mercancia: [], declaracion:'', dinero: 50, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, tequila: 0, axolote: 0, machete: 0, petardos: 0}},
    {numJugador:2 ,color: 'Azul', hexa: '', nombre: 'Panadero', deck: [], mercancia: [], declaracion:'', dinero: 50, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, tequila: 0, axolote: 0, machete: 0, petardos: 0}},
    {numJugador:3 ,color: 'Amarillo', hexa: '', nombre: 'Pinatero', deck: [], mercancia: [], declaracion:'', dinero: 50, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, tequila: 0, axolote: 0, machete: 0, petardos: 0}},
    {numJugador:4 ,color: 'Verde', hexa: '', nombre: 'Aguacatera', deck: [], mercancia: [], declaracion:'', dinero: 50, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, tequila: 0, axolote: 0, machete: 0, petardos: 0}},
    {numJugador:5 ,color: 'Morado', hexa: '', nombre: 'Cantinero', deck: [], mercancia: [], declaracion:'', dinero: 50, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, tequila: 0, axolote: 0, machete: 0, petardos: 0}},
    {numJugador:6 ,color: 'Naranja', hexa: '', nombre: 'Axolotera', deck: [], mercancia: [], declaracion:'', dinero: 50, sheriff: false, ventas:{tamales: 0, pan:0, aguacate: 0,  carnitas: 0, tequila: 0, axolote: 0, machete: 0, petardos: 0}}
    ];

let contador = 0;
export const personajeJugador = () => {
    contador++;
    const aux = personaje.filter(personaje => personaje.numJugador === contador)[0];
    personaje = personaje.filter(personaje => personaje.numJugador !== contador);
    return aux;
}
