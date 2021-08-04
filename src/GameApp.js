import React from 'react';
import { GameProvider } from './context/game/GameContext';
import { PartyProvider } from './context/game/PartyContext';
import { SocketProvider } from './context/SocketContext';
import { UsuarioProvider } from './context/UsuariosContext';
import { AppRouter } from './router/AppRouter';
export const GameApp = () => {
    return (
        <UsuarioProvider>
            <PartyProvider>
                <GameProvider>
                    <SocketProvider>
                            <AppRouter />
                    </SocketProvider>
                </GameProvider>
            </PartyProvider>
        </UsuarioProvider>
    );
}