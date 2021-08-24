import React from 'react';
import styled from '@emotion/styled';


import Tamales from '../../img/cartas/Tamal.png';
import PanDeMuerto from '../../img/cartas/PanDeMuerto.png';
import Aguacate from '../../img/cartas/Aguacate.png';
import Pinata from '../../img/cartas/Pinata.png';
import Tequila from '../../img/cartas/Tequila.png';
import Axolote from '../../img/cartas/Axolote.png';
import Machete from '../../img/cartas/Machete.png';
import Petardo from '../../img/cartas/Petardo.png';

const Imagen = styled.img`
    width: 80%;
    @media(min-width: 400px){
        width: 60%;
    }
    @media(min-width: 575px){
        margin: 2rem 0;
        width: 40%;
    }
`;


export const Producto = ({nombre, columna}) => {

    const caso = nombre;

    switch(caso){
        case 'Tamales': 
            return (
                <div className={columna}>
                    <Imagen src = {Tamales} alt="Tamales"/>
                </div>
               
            )
        case 'Pan de Muerto':
            return (
                <div className={columna}>
                    <Imagen src = {PanDeMuerto} alt="PanDeMuerto"/>
                </div>
               
            )
        case 'Aguacate':
            return (
               <div className={columna}>
                   <Imagen src = {Aguacate} alt="Aguacate"/>
               </div>
              
            )
        case 'Carnitas':
            return (
                <div className={columna}>
                    <Imagen src = {Pinata} alt="Pinata"/>
                </div>
                
            )
        case 'Tequila':
            return (
                <div className={columna}>
                    <Imagen src = {Tequila} alt="Tequila"/>
                </div>
             
            ) 
        case 'Axolote':
            return (
                <div className={columna}>
                    <Imagen src = {Axolote} alt="Axolote"/>
                </div>
                
            )   

        case 'Machete': 
            return(
                <div className={columna}>
                    <Imagen src = {Machete} alt="Machete"/>
                </div>
               
            )
        case 'Petardos':
            return(
                <div className={columna}>
                    <Imagen src = {Petardo} alt="Petardo"/>
                </div>
               
            )
        default: 
            return(
                <h2>XD Errors</h2>
            )
        
    }
}
