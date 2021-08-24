import React, { useContext, useEffect, useState } from 'react'
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { PartyContext } from '../../context/game/PartyContext';
import { SocketContext } from '../../context/SocketContext';
import { useHistory } from 'react-router-dom';

const Dinero = styled.div`
    display: inline-block;
    background-color: rgba(0,0,0,0.5);
    border-radius: 1rem;
    height: 3.5rem;
    width: 13rem;
    font-size: 2.5rem;
    font-weight: 900;
    text-align: center;
    transform: translateX(1rem);
`;

const Moneda = styled.span`
    display: inline-flex;
    background-color: #E3CE0D;
    color: #212121;
    width: 5rem;
    height: 5rem;
    border-radius: 3rem;
    font-weight: 900;
    font-size: 3rem;
    transform: translateX(-1rem);
    align-items: center;
    justify-content: center;
`;

const Billete = styled.span`
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
`;
const MonedaBoton = styled.div`
    background-color: #E3CE0D;
    width: 10rem;
    height: 10rem;
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #292929;
    font-weight: 900;
    font-size: 4rem;
`;
const BotonesSR = styled.span`

    color: #292929;
    font-weight: 900;
    font-size: 5rem;

    :hover{
        cursor: pointer;
    }
`;

export const Soborno = () => {

    const {socket} = useContext(SocketContext);
    const {partyState} = useContext(PartyContext);
    const {usuario, ready} = partyState;
    const history = useHistory();

    const [soborno, setSoborno] = useState(0);

    const sumar = (cantidad) => {
        setSoborno(soborno + cantidad);
    }

    const restar = (cantidad) => {
        setSoborno(soborno - cantidad);
    }

    const mandarSoborno = () => {
        socket.emit('mandar-soborno', soborno );
    }

    useEffect(() => {
        if(!ready){
            history.push('carga');
        }
    }, [ready]);

    return (
        <div>
            <Global styles={css`
                 html{
                    font-size: 62.5%;
                    box-sizing: border-box;
                }
                *, *:before, *:after {
                    box-sizing: inherit;
                }

                body{
                    height: 100vh;
                    background: rgb(252,74,26);
                    background: linear-gradient(180deg, rgba(252,74,26,1) 0%, rgba(247,183,51,1) 100%);;
                    font-family: 'Nunito', sans-serif;
                    font-size: 2.5rem;
                    color: white;
                    text-align: center;
                }

                label{
                    color: #fff;
                    font-weight: 900;
                    font-size: 4rem;
                }
        
            `}/>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 mt-3">
                        <Dinero>
                            <span>{usuario.personaje.dinero}</span>
                        </Dinero>
                        <Moneda>$</Moneda>
                    </div>
                </div>

                <label>Negocia con el catrin</label>
                
                <div className="row justify-content-center">
                    <Billete>
                        <span> ${soborno} </span>
                    </Billete>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <BotonesSR onClick={() => sumar(1)}>+</BotonesSR>
                        <MonedaBoton> $1 </MonedaBoton>
                        <BotonesSR onClick={() => restar(1)}>-</BotonesSR>
    
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        Cancelar
                    </div>

                    <div className="col-6" onClick={mandarSoborno}>
                        Mandar Soborno
                    </div>
                </div>
            </div>
        </div>
    )
}
