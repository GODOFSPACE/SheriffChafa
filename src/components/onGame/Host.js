import React, { useContext, useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';
import { SelectorSheriff } from '../Host/SelectorSheriff';
import { Contador } from '../Host/Contador';
import { ImprimirJugadores } from '../Host/ImprimirJugadores';
import { SocketContext } from '../../context/SocketContext';
import { PartyContext } from '../../context/game/PartyContext';

export const Host = () => {

    const [contador, setContador] = useState(0);
    const [fase, setFase] = useState(0);

    const {socket} = useContext(SocketContext);
    const { partyState } = useContext(PartyContext);
    const{ jugadores, revision } = partyState;


    const siguienteArticulo = () => {
        setFase(fase+1);
    }

    useEffect( () => {
        if(fase === 0)
        {
            let timer = setTimeout(() => siguienteArticulo(), 5000);
            return() =>{
                clearTimeout(timer);
            }
        }

        if(fase === 1)
        {
            let timer = setTimeout(() => siguienteArticulo(), 5000);
            return() =>{
                clearTimeout(timer);
            }
        }
    }, [fase]);

    //Preparar para revision de mercancia
    useEffect(() => {
            if(jugadores.length - 1 === revision.length){
                socket.emit('evaluar-jugador', revision[contador]);
                setContador(contador +1);
            }
    }, [jugadores, revision]);

    

    return (
        <div>
            <Global styles={css`
                html{
                    font-size: 62.5%;
                    box-sizing: border-box;
                }
                *, *:before, *:after {
                    box-sizing: inherit;
                }
                body{
                    height: 100vh;
                    background-image: linear-gradient(0, #ff438e 0, #ff2d8b 25%, #f50087 50%, #e70083 75%, #da0081 100%);
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.5rem;
                    color: white;
                }

                a {
                    text-decoration: none;
                    color: inherit;
                }

            `}/>
            {fase === 0 &&
                <SelectorSheriff />
            }
            {fase === 1 &&
                <Contador />
            }
            {fase === 2 &&
                <ImprimirJugadores />
            }
            
        </div>
    )
}
