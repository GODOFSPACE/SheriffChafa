var dineroJugadores = [];
export const guardarJugadores = (jugadores) => {
    jugadores.map(player => {
        return dineroJugadores = [...dineroJugadores, {id: player.id, nombre: player.nombre, personaje: player.personaje.nombre, dinero: player.personaje.dinero, ventas: player.personaje.ventas}]
    }
    );
    contarVentas();
}

const contarVentas = () => {
    for(let i=0; i<dineroJugadores.length; i++){
        dineroJugadores[i].dinero += sumarVentas(dineroJugadores[i].ventas);
    }
}

const sumarVentas = (ventas) => {
    return 2*ventas.pan + 3*(ventas.tamales + ventas.aguacate) + 4*ventas.carnitas + 6*ventas.tequila + 7*ventas.axolote + 8*ventas.petardos +9*ventas.machete;
}

export const retornarPlayer = () => {
    return dineroJugadores;
}

export const calcularBonif = () => {
    const carnitasMax = dineroJugadores.sort((a,b)=>a.ventas.carnitas-b.ventas.carnitas).reverse()[0];
    const tamalesMax = dineroJugadores.sort((a,b)=>a.ventas.tamales-b.ventas.tamales).reverse()[0];
    const aguacateMax = dineroJugadores.sort((a,b)=>a.ventas.aguacate-b.ventas.aguacate).reverse()[0];
    const panMax = dineroJugadores.sort((a,b)=>a.ventas.pan-b.ventas.pan).reverse()[0];
    const ilegalMax = dineroJugadores.sort((a,b)=>a.ventas.ilegales-b.ventas.ilegales).reverse()[0];
    for(let i=0; i<dineroJugadores.length; i++){
        if(dineroJugadores[i].ventas.tamales === tamalesMax.ventas.tamales)
            dineroJugadores[i].dinero+=15;
        if(dineroJugadores[i].ventas.aguacate === aguacateMax.ventas.aguacate)
            dineroJugadores[i].dinero+=15;
        if(dineroJugadores[i].ventas.pan === panMax.ventas.pan)
            dineroJugadores[i].dinero+=20;
        if(dineroJugadores[i].ventas.carnitas === carnitasMax.ventas.carnitas)
            dineroJugadores[i].dinero+=10;
        if(dineroJugadores[i].ilegales === ilegalMax.ilegales)
            dineroJugadores[i].dinero+=15;
    }
}

export const PanaderoHD = () => {
    let max = dineroJugadores[0].ventas.pan;
    for(let i=1; i<dineroJugadores.length; i++){
        if(dineroJugadores[i].ventas.pan>=max)
            max = dineroJugadores[i].ventas.pan;
    }
    return dineroJugadores.filter(player => player.ventas.pan === max);
}

export const TamaleroHD = () => {
    let max = dineroJugadores[0].ventas.tamales;
    for(let i=1; i<dineroJugadores.length; i++){
        if(dineroJugadores[i].ventas.tamales>=max)
            max = dineroJugadores[i].ventas.tamales;
    }
    return dineroJugadores.filter(player => player.ventas.tamales === max);
}

export const AguacateroHD = () => {
    let max = dineroJugadores[0].ventas.aguacate;
    for(let i=1; i<dineroJugadores.length; i++){
        if(dineroJugadores[i].ventas.aguacate>=max)
            max = dineroJugadores[i].ventas.aguacate;
    }
    return dineroJugadores.filter(player => player.ventas.aguacate === max);
}

export const PinateroHD = () => {
    let max = dineroJugadores[0].ventas.carnitas;
    for(let i=1; i<dineroJugadores.length; i++){
        if(dineroJugadores[i].ventas.carnitas>=max)
            max = dineroJugadores[i].ventas.carnitas;
    }
    return dineroJugadores.filter(player => player.ventas.carnitas === max);
}

export const DelincuenteHD = () => {
    let max = dineroJugadores[0].ventas.ilegales;
    for(let i=1; i<dineroJugadores.length; i++){
        if(dineroJugadores[i].ventas.ilegales>=max)
            max = dineroJugadores[i].ventas.ilegales;
    }
    return dineroJugadores.filter(player => player.ventas.ilegales === max);
}

export const GanadorMaximo = () => {
    return dineroJugadores.sort((a,b)=>a.dinero-b.dinero).reverse();
}