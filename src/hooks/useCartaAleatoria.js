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

        tarjetas.map(tarjeta => { 
            if(tarjeta.cantidad > 0){ // agrega categoria a la lista ssi la cantidad de tarjetas es mayor a 0
                wl.push([tarjeta.nombre, tarjeta.cantidad]);
            }
            return 1;
        });

        const carta = wl.peek();

        tarjetas.map(tarjeta => {   /*Se mamo pinche juegazo*/
            if(tarjeta.nombre === carta[0]){ //disminuye la cantidad de tarjetas hasta 0
                tarjeta.cantidad--;
                if(tarjeta.cantidad === 0) {//si la cantidad es 0 la marca vacía
                    tarjeta.vacio=true;
                }
            }
            return 1;
        });

        return carta; // ['Axolote']
    }

    return {
        elegirCarta,
    }

}