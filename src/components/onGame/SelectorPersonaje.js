import React from 'react';
import Tamalero from '../../img/jugadores/Tamalero.png';
import Panadero from '../../img/jugadores/Panadero.png';
import Pinatero from '../../img/jugadores/Pinatero.png';
import Aguacatera from '../../img/jugadores/Aguacatera.png';

import styled from '@emotion/styled';

const Imagen = styled.img`
    margin: 0 auto;
    width: 100%;
`;

export const SelectorPersonaje = ({nombre}) => {
    const caso = nombre;

    switch(caso){
        case 'Tamalero': 
            return (
                    <Imagen src = {Tamalero} alt="Tamalero"/>     
            )
        case 'Panadero':
            return (
                    <Imagen src = {Panadero} alt="Panadero"/>
            )
        case 'Pinatero':
            return (        
                    <Imagen src = {Pinatero} alt="Pinatero"/>
            )
        case 'Aguacatera':
            return (
                    <Imagen src = {Aguacatera} alt="Aguacatera"/>
            ) 
        default: 
            return(
                <h2>XD Errors</h2>
            )
    }
}
