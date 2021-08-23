import React, { useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SelectorPersonaje } from '../onGame/SelectorPersonaje';
import styled from '@emotion/styled';
import { SocketContext } from '../../context/SocketContext';
import { Producto } from '../onGame/Producto';
import { types } from '../../types/types';
import { usePickSheriff } from '../../hooks/usePickSheriff';

const Contenedor = styled.div`
    margin: 0 auto;
    width: 500px;
    height: 500px;
    h1{
        text-align: center;
    }
`;


export const JuicioFinal = ({fase}) => {
    
    const {partyState, dispatch } = useContext(PartyContext);
    const {revision, jugadores, vendedores} = partyState;
    const {socket} = useContext(SocketContext);
    const {SiguienteSheriff} = usePickSheriff();

    const [estado, setEstado] = useState('MostrarJugador');

    const [contador, setContador] = useState(0);

    const [loop, setLoop] = useState(-3);
    const disminuirTiempo = () => {
        setLoop(loop-1);
    }

    const SiguienteJugador = () => {
        if(jugadores.length - 2 > contador){
            setContador(contador+1);
            setEstado('MostrarJugador');
        }
        else if (jugadores.length - 2 === contador){
            
            setEstado('TerminaRevision');
            
            dispatch({
                type: types.ReiniciarTurno,
                payload: false
            });
            
            SiguienteSheriff();
            
            fase(0);
        }
    }

    
    useEffect(() => {
        if(loop >= 0){

            let timer = setTimeout(()=> disminuirTiempo() , 3000);

            return () => {
                clearTimeout(timer);
            }
        }

        if(loop === -1 ) {
            SiguienteJugador();
        }

    }, [loop]);


    
    //Preparar para revision de mercancia
    useEffect(() => {
        if(jugadores.length - 1 === revision.length){
            socket.emit('evaluar-jugador', revision[contador]);
        }
    }, [jugadores, revision, contador]);

    useEffect(() => {
        if(vendedores.length > 0){
            setLoop(revision[contador].personaje.mercancia.length - 1);
            setEstado('MostrarCartas');
        }
    }, [vendedores]);


    switch(estado) {
        case 'MostrarJugador':
            return (
                <Contenedor>
                    <h1> Enjuiciando a: {revision[contador].nombre} </h1>
                    <SelectorPersonaje key = {shortid()} nombre = {revision[contador].personaje.nombre} />
                </Contenedor>
            )
        
        case 'MostrarCartas':
            return (
                <Producto nombre={revision[contador].personaje.mercancia[loop >= 0 ? loop : 0].nombre}/>
            )

        case 'TerminaRevision':
            return(
                <h1>Se revisaron a todos los jugadores</h1>
            )
        default: 
            return(
                <h1>Hubo un error</h1>
            )
    }
}
