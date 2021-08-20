import React, { useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SelectorPersonaje } from '../onGame/SelectorPersonaje';
import styled from '@emotion/styled';
import { SocketContext } from '../../context/SocketContext';
import { Producto } from '../onGame/Producto';

const Contenedor = styled.div`
    margin: 0 auto;
    width: 500px;
    height: 500px;
    h1{
        text-align: center;
    }
`;


export const JuicioFinal = () => {
    
    const {partyState } = useContext(PartyContext);
    const {revision, jugadores, vendedores} = partyState;
    const {socket} = useContext(SocketContext);

    const [estado, setEstado] = useState('MostrarJugador');

    const [contador, setContador] = useState(0);

    const [loop, setLoop] = useState(-1);
    const disminuirTiempo = () => {
        setLoop(loop-1);
    }

    
    useEffect(() => {
        if(loop > 0){

            let timer = setTimeout(()=> disminuirTiempo() , 5000);

            return () => {
                clearTimeout(timer);
            }
        }

        if(loop === 0 ) {
            console.log('Listo PRRO');
        }

    }, [loop]);


    
    //Preparar para revision de mercancia
    useEffect(() => {
        if(jugadores.length - 1 === revision.length){
            socket.emit('evaluar-jugador', revision[contador]);
        }
    }, [jugadores, revision]);

    useEffect(() => {
        if(vendedores !== []){
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
                <Producto nombre={revision[contador].personaje.mercancia[loop].nombre}/>
            )
    }
}
