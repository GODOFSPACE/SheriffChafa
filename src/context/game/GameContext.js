import React, {createContext, useContext, useEffect, useState} from 'react';
import { UsuarioContext } from '../UsuariosContext';
export const GameContext = createContext();

export const GameProvider = ( {children} ) => {

    const {jugador} = useContext(UsuarioContext)
    
    const [gameRoom, setgameRoom] = useState({
        sala: '',
        online: false,
        jugador: null
    });

    const CrearGame = ( sala ) => {
        setgameRoom({
            ...gameRoom,
            sala: sala,
            online: true,
            jugador: null
        });
    }

    useEffect(() => {
        if(jugador.id !== ''){
           setgameRoom({
                sala: jugador.sala,
                online:true,
                jugador: jugador
            })
        }
    }, [jugador]);

    return(
        <GameContext.Provider value={{
            gameRoom,
            CrearGame,
        }}
        >
            { children }
        </GameContext.Provider>
    );
}