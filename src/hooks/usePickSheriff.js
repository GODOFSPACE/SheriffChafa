import { useContext } from "react";
import { PartyContext } from "../context/game/PartyContext";
import { types } from "../types/types";

export const usePickSheriff = () => {

    const {partyState, dispatch} = useContext(PartyContext);
    const { sheriff, jugadores } = partyState;

    const max = jugadores.length + 1;

    const ElegirSheriff = () => {
        //guarda el id y la posicion del sheriff
        const auxiliar = Math.floor(Math.random() * (max - 1)) + 1;
        const identificador = jugadores.filter(player => player.personaje.numJugador === auxiliar)[0];
        sheriff.id = identificador.id;
        sheriff.numero = auxiliar;

        dispatch({
            type: types.elegirSheriff,
            payload: sheriff
        });
    }

    const SiguienteSheriff = () => {

        if ( sheriff.numero < jugadores.length ){
            const identificador = jugadores.filter(player => player.personaje.numJugador === (sheriff.numero + 1) )[0];
            sheriff.id = identificador.id
            sheriff.numero = sheriff.numero + 1;
            dispatch({
                type: types.elegirSheriff,
                payload: sheriff
            });
        }
        else if( sheriff.numero === jugadores.length ){
            const identificador = jugadores.filter( player => player.personaje.numJugador === 1)[0];
            sheriff.id =  identificador.id;
            sheriff.numero = 1;
            dispatch({
                type: types.elegirSheriff,
                payload: sheriff
            });
        }

        console.log(sheriff);
    }

    return {
        ElegirSheriff,
        SiguienteSheriff
    }

}