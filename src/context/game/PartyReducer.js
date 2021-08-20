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
                jugadores: action.payload.jugadores,
                sheriff: action.payload.sheriff,
                ready: true
            }

        case types.elegirSheriff:
            return{
                ...state,
                sheriff: { id: action.payload.id, numero: action.payload.numero }
            }

        case types.refrescarUsuario:
            return{
                ...state,
                usuario: action.payload
            }

        case types.mandarMerca:
            return{
                ...state,
                revision: [ ...state.revision, action.payload ]
            }

        case types.guardarJugadorRevision:
            const comprobar = state.usuario.id === action.payload.id;
            return{
                ...state,
                revisando: action.payload,
                ready: comprobar
            }

        case types.mandarSoborno:
            return{
                ...state,
                soborno: action.payload
            }

        case types.guardarVentas:
            return{
                ...state,
                vendedores: [ ...state.vendedores, action.payload ],
            }

        default:
            return state;
    }
}
