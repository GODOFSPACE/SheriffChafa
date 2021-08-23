import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SocketContext } from '../../context/SocketContext';
import Catrin from '../../img/Catrin.png'
import { types } from '../../types/types';
import { Modal } from './Modal';
import { SelectorPersonaje } from './SelectorPersonaje';

export const Sheriff = () => {
    const {partyState, dispatch} = useContext(PartyContext);
    const {socket} = useContext(SocketContext);
    const history = useHistory();
    const{revisando} = partyState;


    const ignorar = () => {
        socket.emit('mandar-juicio', { examinar: false, revisando });
        dispatch({
            type: types.CambiarReady,
            payload: false
        })    
        history.push('/carga');
    }

    const revisar = () => {
        socket.emit('mandar-juicio', { examinar: true, revisando });
        dispatch({
            type: types.CambiarReady,
            payload: false
        }) 
        history.push('/carga');
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
