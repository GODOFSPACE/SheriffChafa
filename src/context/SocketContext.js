import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { personajeJugador } from '../helpers/Colores';

import { useSocket } from '../hooks/useSocket';
import { types } from '../types/types';
// import { types } from '../types/types';
import { GameContext } from './game/GameContext';
import { PartyContext } from './game/PartyContext';
import { useCartaAleatoria } from '../hooks/useCartaAleatoria';
// import { PartyContext } from './game/PartyContext';


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { gameRoom } = useContext(GameContext);
    const { online } = gameRoom;
    // const { dispatch } = useContext(PartyContext);
    const { socket, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { dispatch } = useContext(PartyContext);
    const {elegirCarta} = useCartaAleatoria();

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

            console.log(elegirCarta(6));
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

        socket?.on( 'obtener-info', (personajes) => {

            dispatch({
                type: types.cargarJugador,
                payload: personajes
            })

        });

    }, [ socket, dispatch ]);


    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}