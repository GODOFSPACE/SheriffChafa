import React from 'react';


import Tamales from '../../img/cartas/Tamales.png';
import Pan from '../../img/cartas/Pan.png';
import Aguacate from '../../img/cartas/Aguacate.png';
import Carnitas from '../../img/cartas/Carnitas.png';
import Tequila from '../../img/cartas/Tequila.png';
import Axolote from '../../img/cartas/Axolote.png';
import Machete from '../../img/cartas/Machete.png';
import Petardo from '../../img/cartas/Petardo.png';


export const Producto = ({nombre}) => {

    const caso = nombre;

    switch(caso){
        case 'Tamales': 
            return (
                <div className="col-6">
                    <img src = {Tamales} alt="Tamales"/>
                </div>
            )
        case 'Pan de Muerto':
            return (
                <div className="col-6">
                    <img src = {Pan} alt="Pan"/>
                </div>
            )
        case 'Aguacate':
            return (
                <div className="col-6">
                    <img src = {Aguacate} alt="Aguacate"/>
                </div>
            )
        case 'Carnitas':
            return (
                <div className="col-6">
                    <img src = {Carnitas} alt="Carnitas"/>
                </div>
            )
        case 'Tequila':
            return (
                <div className="col-6">
                    <img src = {Tequila} alt="Tequila"/>
                </div>
            ) 
        case 'Axolote':
            return (
                <div className="col-6">
                    <img src = {Axolote} alt="Axolote"/>
                </div>
            )   

        case 'Machete': 
            return(
                <div className="col-6">
                    <img src = {Machete} alt="Machete"/>
                </div>
            )
        case 'Petardos':
            return(
                <div className="col-6">
                    <img src = {Petardo} alt="Petardo"/>
                </div>
            )
        default: 
            return(
                <h2>XD Errors</h2>
            )
        
    }
}
