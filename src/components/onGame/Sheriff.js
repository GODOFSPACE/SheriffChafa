import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
import { PartyContext } from '../../context/game/PartyContext';
import { SocketContext } from '../../context/SocketContext';
import Catrin from '../../img/Catrin.png'
import { types } from '../../types/types';
import { Modal } from './Modal';
import { SelectorPersonaje } from './SelectorPersonaje';
import Logo from '../../img/Buttons/Lupa.png';

import {
    motion,
    useMotionValue,
    useTransform,
  } from "framer-motion";

import styled from '@emotion/styled';

const Fondo = styled.div`
    margin:2rem auto;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 200px;
        margin: 5rem;
        @media(max-width: 500px){
          margin: 2rem;
          width:80px
        }
    }
`;

const Imagen = styled.div`
    margin: 0 auto;
    width: 200px;

    img{
        width: 100%;
    }
`;

const Texto = styled.div`
  font-size: 10rem;
  margin: 0 4rem;
  font-weight: 900;
  @media(max-width: 500px){
    margin: 0 2rem;
    font-size: 3rem;
  }
`;

const CatrinImg = styled.img`
  width: 18%;
  height: 18%;
  @media(max-width: 500px){
    width: 70%;
  }
`;

export const Sheriff = () => {
    const {partyState, dispatch} = useContext(PartyContext);
    const {socket} = useContext(SocketContext);
    const history = useHistory();
    const{revisando} = partyState;


    const ignorar = () => {
        socket.emit('mandar-juicio', { examinar: false, revisando, pago: 0 });
        dispatch({
            type: types.CambiarReady,
            payload: false
        })    
        history.push('/carga');
    }

    const revisar = () => {
        socket.emit('mandar-juicio', { examinar: true, revisando, pago: 0 });
        dispatch({
            type: types.CambiarReady,
            payload: false
        }) 
        history.push('/carga');
    }

    const x = useMotionValue(0)

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset , velocity) => {
      return Math.abs(offset) * velocity;
    };
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#E11212", "#4600D0", "#1DDF90"]
  )

  const paginate = (newDirection) => {
    if(newDirection === -1)
    ignorar();
    else if (newDirection === 1)
    revisar();
  };

  if(revisando !== null){
  return (
    <>
    {partyState.soborno>0 && <Modal /> }
    <h1>¿Revisar a {revisando.nombre}?</h1>
    <Imagen>
        <SelectorPersonaje key={shortid()} nombre={revisando.personaje.nombre}/>
    </Imagen>
      <Fondo>
        <Texto>No</Texto>
        <motion.div style={{ background }} className="botonMovil">
        <motion.img
            src={Logo} alt=""
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}

            onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(-1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(1);
                }
              }}

            style={{ x }}
        >
        </motion.img>
        </motion.div>
        <Texto>Si</Texto>

      </Fondo>
    </>
  )
}

    if(revisando !== null){
        return(
            <div>
                <SelectorPersonaje key={shortid()} nombre={revisando.personaje.nombre}/>
            </div>
        )
    }

    return (
        <div>
            <h1>El Catrín te ha elegido</h1>
            <CatrinImg src={Catrin} alt="Catrin"></CatrinImg>
        </div>
    )
}
