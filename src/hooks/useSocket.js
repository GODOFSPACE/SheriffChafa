import { useCallback, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { GameContext } from '../context/game/GameContext';


export const useSocket = ( serverPath ) => {
    
    const [socket, setSocket] = useState(null);
    
    const { gameRoom } = useContext(GameContext);
    const {sala, jugador} = gameRoom;

    const conectarSocket = useCallback( () => {


        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'sala': sala,
                'jugadorId': jugador?.id
            }
        });
        setSocket( socketTemp );

    }, [sala, serverPath]);

    useEffect(() => {
        if(socket !== null && jugador !== null){
            socket?.emit('jugador', jugador);
        }
    }, [jugador, socket]);

    
    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    }, [ socket ]);

    return {
        socket,
        conectarSocket,
        desconectarSocket
    }
}