import React, { useContext, useEffect, useState } from 'react';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SocketContext } from '../../context/SocketContext';
import { Producto } from './Producto';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import AnteriorCarta from '../../img/Buttons/Anteriorcarta.svg';
import MeterCarta from '../../img/Buttons/metercarta.svg';
import SiguienteCarta from '../../img/Buttons/Siguientecarta.svg';
const Bolsa = styled.div`
    width: 90%;
    height: 19rem;
    margin: 4rem auto;
    padding-top: 3rem;
    background-color: #4600D0;
    border-radius: 2rem;

    span{
        position: absolute;
        transform: translateY(-5.2rem);
        font-weight: 900;
        font-size: 3rem;
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);
    }
    @media(min-width: 768px){
        img{
            width: 50%;
        }
    }
    @media(max-width: 1270px){
        img{
            width: 75%;
        }
    }

    @media(min-width: 700px){
        height: 40rem;
    }

`;

const Imagen = styled.img`
    width: 10%;
    margin-top: 2rem;
    @media(max-width: 1270px){
            width: 20%;
    }
    :hover{
        cursor: pointer;
    }
`;


export const Declarar = ({setFase}) => {
    
    const [carta] = useState([
        'Tamales',
        'Pan de Muerto',
        'Aguacate',
        'Carnitas',
    ]);

    const [contador, setContador] = useState(0);
    const {partyState} = useContext(PartyContext);
    const {usuario} = partyState;
    const {personaje:{mercancia}} = usuario;
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

    useEffect(() => {
        if(!mercancia.length>0)
            setFase(3);
    }, [mercancia]);

    return (
        <div className="row justify-content-around">
            <div className="col-12 col-md-6">
                <Bolsa className="row justify-content-center">
                    <span>Tus cartas</span>
                    {mercancia.map( carta => {
                        return(
                            <div key={shortid()} className='col-4'>
                                <Producto key={shortid()} nombre={carta.nombre} />
                             </div>
                        )
                    }
                    )
                    }
                </Bolsa>          
            </div>
            <div className="col-12 col-md-6">
                <div className="row">
                    <div className="col-12"> Elige una carta para declarar</div>
                </div>    
                <div className="row justify-content-center mt-5">
                    <Producto key = {shortid} nombre ={carta[contador]} columna = {'col-6'}/>
                </div>
                <div className="row justify-content-around">
                    <Imagen src={AnteriorCarta} alt="Carta anterior" className="col-3" onClick={Retroceso}></Imagen>
                    <Imagen src={MeterCarta} alt="Carta anterior" className="col-3" onClick={Aceptar}></Imagen>
                    <Imagen src={SiguienteCarta} alt="Carta anterior" className="col-3" onClick={Avanzar}></Imagen>
                </div>
                
            </div>
        </div>
    )
}
