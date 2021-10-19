import React, { useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { guardarJugadores, 
        retornarPlayer, 
        PanaderoHD,
        TamaleroHD,
        AguacateroHD,
        PinateroHD,
        GanadorMaximo,
        DelincuenteHD,
        calcularBonif
    } from '../../helpers/Recompensas';
import { SelectorPersonaje } from '../onGame/SelectorPersonaje';
import styled from '@emotion/styled';

const Moneda = styled.div`
    font-weight: 900;
    font-size: 10rem;
    span{
        margin-top: 15rem;
        width: 25rem;
        height: 25rem;
        border-radius: 20rem;
        display: inline-flex;
        color: #212121;
        font-weight: 900;
        font-size: 9rem;
        align-items: center;
        justify-content: center;
        background-color: #E3CE0D;
        border: 1rem solid #CCB90D;
    }
`;

export const Ganador = () => {

    const {partyState} = useContext(PartyContext);
    const {jugadores} = partyState;

    const [fase, setFase] = useState(0)
    //TIMER
    const [loop, setLoop] = useState(-3);
    const disminuirTiempo = () => {
    setLoop(loop-1);
    }

    useEffect(() =>{
        guardarJugadores(jugadores);
        setLoop(5);
    },[]);

    useEffect(() =>{
        setLoop(5);
    },[fase])

    useEffect(() => {
        if(loop >= 0){

            let timer = setTimeout(()=> disminuirTiempo() , 1000);

            return () => {
                clearTimeout(timer);
            }
        }

        if(loop === -1 ) {
            if(fase === 2) // calcular Bonificacion
                calcularBonif();
            setFase(fase +1);

        }
        
    }, [loop]);
    console.log(retornarPlayer());

    switch(fase){
        case 0 :
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>Este es el dinero total de las ventas</h1>
                        {retornarPlayer().map(player => (
                            <div key= {player.id} className="col-4 p-5">
                                <h2>{player.nombre}</h2>
                                <h2>{player.dinero}</h2>
                                <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                            </div>
                        ))}
                    </div>
                </div>
            )
        case 1:
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>El señor de los panes es:</h1>
                        {PanaderoHD().map(player => (
                            <div key= {player.id} className="col-4 p-5">
                                <h2>{player.nombre}</h2>
                                <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                            </div>
                        ))}
                        <Moneda className="col-4 p-5">
                            + <span>$20</span>
                        </Moneda>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>El señor de los tamales es:</h1>
                        {TamaleroHD().map(player => (
                            <div key= {player.id} className="col-4 p-5">
                                <h2>{player.nombre}</h2>
                                <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                            </div>
                        ))}
                        <Moneda className="col-4 p-5">
                            + <span>$15</span>
                        </Moneda>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>El señor de los aguacates es:</h1>
                        {AguacateroHD().map(player => (
                            <div key= {player.id} className="col-4 p-5">
                                <h2>{player.nombre}</h2>
                                <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                            </div>
                        ))}
                        <Moneda className="col-4 p-5">
                            + <span>$15</span>
                        </Moneda>
                    </div>
                </div>
            )
        case 4:
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>El wey raro fan de viva piñata:</h1>
                        {PinateroHD().map(player => (
                            <div key= {player.id} className="col-4 p-5">
                                <h2>{player.nombre}</h2>
                                <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                            </div>
                        ))}
                        <Moneda className="col-4 p-5">
                            + <span>$10</span>
                        </Moneda>
                    </div>
                </div>
            )

        case 5:
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <h1>El candidato a ser el nuevo Chapo es:</h1>
                        {DelincuenteHD().map(player => (
                            <div key= {player.id} className="col-4 p-5">
                                <h2>{player.nombre}</h2>
                                <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                            </div>
                        ))}
                    <Moneda className="col-4 p-5">
                        + <span>$15</span>
                    </Moneda>
                    </div>
                </div>
            )
        default:
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <h1>El ganador es:</h1>
                            <h2>{GanadorMaximo()[0].nombre}:    ${GanadorMaximo()[0].dinero}</h2>
                            <SelectorPersonaje key={GanadorMaximo()[0].id} nombre={GanadorMaximo()[0].personaje} />
                        </div>
                        <div className="col-6">
                            <div className="row justify-content-center">
                                <h2>Tabla de posiciones</h2>
                                {
                                GanadorMaximo().map(player => {                           
                                    return(
                                    <div key= {player.id} className="col-4 p-4">
                                        <h2>{player.nombre}</h2>
                                        <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                                        <h2>${player.dinero}</h2>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )

    }

}
