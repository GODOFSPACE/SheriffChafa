import React, { useContext } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import Catrin from '../../img/Catrin.png'
import { SelectorPersonaje } from './SelectorPersonaje';



export const Sheriff = () => {

    const {partyState} = useContext(PartyContext);
    const{revisando} = partyState

    if(revisando !== null){
        return(
            <div>
                <h1>¿Revisar a {revisando.nombre}?</h1>
                <SelectorPersonaje ket={shortid()} nombre={revisando.personaje.nombre}/>
            </div>
        )
    }

    return (
        <div>
            <h1>El Catrin te ah elegido</h1>
            <img src={Catrin} alt="Catrin"></img>
        </div>
    )
}
