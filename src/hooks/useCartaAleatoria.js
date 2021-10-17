import { useContext } from "react";
import { PartyContext } from "../context/game/PartyContext";
import WeightedList from 'js-weighted-list';

export const useCartaAleatoria = () => {

    const {partyState} = useContext(PartyContext);
    const {tarjetas} = partyState;
    

    const elegirCarta = (cantidad) => { //Hacer un arreglo con todas las cartas disponibles
        let contador = 0;
        let cartas = [];
        while(contador < cantidad){
            contador++;
            let cartaElegida = cartaAleatoria();  //guarda el valor de la carta elegida

            tarjetas.map(tarjeta => { 
                if(tarjeta.nombre === cartaElegida[0]){ // agrega categoria a la lista ssi la cantidad de tarjetas es mayor a 0
                    cartas = [...cartas, tarjeta];
                }
                return 1;
            });
        }

        return cartas;
    }

    const cartaAleatoria = () => {
        let wl = new WeightedList(); //Crea una lista ponderada 
        for(let i=0; i<tarjetas.length; i++){
            wl.push([tarjetas[i].nombre, tarjetas[i].cantidad]);
        }
        const carta = wl.peek();
        return carta; // ['Axolote']
    }

    return {
        elegirCarta,
    }

}