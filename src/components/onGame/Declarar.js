import React, { useContext, useState } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SocketContext } from '../../context/SocketContext';
import { Producto } from './Producto';
import { useHistory } from 'react-router';


export const Declarar = () => {
    
    const [carta] = useState([
        'Tamales',
        'Pan de Muerto',
        'Aguacate',
        'Carnitas',
    ]);

    const [contador, setContador] = useState(0);
    const {partyState} = useContext(PartyContext);
    const {usuario} = partyState;
    const {socket} = useContext(SocketContext);
    const history = useHistory();
    const Retroceso = () => {
        if(contador > 0){
            setContador(contador - 1 );
        }
        else{
            const aux = carta.length - 1;
            setContador( aux );
        }
    }

    const Avanzar = () => {
        if(contador < carta.length - 1) {
            setContador(contador + 1 );
        }
        else{
            setContador(0);
        }
    }

    const Aceptar = () => {
        usuario.personaje.declaracion = carta[contador];
        socket.emit('finalizar-nalgona', usuario);
        partyState.ready = false;
        history.push('/carga')
    }

    return (
        <div>

            <div className="row">
                <div className="col-12"> Elige una carta </div>
            </div>

            <div className="row justify-content-center mt-5">
                <Producto key = {shortid} nombre ={carta[contador]} columna = {'col-6'}/>
            </div>
            
            <label className="col-3 fas fa-chevron-circle-left" onClick={Retroceso}></label>
            <label className="col-3 fas fa-window-close" onClick={Aceptar}></label>
            <label className="col-3 fas fa-chevron-circle-right" onClick={Avanzar}></label>
        </div>
    )
}
