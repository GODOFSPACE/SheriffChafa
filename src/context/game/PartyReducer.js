import { types } from "../../types/types";


export const PartyReducer = ( state, action ) => {
    switch ( action.type ){
        case types.usuariosCargados:
            return {
                ...state,
                jugadores: [ ...state.jugadores, action.payload ]
            }

        case types.cargarJugador:
            return {
                ...state,
                jugadores: action.payload,
                ready: true
            }

        case types.elegirSheriff:
            return{
                ...state,
                sheriff: { id: action.payload.id, numero: action.payload.numero }
            }

        default:
            return state;
    }
}
