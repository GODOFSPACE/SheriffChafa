import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { personajeJugador } from '../helpers/Colores';

import { useSocket } from '../hooks/useSocket';
import { types } from '../types/types';
import { GameContext } from './game/GameContext';
import { PartyContext } from './game/PartyContext';
import { useCartaAleatoria } from '../hooks/useCartaAleatoria';
import { UsuarioContext } from './UsuariosContext';
import { useCobrarMerca } from '../hooks/useCobrarMerca';


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { gameRoom } = useContext(GameContext);
    const { online } = gameRoom;
    // const { dispatch } = useContext(PartyContext);
    const { socket, conectarSocket, desconectarSocket } = useSocket('https://pe-catrin.herokuapp.com/');
    const { dispatch } = useContext(PartyContext);
    const {elegirCarta} = useCartaAleatoria();
    const { jugador } = useContext(UsuarioContext);
    const {noRevisar, revisarMercancia} = useCobrarMerca();

    //Conectar usuario

    useEffect(() => {
        if ( online ){
            conectarSocket();
        }
    }, [ online, conectarSocket ]);

    useEffect(() => {
        if ( !online){
            desconectarSocket();
        }
    }, [ online, desconectarSocket ]);


    //Escuchar los cambios en los usuarios conectados
    useEffect(() => {

        socket?.on( 'lista-usuarios', (player) => {

            //Asignar personaje al jugador
            player.personaje = personajeJugador();
            //Asignar 6 cartas iniciales al jugador
            player.personaje.deck=elegirCarta(6);

            dispatch({
                type: types.usuariosCargados,
                payload: player
            })

        });

    }, [ socket, dispatch ]);


     //Asignar personajes a todos los usuarios
     useEffect(() => {

        socket?.on( 'obtener-info', ( party ) => {
            
            dispatch({
                type: types.cargarJugador,
                payload: party
            })

            dispatch({
                type: types.refrescarUsuario,
                payload: party.jugadores.filter(player => player.id === jugador.id)[0]
            })

        });

    }, [ socket, dispatch ]);

    //Cambia cartas
    useEffect(() => {

        socket?.on( 'guardar-info-jugador', async ( jugador ) => {

            for( let i = 0; i<jugador.personaje.deck.length; i++ ){
                if(jugador.personaje.deck[i].descartada)
                    jugador.personaje.deck[i] = elegirCarta(1)[0];
                jugador.personaje.mercancia = [];
            }
            await socket.emit('refrescar-info-usuario', jugador );

        });

    }, [ socket ]);

    //Refrescar info del jugador

    useEffect(() => {

        socket?.on( 'guardar-info-usuario', async ( usuario ) => {
            
            if(usuario.id === jugador.id)
                await dispatch({
                    type: types.refrescarUsuario,
                    payload: usuario
                });

        });

    }, [ socket, dispatch ]);


    //Mandar a revision
    useEffect(() => {

        socket?.on( 'mandar-merca', async ( usuario ) => {
            if(jugador.id === ''){
                await dispatch({
                    type: types.mandarMerca,
                    payload: usuario
                })
            }
        });
    }, [ socket, dispatch ]);

    //Revisar mercancia del jugador
    useEffect(() => {

        socket?.on( 'enjuiciar-jugador', async ( usuario ) => {
            await dispatch({
                type: types.guardarJugadorRevision,
                payload: usuario
            })
        });
    }, [ socket, dispatch ]);
    
    
    //Recibir soborno
    useEffect(() => {
        socket?.on( 'recibir-sobrno', async ( {soborno, sheriff} ) => {
            if(soborno > 0 ){
                if(jugador.id === '' || jugador.id === sheriff ){
                    await dispatch({
                        type: types.mandarSoborno,
                        payload: soborno
                    })
                }
            }
        })
    },[socket, dispatch]);

    //Desplegar veredicto XD
    useEffect(() => {
        socket?.on( 'vender-mercancias', ( { examinar, revisando, pago } ) => {

            if( revisando.id === jugador.id){
                dispatch({
                    type: types.CambiarReady,
                    payload: false
                }) 
            }

            if( examinar ){
                revisarMercancia(revisando);
            }

            if( !examinar ){
                noRevisar(revisando, pago);
            }
        });
    }, [ socket ]);

    //Siguiente ronda
    useEffect(() => {
        socket?.on( 'pasar-ronda', async ( party ) => {

            await dispatch({
                type: types.cargarJugador,
                payload: party
            })

            await dispatch({
                type: types.refrescarUsuario,
                payload: party.jugadores.filter(player => player.id === jugador.id)[0]
            })
            

        })
    },[socket, dispatch]);

    // //Eliminar jugador del arreglo
    // useEffect(() => {
    //     socket?.on( 'eliminar-jugador', async ( playerID ) =>{
    //         await dispatch({
    //             type: types.EliminarJugador,
    //             payload: playerID
    //         })
    //     })
    // },[socket, dispatch]); 

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}