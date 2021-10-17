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
import { motion } from 'framer-motion';
import NextBtn from '../../img/Buttons/AcceptButton.png';
import ClickUI from '../../audio/ClickUI.mp3'
import { Howl } from 'howler';

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

const SiguienteLogo = styled.img`

    border-radius: 10rem;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.8);
    
    @media(min-width: 200px){
        width: 90%;
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
    }
    @media(min-width: 583px){
        width: 30%;
    }
`;

const Texto = styled.span`
    font-weight: 900;
    font-size: 3rem;
    text-align: center;
`;

export const Jugador = () => {

    const { partyState } = useContext(PartyContext);
    const { usuario, revisando, sheriff } = partyState;
    const { socket } = useContext(SocketContext);
    const history = useHistory();

    const [fase, setFase] = useState(0);

    useEffect(() => {
        if(revisando !== null && usuario.id === revisando.id )
            history.push('/soborno');
    }, [revisando]);

    const ReproducirClick = () => {
        const sound = new Howl({
            src: ClickUI
        });
        sound.play();
    }

    const siguienteFase = () => {
        ReproducirClick();
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
                        <div className="col-12 my-4"> 
                            <Texto> Estás son tus cartas </Texto>
                        </div>
                        
                        {   
                            usuario.personaje.deck.map(carta => (
                                    <motion.div key= {shortid()}
                                        className='col-6 col-sm-4'
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}>
                                        <Producto  nombre={carta.nombre} columna={''}/>
                                    </motion.div>
                            ))
                        }
                    </div>:
                    fase===1 ?
                        <>
                            <div className="row">
                                <div className="col-12 my-4"> 
                                    <Texto> Cambiar cartas </Texto>
                                </div>
                            </div>
                            <SelectorCartas key={shortid()} cartas ={usuario.personaje.deck}/>
                        </>:
                    fase ===2 ? <div className="row justify-content-center">  
                            <div className="col-12 my-4"> 
                                    <Texto> Cartas actualizadas </Texto>
                            </div>
                        {   
                            usuario.personaje.deck.map(carta => (
                                    <Producto key={shortid()} nombre={carta.nombre} columna={'col-6 col-sm-4'}/>
                            ))
                        }
                    </div>:
                    fase==3 ?
                    <>
                    <div className="row">
                        <div className="col-12 my-4"> 
                            <Texto> Vender Cartas </Texto>
                        </div>
                    </div>
                    <SelectorCartas key={shortid()} cartas ={usuario.personaje.deck}/>
                    </>:
                    fase===4 ? <Declarar setFase={setFase}/>:
                    <h1>Error XD</h1>
                    
                }

                {
                    (sheriff.id !== usuario.id && fase!==4) &&
                    <div className="row justify-content-center pt-5" >
                        <div className="col-4">
                                <SiguienteLogo src={NextBtn} alt="Siguiente" onClick={siguienteFase}/>
                        </div>
                    </div>
                }

            </div>
            
            
        </div>
    )
}
