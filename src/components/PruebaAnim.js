import React from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
  } from "framer-motion";

import styled from '@emotion/styled';
import Logo from '../img/Logo2.png'

const Fondo = styled.div`
    height: 100vh;
    margin:0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 200px;
        margin: 5rem;
    }
`;

export const PruebaAnim = () => {
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
    console.log('derecha');
    else if (newDirection === 1)
    console.log('Izquierda')
  };

  return (
      <Fondo>
        <motion.div style={{ background }} className="botonMovil">
        <motion.img
            src={Logo} alt=""
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}

            onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
    
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}

            style={{ x }}
        >
        </motion.img>
        </motion.div>

      </Fondo>
  )
}
