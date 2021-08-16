import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const ContadorHD = styled.span`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;

    font-weight: 900;
    font-size: 30rem;
    text-align: center;
`;

export const Contador = () => {

    const [segundos, setSegundos] = useState(5);
    const disminuirTiempo = () => {
        setSegundos(segundos-1);
    }

    
    useEffect(() => {
        if(segundos > 0){
            let timer = setInterval(()=> disminuirTiempo() , 1000)
            return () => {
                clearInterval(timer);
            }
        }
    }, [segundos]);

    return (

        <div>
                <ContadorHD>
                    <span>{segundos}</span>
                </ContadorHD>
        </div>
    )
}
