import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { personajeJugador } from '../helpers/Colores';

import { useSocket } from '../hooks/useSocket';
import { types } from '../types/types';
// import { types } from '../types/types';
import { GameContext } from './game/GameContext';
import { PartyContext } from './game/PartyContext';
// import { PartyContext } from './game/PartyContext';
 

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    
    const { gameRoom } = useContext(GameContext);
    const { online } = gameRoom;
    // const { dispatch } = useContext(PartyContext);
    const { socket, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { dispatch } = useContext(PartyContext);

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
                type: types.usuariosCargados,
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