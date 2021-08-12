import React, { useState } from 'react';
import Pan from '../../img/cartas/Pan.png';
import { Producto } from './Producto';

export const SelectorCartas = ({cartas}) => {
    const [contador, setContador] = useState(0);

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

    return(
        <>
            <div className="row">

                <Producto nombre = {cartas[contador].nombre} />
                <div className="col-6">
                    <h2>Carta: {contador+1}</h2>
                </div>
            </div>
            <div className="row">
                

                {/* <h2> {cartas[contador].nombre}  </h2> */}
                <button className="col-4" onClick={Atras}>Atras</button>
                <button className="col-4" >X</button>
                <button className="col-4" onClick={Siguiente}>Siguiente</button>
            </div>
        </>
    )
}

