import React from 'react';
import styled from '@emotion/styled';
import ElTamalero from '../img/jugadores/Arco_DE_Tamalero_2.png';

const Imagen = styled.img`
    display: block;
    width: 150px;
    margin: 0 auto;
`;

export const UsuariosConectados = ( {jugador} ) => {
    return (
        
        <div className="col-4">
            { jugador.nombre }
            <Imagen src={ElTamalero} alt="El tamalero" />
        </div>
        
    )
}
