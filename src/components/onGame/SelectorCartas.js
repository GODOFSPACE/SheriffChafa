import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { Producto } from './Producto';
import styled from '@emotion/styled';
import { useCartaAleatoria } from '../../hooks/useCartaAleatoria';

const Bolsa = styled.div`
    width: 90%;
    margin: 2rem auto;
    height: auto;
    padding-top: 1rem;
    background-color: #4600D0;
    border-radius: 2rem;
`;

const Descartada = styled.span`
    display: block;
    margin: 0 auto;
    color: rgba(70,0,208,0.6);
    font-size: 10rem;
    position: absolute;
    transform: translate(3.5rem, -14rem);
`;

export const SelectorCartas = ({cartas}) => {
    
    const [contador, setContador] = useState(0);
    const [deck, setDeck] = useState([]);
    const [descartes, setDescartes] = useState(0);

    const Atras = () => {
        if(contador > 0){
            setContador(contador - 1 );
        }
        else{
            const aux = cartas.length - 1;
            setContador( aux );
        }
    }

    const Siguiente = () => {
        if(contador < cartas.length - 1) {
            setContador(contador + 1 );
        }
        else{
            setContador(0);
        }
    }

    const Cambiar = () => {
        if(!cartas[contador].descartada){
            setDescartes(descartes + 1);
            if(descartes < 5){
                cartas[contador].descartada = true ;
                setDeck([ ...deck, cartas[contador]]);
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

                <Bolsa className="row justify-content-center" >
                    {deck.map( carta => (
                            <Producto key={shortid()} nombre={carta.nombre} columna={'col-4'}/>
                    ))
                    }
                    
                </Bolsa>

            <div className="row">
                <div className="col-6">
                    <Producto key={shortid} nombre = {cartas[contador].nombre} columna={''}/>
                    {cartas[contador].descartada && 
                        <Descartada className="fas fa-minus-circle"> </Descartada>
                    }
                </div>
                <div className="col-6">
                    <h2>Carta: {contador+1}</h2>
                </div>
            </div>
            <div className="row">
                

                {/* <h2> {cartas[contador].nombre}  </h2> */}
                <label className="col-3 fas fa-chevron-circle-left" onClick={Atras}></label>
                <label className="col-3 fas fa-window-close" onClick={Cambiar}></label>
                <label className="col-3 fas fa-democrat" onClick={eliminarCambios}></label>
                <label className="col-3 fas fa-chevron-circle-right" onClick={Siguiente}></label>
            </div>

        </>
    )
}

