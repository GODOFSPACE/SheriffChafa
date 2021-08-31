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
        calcularBonif
    } from '../../helpers/Recompensas';
import { SelectorPersonaje } from '../onGame/SelectorPersonaje';

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
                    </div>
                </div>
            )
        case 5:
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4"></div>
                        <h1>El ganador es:</h1>
                        <label>{GanadorMaximo()[0].nombre}</label>
                        <SelectorPersonaje key={GanadorMaximo()[0].id} nombre={GanadorMaximo()[0].personaje} />
                        <label>{GanadorMaximo()[0].dinero}</label>
                    </div>
                    <div className="row justify-content-around">
                        <div className="col-4"></div>
                        <h2>Tabla de posiciones</h2>
                        {
                        GanadorMaximo().map(player => {                           
                            return(
                            <div key= {player.id} className="col-4 p-5">
                                <h2>{player.nombre}</h2>
                                <SelectorPersonaje key={shortid()} nombre={player.personaje} />
                                <h2>{player.dinero}</h2>
                            </div>
                            )
                        })}
                    </div>
                </div>
            )
        default: 
            return(
                <h1>Volver a jugar</h1>
            )

    }

}