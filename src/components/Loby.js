import React, { useContext } from 'react';
import { MainPage } from './MainPage';
import styled from '@emotion/styled';
import { GameContext } from '../context/game/GameContext';
import { PartyContext } from '../context/game/PartyContext';
import { UsuariosConectados } from './UsuariosConectados';
import { SocketContext } from '../context/SocketContext';
import { usePickSheriff } from '../hooks/usePickSheriff';
import { useHistory } from 'react-router-dom';


const Jugadores = styled.div`
    width: 80%;
    height: 55rem;
    border-radius: 3rem;
    background-color: rgba(0,0,0,0.5);
    margin: 0 auto;
    text-align: center;
    
    span {
        display: block;
        font-weight: 900;
        font-size: 50px;
        transform: translateY(-3.5rem);
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);
    }
`;

const TextoCodigo = styled.div`
    font-weight: 900;
    font-size: 4rem;
    text-align: center;
    margin-top: 3rem;
`;

const BotonNext = styled.button`
    margin-right: 6rem;
    border-radius: 25px;
    width: auto;
    padding: 1rem 2rem;

    background: linear-gradient(183deg, rgba(252,103,103,1) 0%, rgba(236,0,140,1) 100%);
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 4rem;
    color: white;
    text-align: center;
    border: none;

    :hover{
        cursor: pointer;
    }
`;


export const Loby = () => {
    
    const { gameRoom } = useContext( GameContext );
    const { partyState } = useContext( PartyContext );
    const {socket} = useContext(SocketContext);
    const {ElegirSheriff} = usePickSheriff();

    const { sala } = gameRoom;

    const history = useHistory();

    const onClick = () => {
        //Elegir el sheriff de la partida
        ElegirSheriff();



        //Manda los personajes a los jugadores
        socket.emit('iniciar-partida', partyState.jugadores);


        history.push('/host');
    }

    return (
        <MainPage>
            <Jugadores>
            <div className="row">
                <span>Jugadores </span>
                {/* Usuarios conectados */}
                {
                    partyState.jugadores
                        .map( ( jugador ) => (
                            <UsuariosConectados 
                                key = {jugador.id}
                                jugador = { jugador }
                            />
                        ))
                }
            </div>

            </Jugadores>
                <div className="row justify-content-around mt-4">
                    <TextoCodigo className="col-3">
                        Codigo de la sala:
                        {sala}
                    </TextoCodigo>
                    <BotonNext className="col-3" onClick={onClick}>
                        Jugar
                    </BotonNext>
                </div> 
        </MainPage>
    )
}
