import React, { useContext } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SelectorPersonaje } from '../onGame/SelectorPersonaje';

export const ImprimirJugadores = () => {
    const {partyState} = useContext(PartyContext);
    const { revision} = partyState;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1>Jugadores Listos:</h1>
                {
                    revision.map(player => (
                        <div className="col-3" key = {player.id}>
                            <h2>{player.nombre}</h2>
                            <SelectorPersonaje key={shortid()} nombre={player.personaje.nombre} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
