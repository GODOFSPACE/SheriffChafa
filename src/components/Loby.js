import React, { useContext } from 'react';
import { MainPage } from './MainPage';
import styled from '@emotion/styled';
import { GameContext } from '../context/game/GameContext';
import { PartyContext } from '../context/game/PartyContext';
import { SocketContext } from '../context/SocketContext';
import { usePickSheriff } from '../hooks/usePickSheriff';
import { useHistory } from 'react-router-dom';
import { SelectorPersonaje } from './onGame/SelectorPersonaje';
import Clipboard from 'react-clipboard.js';
import { motion } from 'framer-motion';
import shortid from 'shortid';
import { types } from '../types/types';


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

const Sala = styled.div`
    background-color: #4600D0;
    border-radius: 25px;
    width: auto;
    padding: 1.5rem 2rem 1rem 2rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 4rem;
    color: white;
    text-align: center;
    border: none;

    button{
        background: none;
        font-family: 'Nunito', sans-serif;
        border: none;
        font-weight: 900;
        font-size: 4rem;
        color: white;
        text-align: center;
        :hover{
            cursor: pointer;
        }
    }

    span{
        position: absolute;
        display: block;
        transform: translate(3rem, -4.5rem);
    }
`;

const CartaJugador = styled.div`
    padding: 0;
    margin-bottom: 4rem;
    img{
        width: 30%;
        margin: 0 auto;
    }
    span{
        font-weight: 400;
        font-size: 3rem;
        margin: 0;
    }
`;


export const Loby = () => {
    
    const { gameRoom } = useContext( GameContext );
    const { partyState, dispatch } = useContext( PartyContext );
    const {socket} = useContext(SocketContext);
    const {ElegirSheriff} = usePickSheriff();

    const { sala } = gameRoom;

    const history = useHistory();

    const onClick = () => {
        //Elegir el sheriff de la partida
        ElegirSheriff();

        dispatch({
            type: types.IniciarRonda,
            dispatch: 0
        });

        //Manda los personajes a los jugadores
        socket.emit('iniciar-partida', partyState);

        history.push('/host');
    }

    const regresar = () => {
        history.push('/');
    }

    return (
        <MainPage>
            <Jugadores>
            <div className="row" >
                <span>Jugadores </span>
                {/* Usuarios conectados */}
                {
                    partyState.jugadores
                        .map( ( jugador ) => (
                                <CartaJugador key = {jugador.id} className="col-4">
                                    <motion.div 
                                        key={shortid()}
                                        initial={{ scale: 0 }}
                                        animate={{ rotate: 360, scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20
                                        }} 
                                    >
                                        <span>{jugador.nombre}</span>
                                        <SelectorPersonaje key ={shortid()} nombre={jugador.personaje.nombre}/>
                                    </motion.div>
                                </CartaJugador>
                        ))
                }
            </div>

            </Jugadores>
                <div className="row justify-content-around mt-5">
                    <BotonNext className="col-3" onClick={regresar}>
                        Regresar
                    </BotonNext>
                    <Sala className="col-3">
                        <span>sala</span>
                        {/* <Clipboard data-clipboard-text={sala}> */}
                            {sala}
                        {/* </Clipboard> */}
                    </Sala>
                    {
                        partyState.jugadores.length>2 &&
                        <BotonNext className="col-3" onClick={onClick}>
                            Jugar
                        </BotonNext>
                    }
                    
                </div> 
        </MainPage>
    )
}
