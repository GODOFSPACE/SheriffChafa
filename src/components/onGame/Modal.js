import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { PartyContext } from '../../context/game/PartyContext';
import { types } from '../../types/types';
import { SocketContext } from '../../context/SocketContext';
import { useHistory } from 'react-router-dom';

const ModalContainer = styled.div`
    margin: 0 auto;
    width: 90vw;
    height: 50rem;
    border-radius: 2rem;
    background: rgb(255,239,186);
    background: linear-gradient(180deg, rgba(255,239,186,1) 0%, rgba(255,255,255,1) 100%);
    position: absolute;
    box-shadow: rgba(0,0,0,0.35) 0px 5px 15px;
    padding: 25px;
    color: #292929;
    font-size: 3rem;

    @media (min-width: 500px){
        font-size: 2.5rem;
        width: 25rem;
        height: 50rem;
        margin-right: 2rem;
        padding: 0.5rem, 1rem;
    }
`;

const Billete = styled.span`
    display: block;
    margin: 0 auto;
    margin-top: 5rem;
    background-color: #97DCB7;
    border: 1rem solid #1DDF90 ;
    border-radius: 1rem;
    width: 80%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #212121;
    font-weight: 900;
    font-size: 5rem;
    :hover{
        cursor: default;
    }
`;

const Rechazar = styled.span`
    background-color: #E11212;
    display: inline-block;
    border-radius: 1rem;
    margin-top: 5rem;
    margin-right: 3rem;
    color: white;
    padding: 0.5rem;
    :hover{
        cursor: pointer;
    }
    @media (min-width: 500px){
        font-size: 1.8rem;
        width: 10rem;
        height: 3.5rem;
        margin-right: 2rem;
        padding: 0.5rem, 1rem;
        margin-bottom: 1.5rem;
    }
`;
const Aceptar = styled.span`
    background-color: #1DDF90;
    display: inline-block;
    border-radius: 1rem;
    color: white;
    padding: 0.5rem;
    :hover{
        cursor: pointer;
    }

    @media (min-width: 500px){
        font-size: 1.8rem;
        width: 10rem;
        height: 3.5rem;
        margin-right: 2rem;
        padding: 0.5rem, 1rem;
    }
`;

export const Modal = () => {

    const {partyState, dispatch} = useContext(PartyContext);
    const {socket} = useContext(SocketContext);
    const {soborno, revisando} = partyState;
    const history = useHistory();

    const cerrarSoborno = () => {
        dispatch({
            type: types.mandarSoborno,
            payload: 0
        })
    }

    const revisar = () => {
        console.log(soborno);
        socket.emit('mandar-juicio', { examinar: false, revisando, pago: soborno });
        dispatch({
            type: types.mandarSoborno,
            payload: 0
        })
        dispatch({
            type: types.CambiarReady,
            payload: false
        }) 
        history.push('/carga');
    }

    return (
        <div>
            <ModalContainer>
                Parece que alguien quiere darte su sucio dinero
                <Billete> ${soborno} </Billete>
                <Rechazar onClick={cerrarSoborno}>Rechazar</Rechazar>
                <Aceptar onClick = {revisar} >Aceptar</Aceptar>
            </ModalContainer>


        </div>
    )
}
