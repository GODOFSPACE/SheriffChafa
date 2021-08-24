import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { Producto } from './Producto';
import styled from '@emotion/styled';
import Refrescar from '../../img/Buttons/Refrescar.svg'


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

    @media(min-width: 700px){
        height: 40rem;
    }

`;

const Imagen = styled.img`
    margin: 2rem 0;
    width: 40%;
`;

const Descartada = styled.div`
    filter: brightness(0.30);
`;

export const SelectorCartas = ({cartas}) => {
    
    const [deck, setDeck] = useState([]);
    const [descartes, setDescartes] = useState(0);

    const Cambiar = (carta) => {
        console.log('cambio');
        if(!carta.descartada){
            setDescartes(descartes + 1);
            if(descartes < 5){
                carta.descartada = true ;
                setDeck([ ...deck, carta]);
            }
        }
    }

    const eliminarCambios = () => {
        for( let i=0; i<cartas.length ; i++){
            cartas[i].descartada = false;
            setDescartes(0);
            setDeck([]);
        }
    }

    return(
        <>
            <div className="row">
                <div className="col-md-6">
                    <Bolsa className="row justify-content-center" >
                        <span>Cambiando cartas</span>
                        {deck.map( carta => (
                            <Producto key={shortid()} nombre={carta.nombre} columna={'col-4'}/>
                        ))
                        }

                        {deck.length>0 &&
                            <div className='col-4'>
                                <Imagen src={Refrescar} alt="Revertir" onClick={eliminarCambios}/>
                            </div>
                        }
                        
                    </Bolsa>
                </div>
                <div className="col-md-6">
                    <Bolsa className="row justify-content-center">
                        <span>Tus cartas</span>
                        {cartas.map( carta => {
                            if(!carta.descartada){
                                return(
                                    <div onClick={() => Cambiar(carta)} key={shortid()} className='col-4'>
                                        <Producto key={shortid()} nombre={carta.nombre} />
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <Descartada onClick={() => Cambiar(carta)} key={shortid()} className='col-4'> 
                                        <Producto nombre={carta.nombre}/>
                                    </Descartada>
                                )
                            }
                        }
                        )
                        }
                    </Bolsa>
                </div>    
            </div>
        </>
    )
}

