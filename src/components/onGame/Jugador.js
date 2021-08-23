import React, { useContext, useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Producto } from './Producto';
import { PartyContext } from '../../context/game/PartyContext';
import shortid from 'shortid';
import {SelectorCartas} from '../onGame/SelectorCartas';
import { SocketContext } from '../../context/SocketContext';
import { Declarar } from './Declarar';
import { useHistory } from 'react-router-dom';
import { Sheriff } from './Sheriff';
import { Modal } from './Modal';

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
    border-radius: 10rem;
    font-weight: 900;
    font-size: 3rem;
    transform: translateX(-1rem);
    align-items: center;
    justify-content: center;
`;

const Logo = styled.div`
    background: linear-gradient(183deg, rgba(142,45,226,1) 0%, rgba(74,0,224,1) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    border-radius: 50;
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    margin: 0 auto;
    margin-top: 2rem;
`;

export const Jugador = () => {

    const { partyState } = useContext(PartyContext);
    const { usuario, revisando, sheriff, ready } = partyState;
    const { socket } = useContext(SocketContext);
    const history = useHistory();

    const [fase, setFase] = useState(0);

    useEffect(() => {
        if(revisando !== null && usuario.id === revisando.id )
            history.push('/soborno');
    }, [revisando]);

    const siguienteFase = () => {
        if(fase===1){
            socket.emit( 'cambiar-jugador-info', usuario );
        }
        if(fase===3){
            for(let i=0; i<usuario.personaje.deck.length; i++){
                if(usuario.personaje.deck[i].descartada){
                    usuario.personaje.mercancia = [...usuario.personaje.mercancia, usuario.personaje.deck[i]]
                }
            }
        }
        setFase(fase + 1);
    }

    const anteriorFase = () => {
        setFase(fase - 1);
    }

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

                a {
                    text-decoration: none;
                    color: inherit;
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
                {
                    sheriff.id === usuario.id ?
                    <Sheriff />
                    :
                    fase===0 ?
                    <div className="row justify-content-center">
                        
                        {   
                            usuario.personaje.deck.map(carta => (
                                    <Producto key= {shortid()}  nombre={carta.nombre} columna={'col-6'}/>
                            ))
                        }
                    </div>:
                    fase===1 ?
                    <SelectorCartas key={shortid()} cartas ={usuario.personaje.deck}/>:
                    fase ===2 ? <div className="row justify-content-center">                    
                        {   
                            usuario.personaje.deck.map(carta => (
                                    <Producto key={shortid()} nombre={carta.nombre} columna={'col-6'}/>
                            ))
                        }
                    </div>:
                    fase==3 ?
                    <SelectorCartas key={shortid()} cartas ={usuario.personaje.deck}/>:
                    fase===4 ? <Declarar />:
                    <h1>Error XD</h1>
                    
                }

                {
                    (sheriff.id !== usuario.id && fase!==4) &&
                    <>
                        <div className="row justify-content-around">
                            <div className="col-4">
                                <Logo className="fas fa-hand-point-left" onClick={anteriorFase}></Logo>
                            </div>
                            <div className="col-4">
                                <Logo className="fas fa-hand-point-right" onClick={siguienteFase}></Logo>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-4">
                                <Logo className="fas fa-skull"></Logo>
                            </div>
                        </div>
                    </>
                }

            </div>
            
            
        </div>
    )
}
