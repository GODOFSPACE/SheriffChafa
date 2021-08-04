import { types } from "../../types/types";


export const PartyReducer = ( state, action ) => {
    switch ( action.type ){
        case types.usuariosCargados:
            return {
                ...state,
                jugadores: [ ...state.jugadores, action.payload ]
            }
        default:
            return state;
    }
}
