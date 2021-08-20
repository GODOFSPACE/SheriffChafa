import React, { useContext, useState } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SocketContext } from '../../context/SocketContext';
import Catrin from '../../img/Catrin.png'
import { Modal } from './Modal';
import { SelectorPersonaje } from './SelectorPersonaje';

export const Sheriff = () => {
    const {partyState} = useContext(PartyContext);
    const {socket} = useContext(SocketContext);
    const{revisando} = partyState

    const [examinar, setExaminar] = useState(false)

    const ignorar = () => {
        setExaminar(true);
        socket.emit('mandar-juicio', { examinar, revisando });
    }

    const revisar = () => {
        setExaminar(true);
        socket.emit('mandar-juicio', { examinar, revisando });
    }

    if(revisando !== null){
        return(
            <div>
                {partyState.soborno>0 && <Modal /> }
                <h1>¿Revisar a {revisando.nombre}?</h1>
                <SelectorPersonaje key={shortid()} nombre={revisando.personaje.nombre}/>
                <div onClick={ignorar}> Te ignoro XD </div>
                <div onClick={revisar}>Mamaste PRRO :v</div>
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
