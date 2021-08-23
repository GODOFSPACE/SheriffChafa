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
                ready: true,
                vendedores:[],
                revision: [],
                revisando: null,
                soborno: -1,

            }

        case types.elegirSheriff:
            return{
                ...state,
                sheriff: { id: action.payload.id, numero: action.payload.numero, dinero: 0}
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
            const comprobar = (state.usuario.id === action.payload.id) || (state.sheriff.id === state.usuario.id);
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

        case types.CambiarDineroSheriff:
            return{
                ...state,
                sheriff: {...state.sheriff, dinero: state.sheriff.dinero + action.payload}
            }

        case types.CambiarReady:
            return{
                ...state,
                ready: action.payload
            }
        
        case types.ReiniciarTurno:
            const auxCatrin = state.jugadores.filter(player => player.id === state.sheriff.id)[0];
            auxCatrin.personaje.dinero += state.sheriff.dinero;
            const auxRonda = state.ronda === (state.jugadores.length * 2) ? -1 : state.ronda + 1;
            return{
                ...state,
                jugadores: [...state.vendedores, auxCatrin ],
                revision: [],
                vendedores: [],
                ready: action.payload,
                revisando: null,
                soborno: -1,
                ronda: auxRonda,
            }

        default:
            return state;
    }
}
