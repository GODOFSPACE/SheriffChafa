import React, { useContext } from 'react';
import shortid from 'shortid';
import styled from '@emotion/styled';
import { PartyContext } from '../../context/game/PartyContext';
import { SelectorPersonaje } from '../onGame/SelectorPersonaje';

const ContenedorCentrado = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

const Sheriff = styled.div`
    width: 25rem;

    h2{
        text-align: center;
    }
`;

export const SelectorSheriff = () => {

    const { partyState } = useContext(PartyContext);
    const {jugadores, sheriff} = partyState;

    return (
        <ContenedorCentrado>
            <Sheriff>
                {
                    jugadores.map( jugador => {
                        if(jugador.id === sheriff.id){
                            return(  
                                <div key = {jugador.id}>
                                    < SelectorPersonaje key = {shortid()} nombre = {jugador.personaje.nombre} />
                                    <h2 > El Catrín es: {jugador.nombre} </h2>
                                </div>                         
                            )
                        }
                    })
                }
            </Sheriff>
        </ContenedorCentrado>
    )
}
