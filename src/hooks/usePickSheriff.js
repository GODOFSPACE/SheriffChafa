import { useContext } from "react";
import { PartyContext } from "../context/game/PartyContext";
import { types } from "../types/types";

export const usePickSheriff = () => {

    const {partyState, dispatch} = useContext(PartyContext);
    const {sheriff, jugadores, } = partyState;

    const max = jugadores.length;

    const ElegirSheriff = () => {
        //guarda el id y la posicion del sheriff
        const auxiliar = Math.floor(Math.random() * (max - 0)) + 0;
        sheriff.id = jugadores[auxiliar].id;
        sheriff.numero = auxiliar;

        dispatch({
            type: types.elegirSheriff,
            payload: sheriff
        });
    }

    return {
        ElegirSheriff
    }

}